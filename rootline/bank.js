/* Rootline Word Bank: "helpful game" rounds. Every answer becomes one event in a shared word bank that
   Similarize reads. Events queue in localStorage and upload in batches, so play works offline.
   Two kinds of "same root?" cards:
   * PRACTICE rounds (public seed set, shipped without answers): the bank replies with the answer + explanation. Fun + teaching.
   * Everything else is "your call", and it all comes from this device's DEAL (POST /v1/session): open rounds AND the
     bank's quiet check rounds, one shape, one order, never in the bundle (bank-seed.json has practice rounds and the
     bridge / meaning rounds built from them, nothing else). They look and behave exactly the same
     (same tag, no meanings, same "vote saved" reply, same XP). The bank never says which were checks or how they went;
     its only feedback is the device's status ("warming up" / "your votes count"), tallied every few hours.
   Uploads need a short-lived session from POST /v1/session, which costs one Cloudflare Turnstile check per visit,
   shown in a clear in-game "quick human check" card (never a stray box). Dealt rounds are served in the bank's order.
   Vanilla JS, no dependencies. */
(function(){
"use strict";
var GAME_VERSION = "rootline-helpful-5";
var CFG = window.ROOTLINE_BANK_CONFIG || {};                         /* see bank-config.js (prod switch lives there) */
var DEFAULT_API = CFG.api || "https://rootline-bank-staging.ben-e22.workers.dev";
var HOSTS = CFG.hosts || ["rootline-bank-staging.ben-e22.workers.dev", "rootline-bank.ben-e22.workers.dev"];
var SITEKEY = CFG.turnstileSiteKey || "";
var KEY = "rootline.bank.v1", API_KEY = "rootline.bank.api", OFF_KEY = "rootline.bank.off", DEV_KEY = "rootline.bank.device", SESS_KEY = "rootline.bank.session";
var SPRINT = 10, BATCH = 50, QUEUE_MAX = 2000;
var LN = {en:"English", es:"Spanish", fr:"French", de:"German", la:"Latin", grc:"Ancient Greek",
  "gem-pro":"Proto-Germanic", "gmw-pro":"Proto-West-Germanic", "ine-pro":"Proto-Indo-European", "itc-pro":"Proto-Italic", fro:"Old French", "la-vul":"Vulgar Latin", "grk-pro":"Proto-Hellenic"};
var FLAG = {en:"🇬🇧", es:"🇪🇸", fr:"🇫🇷", de:"🇩🇪", la:"🏛️", grc:"🏺"};

/* ---------- API base: ?bank=<allowlisted url> (persists) | off (this tab only) | reset  >  saved override  >  config ---------- */
function allowedApi(v){
  try{
    var u = new URL(v); if(u.username || u.password || u.search || u.hash) return null;
    if(HOSTS.indexOf(u.hostname) < 0) return null;
    var local = u.hostname === "localhost" || u.hostname === "127.0.0.1";
    if(u.protocol !== "https:" && !(local && u.protocol === "http:")) return null;
    return (u.origin + u.pathname).replace(/\/+$/,"");
  }catch(e){ return null; }
}
(function readOverride(){
  try{
    var q = new URLSearchParams(location.search).get("bank");
    if(q === "reset"){ localStorage.removeItem(API_KEY); sessionStorage.removeItem(OFF_KEY); }
    else if(q === "off") sessionStorage.setItem(OFF_KEY, "1");
    else if(q){ var ok = allowedApi(q); if(ok){ localStorage.setItem(API_KEY, ok); sessionStorage.removeItem(OFF_KEY); } else console.warn("Rootline: ignoring ?bank= (host not allowlisted)"); }
    var saved = localStorage.getItem(API_KEY);
    if(saved && !allowedApi(saved)) localStorage.removeItem(API_KEY);   /* clean up overrides saved by older builds / other hosts */
  }catch(e){}
})();
function apiBase(){
  try{
    if(sessionStorage.getItem(OFF_KEY)) return null;
    var v = localStorage.getItem(API_KEY);
    if(v && allowedApi(v)) return allowedApi(v);
  }catch(e){}
  return allowedApi(DEFAULT_API) || DEFAULT_API.replace(/\/+$/,"");
}

/* ---------- state (separate key: never touches rootline.v1 saves) ---------- */
function uuid(){
  if(window.crypto && crypto.randomUUID) return crypto.randomUUID();
  var b = new Uint8Array(16); (window.crypto||{getRandomValues:function(a){for(var i=0;i<a.length;i++)a[i]=Math.random()*256|0;return a;}}).getRandomValues(b);
  b[6]=(b[6]&15)|64; b[8]=(b[8]&63)|128; var h=[].map.call(b,function(x){return (x+256).toString(16).slice(1);}).join("");
  return h.slice(0,8)+"-"+h.slice(8,12)+"-"+h.slice(12,16)+"-"+h.slice(16,20)+"-"+h.slice(20);
}
var GATE0 = {min_days:2};
var bs = {queue:[], sent:0, rounds:0, xp:0, seen:{}, sprints:0, lastFlush:null,
  device:null, deal:[], dealDay:null, gate:GATE0, trust:{ok:false}, evKey:{}, checks:{}, practiced:0, practiceRight:0};
try{ var raw = localStorage.getItem(KEY); if(raw){ var o = JSON.parse(raw); for(var k in bs){ if(o[k]!==undefined) bs[k]=o[k]; } } }catch(e){}
if(bs.gate && bs.gate.min_accuracy !== undefined){ bs.gate = GATE0; bs.deal = []; bs.dealDay = null; bs.trust = {ok:false}; }   /* saved by an older build */
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(bs)); }catch(e){ /* quota: drop oldest queued */ bs.queue = bs.queue.slice(-500); bs.checks = {}; try{ localStorage.setItem(KEY, JSON.stringify(bs)); }catch(_){} } }
save();
var nfc = function(s){ return String(s).normalize("NFC").trim(); };
function pairKey(items){ return "pair|" + items.slice(0,2).map(function(i){ return i.lang+":"+nfc(i.text); }).sort().join("|"); }

