/* Rootline "hear it" buttons + non-Latin script help.
   Audio order: (a) a real Wikimedia Commons recording (data in say-data.js), (b) the browser's free
   speechSynthesis in the word's language, (c) the romanization read by a nearby voice, or a short note.
   Never throws: every path is guarded, and a missing voice just shows a note. Rounds dealt by the bank
   (open rounds and quiet checks) pass pool:true, so they never fetch a per-word recording URL. */
(function(){
  var D = window.RL_SAY || {help:{}, audio:{}};
  var COMMONS = "https://upload.wikimedia.org/wikipedia/commons/";
  /* Rootline language label (or bank lang code) -> BCP-47 voice to look for */
  var TTS = {"English":"en-US","en":"en-US","Ancient Greek":"el-GR","Greek":"el-GR","Greek (modern coinage)":"el-GR","grc":"el-GR",
    "Russian":"ru-RU","Ukrainian":"uk-UA","Mongolian":"mn-MN","Arabic":"ar-SA","Arabic root":"ar-SA","Persian":"fa-IR",
    "Sanskrit":"hi-IN","Hindi":"hi-IN","Hebrew":"he-IL","Biblical Hebrew":"he-IL","Hebrew / Phoenician":"he-IL","Korean":"ko-KR","Japanese":"ja-JP",
    "Chinese":"zh-CN","Mandarin":"zh-CN","Cantonese":"zh-HK","Armenian":"hy-AM","Latin":"it-IT","la":"it-IT","Spanish":"es-ES","es":"es-ES",
    "French":"fr-FR","fr":"fr-FR","Old French":"fr-FR","Anglo-French":"fr-FR","German":"de-DE","de":"de-DE","Old High German":"de-DE",
    "Dutch":"nl-NL","Middle Dutch":"nl-NL","Italian":"it-IT","Portuguese":"pt-PT","Welsh":"cy-GB","Latvian":"lv-LV","Lithuanian":"lt-LT",
    "Polish":"pl-PL","Czech":"cs-CZ","Swedish":"sv-SE","Norwegian":"nb-NO","Danish":"da-DK","Icelandic":"is-IS","Old Norse":"is-IS","Turkish":"tr-TR",
    "Ottoman Turkish":"tr-TR","Irish":"ga-IE","Finnish":"fi-FI","Hungarian":"hu-HU","Malay":"ms-MY","Indonesian":"id-ID","Swahili":"sw-KE"};
  /* languages whose native script a voice of that code can't read: speak the romanization instead */
  var ROM_ONLY = {"Hokkien":1,"Hokkien (Min Chinese)":1,"Middle Chinese":1,"Coptic":1};
  function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];}); }
  /* bank rounds use codes (en, grc, la...); recordings and help are keyed by language names */
  var NAME = {en:"English", grc:"Ancient Greek", la:"Latin", es:"Spanish", fr:"French", de:"German", el:"Greek", ru:"Russian", sa:"Sanskrit", hi:"Hindi"};
  function langName(l){ return NAME[l] || l; }
  function key(t, l){ return String(t)+"|"+String(langName(l)); }
  function info(t, l){ return D.help[key(t,l)] || null; }
  function voices(){ try{ return (window.speechSynthesis && speechSynthesis.getVoices()) || []; }catch(_){ return []; } }
  try{ if(window.speechSynthesis && "onvoiceschanged" in speechSynthesis) speechSynthesis.addEventListener("voiceschanged", function(){}); voices(); }catch(_){}
  function pickVoice(code){
    var vs = voices(); if(!vs.length || !code) return null;
    code = code.toLowerCase(); var pre = code.split("-")[0], best = null;
    for(var i=0;i<vs.length;i++){ var vl = String(vs[i].lang||"").toLowerCase().replace("_","-");
      if(vl === code) return vs[i]; if(!best && vl.split("-")[0] === pre) best = vs[i]; }
    return best;
  }
  function note(msg){
    try{ var t = document.getElementById("say-note"); if(!t){ t = document.createElement("div"); t.id="say-note"; t.setAttribute("role","status"); document.body.appendChild(t); }
      t.textContent = msg; t.className = "show"; clearTimeout(note._t); note._t = setTimeout(function(){ t.className = ""; }, 2600); }catch(_){}
  }
  function creditHTML(a){
    return 'Recording: '+esc(a[2]||"unknown author (public domain)")+' · '+esc(a[1])+' · <a href="https://commons.wikimedia.org/wiki/'+esc(a[3]||"")+'" target="_blank" rel="noopener">ⓘ Commons</a>';
  }
  function credit(a){
    try{ var t = document.getElementById("say-credit"); if(!t){ t = document.createElement("div"); t.id="say-credit"; document.body.appendChild(t); }
      t.innerHTML = creditHTML(a); t.className = "show"; clearTimeout(credit._t); credit._t = setTimeout(function(){ t.className = ""; }, 5000); }catch(_){}
  }
  function speak(text, code, label){
    try{
      if(!window.speechSynthesis || typeof SpeechSynthesisUtterance === "undefined"){ note("This browser can't speak words aloud."); return false; }
      var u = new SpeechSynthesisUtterance(text), v = pickVoice(code);
      if(code) u.lang = code;
      if(v){ try{ u.voice = v; u.lang = v.lang; }catch(_){} }
      u.rate = 0.85; u.onerror = function(){ note("Couldn't play that one on this device."); };
      speechSynthesis.cancel(); speechSynthesis.speak(u); return true;
    }catch(_){ note("Couldn't play that one on this device."); return false; }
  }
  function say(text, lang, pool){
    lang = langName(lang);
    var h = info(text, lang), tr = h && h.tr, code = TTS[lang] || (lang && /^[a-z]{2,3}$/.test(lang) ? lang : null);
    var native = String(text).replace(/^\*/, "");
    function tts(){
      if(ROM_ONLY[lang] || (h && h.sc === "PROTO")){ var r = (tr||native).replace(/[*₁₂₃ʰʷ]/g,"");
        speak(r, "en-US"); if(h && h.sc === "PROTO") note("Reconstructed word: this is a best guess at the sound."); else note("Reading the romanization."); return; }
      var hasVoices = voices().length > 0, v = pickVoice(code);
      if(v || !hasVoices){ speak(native, code); return; }          /* voices may still be loading: let the browser pick */
      if(tr){ speak(tr, "en-US"); note("No "+lang+" voice on this device, so this reads the romanization."); return; }
      speak(native, code);
    }
    var a = !pool && D.audio[key(text, lang)];
    if(a){
      try{ var au = new Audio(COMMONS + a[0]); var p = au.play(); credit(a); if(p && p.catch) p.catch(function(){ tts(); }); au.onerror = function(){ tts(); }; return; }catch(_){}
    }
    tts();
  }
  /* 🔊 button: a span (it often sits inside another button). pool:true = never fetch a recording. */
  function btn(text, lang, opts){
    if(text == null || text === "" || text === "?") return "";
    opts = opts || {};
    var noRec = opts.pool || opts.blind;   /* blind: an unanswered choice; same markup for every choice, device voice only */
    var a = !noRec && D.audio[key(text, lang)];
    return '<span class="say" role="button" tabindex="0" aria-label="Hear '+esc(text)+'" data-say="'+esc(text)+'" data-sl="'+esc(lang||"")+'"'+(noRec?' data-pool="1"':'')+
      ' title="'+(a ? esc("Recording: "+(a[2]||"public domain")+", "+a[1]+" (Wikimedia Commons). Tap to hear; credit link appears below.") : "Hear it (device voice)")+'">🔊</span>';
  }
  /* romanization · respelling, and (when hook:true) the memory hook */
  function help(text, lang, opts){
    var h = info(text, lang); if(!h) return "";
    opts = opts || {};
    var s = '<span class="xl"><span class="xl-tr">'+esc(h.tr)+'</span>'+(h.rs ? ' · say <b>'+esc(h.rs)+'</b>' : '')+'</span>';
    if(opts.hook !== false && h.hook) s += '<span class="xl-hook">💡 '+esc(h.hook)+'</span>';
    if(opts.hook !== false && h.note) s += '<span class="xl-note">'+esc(h.note)+'</span>';
    return '<span class="xlw">'+s+'</span>';
  }
  function creditsHTML(){
    var ks = Object.keys(D.audio).sort(), h = '<h3>Audio credits</h3><p class="muted small" style="margin-top:0">Recordings from Wikimedia Commons, used under their licenses. Words without a recording use your device\'s voice.</p><ul class="credits">';
    ks.forEach(function(k){ var a = D.audio[k], p = k.split("|"); h += '<li><b>'+esc(p[0])+'</b> <span class="dim small">'+esc(p[1])+'</span>: '+creditHTML(a)+'</li>'; });
    return h + '</ul><div class="row"><button class="btn" data-act="close">Close</button></div>';
  }
  function handle(e){
    var el = e.target && e.target.closest ? e.target.closest(".say") : null; if(!el) return;
    if(e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    try{ say(el.getAttribute("data-say"), el.getAttribute("data-sl"), el.getAttribute("data-pool") === "1"); }catch(_){}
  }
  document.addEventListener("click", handle, true);
  document.addEventListener("keydown", handle, true);
  window.RLSay = {btn:btn, help:help, say:say, info:info, creditsHTML:creditsHTML};
})();
