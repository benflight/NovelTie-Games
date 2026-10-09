/* Rootline Word Bank: "helpful game" rounds. Every answer becomes one event in a
   shared word bank that Similarize reads. Events queue in localStorage and flush in
   batches, so play works offline. Vanilla JS, no dependencies. */
(function(){
"use strict";
var GAME_VERSION = "rootline-helpful-1";
var DEFAULT_API = "https://rootline-bank-staging.ben-e22.workers.dev";
var KEY = "rootline.bank.v1", API_KEY = "rootline.bank.api";
var SPRINT = 10, BATCH = 50, QUEUE_MAX = 2000;
var LN = {en:"English", es:"Spanish", fr:"French", de:"German", la:"Latin", grc:"Ancient Greek",
  "gem-pro":"Proto-Germanic", "gmw-pro":"Proto-West-Germanic", "ine-pro":"Proto-Indo-European", "itc-pro":"Proto-Italic", fro:"Old French", "la-vul":"Vulgar Latin", "grk-pro":"Proto-Hellenic"};
var FLAG = {en:"🇬🇧", es:"🇪🇸", fr:"🇫🇷", de:"🇩🇪", la:"🏛️", grc:"🏺"};

/* ---------- config: ?bank=<url|off> > localStorage > window.ROOTLINE_BANK_API > staging ---------- */
function apiBase(){
  try{
    var q = new URLSearchParams(location.search).get("bank");
    if(q){ if(q==="reset") localStorage.removeItem(API_KEY); else localStorage.setItem(API_KEY, q); }
    var v = localStorage.getItem(API_KEY);
    if(v) return v==="off" ? null : v.replace(/\/+$/,"");
  }catch(e){}
  return (window.ROOTLINE_BANK_API || DEFAULT_API).replace(/\/+$/,"");
}

/* ---------- state (separate key: never touches rootline.v1 saves) ---------- */
function uuid(){
  if(window.crypto && crypto.randomUUID) return crypto.randomUUID();
  var b = new Uint8Array(16); (window.crypto||{getRandomValues:function(a){for(var i=0;i<a.length;i++)a[i]=Math.random()*256|0;return a;}}).getRandomValues(b);
  b[6]=(b[6]&15)|64; b[8]=(b[8]&63)|128; var h=[].map.call(b,function(x){return (x+256).toString(16).slice(1);}).join("");
  return h.slice(0,8)+"-"+h.slice(8,12)+"-"+h.slice(12,16)+"-"+h.slice(16,20)+"-"+h.slice(20);
}
var bs = {player:null, queue:[], sent:0, rounds:0, xp:0, verified:0, verifiedRight:0, seen:{}, sprints:0, lastFlush:null};
try{ var raw = localStorage.getItem(KEY); if(raw){ var o = JSON.parse(raw); for(var k in bs){ if(o[k]!==undefined) bs[k]=o[k]; } } }catch(e){}
if(!bs.player) bs.player = "d-" + uuid();
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(bs)); }catch(e){ /* quota: drop oldest queued */ bs.queue = bs.queue.slice(-500); try{ localStorage.setItem(KEY, JSON.stringify(bs)); }catch(_){} } }
save();

/* ---------- seed bundle (lazy; cached by the service worker) ---------- */
var SEED = null, seedP = null;
function wikt(t){ return {type:"wiktionary", url:"https://en.wiktionary.org/w/index.php?title="+t[0]+"&oldid="+t[1], rev:t[1]}; }
function loadSeed(){
  if(SEED) return Promise.resolve(SEED);
  if(!seedP) seedP = fetch("bank-seed.json").then(function(r){ if(!r.ok) throw new Error("seed "+r.status); return r.json(); })
    .then(function(j){ j.seed.forEach(function(r){ r.sources = (r.s||[]).map(wikt); delete r.s; }); SEED = j; return j; }).catch(function(e){ seedP = null; throw e; });
  return seedP;
}