/* ---------- seed bundle (lazy; cached by the service worker). Practice rounds carry no answers. ---------- */
var SEED = null, seedP = null;
function loadSeed(){
  if(SEED) return Promise.resolve(SEED);
  if(!seedP) seedP = fetch("bank-seed.json").then(function(r){ if(!r.ok) throw new Error("seed "+r.status); return r.json(); })
    .then(function(j){ j.seed.forEach(function(r){ r.kind = "shared_root"; r.practice = true; r.key = pairKey(r.items); }); SEED = j; return j; })
    .catch(function(e){ seedP = null; throw e; });
  return seedP;
}

/* ---------- warm-up status: the bank's word only (bs.trust from /v1/session, tallied every few hours). The game can't
   know more: the bank never says which rounds were its quiet checks, or how they went. ---------- */
function gateState(){
  var ok = !!(bs.trust && bs.trust.ok);
  return {ok: ok, bank: ok, minDays: (bs.gate && bs.gate.min_days) || 2};
}
function gateLine(){
  var G = gateState();
  if(G.ok) return "✓ Your votes count. They're tallied into the word bank every few hours.";
  return "Warming up: play a few sprints on "+G.minDays+" different days and your votes start counting. Some rounds are quiet checks; the bank never says which, so just give your honest best.";
}

/* ---------- session: one Turnstile check -> short-lived token from the bank ---------- */
var sess = null; try{ sess = JSON.parse(sessionStorage.getItem(SESS_KEY) || "null"); }catch(e){}
function utcDay(){ return Math.floor(Date.now() / 864e5); }
function sessionValid(){ return !!(sess && sess.token && sess.api === apiBase() && Date.parse(sess.exp) - Date.now() > 60e3); }
var tsP = null;
function loadTurnstile(){
  if(window.turnstile) return Promise.resolve(window.turnstile);
  if(tsP) return tsP;
  tsP = new Promise(function(res, rej){
    var s = document.createElement("script"); s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"; s.async = true;
    s.onload = function(){ window.turnstile ? res(window.turnstile) : rej(new Error("turnstile missing")); };
    s.onerror = function(){ tsP = null; rej(new Error("turnstile blocked")); };
    document.head.appendChild(s);
  });
  return tsP;
}
function needsHuman(){ return !!(apiBase() && SITEKEY && navigator.onLine !== false && !sessionValid()); }
var sessP = null, sessBackoff = 0;
/* never renders Turnstile itself: without a valid session it resolves null and answers stay queued until the player
   does the human check (humanCheck), which is always shown as an in-game card */
