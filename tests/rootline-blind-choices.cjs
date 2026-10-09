const puppeteer = require(process.env.PUPPETEER_CORE||'puppeteer-core');
const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox']});
const ctx=await b.createBrowserContext();const p=await ctx.newPage();await p.setViewport({width:390,height:844,isMobile:true,hasTouch:true,deviceScaleFactor:2});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.evaluateOnNewDocument(()=>{window.__s=[];const s=window.speechSynthesis;s.getVoices=()=>[];s.speak=u=>__s.push(u.text);s.cancel=()=>{};window.Audio=function(src){__s.push('AUDIO '+src);return {play:()=>Promise.resolve()};};});
await p.setRequestInterception(true);
p.on('request', r => { if(r.url().endsWith('/app.js')){ const t=fs.readFileSync(require('path').join(__dirname,'../rootline/app.js'),'utf8').replace(/\}\)\(\);\s*$/, 'window.__t={startRound:startRound,renderRound:renderRound,R:function(){return R;},W:W,setScreen:function(x){screen=x;}};})();'); r.respond({status:200,contentType:'application/javascript',body:t}); } else r.continue(); });
await p.goto(process.argv[2],{waitUntil:'load'});await new Promise(r=>setTimeout(r,400));
const res=await p.evaluate(()=>{
  const T=window.__t; let layers=0, bad=[], helpAfter=0, sayClicks=0;
  // normalize: strip visible text + per-word attribute values, keep structure/classes/attributes
  const norm=el=>{ const c=el.cloneNode(true); c.querySelectorAll('*').forEach(n=>{ for(const a of [...n.attributes]) if(['data-say','data-sl','aria-label','data-i'].includes(a.name)) n.setAttribute(a.name,'X'); });
    c.setAttribute('data-i','X'); const w=document.createTreeWalker(c,NodeFilter.SHOW_TEXT); let t; while(t=w.nextNode()) t.nodeValue='T'; return c.outerHTML; };
  T.setScreen('round');
  for(const w of T.W){ T.startRound(w,false,'all'); const R=T.R(); R.stage='dig';
    for(let i=0;i<w.L.length;i++){ R.layer=i; R.results=w.L.slice(0,i).map(()=>true); R.opts=null; R.answered=false; T.renderRound(); layers++;
      const opts=[...document.querySelectorAll('.opt')]; const ok=R.opts.map(o=>o.ok);
      const forms=new Set(opts.map(norm));
      const hasHelp=opts.some(o=>o.querySelector('.xl,.xl-hook'));
      if(forms.size!==1||hasHelp) bad.push({w:w.id,layer:i,forms:forms.size,hasHelp,right:norm(opts[ok.indexOf(true)]).slice(0,200),wrong:norm(opts[ok.indexOf(false)]).slice(0,200)});
      R.answered=true; R.picked=0; T.renderRound(); if(document.querySelector('.opt .xl')) helpAfter++;
    } }
  return {layers,bad:bad.slice(0,3),nbad:bad.length,helpAfter};
});
const tile=await p.evaluate(()=>{const t=RootlineBank._test.wordTile;const it={text:'water',lang:'en'};
  const d=document.createElement('div');d.innerHTML=t(it,false,{practice:true})+t(it,false,{});document.body.appendChild(d);
  const s=[...d.querySelectorAll('.say')];window.__s=[];s[0].click();const a=window.__s.slice();window.__s=[];s[1].click();return {practiceRec:/title="Recording/.test(s[0].outerHTML),practice:a,bank:window.__s.slice(),bankRec:/Recording/.test(s[1].outerHTML)};});
const cfg=await p.evaluate(()=>['games.noveltie.com','rootline-game-staging.ben-e22.workers.dev','localhost','example.com'].map(h=>h+':'+ROOTLINE_BANK_CONFIG_FOR(h).env+' '+ROOTLINE_BANK_CONFIG_FOR(h).api));
const guru=await p.evaluate(()=>{const T=window.__t;const w=T.W.find(x=>x.id==='guru');T.startRound(w,true,'all');const R=T.R();R.stage='dig';R.layer=0;R.results=[];R.opts=null;R.answered=false;T.renderRound();return document.querySelectorAll('.opt .xl').length;});
if(process.env.SHOT) await p.screenshot({path:process.env.SHOT});
console.log(JSON.stringify({res,tile,cfg,guruHelpBefore:guru,errs},null,1));await b.close();})();
/* Usage: serve the repo root (python3 -m http.server 8732) and run
   PUPPETEER_CORE=/path/to/puppeteer-core node tests/rootline-blind-choices.cjs http://localhost:8732/rootline/
   Pass = res.nbad 0 over all 120 dig layers: before answering, every choice has identical markup once its own text
   is masked (no romanization/respelling/hook, no recording-only title), so the right choice can't be told apart. */