/* ---------- event queue ---------- */
function record(round, answer, correct, meta){
  var r = round, ev = {
    id: uuid(), ts: new Date().toISOString(), game: "rootline", game_version: GAME_VERSION,
    kind: r.kind, items: r.items.map(function(i){ var o={text:i.text, lang:i.lang}; if(i.sense) o.sense=i.sense; return o; }),
    claim: r.kind==="bridge_wording" ? Object.assign({}, r.claim, {bridge: String(answer)}) : (r.claim || {}), answer: String(answer), correct: (correct===true||correct===false) ? correct : null,
    confidence: confidence(meta.ms, meta.hint), sources: r.sources || [], player: bs.player
  };
  bs.queue.push(ev); if(bs.queue.length > QUEUE_MAX) bs.queue = bs.queue.slice(-QUEUE_MAX);
  bs.rounds++; if(r.id) bs.seen[r.id] = 1;
  if(correct===true||correct===false){ bs.verified++; if(correct) bs.verifiedRight++; }
  save();
  if(bs.queue.length >= 10) flush();
  return ev;
}
/* confidence: instant taps and very slow answers count less; a hint counts less */
function confidence(ms, hint){
  var c = ms < 700 ? 0.4 : ms <= 12000 ? 1 : Math.max(0.5, 1 - (ms - 12000) / 40000);
  if(hint) c *= 0.7;
  return Math.round(c * 100) / 100;
}
var flushing = false, backoff = 0;
function flush(keepalive){
  var base = apiBase();
  if(!base || flushing || !bs.queue.length) return Promise.resolve(false);
  if(navigator.onLine === false) return Promise.resolve(false);
  if(backoff && Date.now() < backoff) return Promise.resolve(false);
  flushing = true;
  var batch = bs.queue.slice(0, BATCH), ids = {};
  batch.forEach(function(e){ ids[e.id] = 1; });
  return fetch(base + "/v1/results", {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({events: batch}), keepalive: !!keepalive})
    .then(function(res){
      if(res.status === 200){
        bs.queue = bs.queue.filter(function(e){ return !ids[e.id]; });   /* accepted, duplicate or invalid: never resend */
        bs.sent += batch.length; bs.lastFlush = new Date().toISOString(); backoff = 0; save();
        return res.json().catch(function(){return {};}).then(function(){ flushing = false; if(bs.queue.length) return flush(keepalive); return true; });
      }
      if(res.status === 400 || res.status === 413){ bs.queue = bs.queue.filter(function(e){ return !ids[e.id]; }); save(); }
      else backoff = Date.now() + (res.status === 429 ? 10*60e3 : 60e3);
      flushing = false; return false;
    }).catch(function(){ flushing = false; backoff = Date.now() + 30e3; return false; });
}
window.addEventListener("online", function(){ backoff = 0; flush(); });
document.addEventListener("visibilitychange", function(){ if(document.visibilityState === "hidden") flush(true); });
setInterval(function(){ if(bs.queue.length) flush(); }, 30000);
setTimeout(function(){ flush(); }, 1500);

/* ---------- round picking ---------- */
function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function pickFrom(list, n, pred){
  var fresh = list.filter(function(r){ return !bs.seen[r.id] && (!pred || pred(r)); });
  if(fresh.length < n) fresh = fresh.concat(shuffle(list.filter(function(r){ return bs.seen[r.id] && (!pred || pred(r)); })));
  return shuffle(fresh.slice(0, 400)).slice(0, n);
}
function buildSprint(){
  var S = SEED, seeded = S.seed, open = S.open;
  var yes = seeded.filter(function(r){ return r.answer==="yes"; }), no = seeded.filter(function(r){ return r.answer==="no"; });
  var cards = [].concat(
    pickFrom(yes, 4), pickFrom(no, 2),
    pickFrom(open, 1, function(r){ return r.kind==="shared_root"; }),
    pickFrom(open, 2, function(r){ return r.kind==="similarity_vote"; }),
    pickFrom(open, 1, function(r){ return r.kind==="bridge_wording" && r.hint_options && r.hint_options.length; })
  );
  cards = shuffle(cards);
  /* open with a verified card so the first tap teaches the format */
  for(var i=0;i<cards.length;i++){ if(cards[i].answer){ var c=cards.splice(i,1)[0]; cards.unshift(c); break; } }
  return cards.slice(0, SPRINT);
}