function ensureSession(){
  if(sessionValid()) return Promise.resolve(sess.token);
  return Promise.resolve(null);
}
function startSession(base, t){
  var dev = ""; try{ dev = localStorage.getItem(DEV_KEY) || ""; }catch(e){}
  return fetch(base + "/v1/session", {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({turnstile: t, device: dev})})
  .then(function(res){
    if(res.status === 429){ var ra = parseInt(res.headers.get("Retry-After"), 10); sessBackoff = Date.now() + (ra > 0 ? Math.min(ra, 3600) : 60) * 1000; throw new Error("busy"); }
    if(!res.ok) throw new Error(res.status === 403 ? "rejected" : "server");
    return res.json();
  }).then(function(j){
    sess = {token: j.session, exp: j.expires_at, api: base};
    try{ sessionStorage.setItem(SESS_KEY, JSON.stringify(sess)); localStorage.setItem(DEV_KEY, j.device); }catch(e){}
    bs.device = j.device_id;
    /* the deal (open rounds and quiet checks, indistinguishable), in the bank's order: served in exactly this order */
    bs.deal = (j.deal || []).map(function(d, i){ return {kind:"shared_root", dealt:true, pos:i, key:d.key, items:d.items}; });
    bs.gate = j.gate || bs.gate; bs.trust = {ok: !!(j.trust && j.trust.ok)}; bs.dealDay = utcDay(); save();
    return sess.token;
  });
}
/* ---------- the quick human check: an in-game card with the Turnstile widget in it ---------- */
var humanP = null;
function humanCheck(){
  if(sessionValid()) return Promise.resolve(sess.token);
  if(humanP) return humanP;
  var base = apiBase();
  if(!base || !SITEKEY) return Promise.resolve(null);
  humanP = new Promise(function(resolve){
    var esc = U().esc, wid = null, ts = null, settled = false;
    var ov = document.createElement("div"); ov.id = "wb-human"; ov.className = "wb-human"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true");
    ov.innerHTML = '<div class="card wb-human-card"><div class="wb-tag">🛡️ Quick human check</div>'+
      '<h3 style="margin:6px 0 4px">Quick human check so your answers count</h3>'+
      '<p class="muted small" style="margin:0 0 10px">Once per visit, Cloudflare checks that a person is playing. It\'s usually automatic; if a box appears, tick it. Nothing about you is stored.</p>'+
      '<div id="wb-ts" class="wb-ts-box"></div><p class="small wb-human-status" aria-live="polite"></p>'+
      '<div class="row wb-human-actions"></div></div>';
    document.body.appendChild(ov);
    var status = ov.querySelector(".wb-human-status"), actions = ov.querySelector(".wb-human-actions");
    function state(kind, msg){
      ov.setAttribute("data-state", kind);
      status.innerHTML = msg;
      actions.innerHTML = kind === "failed"
        ? '<button class="btn primary" data-hc="retry">Try again</button><button class="btn" data-hc="skip">Play without it</button>'
        : kind === "done" ? "" : '<button class="btn wb-small" data-hc="skip">Play without it for now</button>';
    }
    function finish(tok){
      if(settled) return; settled = true;
      try{ if(ts && wid !== null) ts.remove(wid); }catch(e){}
      if(tok){ state("done", "✓ Verified. Your answers count."); setTimeout(function(){ ov.remove(); }, 700); }
      else ov.remove();
      humanP = null; resolve(tok || null);
      if(tok) flush();
    }
    function fail(msg){ try{ if(ts && wid !== null) ts.remove(wid); }catch(e){} wid = null; state("failed", msg); }
    function run(){
      if(navigator.onLine === false){ fail("You're offline. Play on: your answers are saved here and count after the check, once you're online."); return; }
      if(Date.now() < sessBackoff){ fail("The word bank is busy. Try again in a minute, or play on: answers are saved and count after the check."); return; }
      state("pending", '<span class="wb-spin"></span> Checking this browser…');
      loadTurnstile().then(function(T){
        ts = T;
        var box = ov.querySelector("#wb-ts"); box.innerHTML = "";
        wid = T.render(box, { sitekey: SITEKEY, action: "rootline-session", appearance: "interaction-only", "refresh-expired": "auto",
          "before-interactive-callback": function(){ state("interactive", "Tick the box above to continue."); },
          "after-interactive-callback": function(){ state("pending", '<span class="wb-spin"></span> Checking…'); },
          callback: function(t){
            state("pending", '<span class="wb-spin"></span> Verified by Cloudflare. Connecting to the word bank…');
            startSession(base, t).then(finish).catch(function(e){
              fail(e.message === "rejected" ? "The word bank didn't accept this check. Try again."
                 : e.message === "busy" ? "The word bank is busy right now. Try again in a minute."
                 : "Couldn't reach the word bank. Try again, or play on: answers are saved and count later.");
            });
          },
          "error-callback": function(){ fail("The check didn't go through. Try again; if it keeps failing, play on and your answers count later."); return true; },
          "unsupported-callback": function(){ fail("This browser can't run the check. Play on: your answers are saved on this device."); },
          "timeout-callback": function(){ fail("The check timed out. Try again."); },
          "expired-callback": function(){} });
      }).catch(function(){ fail("Couldn't load the check (offline or blocked by an extension). Play on: answers are saved and count after the check."); });
    }
    ov.addEventListener("click", function(e){
      var b = e.target.closest("[data-hc]"); if(!b) return;
      if(b.getAttribute("data-hc") === "retry") run(); else finish(null);
    });
    run();
  });
  return humanP;
}

