/* Rootline Script Gates: letter tables + trial words. */
(function(){
var G = {};

/* ── Greek ── */
var greek = {
 "α":["alpha","a"], "β":["beta","b (modern: v)"], "γ":["gamma","g (modern: gh / y before e, i)"], "δ":["delta","d (modern: th as in 'this')"],
 "ε":["epsilon","e (short)"], "ζ":["zeta","z (ancient: zd)"], "η":["eta","ē, long e (modern: i)"], "θ":["theta","th (as in 'thin')"],
 "ι":["iota","i"], "κ":["kappa","k"], "λ":["lambda","l"], "μ":["mu","m"], "ν":["nu","n"], "ξ":["xi","x (ks)"], "ο":["omicron","o (short)"],
 "π":["pi","p"], "ρ":["rho","r (rh at the start of a word)"], "σ":["sigma","s"], "ς":["final sigma","s (end of word)"], "τ":["tau","t"],
 "υ":["upsilon","y / u (modern: i)"], "φ":["phi","ph / f"], "χ":["chi","kh, as in Scottish 'loch'"], "ψ":["psi","ps"], "ω":["omega","ō, long o"]
};
var greekMarks = {"\u0301":"acute accent: stressed syllable","\u0300":"grave accent: stress","\u0342":"circumflex: stressed (ancient: rising-falling pitch)",
 "\u0314":"rough breathing ( ῾ ): add an h sound before the vowel","\u0313":"smooth breathing ( ᾿ ): no h sound","\u0345":"iota subscript: a silent i","\u0308":"diaeresis: say the vowel separately"};
G.greek = {
 id:"greek", name:"Greek", native:"Ελληνικά", lang:"el-GR", order:1, ready:true,
 blurb:"The Greek alphabet (c. 800 BC) was adapted from Phoenician, and was the first to write vowels. Latin, Cyrillic and Coptic letters all descend from it.",
 info:function(ch){
   var d = ch.normalize("NFD"), base = d[0].toLowerCase(), marks = d.slice(1);
   var e = greek[base]; if(!e) return null;
   var notes = []; for(var i=0;i<marks.length;i++){ if(greekMarks[marks[i]]) notes.push(greekMarks[marks[i]]); }
   return {ch:ch, name:e[0], sound:e[1], notes:notes};
 },
 table:function(){ return Object.keys(greek).filter(function(k){return k!=="ς";}).map(function(k){ return {ch:k.toUpperCase()+" "+k, name:greek[k][0], sound:greek[k][1]}; }); },
 tips:["Tip: ου is said 'oo'; αι 'e'; ει and οι 'ee' in modern Greek.","Tip: modern μπ = b and ντ = d (ντομάτα = domáta)."],
 trial:[
  ["δράμα","drama"],["κόσμος","cosmos"],["ψυχή","psyche"],["χάος","chaos"],["Ζεύς","Zeus"],["Ὅμηρος","Homer"],
  ["νέκταρ","nectar"],["θέατρο","theatre"],["μουσική","music"],["Πλάτων","Plato"],["κρίσις","crisis"],["ἦθος","ethos"],
  ["Σωκράτης","Socrates"],["ἀθλητής","athlete"],["ὀρχήστρα","orchestra"],["ἰδέα","idea"],["ἄτομος","atom"],["κάμηλος","camel"]
 ],
 prompt:"Sound it out: which English word comes from this Greek?"
};

/* ── Cyrillic ── */
var cyr = {
 "а":["a","a, as in 'father'"],"б":["be","b"],"в":["ve","v (looks like B!)"],"г":["ge","g (Ukrainian: h)"],"д":["de","d"],"е":["ye","ye / e"],
 "ё":["yo","yo"],"ж":["zhe","zh, like s in 'measure'"],"з":["ze","z"],"и":["i","ee (Ukrainian: short y)"],"й":["short i","y, as in 'boy'"],
 "к":["ka","k"],"л":["el","l"],"м":["em","m"],"н":["en","n (looks like H!)"],"о":["o","o"],"п":["pe","p (from Greek π)"],"р":["er","r (looks like P!)"],
 "с":["es","s (looks like C!)"],"т":["te","t"],"у":["u","oo (looks like y!)"],"ф":["ef","f (from Greek φ)"],"х":["kha","kh (looks like X!)"],
 "ц":["tse","ts"],"ч":["che","ch"],"ш":["sha","sh"],"щ":["shcha","shch (a long soft sh)"],"ъ":["hard sign","silent: keeps sounds apart"],
 "ы":["yery","a deep 'i', between i and u"],"ь":["soft sign","silent: softens the consonant before ( ' )"],"э":["e","e, as in 'met'"],
 "ю":["yu","yu"],"я":["ya","ya"],"і":["i (Ukrainian)","ee"],"ї":["yi (Ukrainian)","yee"],"є":["ye (Ukrainian)","ye"],"ґ":["ge (Ukrainian)","g"]
};
G.cyrillic = {
 id:"cyrillic", name:"Cyrillic", native:"Кириллица", lang:"ru-RU", order:2, ready:true,
 blurb:"Created in the 9th–10th centuries in the First Bulgarian Empire, named for St. Cyril. Most letters come from Greek; a few (ш, ж, ц) were added for Slavic sounds. Used for Russian, Ukrainian, Bulgarian, Serbian, Kazakh and more.",
 info:function(ch){ var b=ch.normalize("NFD"); var base=b[0].toLowerCase(); if(ch.toLowerCase()==="й"||ch.toLowerCase()==="ё"||ch.toLowerCase()==="ї") base=ch.toLowerCase();
   var e=cyr[base]; if(!e) return null; return {ch:ch,name:e[0],sound:e[1],notes:b.length>1&&base!==ch.toLowerCase()?["accent mark: shows stress"]:[]}; },
 table:function(){ return Object.keys(cyr).filter(function(k){return "іїєґ".indexOf(k)<0;}).map(function(k){ return {ch:k.toUpperCase()+" "+k,name:cyr[k][0],sound:cyr[k][1]}; }); },
 tips:["False friends: В=v, Н=n, Р=r, С=s, У=u, Х=kh.","Tip: a final -ь is written ' in transliteration: соль = sol'."],
 trial:[
  ["Москва","Moskva (Moscow)"],["ресторан","restoran (restaurant)"],["такси","taksi (taxi)"],["парк","park (park)"],["спутник","sputnik (satellite)"],
  ["водка","vodka (vodka)"],["балет","balet (ballet)"],["космос","kosmos (outer space)"],["телефон","telefon (telephone)"],["Пушкин","Pushkin (the poet)"],
  ["борщ","borshch (beet soup)"],["царь","tsar' (tsar)"],["шахматы","shakhmaty (chess)"],["футбол","futbol (football)"],["жираф","zhiraf (giraffe)"],["хоккей","khokkey (hockey)"]
 ],
 prompt:"Sound it out: how is this read?"
};

/* ── Hangul ── */
var L = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ".split("");
var Lr = ["g","kk","n","d","tt","r","m","b","pp","s","ss","(silent)","j","jj","ch","k","t","p","h"];
var V = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ".split("");
var Vr = ["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"];
var T = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
var Tr = ["","k","k","k","n","n","n","t","l","k","m","l","l","l","p","l","m","p","p","t","t","ng","t","t","k","t","p","t"];
var jamoNames = {"ㄱ":"giyeok","ㄴ":"nieun","ㄷ":"digeut","ㄹ":"rieul","ㅁ":"mieum","ㅂ":"bieup","ㅅ":"siot","ㅇ":"ieung","ㅈ":"jieut","ㅊ":"chieut","ㅋ":"kieuk","ㅌ":"tieut","ㅍ":"pieup","ㅎ":"hieut"};
var jamoShape = {"ㄱ":"the tongue's back touching the soft palate","ㄴ":"the tongue tip touching the gum ridge","ㅁ":"the closed mouth","ㅅ":"a tooth","ㅇ":"the open throat",
 "ㅏ":"• beside the vertical stroke (person, with heaven • outside)","ㅗ":"heaven • above the earth stroke","ㅡ":"flat earth","ㅣ":"a standing person"};
function hangulInfo(ch){
  var c = ch.charCodeAt(0);
  if(c>=0xAC00 && c<=0xD7A3){
    var s=c-0xAC00, li=Math.floor(s/588), vi=Math.floor((s%588)/28), ti=s%28;
    var parts=[{j:L[li],r:Lr[li],role:"initial"},{j:V[vi],r:Vr[vi],role:"vowel"}];
    if(ti) parts.push({j:T[ti],r:Tr[ti],role:"final"});
    var rom=(Lr[li]==="(silent)"?"":Lr[li])+Vr[vi]+Tr[ti];
    return {ch:ch, name:"syllable block", sound:rom, parts:parts, notes:["Hangul packs letters into syllable blocks: initial + vowel (+ final). Sounds can shift between blocks in speech."]};
  }
  var i=L.indexOf(ch); if(i>=0) return {ch:ch,name:jamoNames[ch]||"consonant",sound:Lr[i],notes:jamoShape[ch]?["Shape: "+jamoShape[ch]]:[]};
  i=V.indexOf(ch); if(i>=0) return {ch:ch,name:"vowel",sound:Vr[i],notes:jamoShape[ch]?["Shape: "+jamoShape[ch]]:[]};
  return null;
}
G.hangul = {
 id:"hangul", name:"Hangul", native:"한글", lang:"ko-KR", order:3, ready:true,
 blurb:"Invented in 1443 under King Sejong the Great. Consonant shapes sketch the mouth and tongue making each sound; vowels are built from heaven (•), earth (ㅡ) and person (ㅣ). Letters stack into syllable blocks.",
 info:hangulInfo,
 table:function(){
   var basicC="ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ".split(""), basicV="ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣㅐㅔ".split("");
   return basicC.map(function(j){var r=hangulInfo(j);return {ch:j,name:r.name,sound:r.sound};}).concat(basicV.map(function(j){var r=hangulInfo(j);return {ch:j,name:"vowel",sound:r.sound};}));
 },
 tips:["Tap a block to split it into letters: 한 = ㅎ h + ㅏ a + ㄴ n.","ㅇ is silent at the start of a block, 'ng' at the end."],
 trial:[
  ["커피","keopi (coffee)"],["피자","pija (pizza)"],["바나나","banana (banana)"],["컴퓨터","keompyuteo (computer)"],["택시","taeksi (taxi)"],["서울","Seoul (the capital)"],
  ["김치","gimchi (kimchi)"],["한글","Hangeul (the alphabet)"],["라디오","radio (radio)"],["버스","beoseu (bus)"],["아이스크림","aiseukeurim (ice cream)"],
  ["호텔","hotel (hotel)"],["토마토","tomato (tomato)"],["카메라","kamera (camera)"],["오렌지","orenji (orange)"]
 ],
 prompt:"Sound it out: how is this read?"
};

/* ── Coming soon ── */
G.kana = {id:"kana", name:"Japanese kana", native:"かな", order:4, ready:false, lang:"ja-JP",
 blurb:"Two syllabaries, hiragana and katakana, simplified from Chinese characters in the Heian period (c. 800s–900s). Katakana spells loanwords: コーヒー kōhī 'coffee'."};
G.hanzi = {id:"hanzi", name:"Chinese characters", native:"汉字", order:5, ready:false, lang:"zh-CN",
 blurb:"In continuous use for over 3,000 years, since the oracle bones. Many began as pictures: 日 sun, 月 moon, 木 tree, 山 mountain."};
G.arabic = {id:"arabic", name:"Arabic", native:"العربية", order:6, ready:false, lang:"ar",
 blurb:"Written right to left, descended from Aramaic via Nabataean. Letters join and change shape by position; short vowels are usually left unwritten."};
G.hebrew = {id:"hebrew", name:"Hebrew", native:"עברית", order:7, ready:false, lang:"he-IL",
 blurb:"The square Hebrew script grew from Aramaic. 22 letters, right to left. Its letter names (alef, bet, gimel…) are cousins of Greek alpha, beta, gamma."};
G.egyptian = {id:"egyptian", name:"Egyptian hieroglyphs", native:"mdw nṯr", order:8, ready:false, lang:"",
 blurb:"About 24 'uniliteral' signs each stood for one consonant: a reed leaf for i, a foot for b, a bread loaf for t. Champollion cracked them in 1822 using the Rosetta Stone."};

G.order = ["greek","cyrillic","hangul","kana","hanzi","arabic","hebrew","egyptian"];

G.detect = function(str){
  for(var i=0;i<str.length;i++){
    var c=str.charCodeAt(i);
    if((c>=0x370&&c<=0x3FF&&!(c>=0x3E2&&c<=0x3EF))||(c>=0x1F00&&c<=0x1FFF)) return "greek";
    if(c>=0x400&&c<=0x4FF) return "cyrillic";
    if((c>=0xAC00&&c<=0xD7A3)||(c>=0x3131&&c<=0x318E)) return "hangul";
    if(c>=0x3040&&c<=0x30FF) return "kana";
    if(c>=0x4E00&&c<=0x9FFF) return "hanzi";
    if(c>=0x600&&c<=0x6FF) return "arabic";
    if(c>=0x590&&c<=0x5FF) return "hebrew";
    if(c>=0x900&&c<=0x97F) return "devanagari";
    if((c>=0x2C80&&c<=0x2CFF)||(c>=0x3E2&&c<=0x3EF)) return "coptic";
    if(c>=0x530&&c<=0x58F) return "armenian";
  }
  return "latin";
};
G.otherNames = {devanagari:"Devanagari", coptic:"Coptic", armenian:"Armenian", latin:"Latin"};
window.ROOTLINE_SCRIPTS = G;
})();