/* ---------- UI ---------- */
var U = function(){ return window.ROOTLINE.ui; };
var B = null;   /* current sprint */
function gloss(it){ return (SEED && SEED.gloss[it.lang+":"+it.text]) || ""; }
function wordTile(it, showGloss){
  var g = gloss(it);
  return '<div class="wb-word"><span class="wb-lang">'+(FLAG[it.lang]||"")+' '+U().esc(LN[it.lang]||it.lang)+'</span><b class="sc">'+U().esc(it.text)+'</b>'+
    (showGloss && g ? '<i>“'+U().esc(g)+'”</i>' : '')+'</div>';
}
function srcLinks(r){
  if(!r.sources || !r.sources.length) return "";
  return '<div class="wb-src">Source: '+r.sources.map(function(s){ var t=decodeURIComponent((s.url.match(/title=([^&]+)/)||[])[1]||"").replace(/_/g," ");
    return '<a href="'+U().esc(s.url)+'" target="_blank" rel="noopener">Wiktionary: '+U().esc(t)+'</a>'; }).join(" · ")+'</div>';
}
function explain(r){
  var c = r.claim || {}, a = r.items[0], b = r.items[1];
  if(r.kind==="not_related" && c.roots) return '<b>'+U().esc(a.text)+'</b> traces to '+LN["ine-pro"]+' <span class="sc">*'+U().esc(c.roots[0].replace(/^\*/,""))+'</span>; <b class="sc">'+U().esc(b.text)+'</b> to <span class="sc">*'+U().esc(c.roots[1].replace(/^\*/,""))+'</span>. Look-alikes, different roots.';
  if(c.root) return 'Both trace back to '+U().esc(LN[c.root_lang]||c.root_lang)+' <b class="sc">'+U().esc(c.root)+'</b>.';
  return "";
}