/* ---------- event queue ---------- */
function record(round, answer, meta){
  var r = round, ev = {
    id: uuid(), ts: new Date().toISOString(), game: "rootline", game_version: GAME_VERSION,
    kind: r.kind, items: r.items.map(function(i){ return {text:i.text, lang:i.lang}; }),
    answer: String(answer), confidence: confidence(meta.ms, meta.hint)
  };
  bs.queue.push(ev); if(bs.queue.length > QUEUE_MAX) bs.queue = bs.queue.slice(-QUEUE_MAX);
  bs.rounds++; bs.seen[r.key || r.id] = 1; if(r.kind === "shared_root") bs.seen[pairKey(r.items)] = 1;
  if(r.practice) bs.evKey[ev.id] = {key: r.key || pairKey(r.items)};
  save();
  if(bs.queue.length >= 10 || r.practice) flush();   /* practice rounds upload right away: the reply carries the answer */
  return ev;
}
/* confidence: instant taps and very slow answers count less; a hint counts less */
function confidence(ms, hint){
  var c = ms < 700 ? 0.4 : ms <= 12000 ? 1 : Math.max(0.5, 1 - (ms - 12000) / 40000);
  if(hint) c *= 0.7;
  return Math.round(c * 100) / 100;
}
var waiters = {};
/* the bank's reply carries answers for PRACTICE rounds only (public seed set); everything else is just "recorded" */
function applyChecks(list){
  (list || []).forEach(function(c){
    if(!c || !c.practice) return;
    delete bs.evKey[c.id];
    bs.checks[c.id] = c; bs.practiced++; if(c.correct === true) bs.practiceRight++;
    if(c.gloss) for(var gk in c.gloss) GL2[gk] = c.gloss[gk];
    if(waiters[c.id]){ waiters[c.id](c); delete waiters[c.id]; }
  });
  var ids = Object.keys(bs.checks); if(ids.length > 300) ids.slice(0, ids.length - 300).forEach(function(i){ delete bs.checks[i]; });
}
var flushing = false, backoff = 0;
function flush(keepalive){
  var base = apiBase();
  if(!base || flushing || !bs.queue.length) return Promise.resolve(false);
  if(navigator.onLine === false) return Promise.resolve(false);
  if(backoff && Date.now() < backoff) return Promise.resolve(false);
  flushing = true;
  return ensureSession().then(function(tok){
    if(!tok){ flushing = false; return false; }
    var batch = bs.queue.slice(0, BATCH), ids = {};
    batch.forEach(function(e){ ids[e.id] = 1; });
    return fetch(base + "/v1/results", {method:"POST", headers:{"Content-Type":"application/json", "Authorization":"Bearer " + tok},
        body: JSON.stringify({events: batch}), keepalive: !!keepalive})
      .then(function(res){
        if(res.status === 200){
          return res.json().catch(function(){ return {}; }).then(function(j){
            bs.queue = bs.queue.filter(function(e){ return !ids[e.id]; });   /* accepted, duplicate or invalid: never resend */
            applyChecks(j.checks);
            bs.sent += batch.length; bs.lastFlush = new Date().toISOString(); backoff = 0; save();
            flushing = false; if(bs.queue.length) return flush(keepalive); return true;
          });
        }
        if(res.status === 400 || res.status === 413){ bs.queue = bs.queue.filter(function(e){ return !ids[e.id]; }); save(); }
        else if(res.status === 401){ sess = null; try{ sessionStorage.removeItem(SESS_KEY); }catch(e){} }   /* expired: the next sprint asks for a new human check */
        else if(res.status === 429){ var ra = parseInt(res.headers.get("Retry-After"), 10); backoff = Date.now() + (ra > 0 ? Math.min(ra, 86400) : 600) * 1000; }
        else backoff = Date.now() + 60e3;
        flushing = false; return false;
      });
  }).catch(function(){ flushing = false; backoff = Date.now() + 30e3; return false; });
}
/* resolves with the bank's answer for one practice event, or null if it can't be checked right now (offline etc.) */
function waitCheck(id, ms){
  return new Promise(function(res){
    if(bs.checks[id]) return res(bs.checks[id]);
    var t = setTimeout(function(){ delete waiters[id]; res(null); }, ms);
    waiters[id] = function(c){ clearTimeout(t); res(c); };
    flush().then(function(ok){ if(!ok && waiters[id] && !flushing){ clearTimeout(t); delete waiters[id]; res(null); } });
  });
}
window.addEventListener("online", function(){ backoff = 0; sessBackoff = 0; flush(); });
document.addEventListener("visibilitychange", function(){ if(document.visibilityState === "hidden") flush(true); });
setInterval(function(){ if(bs.queue.length) flush(); }, 30000);
setTimeout(function(){ if(bs.queue.length) flush(); }, 1500);   /* uploads only with a session; never a background widget */

/* ---------- round picking ---------- */
function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function idOf(r){ return r.key || r.id; }
function pickFrom(list, n, pred){
  var fresh = list.filter(function(r){ return !bs.seen[idOf(r)] && (!pred || pred(r)); });
  if(fresh.length < n) fresh = fresh.concat(shuffle(list.filter(function(r){ return bs.seen[idOf(r)] && (!pred || pred(r)); })));
  return shuffle(fresh.slice(0, 400)).slice(0, n);
}
function buildSprint(){
  /* the bundle carries only public practice rounds (+ bridge / meaning rounds built from them). Every "same root?" round
     that isn't practice comes from this device's deal (open rounds + the bank's quiet checks, indistinguishable),
     strictly in the bank's order. */
  var S = SEED, more = S.open || [];
  var nPractice = 2, nBridge = 1, nSim = 1;
  var dealt = (bs.deal || []).filter(function(r){ return !bs.seen[r.key]; });
  var d = dealt.slice(0, SPRINT - nPractice - nBridge - nSim);
  var cards = [].concat(d,
    pickFrom(S.seed, nPractice),   /* practice: the bank shows the answer + explanation */
    pickFrom(more, nBridge, function(r){ return r.kind==="bridge_wording" && r.options && r.options.length; }),
    pickFrom(more, nSim, function(r){ return r.kind==="similarity_vote"; })
  );
  /* deal used up (or offline before the first session): more practice */
  cards = cards.concat(pickFrom(S.seed, Math.max(0, SPRINT - cards.length), function(r){ return !cards.some(function(c){ return c.key === r.key; }); }));
  cards = shuffle(cards);
  for(var i=0;i<cards.length;i++){ if(cards[i].practice){ var c=cards.splice(i,1)[0]; cards.unshift(c); break; } }   /* teach the format first */
  /* shuffled slots, but the dealt rounds keep their dealt order */
  var slots = [], inOrder = cards.filter(function(r, j){ if(r.dealt){ slots.push(j); return true; } return false; }).sort(function(x, y){ return x.pos - y.pos; });
  slots.forEach(function(j, k){ cards[j] = inOrder[k]; });
  return cards.slice(0, SPRINT);
}

/* ---------- UI ---------- */
var U = function(){ return window.ROOTLINE.ui; };
var B = null;   /* current sprint */
var GL2 = {};   /* meanings of practice words: they arrive with the bank's answer */
function gloss(it){ var k = it.lang+":"+it.text; return GL2[k] || (SEED && SEED.gloss[k]) || ""; }
function wordTile(it, showGloss, r){
  var g = gloss(it), pool = !(r && r.practice), RS = window.RLSay;
  return '<div class="wb-word"><span class="wb-lang">'+(FLAG[it.lang]||"")+' '+U().esc(LN[it.lang]||it.lang)+'</span><b class="sc'+(it.text.length>20?' xlong':it.text.length>14?' long':'')+'" lang="'+U().esc(it.lang)+'">'+U().esc(it.text)+'</b>'+(RS ? RS.btn(it.text, it.lang, {pool:pool}) + (it.lang==="grc" ? RS.help(it.text, "Ancient Greek", {hook:false}) : "") : "")+
    (showGloss && g ? '<i>“'+U().esc(g)+'”</i>' : '')+'</div>';
}
function srcLinks(c){
  if(!c || !c.sources || !c.sources.length) return "";
  return '<div class="wb-src">Source: '+c.sources.map(function(s){ var t=decodeURIComponent((String(s.url).match(/title=([^&]+)/)||[])[1]||"").replace(/_/g," ");
    return '<a href="'+U().esc(s.url)+'" target="_blank" rel="noopener">Wiktionary: '+U().esc(t)+'</a>'; }).join(" · ")+'</div>';
}
function explain(c, r){
  var cl = (c && c.claim) || {}, a = r.items[0], b = r.items[1], esc = U().esc;
  if(c && c.answer==="no" && cl.roots) return '<b>'+esc(a.text)+'</b> traces to '+LN["ine-pro"]+' <span class="sc">*'+esc(String(cl.roots[0]).replace(/^\*/,""))+'</span>; <b class="sc">'+esc(b.text)+'</b> to <span class="sc">*'+esc(String(cl.roots[1]).replace(/^\*/,""))+'</span>. Look-alikes, different roots.';
  if(cl.root) return 'Both trace back to '+esc(LN[cl.root_lang]||cl.root_lang)+' <b class="sc">'+esc(cl.root)+'</b>.';
  return "";
}
function verifyBtn(){ return '<div style="margin-top:8px"><button class="btn wb-small" data-act="wb-verify">🛡️ Do the human check</button></div>'; }
/* practice rounds only: the bank's answer + explanation + source */
/* practice rounds only: a word-origin story for an English word in the pair, once the answer is out */
function practiceStory(r){
  if(!r || !r.practice || !window.wordStoryHTML) return "";
  for(var i=0;i<r.items.length;i++){ if(r.items[i].lang === "en"){ var h = window.wordStoryHTML(r.items[i].text); if(h) return h; } }
  return "";
}
function checkFeedback(c, r, a, xp){
  var fb = checkFeedback0(c, r, a, xp);
  return (c && r && r.practice) ? fb + practiceStory(r) : fb;
}
function checkFeedback0(c, r, a, xp){
  if(c === undefined) return '<div class="feedback wb-checking"><b>Checking…</b></div>';
  if(!c){
    if(navigator.onLine === false) return '<div class="feedback"><b>Saved: answer shown when online.</b><br><span class="small">The answer and its source appear once you\'re connected.</span></div>';
    if(!sessionValid() && SITEKEY && apiBase()) return '<div class="feedback"><b>Saved on this device.</b><br><span class="small">Do the quick human check to see the answer here.</span>'+verifyBtn()+'</div>';
    return '<div class="feedback"><b>Saved: the bank is busy.</b><br><span class="small">Your answer uploads with your next ones.</span></div>';
  }
  var ans = c.answer === "yes";
  if(a === "unsure") return '<div class="feedback"><b>The answer: '+(ans?"same root":"not related")+'.</b><br>'+explain(c, r)+srcLinks(c)+'</div>';
  if(c.correct) return '<div class="feedback good"><b>Right! +'+xp+' XP</b><br>'+explain(c, r)+srcLinks(c)+'</div>';
  return '<div class="feedback bad"><b>Not quite: '+(ans?"they do share a root":"they only look alike")+'.</b><br>'+explain(c, r)+srcLinks(c)+'</div>';
}