function start(){
  var app = document.getElementById("app");
  app.innerHTML = U().topbar("Word Bank") + '<div class="card"><p class="muted" style="margin:0">Loading rounds…</p></div>';
  loadSeed().then(function(){
    B = {cards: buildSprint(), i: 0, xp: 0, right: 0, verified: 0, combo: 0, answered: null, t0: 0, hint: false, startRounds: bs.rounds};
    renderCard();
  }).catch(function(){
    app.innerHTML = U().topbar("Word Bank") + '<div class="card"><h3>Rounds unavailable</h3><p class="muted">Couldn\'t load the word list. Connect once to download it; after that, Word Bank works offline.</p><button class="btn primary" data-act="wb-start">Try again</button></div>';
  });
}
function progressBar(){
  var h = '<div class="wb-prog"><div style="width:'+Math.round(100*B.i/B.cards.length)+'%"></div></div>';
  return h;
}
function renderCard(){
  var app = document.getElementById("app"), r = B.cards[B.i], esc = U().esc;
  var right = '<span class="pill">'+(B.combo>=3?"🔥"+B.combo+" · ":"")+B.xp+' XP</span>';
  var h = U().topbar("Word Bank", right) + progressBar() + '<div class="card wb-card">';
  var done = B.answered !== null, seeded = !!r.answer;
  if(r.kind==="shared_root" || r.kind==="not_related"){
    h += '<div class="wb-tag">'+(seeded?"Verified round":"🌱 Open round: no one knows yet")+'</div>';
    h += '<p class="q" style="margin-top:4px">Do these two words share a root?</p><div class="wb-pair">'+wordTile(r.items[0], B.hint||done)+'<span class="wb-amp">&</span>'+wordTile(r.items[1], B.hint||done)+'</div>';
    if(!done){
      h += '<div class="wb-ans"><button class="btn wb-yes" data-act="wb-ans" data-a="yes">🌳 Same root</button><button class="btn wb-no" data-act="wb-ans" data-a="no">✂️ Not related</button></div>';
      h += '<div class="row" style="margin-top:10px">'+(B.hint?'':'<button class="btn wb-small" data-act="wb-hint">💡 Show meanings</button>')+'<button class="btn wb-small" data-act="wb-ans" data-a="unsure">🤷 Not sure</button></div>';
    } else h += feedback(r);
  } else if(r.kind==="similarity_vote"){
    h += '<div class="wb-tag">🌱 Open round: your judgement</div><p class="q" style="margin-top:4px">How close are their meanings?</p><div class="wb-pair">'+wordTile(r.items[0], true)+'<span class="wb-amp">≈</span>'+wordTile(r.items[1], true)+'</div>';
    if(!done){
      h += '<div class="wb-scale">'+[["3","Same"],["2","Close"],["1","Loosely"],["0","Different"]].map(function(x){ return '<button class="btn" data-act="wb-ans" data-a="'+x[0]+'">'+x[1]+'</button>'; }).join("")+'</div>';
    } else h += feedback(r);
  } else if(r.kind==="bridge_wording"){
    if(!B.opts){
      var others = shuffle(SEED.open.filter(function(o){ return o.kind==="bridge_wording" && o!==r && o.hint_options && o.hint_options.length; })).slice(0,2).map(function(o){ return o.hint_options[0]; });
      B.opts = shuffle(r.hint_options.slice(0,2).concat(others).filter(function(v,i,a){ return a.indexOf(v)===i; })).concat(["none of these"]);
    }
    h += '<div class="wb-tag">🌱 Open round: find the bridge</div><p class="q" style="margin-top:4px">These English words are cousins. Which word links their meanings?</p><div class="wb-pair">'+wordTile(r.items[0], true)+'<span class="wb-amp">↔</span>'+wordTile(r.items[1], true)+'</div>';
    if(!done){
      h += '<div class="opts">'+B.opts.map(function(o){ return '<button class="opt" data-act="wb-ans" data-a="'+esc(o==="none of these"?"none":o)+'"><span class="of">'+esc(o)+'</span></button>'; }).join("")+'</div>';
    } else h += feedback(r);
  }
  h += '</div>';
  app.innerHTML = h;
  if(!done){ B.t0 = performance.now(); }
}
function feedback(r){
  var a = B.answered, esc = U().esc, h = "";
  if(r.answer){
    if(a==="unsure") h += '<div class="feedback"><b>The answer: '+(r.answer==="yes"?"same root":"not related")+'.</b><br>'+explain(r)+srcLinks(r)+'</div>';
    else if(a===r.answer) h += '<div class="feedback good"><b>Right! +'+(B.lastXp)+' XP</b><br>'+explain(r)+srcLinks(r)+'</div>';
    else h += '<div class="feedback bad"><b>Not quite: '+(r.answer==="yes"?"they do share a root":"they only look alike")+'.</b><br>'+explain(r)+srcLinks(r)+'</div>';
  } else {
    h += '<div class="feedback good"><b>Vote saved. +'+B.lastXp+' XP</b><br>No answer key here: your vote and other players\' votes decide it for the word bank.</div>';
  }
  h += '<div class="sep"></div><button class="btn primary" data-act="wb-next">'+(B.i < B.cards.length-1 ? "Continue →" : "Finish sprint")+'</button>';
  return h;
}
function answer(a){
  if(!B || B.answered !== null) return;
  var r = B.cards[B.i], ms = performance.now() - B.t0, correct = null, xp;
  if(r.answer && a !== "unsure"){ correct = (a === r.answer); B.verified++; }
  if(correct === true){ B.right++; B.combo++; xp = B.hint ? 5 : 10; U().buzz(25); }
  else if(correct === false){ B.combo = 0; xp = 0; U().buzz([40,60,40]); }
  else { xp = a === "unsure" ? 1 : 5; }
  B.lastXp = xp; B.xp += xp; bs.xp += xp;
  record(r, a, correct, {ms: ms, hint: B.hint});
  B.answered = a; renderCard();
  var fb = document.querySelector(".feedback"); if(fb && fb.getBoundingClientRect().bottom > innerHeight) fb.scrollIntoView({behavior:"smooth", block:"center"});
}
function next(){
  if(B.i < B.cards.length - 1){ B.i++; B.answered = null; B.hint = false; B.opts = null; renderCard(); window.scrollTo(0,0); return; }
  bs.sprints++; save(); renderDone();
}
function renderDone(){
  var esc = U().esc, n = bs.rounds - B.startRounds;
  var h = U().topbar("Word Bank") + '<div class="wordcard"><div class="tag">Sprint complete</div><div class="w" style="font-size:clamp(40px,10vw,64px)">+'+B.xp+' XP</div>'+
    '<div class="d">'+B.right+' of '+B.verified+' verified rounds right</div></div><div class="sep"></div>';
  h += helpedNote(n) + '<div class="sep"></div><div class="row"><button class="btn primary" data-act="wb-start">Another sprint →</button><button class="btn" data-act="home">Home</button></div>';
  document.getElementById("app").innerHTML = h; window.scrollTo(0,0);
  var refresh = function(){ var el = document.querySelector(".wb-note"); if(el && screenIs(h)) el.outerHTML = helpedNote(n); };
  flush().then(refresh); setTimeout(refresh, 4000);
}
function screenIs(h){ var a = document.getElementById("app"); return a && a.querySelector(".wb-note") && a.innerHTML.indexOf("Sprint complete") >= 0; }
function helpedNote(n){
  var pending = bs.queue.length;
  return '<div class="wb-note">🌱 <b>Your rounds helped build the word bank.</b> '+(n!=null?n+' this sprint · ':'')+bs.rounds+' total'+
    (pending ? ' · '+pending+' waiting to upload'+(navigator.onLine===false?' (offline)':'') : '')+
    '<br><span class="dim small">Each answer is saved anonymously to a shared word bank of related words that <a href="https://similarize.com" target="_blank" rel="noopener">Similarize</a> uses to suggest better wording.</span></div>';
}
function homeCard(){
  var h = '<div class="card wb-home"><h3>🌱 Word Bank</h3><p class="muted small" style="margin-top:0">Quick 10-card sprints: same root or look-alike? Every answer helps build a shared word bank.</p>'+
    '<button class="btn primary" data-act="wb-start">Start a sprint</button>';
  if(bs.rounds) h += '<p class="small" style="margin:10px 0 0;color:var(--gold2)">Your rounds helped build the word bank: '+bs.rounds+' rounds, '+bs.xp+' XP.</p>';
  return h + '</div>';
}