function start(){
  var app = document.getElementById("app");
  app.innerHTML = U().topbar("Word Bank") + '<div class="card"><p class="muted" style="margin:0">Loading rounds…</p></div>';
  if(bs.dealDay !== utcDay()) sess = null;   /* the bank deals fresh check rounds every UTC day */
  /* the human check comes first (once per visit) so the sprint can use this device's deal; skipping it still plays */
  var gate = needsHuman() ? humanCheck() : Promise.resolve(null);
  Promise.all([loadSeed(), gate]).then(function(){
    B = {cards: buildSprint(), i: 0, xp: 0, right: 0, verified: 0, combo: 0, answered: null, t0: 0, hint: false, startRounds: bs.rounds};
    renderCard();
  }).catch(function(){
    app.innerHTML = U().topbar("Word Bank") + '<div class="card"><h3>Rounds unavailable</h3><p class="muted">Couldn\'t load the word list. Connect once to download it; after that, Word Bank works offline.</p><button class="btn primary" data-act="wb-start">Try again</button></div>';
  });
}
function progressBar(){ return '<div class="wb-prog"><div style="width:'+Math.round(100*B.i/B.cards.length)+'%"></div></div>'; }
function renderCard(){
  var app = document.getElementById("app"), r = B.cards[B.i], esc = U().esc;
  var right = '<span class="pill">'+(B.combo>=3?"🔥"+B.combo+" · ":"")+B.xp+' XP</span>';
  var h = U().topbar("Word Bank", right) + progressBar() + '<div class="card wb-card">';
  var done = B.answered !== null;
  if(r.kind==="shared_root" || r.kind==="not_related"){
    /* practice is labelled; open rounds and quiet checks share one look: same tag, no meanings (checks have none to show) */
    var mg = !r.dealt && (B.hint || done);
    h += '<div class="wb-tag">'+(r.practice?"📘 Practice round: the answer comes right after":"🌱 Your call: help the bank decide")+'</div>';
    h += '<p class="q" style="margin-top:4px">Do these two words share a root?</p><div class="wb-pair">'+wordTile(r.items[0], mg, r)+'<span class="wb-amp">&</span>'+wordTile(r.items[1], mg, r)+'</div>';
    if(!done){
      h += '<div class="wb-ans"><button class="btn wb-yes" data-act="wb-ans" data-a="yes">🌳 Same root</button><button class="btn wb-no" data-act="wb-ans" data-a="no">✂️ Not related</button></div>';
      h += '<div class="row" style="margin-top:10px">'+(B.hint||r.dealt?'':'<button class="btn wb-small" data-act="wb-hint">💡 Show meanings</button>')+'<button class="btn wb-small" data-act="wb-ans" data-a="unsure">🤷 Not sure</button></div>';
    } else h += feedback(r);
  } else if(r.kind==="similarity_vote"){
    h += '<div class="wb-tag">🌱 Open round: your judgement</div><p class="q" style="margin-top:4px">How close are their meanings?</p><div class="wb-pair">'+wordTile(r.items[0], true, r)+'<span class="wb-amp">≈</span>'+wordTile(r.items[1], true, r)+'</div>';
    if(!done){
      h += '<div class="wb-scale">'+[["3","Same"],["2","Close"],["1","Loosely"],["0","Different"]].map(function(x){ return '<button class="btn" data-act="wb-ans" data-a="'+x[0]+'">'+x[1]+'</button>'; }).join("")+'</div>';
    } else h += feedback(r);
  } else if(r.kind==="bridge_wording"){
    if(!B.opts) B.opts = shuffle(r.options || []).concat(["none of these"]);   /* fixed answer set: the bank only accepts these */
    h += '<div class="wb-tag">🌱 Open round: find the bridge</div><p class="q" style="margin-top:4px">These English words are cousins. Which word links their meanings?</p><div class="wb-pair">'+wordTile(r.items[0], true, r)+'<span class="wb-amp">↔</span>'+wordTile(r.items[1], true, r)+'</div>';
    if(!done){
      h += '<div class="opts">'+B.opts.map(function(o){ return '<button class="opt" data-act="wb-ans" data-a="'+esc(o==="none of these"?"none":o)+'"><span class="of">'+esc(o)+(o!=="none of these"&&window.RLSay?' '+RLSay.btn(o,"en",{pool:!r.practice}):'')+'</span></button>'; }).join("")+'</div>';
    } else h += feedback(r);
  }
  h += '</div>';
  app.innerHTML = h;
  if(!done){ B.t0 = performance.now(); }
}
function feedback(r){
  var h = "";
  if(r.practice) h += checkFeedback(B.check, r, B.answered, B.lastXp);
  else {
    var noSess = !sessionValid() && SITEKEY && apiBase() && navigator.onLine !== false;
    h += '<div class="feedback good"><b>Vote saved. +'+B.lastXp+' XP</b><br><span class="small">'+
      (noSess ? "Kept on this device: it goes to the word bank after the quick human check." :
       "Your vote joins other players' votes, tallied into the word bank every few hours.")+'</span>'+(noSess ? verifyBtn() : '')+'</div>';
  }
  h += '<div class="sep"></div><button class="btn primary" data-act="wb-next"'+(r.practice && B.check === undefined ? ' disabled' : '')+'>'+(B.i < B.cards.length-1 ? "Continue →" : "Finish sprint")+'</button>';
  return h;
}
function answer(a){
  if(!B || B.answered !== null) return;
  var r = B.cards[B.i], ms = performance.now() - B.t0, xp;
  if(r.practice){
    var ev = record(r, a, {ms: ms, hint: B.hint}), id = ev.id, hint = B.hint;
    B.answered = a; B.check = undefined; B.lastXp = 0; B.evId = id;
    if(!sessionValid() && navigator.onLine !== false){ B.check = null; B.lastXp = 1; B.xp += 1; bs.xp += 1; save(); renderCard(); return; }   /* no session: saved; answer after the human check */
    renderCard();
    waitCheck(id, 6000).then(function(c){
      if(!B || B.cards[B.i] !== r) return;
      B.check = c;
      if(c && c.correct === true){ B.right++; B.combo++; xp = hint ? 5 : 10; U().buzz(25); }
      else if(c && c.correct === false){ B.combo = 0; xp = 0; U().buzz([40,60,40]); }
      else xp = a === "unsure" ? 1 : 2;
      if(c && (c.correct === true || c.correct === false)) B.verified++;
      B.lastXp = xp; B.xp += xp; bs.xp += xp; save(); renderCard(); scrollFb();
    });
    return;
  }
  xp = a === "unsure" ? 1 : 5;
  B.lastXp = xp; B.xp += xp; bs.xp += xp;
  record(r, a, {ms: ms, hint: B.hint});
  B.answered = a; renderCard(); scrollFb();
}
function scrollFb(){ var fb = document.querySelector(".feedback"); if(fb && fb.getBoundingClientRect().bottom > innerHeight) fb.scrollIntoView({behavior:"smooth", block:"center"}); }
function next(){
  if(B.i < B.cards.length - 1){ B.i++; B.answered = null; B.check = undefined; B.hint = false; B.opts = null; renderCard(); window.scrollTo(0,0); return; }
  bs.sprints++; save(); renderDone();
}
function renderDone(){
  var n = bs.rounds - B.startRounds;
  var h = U().topbar("Word Bank") + '<div class="wordcard"><div class="tag">Sprint complete</div><div class="w" style="font-size:clamp(40px,10vw,64px)">+'+B.xp+' XP</div>'+
    '<div class="d">'+(B.verified ? B.right+' of '+B.verified+' practice rounds right · '+n+' answers saved' : n+' answers saved for the word bank')+'</div></div><div class="sep"></div>';
  h += helpedNote(n) + '<div class="sep"></div><div class="row"><button class="btn primary" data-act="wb-start">Another sprint →</button><button class="btn" data-act="home">Home</button></div>';
  document.getElementById("app").innerHTML = h; window.scrollTo(0,0);
  var refresh = function(){ var el = document.querySelector(".wb-note"); if(el && screenIs()) el.outerHTML = helpedNote(n); };
  flush().then(refresh); setTimeout(refresh, 4000);
}
function screenIs(){ var a = document.getElementById("app"); return a && a.querySelector(".wb-note") && a.innerHTML.indexOf("Sprint complete") >= 0; }
function helpedNote(n){
  var pending = bs.queue.length;
  return '<div class="wb-note">🌱 <b>Your rounds helped build the word bank.</b> '+(n!=null?n+' this sprint · ':'')+bs.rounds+' total'+
    (pending ? ' · '+pending+' waiting to upload'+(navigator.onLine===false?' (offline)':'') : '')+
    '<br><span class="small wb-gate">'+U().esc(gateLine())+'</span>'+
    '<br><span class="dim small">Each answer is saved anonymously to a shared word bank of related words that <a href="https://similarize.com" target="_blank" rel="noopener">Similarize</a> uses to suggest better wording.</span></div>';
}
function homeCard(){
  var h = '<div class="card wb-home"><h3>🌱 Word Bank</h3><p class="muted small" style="margin-top:0">Quick 10-card sprints: same root or look-alike? Every answer helps build a shared word bank.</p>'+
    '<button class="btn primary" data-act="wb-start">Start a sprint</button>';
  if(bs.rounds) h += '<p class="small" style="margin:10px 0 0;color:var(--gold2)">Your rounds helped build the word bank: '+bs.rounds+' rounds, '+bs.xp+' XP.</p>';
  h += '<p class="small dim wb-gate" style="margin:6px 0 0">'+U().esc(gateLine())+'</p>';
  return h + '</div>';
}

/* ---------- one quick helper round on the classic dig "done" screen (practice check; answer comes from the bank) ---------- */
function helperCard(word){
  var el = document.getElementById("wb-helper"); if(!el) return;
  loadSeed().then(function(){
    var mine = SEED.seed.filter(function(r){ return r.items[0].text === word.id && !bs.seen[r.key]; });
    var r = mine.length ? mine[Math.floor(Math.random()*mine.length)] : pickFrom(SEED.seed, 1)[0];
    if(!r) return;
    var t0 = performance.now(), esc = U().esc;
    el.innerHTML = '<div class="card wb-helper"><div class="wb-tag">⚡ Bonus helper round</div><p class="q" style="margin:4px 0 10px">Do <em class="sc">'+esc(r.items[0].text)+'</em> and <em class="sc">'+esc(r.items[1].text)+'</em> <span class="muted small">('+esc(LN[r.items[1].lang]||"")+')</span> share a root?</p>'+
      '<div class="row"><button class="btn" data-a="yes">🌳 Same root</button><button class="btn" data-a="no">✂️ Not related</button></div></div>';
    el.querySelectorAll("button[data-a]").forEach(function(b){ b.addEventListener("click", function(){
      var a = b.getAttribute("data-a"), ev = record(r, a, {ms: performance.now() - t0, hint: false});
      el.innerHTML = '<div class="card wb-helper">'+checkFeedback(undefined, r, a, 0)+'</div>';
      waitCheck(ev.id, 6000).then(function(c){ el.innerHTML = '<div class="card wb-helper">'+checkFeedback(c, r, a, c && c.correct ? 10 : 0)+helpedNote(null)+'</div>'; });
    }); });
  }).catch(function(){});
}