/* ---------- one quick helper round on the classic dig "done" screen ---------- */
function helperCard(word){
  var el = document.getElementById("wb-helper"); if(!el) return;
  loadSeed().then(function(){
    var mine = SEED.seed.filter(function(r){ return r.items[0].text === word.id && !bs.seen[r.id]; });
    var r = mine.length ? mine[Math.floor(Math.random()*mine.length)] : pickFrom(SEED.seed, 1)[0];
    if(!r) return;
    var t0 = performance.now(), esc = U().esc;
    el.innerHTML = '<div class="card wb-helper"><div class="wb-tag">⚡ Bonus helper round</div><p class="q" style="margin:4px 0 10px">Do <em class="sc">'+esc(r.items[0].text)+'</em> and <em class="sc">'+esc(r.items[1].text)+'</em> <span class="muted small">('+esc(LN[r.items[1].lang]||"")+')</span> share a root?</p>'+
      '<div class="row"><button class="btn" data-a="yes">🌳 Same root</button><button class="btn" data-a="no">✂️ Not related</button></div></div>';
    el.querySelectorAll("button[data-a]").forEach(function(b){ b.addEventListener("click", function(){
      var a = b.getAttribute("data-a"), ok = a === r.answer;
      record(r, a, ok, {ms: performance.now() - t0, hint: false});
      el.innerHTML = '<div class="card wb-helper"><div class="feedback '+(ok?"good":"bad")+'"><b>'+(ok?"Right!":"Not quite.")+'</b> '+explain(r)+srcLinks(r)+'</div>'+helpedNote(null)+'</div>';
    }); });
  }).catch(function(){});
}

document.addEventListener("click", function(e){
  var el = e.target.closest("[data-act]"); if(!el) return;
  var a = el.getAttribute("data-act");
  if(a==="wb-start"){ window.ROOTLINE.ui.go("bank"); }
  else if(a==="wb-ans") answer(el.getAttribute("data-a"));
  else if(a==="wb-hint"){ if(B && B.answered===null){ B.hint = true; var t=B.t0; renderCard(); B.t0=t; } }
  else if(a==="wb-next") next();
});

window.RootlineBank = { start: start, homeCard: homeCard, helperCard: helperCard, flush: flush, apiBase: apiBase,
  state: function(){ return bs; }, sprint: function(){ return B; }, confidence: confidence };
})();