document.addEventListener("click", function(e){
  var el = e.target.closest("[data-act]"); if(!el) return;
  var a = el.getAttribute("data-act");
  if(a==="wb-start"){ window.ROOTLINE.ui.go("bank"); }
  else if(a==="wb-ans") answer(el.getAttribute("data-a"));
  else if(a==="wb-hint"){ if(B && B.answered===null){ B.hint = true; var t=B.t0; renderCard(); B.t0=t; } }
  else if(a==="wb-next"){ if(!el.disabled) next(); }
  else if(a==="wb-verify"){
    humanCheck().then(function(tok){
      if(!tok || !B || B.answered === null) return;
      var r = B.cards[B.i];
      if(!r.practice || !B.evId || B.check){ renderCard(); return; }
      var id = B.evId; B.check = undefined; renderCard();
      waitCheck(id, 8000).then(function(c){ if(!B || B.cards[B.i] !== r) return; B.check = c;
        if(c && (c.correct === true || c.correct === false)){ B.verified++; if(c.correct){ B.right++; } }
        renderCard(); });
    });
  }
});

window.RootlineBank = { start: start, homeCard: homeCard, helperCard: helperCard, flush: flush, apiBase: apiBase, ensureSession: ensureSession, humanCheck: humanCheck,
  gateLine: function(){ return gateLine(); },
  state: function(){ return bs; }, sprint: function(){ return B; }, seed: function(){ return SEED; }, confidence: confidence, gate: gateState,
  _test: { wordTile: wordTile, loadSeed: loadSeed, allowedApi: allowedApi, pairKey: pairKey, checkFeedback: checkFeedback } };
})();
