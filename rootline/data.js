/* Rootline word data. Hand-curated; etymologies follow mainstream references
   (Etymonline, Wiktionary, American Heritage IE roots). Uncertain links are
   marked "possibly" / "disputed" in the text.
   Layer: f=form, l=language, g=gloss, why=one-line explanation,
          x=[[lang, form, gloss], ...] three distractors.
   Cognates: l=language, r=region, n=native script, t=transliteration, g=gloss.
   Regions: am (Americas), we (W. Europe), ne (N. Europe), ee (E. Europe),
            me (Mediterranean), af (Africa), mi (Middle East), sa (South Asia), ea (East Asia) */
window.ROOTLINE_WORDS = [
/* ───────────── CORE (Indo-European) ───────────── */
{id:"salary", w:"salary", def:"fixed regular pay for work", track:"roots",
 root:{k:"pie-sal", f:"*sal-", l:"Proto-Indo-European", g:"salt"},
 L:[
  {f:"salarium", l:"Latin", g:"a stipend; 'salt money'", why:"Via Anglo-French salarie from Latin salarium, a Roman allowance. The 'paid in salt' story is traditional; the exact link to salt is debated.",
   x:[["Latin","solidus","a gold coin (→ soldier)"],["Old English","sǣl","happiness (→ silly)"],["Latin","solarium","sundial; sunny terrace"]]},
  {f:"sal", l:"Latin", g:"salt", why:"salarium is built on sal, salt, with the suffix -arium.",
   x:[["Latin","sol","sun"],["Latin","salire","to leap (→ salient)"],["Latin","salvus","safe, whole (→ save)"]]},
  {f:"*sal-", l:"Proto-Indo-European", g:"salt", why:"Latin sal, Greek hals and English salt all go back to PIE *sal-.",
   x:[["Proto-Indo-European","*sh₂wol-","sun"],["Proto-Indo-European","*sel-","to jump"],["Proto-Indo-European","*solh₂-","whole"]]}
 ],
 C:[
  {l:"Spanish", r:"we", n:"sal", g:"salt"},
  {l:"French", r:"we", n:"sel", g:"salt"},
  {l:"German", r:"ne", n:"Salz", g:"salt"},
  {l:"Welsh", r:"ne", n:"halen", g:"salt"},
  {l:"Russian", r:"ee", n:"соль", t:"sol'", g:"salt"},
  {l:"Ukrainian", r:"ee", n:"сіль", t:"sil'", g:"salt"},
  {l:"Ancient Greek", r:"me", n:"ἅλς", t:"háls", g:"salt; the sea"},
  {l:"Latvian", r:"ee", n:"sāls", g:"salt"}
 ],
 B:{p:"Which English words also come from Latin sal 'salt'?", y:["saline","salad","salami","sauce"],
  n:[["solar","Latin sol 'sun'"],["salient","Latin salire 'to leap'"],["salute","Latin salus 'health'"]]}},

{id:"mother", w:"mother", def:"a female parent", track:"roots",
 root:{k:"pie-mehter", f:"*méh₂tēr", l:"Proto-Indo-European", g:"mother"},
 L:[
  {f:"mōdor", l:"Old English", g:"mother", why:"Modern mother is the regular descendant of Old English mōdor.",
   x:[["Latin","māter","mother (a cousin, not a parent!)"],["Old English","mōd","mind, spirit (→ mood)"],["Old French","mere","mother"]]},
  {f:"*mōdēr", l:"Proto-Germanic", g:"mother", why:"Old English inherited it from Proto-Germanic *mōdēr (German Mutter, Dutch moeder).",
   x:[["Proto-Germanic","*mōdaz","courage, mood"],["Latin","mātrix","womb, breeding animal"],["Ancient Greek","mḗtēr","mother (a cousin)"]]},
  {f:"*méh₂tēr", l:"Proto-Indo-European", g:"mother", why:"PIE *méh₂tēr is probably baby-talk *mā- plus the kinship suffix -ter (as in father, brother).",
   x:[["Proto-Indo-European","*ph₂tḗr","father"],["Proto-Indo-European","*bʰréh₂tēr","brother"],["Proto-Indo-European","*meh₁-","to measure"]]}
 ],
 C:[
  {l:"German", r:"ne", n:"Mutter", g:"mother"},
  {l:"Latin", r:"me", n:"māter", g:"mother"},
  {l:"Spanish", r:"we", n:"madre", g:"mother"},
  {l:"Irish", r:"ne", n:"máthair", g:"mother"},
  {l:"Ancient Greek", r:"me", n:"μήτηρ", t:"mḗtēr", g:"mother"},
  {l:"Russian", r:"ee", n:"мать", t:"mat'", g:"mother"},
  {l:"Persian", r:"mi", n:"مادر", t:"mâdar", g:"mother"},
  {l:"Sanskrit", r:"sa", n:"मातृ", t:"mātṛ", g:"mother"}
 ],
 B:{p:"Which English words share this root (via Latin māter / Greek mḗtēr)?", y:["maternal","matriarch","metropolis","matrix"],
  n:[["mattress","Arabic maṭraḥ 'cushion'"],["matinee","Latin matutinus 'of the morning'"],["mortal","Latin mors 'death'"]]}},

{id:"night", w:"night", def:"the dark hours between sunset and sunrise", track:"roots",
 root:{k:"pie-nekwt", f:"*nókʷts", l:"Proto-Indo-European", g:"night"},
 L:[
  {f:"niht", l:"Old English", g:"night", why:"The silent gh in night is the ghost of the h sound in Old English niht.",
   x:[["Old English","nēah","near (→ nigh)"],["Latin","nox","night (a cousin)"],["Old English","nīþ","malice, hatred"]]},
  {f:"*nahts", l:"Proto-Germanic", g:"night", why:"Proto-Germanic *nahts also gave German Nacht and Gothic nahts.",
   x:[["Proto-Germanic","*nēhw","near"],["Proto-Germanic","*naglaz","nail"],["Latin","noctis","of night"]]},
  {f:"*nókʷts", l:"Proto-Indo-European", g:"night", why:"PIE *nókʷts underlies Latin nox, Greek nyx, Sanskrit nakta and Russian noch'.",
   x:[["Proto-Indo-European","*néwos","new"],["Proto-Indo-European","*h₁nómn̥","name"],["Proto-Indo-European","*néh₂s","nose"]]}
 ],
 C:[
  {l:"German", r:"ne", n:"Nacht", g:"night"},
  {l:"Spanish", r:"we", n:"noche", g:"night"},
  {l:"French", r:"we", n:"nuit", g:"night"},
  {l:"Latin", r:"me", n:"nox", g:"night"},
  {l:"Greek", r:"me", n:"νύχτα", t:"níchta", g:"night"},
  {l:"Ancient Greek", r:"me", n:"νύξ", t:"nýx", g:"night"},
  {l:"Russian", r:"ee", n:"ночь", t:"noch'", g:"night"},
  {l:"Ukrainian", r:"ee", n:"ніч", t:"nich", g:"night"},
  {l:"Lithuanian", r:"ee", n:"naktis", g:"night"},
  {l:"Sanskrit", r:"sa", n:"नक्त", t:"nakta", g:"night"}
 ],
 B:{p:"Which English words come from Latin nox, noctis 'night'?", y:["nocturnal","equinox","nocturne"],
  n:[["notice","Latin notus 'known'"],["nostalgia","Greek nostos 'homecoming'"],["nickname","Middle English an ekename 'an added name'"]]}},

{id:"star", w:"star", def:"a luminous point in the night sky", track:"roots",
 root:{k:"pie-hster", f:"*h₂stḗr", l:"Proto-Indo-European", g:"star"},
 L:[
  {f:"steorra", l:"Old English", g:"star", why:"Old English steorra became Middle English sterre, then star.",
   x:[["Old English","stēor","rudder (→ steer)"],["Latin","stella","star (a cousin)"],["Old English","styrne","severe (→ stern)"]]},
  {f:"*sternǭ", l:"Proto-Germanic", g:"star", why:"Proto-Germanic *sternǭ also gave German Stern and Dutch ster.",
   x:[["Proto-Germanic","*staraną","to stare"],["Proto-Germanic","*sterbaną","to die (→ starve)"],["Latin","astrum","star, constellation"]]},
  {f:"*h₂stḗr", l:"Proto-Indo-European", g:"star", why:"PIE *h₂stḗr gave Greek astēr, Latin stella, Persian setâre and Sanskrit stṛ-.",
   x:[["Proto-Indo-European","*steh₂-","to stand"],["Proto-Indo-European","*h₂ewsōs","dawn"],["Proto-Indo-European","*dyēws","sky, sky-god"]]}
 ],
 C:[
  {l:"German", r:"ne", n:"Stern", g:"star"},
  {l:"Welsh", r:"ne", n:"seren", g:"star"},
  {l:"Latin", r:"me", n:"stella", g:"star"},
  {l:"Spanish", r:"we", n:"estrella", g:"star"},
  {l:"Ancient Greek", r:"me", n:"ἀστήρ", t:"astḗr", g:"star"},
  {l:"Greek", r:"me", n:"αστέρι", t:"astéri", g:"star"},
  {l:"Persian", r:"mi", n:"ستاره", t:"setâre", g:"star"},
  {l:"Sanskrit", r:"sa", n:"स्तृ", t:"stṛ", g:"star"}
 ],
 B:{p:"Which English words share this star root?", y:["asterisk","astronomy","stellar","disaster"],
  n:[["stare","Old English starian 'to gaze'"],["sterile","Latin sterilis 'barren'"],["starve","Old English steorfan 'to die'"]]}},

{id:"heart", w:"heart", def:"the organ that pumps blood; the emotional core", track:"roots",
 root:{k:"pie-kerd", f:"*ḱḗr", l:"Proto-Indo-European", g:"heart"},
 L:[
  {f:"heorte", l:"Old English", g:"heart", why:"Old English heorte became Middle English herte, then heart.",
   x:[["Old English","heorþ","hearth"],["Old English","heorot","hart, male deer"],["Latin","cor","heart (a cousin)"]]},
  {f:"*hertô", l:"Proto-Germanic", g:"heart", why:"Germanic h from PIE ḱ (Grimm's Law): *hertô, German Herz.",
   x:[["Proto-Germanic","*herutaz","deer"],["Proto-Germanic","*harjaz","army"],["Latin","cordis","of the heart"]]},
  {f:"*ḱḗr", l:"Proto-Indo-European", g:"heart", why:"PIE *ḱḗr (stem *ḱr̥d-) gave Latin cor/cordis, Greek kardía, Russian serdtse.",
   x:[["Proto-Indo-European","*ḱerh₂-","horn, head"],["Proto-Indo-European","*gʷʰer-","warm"],["Proto-Indo-European","*h₂ŕ̥tḱos","bear"]]}
 ],
 C:[
  {l:"German", r:"ne", n:"Herz", g:"heart"},
  {l:"Latin", r:"me", n:"cor", g:"heart"},
  {l:"Spanish", r:"we", n:"corazón", g:"heart"},
  {l:"French", r:"we", n:"cœur", g:"heart"},
  {l:"Ancient Greek", r:"me", n:"καρδία", t:"kardía", g:"heart"},
  {l:"Russian", r:"ee", n:"сердце", t:"serdtse", g:"heart"},
  {l:"Lithuanian", r:"ee", n:"širdis", g:"heart"},
  {l:"Sanskrit", r:"sa", n:"हृद्", t:"hṛd", g:"heart"}
 ],
 B:{p:"Which English words share the heart root (Latin cor / Greek kardía)?", y:["cardiac","cordial","courage","record"],
  n:[["card","Greek khartēs 'papyrus leaf'"],["cardinal","Latin cardo 'hinge'"],["hearth","Old English heorþ, unrelated"]]}},

{id:"water", w:"water", def:"the clear liquid of rain, rivers and seas", track:"roots",
 root:{k:"pie-wodr", f:"*wódr̥", l:"Proto-Indo-European", g:"water"},
 L:[
  {f:"wæter", l:"Old English", g:"water", why:"Old English wæter has barely changed in 1,200 years.",
   x:[["Old English","weder","weather"],["Latin","unda","wave (a cousin)"],["Old English","wǣd","garment (→ widow's weeds)"]]},
  {f:"*watōr", l:"Proto-Germanic", g:"water", why:"Proto-Germanic *watōr also gave German Wasser and Dutch water.",
   x:[["Proto-Germanic","*wedrą","weather"],["Latin","aqua","water (a different root)"],["Proto-Germanic","*wardaz","guard (→ ward)"]]},
  {f:"*wódr̥", l:"Proto-Indo-European", g:"water", why:"PIE *wódr̥ gave Greek hýdōr, Russian vodá and Hittite watar, one of the oldest recorded words.",
   x:[["Proto-Indo-European","*h₂ekʷeh₂","water, river (→ Latin aqua)"],["Proto-Indo-European","*wedʰ-","to lead"],["Proto-Indo-European","*wers-","rain, dew"]]}
 ],
 C:[
  {l:"German", r:"ne", n:"Wasser", g:"water"},
  {l:"Dutch", r:"ne", n:"water", g:"water"},
  {l:"Russian", r:"ee", n:"вода", t:"voda", g:"water"},
  {l:"Ancient Greek", r:"me", n:"ὕδωρ", t:"hýdōr", g:"water"},
  {l:"Hittite", r:"mi", n:"watar", g:"water (Anatolian cuneiform)"},
  {l:"Lithuanian", r:"ee", n:"vanduo", g:"water"},
  {l:"Sanskrit", r:"sa", n:"उदन्", t:"udán", g:"water, wave"}
 ],
 B:{p:"Which English words share the PIE water root?", y:["hydrogen","vodka","otter","wet"],
  n:[["aquarium","Latin aqua, a different PIE root"],["vapor","Latin vapor 'steam'"],["waiter","Old North French waitier 'to watch'"]]}},

{id:"three", w:"three", def:"the number after two", track:"roots",
 root:{k:"pie-treyes", f:"*tréyes", l:"Proto-Indo-European", g:"three"},
 L:[
  {f:"þrēo", l:"Old English", g:"three", why:"Old English wrote the th sound with the letter thorn: þrēo.",
   x:[["Old English","trēow","tree"],["Old English","þrēat","crowd, threat"],["Latin","trēs","three (a cousin)"]]},
  {f:"*þrīz", l:"Proto-Germanic", g:"three", why:"Grimm's Law turned PIE t into Germanic th: *þrīz.",
   x:[["Proto-Germanic","*trewą","tree"],["Proto-Germanic","*þreutaną","to trouble"],["Ancient Greek","treîs","three (a cousin)"]]},
  {f:"*tréyes", l:"Proto-Indo-European", g:"three", why:"PIE *tréyes is one of the most stable words in the whole family.",
   x:[["Proto-Indo-European","*dwóh₁","two"],["Proto-Indo-European","*kʷetwóres","four"],["Proto-Indo-European","*dóru","tree, wood"]]}
 ],
 C:[
  {l:"German", r:"ne", n:"drei", g:"three"},
  {l:"Welsh", r:"ne", n:"tri", g:"three"},
  {l:"Spanish", r:"we", n:"tres", g:"three"},
  {l:"Greek", r:"me", n:"τρία", t:"tría", g:"three"},
  {l:"Russian", r:"ee", n:"три", t:"tri", g:"three"},
  {l:"Lithuanian", r:"ee", n:"trys", g:"three"},
  {l:"Persian", r:"mi", n:"سه", t:"se", g:"three"},
  {l:"Sanskrit", r:"sa", n:"त्रि", t:"tri", g:"three"},
  {l:"Hindi", r:"sa", n:"तीन", t:"tīn", g:"three"}
 ],
 B:{p:"Which English words come from the 'three' root?", y:["triangle","trio","tripod","thrice"],
  n:[["throne","Greek thronos 'seat'"],["tree","PIE *dóru 'wood'"],["thrift","Old Norse thrift 'prosperity'"]]}},

{id:"new", w:"new", def:"not existing before; recently made", track:"roots",
 root:{k:"pie-newos", f:"*néwos", l:"Proto-Indo-European", g:"new"},
 L:[
  {f:"nīwe", l:"Old English", g:"new", why:"Old English nīwe (also nēowe) became new.",
   x:[["Old English","nū","now"],["Latin","novus","new (a cousin)"],["Old English","nefa","nephew, grandson"]]},
  {f:"*niwjaz", l:"Proto-Germanic", g:"new", why:"Proto-Germanic *niwjaz gave German neu and Gothic niujis.",
   x:[["Proto-Germanic","*nu","now"],["Proto-Germanic","*nebulaz","fog"],["Ancient Greek","néos","new (a cousin)"]]},
  {f:"*néwos", l:"Proto-Indo-European", g:"new", why:"PIE *néwos is probably built on *nu 'now': the 'now' thing.",
   x:[["Proto-Indo-European","*nókʷts","night"],["Proto-Indo-European","*nepōts","grandson, nephew"],["Proto-Indo-European","*h₁nómn̥","name"]]}
 ],
 C:[
  {l:"German", r:"ne", n:"neu", g:"new"},
  {l:"Welsh", r:"ne", n:"newydd", g:"new"},
  {l:"Spanish", r:"we", n:"nuevo", g:"new"},
  {l:"Latin", r:"me", n:"novus", g:"new"},
  {l:"Ancient Greek", r:"me", n:"νέος", t:"néos", g:"new, young"},
  {l:"Russian", r:"ee", n:"новый", t:"novyy", g:"new"},
  {l:"Persian", r:"mi", n:"نو", t:"now", g:"new"},
  {l:"Sanskrit", r:"sa", n:"नव", t:"nava", g:"new"}
 ],
 B:{p:"Which English words come from the 'new' root?", y:["novel","novice","renovate","neon"],
  n:[["nephew","PIE *nepōts 'grandson'"],["neuron","Greek neuron 'sinew'"],["now","PIE *nu, a related but separate word"]]}},

{id:"name", w:"name", def:"the word by which someone or something is known", track:"roots",
 root:{k:"pie-nomn", f:"*h₁nómn̥", l:"Proto-Indo-European", g:"name"},
 L:[
  {f:"nama", l:"Old English", g:"name", why:"Old English nama became Middle English name.",
   x:[["Old English","niman","to take (→ numb)"],["Latin","nōmen","name (a cousin)"],["Old English","nēah","near"]]},
  {f:"*namô", l:"Proto-Germanic", g:"name", why:"Proto-Germanic *namô gave German Name and Gothic namō.",
   x:[["Proto-Germanic","*nemaną","to take"],["Latin","numerus","number"],["Proto-Germanic","*nahts","night"]]},
  {f:"*h₁nómn̥", l:"Proto-Indo-European", g:"name", why:"PIE *h₁nómn̥ gave Latin nōmen, Greek ónoma, Sanskrit nāman, Russian imya.",
   x:[["Proto-Indo-European","*néwos","new"],["Proto-Indo-European","*nem-","to allot, take"],["Proto-Indo-European","*ǵneh₃-","to know"]]}
 ],
 C:[
  {l:"German", r:"ne", n:"Name", g:"name"},
  {l:"Latin", r:"me", n:"nōmen", g:"name"},
  {l:"Irish", r:"ne", n:"ainm", g:"name"},
  {l:"Ancient Greek", r:"me", n:"ὄνομα", t:"ónoma", g:"name"},
  {l:"Russian", r:"ee", n:"имя", t:"imya", g:"name"},
  {l:"Persian", r:"mi", n:"نام", t:"nâm", g:"name"},
  {l:"Sanskrit", r:"sa", n:"नामन्", t:"nāman", g:"name"},
  {l:"Hindi", r:"sa", n:"नाम", t:"nām", g:"name"}
 ],
 note:"False friend: Japanese namae 名前 'name' looks similar but is unrelated, a pure coincidence.",
 B:{p:"Which English words share the 'name' root?", y:["nominate","noun","synonym","anonymous"],
  n:[["number","Latin numerus, unrelated"],["numb","Old English niman 'to take'"],["nimble","Old English næmel 'quick to take'"]]}},

{id:"tooth", w:"tooth", def:"a hard bony structure in the jaw used for biting", track:"roots",
 root:{k:"pie-dont", f:"*h₃dónts", l:"Proto-Indo-European", g:"tooth"},
 L:[
  {f:"tōþ", l:"Old English", g:"tooth", why:"Old English tōþ (plural tēþ, hence teeth).",
   x:[["Old English","tōh","tough"],["Old English","tunge","tongue"],["Latin","dēns","tooth (a cousin)"]]},
  {f:"*tanþs", l:"Proto-Germanic", g:"tooth", why:"Proto-Germanic *tanþs; English lost the n (German kept it: Zahn).",
   x:[["Proto-Germanic","*tungǭ","tongue"],["Proto-Germanic","*tanhuz","tough"],["Ancient Greek","odoús","tooth (a cousin)"]]},
  {f:"*h₃dónts", l:"Proto-Indo-European", g:"tooth", why:"PIE *h₃dónts, probably 'the biting one', from *h₃ed- 'to bite'. Older books (and Grokipedia) give *h₁dónt-, 'the eating one', from *h₁ed- 'to eat': disputed.",
   x:[["Proto-Indo-European","*ǵómbʰos","peg, tooth (→ comb)"],["Proto-Indo-European","*dn̥ǵʰwéh₂s","tongue"],["Proto-Indo-European","*déḱm̥","ten"]]}
 ],
 C:[
  {l:"German", r:"ne", n:"Zahn", g:"tooth"},
  {l:"Welsh", r:"ne", n:"dant", g:"tooth"},
  {l:"French", r:"we", n:"dent", g:"tooth"},
  {l:"Spanish", r:"we", n:"diente", g:"tooth"},
  {l:"Ancient Greek", r:"me", n:"ὀδούς", t:"odoús", g:"tooth"},
  {l:"Lithuanian", r:"ee", n:"dantis", g:"tooth"},
  {l:"Sanskrit", r:"sa", n:"दन्त", t:"danta", g:"tooth"}
 ],
 B:{p:"Which English words share the 'tooth' root?", y:["dentist","orthodontist","dandelion","trident"],
  n:[["dent","Middle English dint 'a blow', unrelated"],["dinosaur","Greek deinos 'terrible'"],["donate","Latin donare 'to give'"]]}},

{id:"foot", w:"foot", def:"the end of the leg that you stand on", track:"roots",
 root:{k:"pie-pod", f:"*pṓds", l:"Proto-Indo-European", g:"foot"},
 L:[
  {f:"fōt", l:"Old English", g:"foot", why:"Old English fōt (plural fēt, hence feet).",
   x:[["Old English","fōda","food"],["Old English","fæt","vessel (→ vat)"],["Latin","pēs","foot (a cousin)"]]},
  {f:"*fōts", l:"Proto-Germanic", g:"foot", why:"Grimm's Law turned PIE p into Germanic f: *fōts, German Fuß.",
   x:[["Proto-Germanic","*fōdô","food"],["Proto-Germanic","*fehu","cattle, wealth"],["Ancient Greek","poús","foot (a cousin)"]]},
  {f:"*pṓds", l:"Proto-Indo-European", g:"foot", why:"PIE *pṓds (stem *ped-) gave Latin pes/pedis, Greek pous/podos, Sanskrit pad.",
   x:[["Proto-Indo-European","*peh₂-","to protect, feed"],["Proto-Indo-European","*péḱu","livestock"],["Proto-Indo-European","*ph₂tḗr","father"]]}
 ],
 C:[
  {l:"German", r:"ne", n:"Fuß", g:"foot"},
  {l:"Latin", r:"me", n:"pēs", g:"foot"},
  {l:"Spanish", r:"we", n:"pie", g:"foot"},
  {l:"Ancient Greek", r:"me", n:"πούς", t:"poús", g:"foot"},
  {l:"Lithuanian", r:"ee", n:"pėda", g:"footprint, sole"},
  {l:"Persian", r:"mi", n:"پا", t:"pâ", g:"foot, leg"},
  {l:"Sanskrit", r:"sa", n:"पद्", t:"pad", g:"foot"}
 ],
 B:{p:"Which English words share the 'foot' root?", y:["pedal","pedestrian","podium","octopus"],
  n:[["pediatric","Greek pais, paidos 'child'"],["pedagogue","Greek pais 'child' + agōgos 'leader'"],["petal","Greek petalon 'leaf'"]]}},

{id:"brother", w:"brother", def:"a male sibling", track:"roots",
 root:{k:"pie-bhrater", f:"*bʰréh₂tēr", l:"Proto-Indo-European", g:"brother"},
 L:[
  {f:"brōþor", l:"Old English", g:"brother", why:"Old English brōþor became Middle English brother.",
   x:[["Old English","brēad","morsel, bread"],["Old English","brōd","brood"],["Latin","frāter","brother (a cousin)"]]},
  {f:"*brōþēr", l:"Proto-Germanic", g:"brother", why:"Proto-Germanic *brōþēr gave German Bruder.",
   x:[["Proto-Germanic","*brōdiz","brood"],["Proto-Germanic","*braudą","bread"],["Ancient Greek","phrátēr","clan member (a cousin)"]]},
  {f:"*bʰréh₂tēr", l:"Proto-Indo-European", g:"brother", why:"PIE *bʰréh₂tēr shares the kinship suffix -ter with mother and father.",
   x:[["Proto-Indo-European","*swésōr","sister"],["Proto-Indo-European","*méh₂tēr","mother"],["Proto-Indo-European","*bʰer-","to carry"]]}
 ],
 C:[
  {l:"German", r:"ne", n:"Bruder", g:"brother"},
  {l:"Irish", r:"ne", n:"bráthair", g:"brother"},
  {l:"French", r:"we", n:"frère", g:"brother"},
  {l:"Latin", r:"me", n:"frāter", g:"brother"},
  {l:"Ancient Greek", r:"me", n:"φράτηρ", t:"phrátēr", g:"member of a clan"},
  {l:"Russian", r:"ee", n:"брат", t:"brat", g:"brother"},
  {l:"Persian", r:"mi", n:"برادر", t:"barâdar", g:"brother"},
  {l:"Sanskrit", r:"sa", n:"भ्रातृ", t:"bhrātṛ", g:"brother"}
 ],
 B:{p:"Which English words come from Latin frāter 'brother'?", y:["fraternal","fraternity","friar","fratricide"],
  n:[["fragile","Latin frangere 'to break'"],["frantic","Greek phrenitis 'delirium'"],["freight","Middle Dutch vracht 'cargo'"]]}},

{id:"yoke", w:"yoke", def:"a wooden crosspiece joining two animals for work", track:"roots",
 root:{k:"pie-yewg", f:"*yugóm", l:"Proto-Indo-European", g:"yoke (from *yewg- 'to join')"},
 L:[
  {f:"geoc", l:"Old English", g:"yoke", why:"Old English geoc; the g was pronounced like y.",
   x:[["Old English","geong","young"],["Old English","gēar","year"],["Latin","iugum","yoke (a cousin)"]]},
  {f:"*juką", l:"Proto-Germanic", g:"yoke", why:"Proto-Germanic *juką gave German Joch and Gothic juk.",
   x:[["Proto-Germanic","*jungaz","young"],["Proto-Germanic","*jērą","year"],["Ancient Greek","zygón","yoke (a cousin)"]]},
  {f:"*yugóm", l:"Proto-Indo-European", g:"yoke", why:"PIE *yugóm, from *yewg- 'to join', is the source of Sanskrit yoga too.",
   x:[["Proto-Indo-European","*h₂yuh₁n̥ḱós","young"],["Proto-Indo-European","*yeh₁r-","year"],["Proto-Indo-European","*h₂éǵros","field"]]}
 ],
 C:[
  {l:"German", r:"ne", n:"Joch", g:"yoke"},
  {l:"Latin", r:"me", n:"iugum", g:"yoke"},
  {l:"Ancient Greek", r:"me", n:"ζυγόν", t:"zygón", g:"yoke"},
  {l:"Russian", r:"ee", n:"иго", t:"igo", g:"yoke (oppression)"},
  {l:"Hittite", r:"mi", n:"iukan", g:"yoke"},
  {l:"Sanskrit", r:"sa", n:"युग", t:"yugá", g:"yoke; an age"},
  {l:"Sanskrit", r:"sa", n:"योग", t:"yoga", g:"joining, discipline"},
  {l:"Korean", r:"ea", n:"요가", t:"yoga", g:"yoga (borrowed)"}
 ],
 B:{p:"Which English words share the 'join' root *yewg-?", y:["yoga","jugular","conjugal","zygote"],
  n:[["juggle","Latin ioculari 'to jest'"],["jury","Latin iurare 'to swear'"],["young","PIE *h₂yuh₁n̥ḱós, unrelated"]]}},

{id:"guru", w:"guru", def:"a revered teacher or expert", track:"world",
 root:{k:"pie-gwreh", f:"*gʷréh₂us", l:"Proto-Indo-European", g:"heavy"},
 L:[
  {f:"गुरु guru", l:"Hindi", g:"teacher; venerable", why:"English borrowed guru (1806, spelled gooroo) from Hindi, from Sanskrit guru.",
   x:[["Persian","gol","rose"],["Hindi","garam","hot (→ garam masala)"],["Sanskrit","jñāna","knowledge"]]},
  {f:"guru", l:"Sanskrit", g:"heavy, weighty; venerable", why:"Sanskrit guru first meant 'heavy': a teacher is a person of weight.",
   x:[["Sanskrit","gaura","white, bright"],["Sanskrit","guhā","cave, hiding place"],["Sanskrit","giri","mountain"]]},
  {f:"*gʷréh₂us", l:"Proto-Indo-European", g:"heavy", why:"PIE *gʷréh₂us also gave Latin gravis (grave, gravity) and Greek barýs (baritone).",
   x:[["Proto-Indo-European","*gʷerH-","to swallow"],["Proto-Indo-European","*ǵʰer-","to yearn"],["Proto-Indo-European","*ǵerh₂-","to grow old"]]}
 ],
 C:[
  {l:"Sanskrit", r:"sa", n:"गुरु", t:"guru", g:"heavy; teacher"},
  {l:"Latin", r:"me", n:"gravis", g:"heavy"},
  {l:"Ancient Greek", r:"me", n:"βαρύς", t:"barýs", g:"heavy"},
  {l:"Spanish", r:"we", n:"grave", g:"serious"},
  {l:"Gothic", r:"ne", n:"kaurus", g:"heavy"},
  {l:"Korean", r:"ea", n:"구루", t:"guru", g:"guru (borrowed)"}
 ],
 B:{p:"Which English words share guru's 'heavy' root?", y:["gravity","grave (serious)","baritone","aggravate"],
  n:[["gravel","Old French grave 'sandy shore', unrelated"],["groove","Dutch groeve 'trench'"],["gourmet","French, 'wine taster'"]]}},

/* ───────────── GREEK LEARNED WORDS ───────────── */
{id:"philosophy", w:"philosophy", def:"the study of knowledge, reality and how to live", track:"roots",
 root:{k:"gr-sophia", f:"φίλος + σοφία", l:"Ancient Greek", g:"loving + wisdom"},
 L:[
  {f:"philosophia", l:"Latin", g:"philosophy", why:"English got it via Old French filosofie from Latin philosophia.",
   x:[["Latin","sapientia","wisdom (→ sapient)"],["Latin","philologia","love of learning"],["Old French","folie","madness (→ folly)"]]},
  {f:"φιλοσοφία", l:"Ancient Greek", g:"love of wisdom", why:"Greek philosophía: a word Pythagoras is traditionally (possibly apocryphally) said to have coined.",
   x:[["Ancient Greek","σοφιστής (sophistḗs)","expert, sophist"],["Ancient Greek","φιλία (philía)","friendship"],["Ancient Greek","θεωρία (theōría)","viewing (→ theory)"]]},
  {f:"φίλος + σοφία", l:"Ancient Greek", g:"loving + wisdom", why:"phílos 'dear, loving' + sophía 'skill, wisdom'.",
   x:[["Ancient Greek","φύλον + σοφός","tribe + wise"],["Ancient Greek","φῶς + σοφία","light + wisdom"],["Ancient Greek","φίλος + ψυχή","loving + soul"]]}
 ],
 C:[
  {l:"Greek", r:"me", n:"φιλοσοφία", t:"filosofía", g:"philosophy"},
  {l:"Spanish", r:"we", n:"filosofía", g:"philosophy"},
  {l:"Russian", r:"ee", n:"философия", t:"filosofiya", g:"philosophy"},
  {l:"Arabic", r:"mi", n:"فلسفة", t:"falsafa", g:"philosophy"},
  {l:"Hebrew", r:"mi", n:"פילוסופיה", t:"filosofya", g:"philosophy"}
 ],
 B:{p:"Which English words share philo- 'loving' or soph- 'wise'?", y:["philanthropy","sophomore","Philadelphia","sophisticated"],
  n:[["phylum","Greek phylon 'tribe, race'"],["sofa","Arabic ṣuffa 'bench'"],["fillet","French filet 'little thread'"]]}},

{id:"telephone", w:"telephone", def:"a device for talking at a distance", track:"roots",
 root:{k:"pie-bheh", f:"*bʰeh₂-", l:"Proto-Indo-European", g:"to speak"},
 L:[
  {f:"τῆλε + φωνή", l:"Greek (modern coinage)", g:"far + voice", why:"A 19th-century coinage from Greek tēle 'far off' + phōnḗ 'voice, sound'.",
   x:[["Greek","τέλος + φωνή","end + voice"],["Latin","tela + phona","web + sound"],["Greek","τῆλε + φῶς","far + light"]]},
  {f:"φωνή", l:"Ancient Greek", g:"voice, sound", why:"phōnḗ, the 'phone' in symphony and microphone.",
   x:[["Ancient Greek","φόνος (phónos)","murder"],["Ancient Greek","φαίνω (phaínō)","to show (→ phantom)"],["Ancient Greek","φόβος (phóbos)","fear"]]},
  {f:"*bʰeh₂-", l:"Proto-Indo-European", g:"to speak", why:"PIE *bʰeh₂- 'speak' also gave Latin fama (fame) and fari (→ fable, infant).",
   x:[["Proto-Indo-European","*bʰewdʰ-","to be aware, wake"],["Proto-Indo-European","*bʰer-","to carry"],["Proto-Indo-European","*bʰeyH-","to fear"]]}
 ],
 C:[
  {l:"Greek", r:"me", n:"τηλέφωνο", t:"tiléfono", g:"telephone"},
  {l:"German", r:"ne", n:"Telefon", g:"telephone"},
  {l:"Spanish", r:"we", n:"teléfono", g:"telephone"},
  {l:"Russian", r:"ee", n:"телефон", t:"telefon", g:"telephone"},
  {l:"Hebrew", r:"mi", n:"טלפון", t:"telefon", g:"telephone"},
  {l:"Persian", r:"mi", n:"تلفن", t:"telefon", g:"telephone"}
 ],
 B:{p:"Which English words share phōnḗ 'voice'?", y:["symphony","phonics","saxophone","euphony"],
  n:[["phony","Irish-English fawney 'fake ring', unrelated"],["phantom","Greek phantasma 'apparition'"],["phosphorus","Greek phōs 'light' + phoros"]]}},

{id:"democracy", w:"democracy", def:"government by the people", track:"roots",
 root:{k:"gr-demos", f:"δῆμος + κράτος", l:"Ancient Greek", g:"people + power"},
 L:[
  {f:"democratia", l:"Medieval Latin", g:"democracy", why:"Via French démocratie from Medieval Latin democratia.",
   x:[["Latin","res publica","public matter (→ republic)"],["Latin","dominatio","lordship"],["Latin","civitas","citizenship (→ city)"]]},
  {f:"δημοκρατία", l:"Ancient Greek", g:"rule by the people", why:"Greek dēmokratía, in use in Athens by the 5th century BC.",
   x:[["Ancient Greek","δημαγωγία (dēmagōgía)","leading the people"],["Ancient Greek","ἀριστοκρατία (aristokratía)","rule of the best"],["Ancient Greek","δαιμόνιον (daimónion)","divine power, spirit"]]},
  {f:"δῆμος + κράτος", l:"Ancient Greek", g:"people + power, rule", why:"dêmos 'the people, district' + krátos 'strength, rule'.",
   x:[["Ancient Greek","δαίμων + κράτος","spirit + power"],["Ancient Greek","δῆμος + κρατήρ","people + mixing bowl"],["Ancient Greek","δόμος + κράτος","house + power"]]}
 ],
 C:[
  {l:"Greek", r:"me", n:"δημοκρατία", t:"dimokratía", g:"democracy; republic"},
  {l:"Spanish", r:"we", n:"democracia", g:"democracy"},
  {l:"Russian", r:"ee", n:"демократия", t:"demokratiya", g:"democracy"},
  {l:"Arabic", r:"mi", n:"ديمقراطية", t:"dīmuqrāṭiyya", g:"democracy"},
  {l:"Hebrew", r:"mi", n:"דמוקרטיה", t:"demokratya", g:"democracy"}
 ],
 B:{p:"Which English words share dêmos 'people' or krátos 'rule'?", y:["epidemic","demagogue","aristocracy","pandemic"],
  n:[["demon","Greek daimōn 'spirit'"],["crater","Greek kratēr 'mixing bowl'"],["demolish","Latin demoliri 'to tear down'"]]}},

{id:"school", w:"school", def:"a place of teaching and learning", track:"roots",
 root:{k:"gr-schole", f:"σχολή", l:"Ancient Greek", g:"leisure"},
 L:[
  {f:"scōl", l:"Old English", g:"school", why:"Old English scōl, borrowed early from Latin.",
   x:[["Old English","scolu","troop, multitude (→ a school of fish)"],["Old English","sceal","shall, must"],["Old Norse","skalli","bald head (→ skull, possibly)"]]},
  {f:"schola", l:"Latin", g:"school; lecture", why:"Latin schola 'place of instruction', from Greek.",
   x:[["Latin","scalae","ladder, stairs (→ scale)"],["Latin","scholium","marginal note"],["Latin","sculptura","carving"]]},
  {f:"σχολή", l:"Ancient Greek", g:"leisure, spare time", why:"Greek scholḗ meant 'leisure': time free for discussion and learning.",
   x:[["Ancient Greek","σκολιός (skoliós)","crooked (→ scoliosis)"],["Ancient Greek","σκοπός (skopós)","watcher, target"],["Ancient Greek","στοά (stoá)","porch (→ Stoic)"]]}
 ],
 C:[
  {l:"German", r:"ne", n:"Schule", g:"school"},
  {l:"Welsh", r:"ne", n:"ysgol", g:"school"},
  {l:"Spanish", r:"we", n:"escuela", g:"school"},
  {l:"Greek", r:"me", n:"σχολείο", t:"scholeío", g:"school"},
  {l:"Russian", r:"ee", n:"школа", t:"shkola", g:"school"},
  {l:"Polish", r:"ee", n:"szkoła", g:"school"}
 ],
 note:"A 'school of fish' is a different word, from Dutch school 'troop', related to shoal.",
 B:{p:"Which English words come from scholḗ?", y:["scholar","scholarship","scholastic"],
  n:[["shoal","Old English sceald 'shallow'"],["scold","probably Old Norse skáld 'poet'"],["skull","Middle English scolle, probably Norse"]]}},

{id:"hieroglyph", w:"hieroglyph", def:"a picture-sign of ancient Egyptian writing", track:"ancient",
 root:{k:"gr-hieros", f:"ἱερός + γλύφειν", l:"Ancient Greek", g:"sacred + to carve"},
 L:[
  {f:"hieroglyphique", l:"French", g:"hieroglyphic", why:"English took hieroglyphic (1580s) via French, from Late Latin hieroglyphicus.",
   x:[["French","hiérarchie","rank of priests (→ hierarchy)"],["French","glyphe","carved groove"],["Latin","hieronymus","holy name (→ Jerome)"]]},
  {f:"ἱερογλυφικός", l:"Ancient Greek", g:"of sacred carving", why:"Greek hieroglyphikós, describing the carved sacred script of Egypt.",
   x:[["Ancient Greek","ἱεροφάντης (hierophántēs)","revealer of the sacred"],["Ancient Greek","γλυκύς (glykýs)","sweet (→ glucose)"],["Ancient Greek","ἱερεύς (hiereús)","priest"]]},
  {f:"ἱερός + γλύφειν", l:"Ancient Greek", g:"sacred + to carve", why:"hierós 'holy' + glýphein 'to carve'. The Egyptians called it mdw nṯr, 'god's words'.",
   x:[["Ancient Greek","ἱερός + γράφειν","sacred + to write"],["Ancient Greek","ἱστορία + γλύφειν","inquiry + to carve"],["Ancient Greek","ἥρως + γλύφειν","hero + to carve"]]}
 ],
 C:[
  {l:"Greek", r:"me", n:"ιερογλυφικά", t:"ieroglifiká", g:"hieroglyphs"},
  {l:"Russian", r:"ee", n:"иероглиф", t:"ieroglif", g:"hieroglyph; also a Chinese character"},
  {l:"Egyptian", r:"af", n:"mdw nṯr", g:"'god's words', the Egyptians' own name for it"},
  {l:"German", r:"ne", n:"Hieroglyphe", g:"hieroglyph"}
 ],
 B:{p:"Which English words share hierós 'sacred' or glýph- 'carve'?", y:["hierarchy","glyph","petroglyph"],
  n:[["hero","Greek hērōs 'demigod', unrelated"],["glucose","Greek glykýs 'sweet'"],["graph","Greek graphein 'to write'"]]}},

/* ───────────── LOANWORDS FROM AROUND THE WORLD ───────────── */
{id:"sugar", w:"sugar", def:"a sweet crystalline substance", track:"world",
 root:{k:"skt-sarkara", f:"śarkarā", l:"Sanskrit", g:"grit, gravel; ground sugar"},
 L:[
  {f:"sucre", l:"Old French", g:"sugar", why:"English sugre/sugar came from Old French sucre (via Medieval Latin succarum).",
   x:[["Latin","sucus","juice, sap (→ succulent)"],["Old French","sucier","to suck"],["Latin","saccharum","sugar (a later scholarly borrowing)"]]},
  {f:"سكر sukkar", l:"Arabic", g:"sugar", why:"Arab traders and growers brought sukkar to Spain and Sicily.",
   x:[["Arabic","شراب sharāb","drink (→ syrup, sherbet)"],["Arabic","قند qand","cane sugar (→ candy)"],["Arabic","سوق sūq","market"]]},
  {f:"شکر shakar", l:"Persian", g:"sugar", why:"Arabic took it from Persian shakar.",
   x:[["Persian","شاه shāh","king (→ check, chess)"],["Persian","شکار shekār","hunting"],["Persian","شهر shahr","city"]]},
  {f:"शर्करा śarkarā", l:"Sanskrit", g:"grit, gravel; ground sugar", why:"Sanskrit śarkarā first meant 'gravel, grit', from the look of crystallized cane sugar.",
   x:[["Sanskrit","खण्ड khaṇḍa","piece of sugar (→ candy)"],["Sanskrit","शर्मन् śarman","shelter, joy"],["Sanskrit","शक्र śakra","mighty"]]}
 ],
 C:[
  {l:"Spanish", r:"we", n:"azúcar", g:"sugar (with Arabic al- 'the')"},
  {l:"German", r:"ne", n:"Zucker", g:"sugar"},
  {l:"Greek", r:"me", n:"ζάχαρη", t:"záchari", g:"sugar"},
  {l:"Russian", r:"ee", n:"сахар", t:"sakhar", g:"sugar"},
  {l:"Arabic", r:"mi", n:"سكر", t:"sukkar", g:"sugar"},
  {l:"Persian", r:"mi", n:"شکر", t:"shakar", g:"sugar"},
  {l:"Sanskrit", r:"sa", n:"शर्करा", t:"śarkarā", g:"grit; sugar"},
  {l:"Hindi", r:"sa", n:"शक्कर", t:"śakkar", g:"sugar"}
 ],
 B:{p:"Which English words also trace back to Sanskrit śarkarā?", y:["saccharine","sucrose","jaggery"],
  n:[["candy","Sanskrit khaṇḍa via Persian qand"],["syrup","Arabic sharāb 'drink'"],["succulent","Latin sucus 'juice'"]]}},

{id:"tea", w:"tea", def:"a drink made by steeping dried leaves", track:"world",
 root:{k:"zh-cha", f:"茶", l:"Chinese", g:"tea plant"},
 L:[
  {f:"thee", l:"Dutch", g:"tea", why:"Dutch traders brought both the leaf and the word (thee) to Europe in the 1600s.",
   x:[["Portuguese","chá","tea (a 'cha' cousin, by sea from Macau)"],["French","thym","thyme"],["Dutch","the","the (article)"]]},
  {f:"茶 tê", l:"Hokkien (Min Chinese)", g:"tea", why:"The Dutch traded at Hokkien-speaking ports, where 茶 is read tê. Mandarin and Cantonese say chá, the source of chai.",
   x:[["Mandarin","大 dà","big"],["Japanese","手 te","hand"],["Korean","차 cha","tea (a 'cha' cousin)"]]},
  {f:"茶", l:"Middle Chinese", g:"tea plant (read roughly 'dra')", why:"The character 茶 was split off from 荼, an older word for bitter plants. One character, two pronunciations: te by sea, cha by land.",
   x:[["Middle Chinese","米","rice"],["Middle Chinese","水","water"],["Middle Chinese","草","grass, herb"]]}
 ],
 C:[
  {l:"Mandarin", r:"ea", n:"茶", t:"chá", g:"tea"},
  {l:"Japanese", r:"ea", n:"茶", t:"cha", g:"tea"},
  {l:"Korean", r:"ea", n:"차", t:"cha", g:"tea"},
  {l:"Russian", r:"ee", n:"чай", t:"chay", g:"tea"},
  {l:"Greek", r:"me", n:"τσάι", t:"tsái", g:"tea"},
  {l:"Hindi", r:"sa", n:"चाय", t:"chāy", g:"tea"},
  {l:"Persian", r:"mi", n:"چای", t:"chây", g:"tea"},
  {l:"Arabic", r:"mi", n:"شاي", t:"shāy", g:"tea"},
  {l:"Swahili", r:"af", n:"chai", g:"tea"},
  {l:"Spanish", r:"we", n:"té", g:"tea (a 'te' cousin)"},
  {l:"German", r:"ne", n:"Tee", g:"tea (a 'te' cousin)"}
 ],
 note:"Languages that got tea by sea (via Hokkien ports) say 'te'; those that got it overland or via Portuguese Macau say 'cha'.",
 B:{p:"Which English words come from the same Chinese 茶?", y:["chai","char (British slang: a cup of char)"],
  n:[["teak","Malayalam tēkka, via Portuguese"],["chart","Latin charta 'paper'"],["tease","Old English tǣsan 'to pull apart'"]]}},

{id:"algebra", w:"algebra", def:"mathematics using letters for unknown numbers", track:"world",
 root:{k:"ar-jbr", f:"ج ب ر  j-b-r", l:"Arabic", g:"to restore, set a bone"},
 L:[
  {f:"algebra", l:"Medieval Latin", g:"algebra; also bone-setting", why:"Medieval Latin algebra came from the title of al-Khwārizmī's 9th-century book.",
   x:[["Medieval Latin","algorismus","decimal reckoning (→ algorithm)"],["Medieval Latin","alchimia","alchemy"],["Latin","alga","seaweed"]]},
  {f:"الجبر al-jabr", l:"Arabic", g:"the reunion of broken parts", why:"From al-Khwārizmī's 'al-Kitāb al-mukhtaṣar fī ḥisāb al-jabr wa-l-muqābala' (c. 820).",
   x:[["Arabic","الجبل al-jabal","the mountain"],["Arabic","الخبر al-khabar","the news"],["Arabic","الكحل al-kuḥl","the eye powder (→ alcohol)"]]},
  {f:"ج ب ر  j-b-r", l:"Arabic root", g:"to restore, to set (bones)", why:"Arabic words grow from 3-consonant roots: j-b-r means mending, restoring.",
   x:[["Arabic root","ك ت ب  k-t-b","to write"],["Arabic root","س ل م  s-l-m","peace, safety"],["Arabic root","ج ب ل  j-b-l","mountain"]]}
 ],
 C:[
  {l:"Spanish", r:"we", n:"álgebra", g:"algebra"},
  {l:"Greek", r:"me", n:"άλγεβρα", t:"álgevra", g:"algebra"},
  {l:"Russian", r:"ee", n:"алгебра", t:"algebra", g:"algebra"},
  {l:"Arabic", r:"mi", n:"الجبر", t:"al-jabr", g:"algebra"},
  {l:"Persian", r:"mi", n:"جبر", t:"jabr", g:"algebra"},
  {l:"Hebrew", r:"mi", n:"אלגברה", t:"algebra", g:"algebra"}
 ],
 note:"In Spain an algebrista was also a bone-setter, keeping the old sense.",
 B:{p:"Which of these also begin with the Arabic article al- 'the'?", y:["alcohol","alkali","algorithm","alcove"],
  n:[["alligator","Spanish el lagarto: a Spanish 'the', not Arabic"],["album","Latin albus 'white'"],["alphabet","Greek alpha + beta"]]}},

{id:"coffee", w:"coffee", def:"a drink brewed from roasted coffee beans", track:"world",
 root:{k:"ar-qahwa", f:"قهوة qahwa", l:"Arabic", g:"coffee (earlier: wine?)"},
 L:[
  {f:"koffie", l:"Dutch", g:"coffee", why:"English coffee (c. 1600; chaoua in 1598) came largely via Dutch koffie.",
   x:[["Dutch","koffer","trunk, case"],["Italian","caffè","coffee (a sibling borrowing)"],["Greek","kophinos","basket (→ coffer, coffin)"]]},
  {f:"kahve", l:"Ottoman Turkish", g:"coffee", why:"Europe met coffee through the Ottoman coffeehouses: Turkish kahve.",
   x:[["Turkish","kafes","cage"],["Turkish","kaftan","robe (→ caftan)"],["Turkish","kavun","melon"]]},
  {f:"قهوة qahwa", l:"Arabic", g:"coffee", why:"Arabic qahwa. Beyond that it's disputed: Arab lexicographers linked it to a word for wine; a link to the Kaffa region of Ethiopia is also proposed, but many call it folk etymology.",
   x:[["Arabic","قهر qahr","conquest (→ Cairo, al-Qāhira)"],["Arabic","كهف kahf","cave"],["Arabic","قافلة qāfila","caravan"]]}
 ],
 C:[
  {l:"Turkish", r:"mi", n:"kahve", g:"coffee"},
  {l:"Arabic", r:"mi", n:"قهوة", t:"qahwa", g:"coffee"},
  {l:"Persian", r:"mi", n:"قهوه", t:"qahve", g:"coffee"},
  {l:"Hebrew", r:"mi", n:"קפה", t:"kafe", g:"coffee"},
  {l:"Greek", r:"me", n:"καφές", t:"kafés", g:"coffee"},
  {l:"Russian", r:"ee", n:"кофе", t:"kofe", g:"coffee"},
  {l:"Swahili", r:"af", n:"kahawa", g:"coffee"},
  {l:"Korean", r:"ea", n:"커피", t:"keopi", g:"coffee"},
  {l:"Japanese", r:"ea", n:"コーヒー", t:"kōhī", g:"coffee"}
 ],
 B:{p:"Which English words come from the same coffee word?", y:["café","cafeteria","caffeine"],
  n:[["caftan","Persian khaftān"],["coffin","Greek kophinos 'basket'"],["coffer","Greek kophinos 'basket'"]]}},

{id:"tsunami", w:"tsunami", def:"a huge sea wave caused by an earthquake", track:"world",
 root:{k:"ja-tsunami", f:"津 + 波", l:"Japanese", g:"harbour + wave"},
 L:[
  {f:"津波 tsunami", l:"Japanese", g:"harbour wave", why:"English borrowed tsunami from Japanese in the late 1800s.",
   x:[["Japanese","台風 taifū","typhoon"],["Japanese","海 umi","sea"],["Japanese","津軽 Tsugaru","a strait and region"]]},
  {f:"津 tsu + 波 nami", l:"Japanese", g:"harbour + wave", why:"tsu 'harbour, ferry crossing' + nami 'wave': fishermen at sea barely notice it; it strikes the harbour.",
   x:[["Japanese","月 tsuki + 波 nami","moon + wave"],["Japanese","津 tsu + 海 umi","harbour + sea"],["Japanese","強 tsuyo + 波 nami","strong + wave"]]}
 ],
 C:[
  {l:"Japanese", r:"ea", n:"津波", t:"tsunami", g:"tsunami"},
  {l:"Korean", r:"ea", n:"쓰나미", t:"sseunami", g:"tsunami (loan)"},
  {l:"Greek", r:"me", n:"τσουνάμι", t:"tsounámi", g:"tsunami"},
  {l:"Russian", r:"ee", n:"цунами", t:"tsunami", g:"tsunami"},
  {l:"Arabic", r:"mi", n:"تسونامي", t:"tsūnāmī", g:"tsunami"},
  {l:"Hebrew", r:"mi", n:"צונאמי", t:"tsunami", g:"tsunami"}
 ],
 B:{p:"Which of these also came into English from Japanese?", y:["tycoon","karaoke","emoji","honcho"],
  n:[["kowtow","Chinese 叩頭 'knock the head'"],["ketchup","possibly Hokkien kê-chiap"],["shampoo","Hindi chāmpo 'press, knead'"]]}},

{id:"tycoon", w:"tycoon", def:"a wealthy, powerful businessperson", track:"world",
 root:{k:"zh-dajun", f:"大 + 君", l:"Chinese", g:"great + lord"},
 L:[
  {f:"大君 taikun", l:"Japanese", g:"great lord", why:"Taikun was the shogun's title in foreign relations (with Korea from the 1600s, with Westerners in the 1850s). In English by 1857; Lincoln's aides nicknamed him 'the Tycoon', then it passed to business moguls.",
   x:[["Japanese","大名 daimyō","feudal lord"],["Japanese","天皇 tennō","emperor"],["Japanese","大工 daiku","carpenter"]]},
  {f:"大 dà + 君 jūn", l:"Chinese", g:"great + lord, ruler", why:"Japanese borrowed the characters and their readings from Chinese: 大 'great' + 君 'lord'.",
   x:[["Chinese","太 tài + 公 gōng","supreme + duke"],["Chinese","天 tiān + 君 jūn","heaven + lord"],["Chinese","大 dà + 官 guān","great + official"]]}
 ],
 C:[
  {l:"Japanese", r:"ea", n:"大君", t:"taikun", g:"great lord"},
  {l:"Mandarin", r:"ea", n:"大君", t:"dàjūn", g:"great lord (literary)"},
  {l:"Korean", r:"ea", n:"대군", t:"daegun", g:"grand prince"}
 ],
 B:{p:"Which of these are also Japanese loans in English?", y:["tsunami","sudoku","emoji","honcho"],
  n:[["kumquat","Cantonese 金橘 'golden orange'"],["gung-ho","Chinese 工合 'work together'"],["kowtow","Chinese 叩頭 'knock the head'"]]}},

{id:"kowtow", w:"kowtow", def:"to act with excessive deference", track:"world",
 root:{k:"zh-koutou", f:"叩 + 頭", l:"Chinese", g:"knock + head"},
 L:[
  {f:"叩頭 kòutóu", l:"Chinese", g:"to knock the head", why:"From the Chinese ceremonial bow touching the forehead to the ground (Mandarin kòutóu, Cantonese kau tau).",
   x:[["Chinese","磕牙 kēyá","chit-chat"],["Chinese","口頭 kǒutóu","oral, spoken"],["Chinese","叩門 kòumén","knock on a door"]]},
  {f:"叩 kòu + 頭 tóu", l:"Chinese", g:"knock + head", why:"叩 'to knock' + 頭 'head'. 頭 contains 頁, an old pictograph of a head.",
   x:[["Chinese","口 kǒu + 頭 tóu","mouth + head"],["Chinese","叩 kòu + 首 shǒu","knock + head (a synonym compound)"],["Chinese","扣 kòu + 豆 dòu","button + bean"]]}
 ],
 C:[
  {l:"Mandarin", r:"ea", n:"叩头", t:"kòutóu", g:"kowtow (simplified characters)"},
  {l:"Cantonese", r:"ea", n:"叩頭", t:"kau tau", g:"kowtow"},
  {l:"Korean", r:"ea", n:"고두", t:"godu", g:"kowtow (Sino-Korean)"},
  {l:"Vietnamese", r:"ea", n:"khấu đầu", g:"kowtow (Sino-Vietnamese)"}
 ],
 B:{p:"Which of these also came to English from Chinese languages?", y:["tea","kumquat","gung-ho","ketchup (possibly)"],
  n:[["tsunami","Japanese 津波"],["shampoo","Hindi chāmpo"],["bungalow","Hindi banglā 'Bengali-style house'"]]}},

{id:"ketchup", w:"ketchup", def:"a tomato-based table sauce", track:"world",
 root:{k:"hok-kechiap", f:"膎汁 kê-chiap", l:"Hokkien", g:"fish brine (possibly)"},
 L:[
  {f:"kecap / kichap", l:"Malay", g:"fish or soy sauce", why:"English catchup/ketchup (1690s) possibly came via Malay kicap, picked up by British traders.",
   x:[["Malay","kacang","nut, bean"],["Malay","kecil","small"],["Malay","kopi","coffee"]]},
  {f:"膎汁 kê-chiap", l:"Hokkien (Min Chinese)", g:"brine of pickled fish", why:"Possibly from Hokkien kê-chiap, a fermented fish sauce. The origin is widely accepted but not certain; tomatoes came much later.",
   x:[["Hokkien","茶 tê","tea"],["Mandarin","醬油 jiàngyóu","soy sauce"],["Cantonese","金橘 gam gwat","golden orange (→ kumquat)"]]}
 ],
 C:[
  {l:"Malay / Indonesian", r:"ea", n:"kecap", g:"soy sauce"},
  {l:"Hokkien", r:"ea", n:"膎汁", t:"kê-chiap", g:"fish brine"},
  {l:"Spanish", r:"we", n:"kétchup", g:"ketchup"},
  {l:"Russian", r:"ee", n:"кетчуп", t:"ketchup", g:"ketchup"},
  {l:"Korean", r:"ea", n:"케첩", t:"kecheop", g:"ketchup"}
 ],
 note:"Early English ketchups were made of mushrooms, walnuts or oysters. Tomato ketchup arrived in the early 1800s.",
 B:{p:"Which of these also came into English from Malay?", y:["amok","orangutan","bamboo (probably)"],
  n:[["kowtow","Chinese 叩頭"],["shampoo","Hindi chāmpo"],["tycoon","Japanese 大君"]]}},

{id:"robot", w:"robot", def:"a machine that carries out tasks automatically", track:"world",
 root:{k:"pie-orbh", f:"*h₃erbʰ-", l:"Proto-Indo-European", g:"to change status (orphan, servant)"},
 L:[
  {f:"robot", l:"Czech", g:"artificial worker", why:"Coined by Josef Čapek for his brother Karel's 1920 play R.U.R. (Rossum's Universal Robots).",
   x:[["German","Roboter","robot (borrowed from Czech, not the source)"],["Polish","robić","to do, make"],["Latin","robur","oak, strength (→ robust)"]]},
  {f:"robota", l:"Czech", g:"forced labour, drudgery", why:"Czech robota was the serf's compulsory labour for a lord.",
   x:[["Czech","rybník","fish pond"],["Czech","rodina","family"],["Czech","hora","mountain"]]},
  {f:"*orbota", l:"Proto-Slavic", g:"servitude, work", why:"Proto-Slavic *orbota, from *orbъ 'slave, servant' (Russian rab).",
   x:[["Proto-Slavic","*voda","water"],["Proto-Slavic","*gordъ","town, enclosure"],["Proto-Slavic","*rǫka","hand"]]},
  {f:"*h₃erbʰ-", l:"Proto-Indo-European", g:"to change status; orphan", why:"PIE *h₃erbʰ- also gave Greek orphanós (orphan) and German Arbeit 'work'.",
   x:[["Proto-Indo-European","*h₃reǵ-","to straighten, rule"],["Proto-Indo-European","*werǵ-","to work"],["Proto-Indo-European","*h₁rewdʰ-","red"]]}
 ],
 C:[
  {l:"Czech", r:"ee", n:"robota", g:"drudgery"},
  {l:"Russian", r:"ee", n:"работа", t:"rabota", g:"work"},
  {l:"Russian", r:"ee", n:"раб", t:"rab", g:"slave"},
  {l:"German", r:"ne", n:"Arbeit", g:"work"},
  {l:"Ancient Greek", r:"me", n:"ὀρφανός", t:"orphanós", g:"orphan"},
  {l:"Korean", r:"ea", n:"로봇", t:"robot", g:"robot"},
  {l:"Japanese", r:"ea", n:"ロボット", t:"robotto", g:"robot"}
 ],
 B:{p:"Which English words share robot's PIE root?", y:["orphan","robotics"],
  n:[["robust","Latin robur 'oak'"],["rob","Old French rober, from Germanic"],["ribbon","Old French riban"]]}},

{id:"mammoth", w:"mammoth", def:"an extinct woolly elephant; huge", track:"world",
 root:{k:"ural-mammoth", f:"*mān-oŋt (possibly)", l:"Mansi (Siberia)", g:"earth horn (possibly)"},
 L:[
  {f:"мамонт mamont", l:"Russian", g:"mammoth", why:"English took mammoth (1706) from Russian mamont (older mamant, mammot').",
   x:[["Russian","мама mama","mom"],["Russian","мамка mamka","nurse, nanny"],["Latin","mamma","breast (→ mammal)"]]},
  {f:"*mān-oŋt", l:"Proto-Mansi (possibly)", g:"earth horn", why:"Probably from a Uralic language of Siberia, such as Proto-Mansi *mān-oŋt 'earth horn', since tusks were dug from frozen ground. Not certain.",
   x:[["Mongolian","мангас mangas","ogre"],["Turkish","mamut","mammoth (a borrowing, not the source)"],["Hebrew","בהמות behemoth","great beast"]]}
 ],
 C:[
  {l:"Russian", r:"ee", n:"мамонт", t:"mamont", g:"mammoth"},
  {l:"German", r:"ne", n:"Mammut", g:"mammoth"},
  {l:"French", r:"we", n:"mammouth", g:"mammoth"},
  {l:"Greek", r:"me", n:"μαμούθ", t:"mamoúth", g:"mammoth"},
  {l:"Korean", r:"ea", n:"매머드", t:"maemeodeu", g:"mammoth"},
  {l:"Japanese", r:"ea", n:"マンモス", t:"manmosu", g:"mammoth"}
 ],
 B:{p:"Which of these also came into English via Russian?", y:["sputnik","steppe","vodka","tundra"],
  n:[["mammal","Latin mamma 'breast'"],["moose","Eastern Abenaki moz"],["kayak","Inuktitut qajaq"]]}},

/* ───────────── ANCIENT TRACK ───────────── */
{id:"adobe", w:"adobe", def:"sun-dried mud brick", track:"ancient",
 root:{k:"eg-dbt", f:"ḏbt", l:"Egyptian", g:"brick"},
 L:[
  {f:"adobe", l:"Spanish", g:"mud brick", why:"American English took adobe from Spanish in the 1700s.",
   x:[["Spanish","adorno","ornament"],["Spanish","adoquín","paving stone (also Arabic, but from ad-dukkān)"],["Spanish","adobar","to marinate"]]},
  {f:"الطوب aṭ-ṭūb", l:"Arabic", g:"the brick", why:"Spanish adobe is Arabic aṭ-ṭūb with the article al- assimilated to aṭ-.",
   x:[["Arabic","الطبل aṭ-ṭabl","the drum"],["Arabic","الطيب aṭ-ṭīb","the perfume"],["Arabic","الباب al-bāb","the door"]]},
  {f:"ⲧⲱⲃⲉ tōbe", l:"Coptic", g:"brick", why:"Arabic borrowed it from Coptic tōbe, the last stage of Egyptian.",
   x:[["Coptic","ⲧⲟⲟⲩ toou","mountain"],["Coptic","ⲛⲟⲩⲃ noub","gold"],["Coptic","ⲏⲓ ēi","house"]]},
  {f:"ḏbt", l:"Egyptian", g:"brick", why:"Egyptian ḏbt 'mud brick': a word that has survived about 4,000 years.",
   x:[["Egyptian","pr","house"],["Egyptian","mr","pyramid"],["Egyptian","ꜥnḫ","life"]], glyph:"brick"}
 ],
 C:[
  {l:"Spanish", r:"we", n:"adobe", g:"mud brick"},
  {l:"Arabic", r:"mi", n:"طوب", t:"ṭūb", g:"bricks"},
  {l:"Coptic", r:"af", n:"ⲧⲱⲃⲉ", t:"tōbe", g:"brick"},
  {l:"Egyptian", r:"af", n:"ḏbt", g:"brick", glyph:"brick"}
 ],
 B:{p:"Which of these also came to English via Spanish from Arabic?", y:["alcove","alfalfa","apricot"],
  n:[["alligator","Spanish el lagarto 'the lizard' (Spanish article)"],["avocado","Nahuatl āhuacatl"],["armada","Latin armata 'armed'"]]}},

{id:"alphabet", w:"alphabet", def:"the set of letters used to write a language", track:"ancient",
 root:{k:"eg-ox", f:"ox-head sign", l:"Egyptian → Proto-Sinaitic", g:"ox"},
 L:[
  {f:"alphabetum", l:"Late Latin", g:"alphabet", why:"English alphabet (1500s) via Late Latin alphabetum.",
   x:[["Latin","abecedarium","ABC primer"],["Latin","littera","letter"],["Latin","albus","white (→ album)"]]},
  {f:"ἄλφα + βῆτα", l:"Ancient Greek", g:"alpha + beta", why:"Named from the first two Greek letters, álpha and bêta.",
   x:[["Ancient Greek","ἀλφή + βίος","gain + life"],["Ancient Greek","ἄλφα + ὦ μέγα","alpha + omega"],["Ancient Greek","γράμμα + βῆτα","letter + beta"]]},
  {f:"ʾālep + bēt", l:"Phoenician", g:"ox + house", why:"Greeks adopted Phoenician letters and their names: ʾālep 'ox', bēt 'house'.",
   x:[["Phoenician","gīml + dalt","camel(?) + door"],["Phoenician","mēm + nūn","water + fish"],["Phoenician","ʿayin + pē","eye + mouth"]], glyph:"aleph"},
  {f:"ox-head sign", l:"Egyptian → Proto-Sinaitic", g:"ox", why:"Widely accepted: Semitic workers in Egypt (c. 1800 BC) adapted an Egyptian ox-head hieroglyph to stand for ʾ, the first sound of ʾalp 'ox'.",
   x:[["Egyptian","ankh sign","life"],["Egyptian","eye of Horus","protection"],["Sumerian","cuneiform wedge","none"]], glyph:"ox"}
 ],
 C:[
  {l:"Hebrew", r:"mi", n:"אָלֶף בֵּית", t:"alef bet", g:"alphabet; first two letters"},
  {l:"Arabic", r:"mi", n:"ألف باء", t:"alif bāʾ", g:"the alphabet; first two letters"},
  {l:"Greek", r:"me", n:"αλφάβητο", t:"alfávito", g:"alphabet"},
  {l:"Russian", r:"ee", n:"алфавит", t:"alfavit", g:"alphabet"},
  {l:"Korean", r:"ea", n:"알파벳", t:"alpabet", g:"the Latin alphabet"},
  {l:"Japanese", r:"ea", n:"アルファベット", t:"arufabetto", g:"the Latin alphabet"}
 ],
 note:"Turn the letter A upside down and you can still see the ox's head and horns.",
 B:{p:"Which English words come from the Greek letter names?", y:["alphanumeric","alpha","beta"],
  n:[["alpine","Latin Alpes 'the Alps'"],["bet","origin uncertain, possibly from abet"],["albino","Latin albus 'white'"]]}},

{id:"ebony", w:"ebony", def:"a very dark, dense tropical wood", track:"ancient",
 root:{k:"eg-hbny", f:"hbny", l:"Egyptian", g:"ebony wood"},
 L:[
  {f:"hebenus", l:"Latin", g:"ebony tree", why:"Via Old French eban(e) from Latin (h)ebenus.",
   x:[["Latin","ebur","ivory"],["Latin","ebrius","drunk (→ inebriated)"],["Latin","hibernus","wintry"]]},
  {f:"ἔβενος", l:"Ancient Greek", g:"ebony", why:"Greek ébenos, a trade word for the precious African wood.",
   x:[["Ancient Greek","ἐλέφας (eléphas)","ivory, elephant"],["Ancient Greek","ἕβδομος (hébdomos)","seventh"],["Ancient Greek","Ἑβραῖος (Hebraîos)","Hebrew"]]},
  {f:"hbny", l:"Egyptian", g:"ebony", why:"Egyptian hbny, imported from Nubia/Punt; Hebrew hovnim (Ezekiel 27:15) is from the same source.",
   x:[["Egyptian","nbw","gold"],["Egyptian","ḥmt","copper"],["Egyptian","ꜥš","cedar"]]}
 ],
 C:[
  {l:"Egyptian", r:"af", n:"hbny", g:"ebony"},
  {l:"Biblical Hebrew", r:"mi", n:"הָבְנִים", t:"hovnim", g:"ebony (Ezekiel 27:15)"},
  {l:"Ancient Greek", r:"me", n:"ἔβενος", t:"ébenos", g:"ebony"},
  {l:"Spanish", r:"we", n:"ébano", g:"ebony"},
  {l:"German", r:"ne", n:"Ebenholz", g:"ebony wood"}
 ],
 B:{p:"Which English words are (probably) Egyptian in origin?", y:["oasis","adobe","gum"],
  n:[["obelisk","Greek obeliskos 'little spit, skewer'"],["oboe","French hautbois 'high wood'"],["abbey","Aramaic abba 'father'"]]}},

{id:"oasis", w:"oasis", def:"a fertile spot in a desert with water", track:"ancient",
 root:{k:"eg-wht", f:"wḥꜣt", l:"Egyptian", g:"oasis"},
 L:[
  {f:"Ὄασις", l:"Ancient Greek", g:"Oasis (an Egyptian place); oasis", why:"English oasis via Late Latin from Greek Óasis, a name Herodotus used for an Egyptian oasis town.",
   x:[["Greek","ὠόν (ōón)","egg (→ ovoid)"],["Greek","ὠκεανός (ōkeanós)","ocean"],["Greek","οἶκος (oîkos)","house (→ economy)"]]},
  {f:"wḥj", l:"Demotic Egyptian", g:"oasis", why:"Greek took it from late Egyptian (Demotic wḥj). The same word lives on in Coptic ouahe, written centuries after Herodotus.",
   x:[["Coptic","ⲟⲩⲟⲉⲓⲛ ouoein","light"],["Coptic","ⲙⲟⲟⲩ moou","water"],["Coptic","ⲱⲛϧ ōnkh","life"]]},
  {f:"wḥꜣt", l:"Egyptian", g:"oasis; cauldron-shaped valley", why:"Egyptian wḥꜣt (roughly 'wahat'). Arabic wāḥa 'oasis' comes from the same source.",
   x:[["Egyptian","mw","water"],["Egyptian","šꜥy","sand"],["Egyptian","dšrt","red land, desert"]]}
 ],
 C:[
  {l:"Egyptian", r:"af", n:"wḥꜣt", g:"oasis"},
  {l:"Coptic", r:"af", n:"ⲟⲩⲁϩⲉ", t:"ouahe", g:"oasis"},
  {l:"Arabic", r:"mi", n:"واحة", t:"wāḥa", g:"oasis"},
  {l:"Greek", r:"me", n:"όαση", t:"óasi", g:"oasis"},
  {l:"Russian", r:"ee", n:"оазис", t:"oazis", g:"oasis"},
  {l:"Korean", r:"ea", n:"오아시스", t:"oasiseu", g:"oasis"},
  {l:"Japanese", r:"ea", n:"オアシス", t:"oashisu", g:"oasis"}
 ],
 B:{p:"Which English words are (probably) Egyptian in origin?", y:["ebony","adobe","gum"],
  n:[["obelisk","Greek obeliskos 'little spit'"],["sphere","Greek sphaira 'ball'"],["ostrich","Latin avis struthio 'bird ostrich'"]]}},

{id:"alchemy", w:"alchemy", def:"medieval forerunner of chemistry", track:"ancient",
 root:{k:"eg-kmt", f:"Kmt (disputed)", l:"Egyptian?", g:"the Black Land (Egypt)"},
 L:[
  {f:"alchimia", l:"Medieval Latin", g:"alchemy", why:"Via Old French alquemie from Medieval Latin alchimia.",
   x:[["Medieval Latin","algebra","algebra"],["Latin","alchemilla","lady's mantle plant"],["Latin","calx","lime (→ calcium)"]]},
  {f:"الكيمياء al-kīmiyāʾ", l:"Arabic", g:"the art of transmutation", why:"Arabic al-kīmiyāʾ: al 'the' + kīmiyāʾ, from Greek.",
   x:[["Arabic","الكحل al-kuḥl","the eye powder (→ alcohol)"],["Arabic","القلي al-qilī","plant ashes (→ alkali)"],["Arabic","الكمون al-kammūn","cumin"]]},
  {f:"χημεία", l:"Greek", g:"the art of metal-working", why:"Late Greek khēmeía (also spelled khymeía) in Egyptian-Greek alchemical texts.",
   x:[["Greek","χειμών (kheimṓn)","winter"],["Greek","χιμαίρα (khimaira)","she-goat; monster"],["Greek","χήμη (khḗmē)","a kind of clam"]]},
  {f:"Kmt (disputed)", l:"Egyptian?", g:"the Black Land", why:"Disputed! Possibly from Kmt 'black land', Egypt's name for itself; or possibly from Greek khyma 'a pouring of metal'.",
   x:[["Egyptian","dšrt","red land, desert"],["Egyptian","ḥwt-kꜣ-ptḥ","temple of Ptah (→ Egypt!)"],["Egyptian","mdw nṯr","god's words"]]}
 ],
 C:[
  {l:"Arabic", r:"mi", n:"الكيمياء", t:"al-kīmiyāʾ", g:"chemistry; alchemy"},
  {l:"Spanish", r:"we", n:"alquimia", g:"alchemy"},
  {l:"Greek", r:"me", n:"αλχημεία", t:"alchimeía", g:"alchemy"},
  {l:"Russian", r:"ee", n:"алхимия", t:"alkhimiya", g:"alchemy"},
  {l:"Hebrew", r:"mi", n:"אלכימיה", t:"alkhimya", g:"alchemy"}
 ],
 note:"Fun fact: the word Egypt itself comes, via Greek Aigyptos, from ḥwt-kꜣ-ptḥ, a temple of Ptah at Memphis.",
 B:{p:"Which English words come from the same source as alchemy?", y:["chemistry","chemical","chemist"],
  n:[["chimney","Greek kaminos 'oven'"],["chemise","Late Latin camisia 'shirt'"],["chimera","Greek khimaira 'she-goat'"]]}},

{id:"jasmine", w:"jasmine", def:"a shrub with fragrant white flowers", track:"world",
 root:{k:"fa-yasaman", f:"یاسمن yâsaman", l:"Persian", g:"jasmine"},
 L:[
  {f:"jasmin", l:"French", g:"jasmine", why:"English jasmine (1570s) from French jasmin (earlier jessemin).",
   x:[["French","jaser","to chatter"],["Spanish","jazmín","jasmine (a sibling)"],["French","jaspe","jasper stone"]]},
  {f:"ياسمين yāsamīn", l:"Arabic", g:"jasmine", why:"French got it from Arabic yāsamīn.",
   x:[["Arabic","ياقوت yāqūt","ruby, sapphire"],["Arabic","سمسم simsim","sesame"],["Arabic","زعفران zaʿfarān","saffron"]]},
  {f:"یاسمن yâsaman", l:"Persian", g:"jasmine", why:"Arabic borrowed it from Persian yâsaman, also a name.",
   x:[["Persian","گل gol","rose, flower"],["Persian","نیلوفر nilufar","water lily (→ nenuphar)"],["Persian","یاقوت yâqut","ruby"]]}
 ],
 C:[
  {l:"Persian", r:"mi", n:"یاسمن", t:"yâsaman", g:"jasmine"},
  {l:"Arabic", r:"mi", n:"ياسمين", t:"yāsamīn", g:"jasmine"},
  {l:"Hebrew", r:"mi", n:"יסמין", t:"yasmin", g:"jasmine"},
  {l:"Greek", r:"me", n:"γιασεμί", t:"giasemí", g:"jasmine"},
  {l:"Spanish", r:"we", n:"jazmín", g:"jasmine"},
  {l:"Russian", r:"ee", n:"жасмин", t:"zhasmin", g:"jasmine"},
  {l:"Korean", r:"ea", n:"재스민", t:"jaeseumin", g:"jasmine"},
  {l:"Japanese", r:"ea", n:"ジャスミン", t:"jasumin", g:"jasmine"}
 ],
 B:{p:"Which English words come from Persian?", y:["paradise","bazaar","caravan","pajamas"],
  n:[["safari","Swahili, from Arabic safar 'journey'"],["sofa","Arabic ṣuffa 'bench'"],["cotton","Arabic quṭn"]]}},

{id:"paradise", w:"paradise", def:"heaven; an ideal place", track:"ancient",
 root:{k:"ir-pairidaeza", f:"pairi-daēza", l:"Avestan (Old Iranian)", g:"walled enclosure"},
 L:[
  {f:"paradisus", l:"Latin", g:"Garden of Eden; heaven", why:"Via Old French paradis from Church Latin paradisus.",
   x:[["Latin","paradigma","pattern (→ paradigm)"],["Latin","parare","to prepare (→ parade)"],["Latin","pratum","meadow"]]},
  {f:"παράδεισος", l:"Ancient Greek", g:"park, royal garden", why:"Xenophon used parádeisos for Persian royal parks; the Septuagint used it for Eden.",
   x:[["Ancient Greek","παράδοξος (parádoxos)","contrary to belief"],["Ancient Greek","παράδοσις (parádosis)","handing down, tradition"],["Ancient Greek","παρθένος (parthénos)","maiden"]]},
  {f:"pairi-daēza", l:"Avestan (Old Iranian)", g:"walled enclosure", why:"Old Iranian pairi 'around' + daēza 'wall': a walled garden. (pairi is cognate with Greek peri.)",
   x:[["Avestan","haoma","sacred plant drink"],["Avestan","ahura","lord"],["Avestan","daēva","demon, false god"]]}
 ],
 C:[
  {l:"Persian", r:"mi", n:"پردیس", t:"pardis", g:"garden; campus"},
  {l:"Hebrew", r:"mi", n:"פַּרְדֵּס", t:"pardes", g:"orchard"},
  {l:"Arabic", r:"mi", n:"فردوس", t:"firdaws", g:"paradise"},
  {l:"Greek", r:"me", n:"παράδεισος", t:"parádisos", g:"paradise"},
  {l:"Spanish", r:"we", n:"paraíso", g:"paradise"},
  {l:"Armenian", r:"mi", n:"պարտեզ", t:"partez", g:"garden"}
 ],
 B:{p:"Which English words also come from Persian?", y:["jasmine","caravan","bazaar","kiosk (via Turkish)"],
  n:[["parade","Latin parare 'to prepare'"],["paragraph","Greek para + graphein"],["pariah","Tamil paṟaiyar 'drummers'"]]}},

{id:"camel", w:"camel", def:"a humped desert animal", track:"ancient",
 root:{k:"sem-gamal", f:"gamal", l:"Semitic", g:"camel"},
 L:[
  {f:"camelus", l:"Latin", g:"camel", why:"Old English camel/camell from Latin camelus.",
   x:[["Latin","camera","vaulted room (→ chamber)"],["Latin","camelopardalis","giraffe"],["Latin","caballus","horse (→ cavalry)"]]},
  {f:"κάμηλος", l:"Ancient Greek", g:"camel", why:"Latin borrowed Greek kámēlos.",
   x:[["Ancient Greek","κάμινος (káminos)","furnace"],["Ancient Greek","καμάρα (kamára)","vault (→ camera)"],["Ancient Greek","χαμαιλέων (khamailéōn)","ground-lion (→ chameleon)"]]},
  {f:"גָּמָל gāmāl", l:"Hebrew / Phoenician", g:"camel", why:"Greek took it from a Semitic language: Hebrew gāmāl, Arabic jamal.",
   x:[["Hebrew","גָּדֵר gādēr","fence, wall"],["Hebrew","כֶּלֶב keleb","dog"],["Hebrew","גֶּפֶן gefen","vine"]]}
 ],
 C:[
  {l:"Hebrew", r:"mi", n:"גמל", t:"gamal", g:"camel"},
  {l:"Arabic", r:"mi", n:"جمل", t:"jamal", g:"camel"},
  {l:"Greek", r:"me", n:"καμήλα", t:"kamíla", g:"camel"},
  {l:"Spanish", r:"we", n:"camello", g:"camel"},
  {l:"German", r:"ne", n:"Kamel", g:"camel"}
 ],
 note:"The Hebrew letter gimel and Greek gamma are often linked to gāmāl, though that link is debated.",
 B:{p:"Which English words also came through Greek from a Semitic language?", y:["sapphire","cumin","myrrh"],
  n:[["camera","Greek kamára 'vault'"],["caramel","Spanish caramelo, origin uncertain"],["chameleon","Greek khamai 'on the ground' + leōn"]]}},

/* ───────────── AMERICAS (Nahuatl) ───────────── */
{id:"chocolate", w:"chocolate", def:"a food made from roasted cacao seeds", track:"ancient",
 root:{k:"nah-atl", f:"ātl", l:"Nahuatl", g:"water"},
 L:[
  {f:"chocolate", l:"Spanish", g:"chocolate", why:"English chocolate (c. 1600) via Spanish, from the Aztec drink.",
   x:[["Spanish","chorizo","sausage"],["Spanish","chocar","to crash"],["Portuguese","cacau","cacao"]]},
  {f:"chocolātl", l:"Nahuatl", g:"chocolate drink", why:"Nahuatl chocolātl. Its first part is disputed: possibly xococ/xocolli 'bitter', chicol- 'beater, frothing stick', or a Maya word chocol 'hot'.",
   x:[["Nahuatl","cacahuatl","cacao bean (a cousin word)"],["Nahuatl","xōchitl","flower"],["Nahuatl","tomatl","tomato"]]},
  {f:"ātl", l:"Nahuatl", g:"water", why:"The -ātl ending is Nahuatl ātl 'water': chocolate was a drink. (The first element is debated.)",
   x:[["Nahuatl","tlālli","earth"],["Nahuatl","tōnatiuh","sun"],["Nahuatl","calli","house"]]}
 ],
 C:[
  {l:"Spanish", r:"am", n:"chocolate", g:"chocolate"},
  {l:"Greek", r:"me", n:"σοκολάτα", t:"sokoláta", g:"chocolate"},
  {l:"Russian", r:"ee", n:"шоколад", t:"shokolad", g:"chocolate"},
  {l:"Arabic", r:"mi", n:"شوكولاتة", t:"shūkūlāta", g:"chocolate"},
  {l:"Hebrew", r:"mi", n:"שוקולד", t:"shokolad", g:"chocolate"},
  {l:"Korean", r:"ea", n:"초콜릿", t:"chokollit", g:"chocolate"},
  {l:"Japanese", r:"ea", n:"チョコレート", t:"chokorēto", g:"chocolate"}
 ],
 B:{p:"Which of these came to English from Nahuatl (the Aztec language)?", y:["tomato","avocado","coyote","chili"],
  n:[["potato","Taíno batata (Caribbean)"],["hurricane","Taíno hurakán"],["barbecue","Taíno barbacoa"]]}},

{id:"tomato", w:"tomato", def:"a red, juicy fruit eaten as a vegetable", track:"ancient",
 root:{k:"nah-tomatl", f:"tomatl", l:"Nahuatl", g:"tomatillo, tomato"},
 L:[
  {f:"tomate", l:"Spanish", g:"tomato", why:"English tomate (1600s), later reshaped to tomato like potato.",
   x:[["Spanish","tomar","to take"],["Spanish","patata","potato"],["Spanish","tomillo","thyme"]]},
  {f:"tomatl", l:"Nahuatl", g:"tomatillo; plump fruit", why:"Nahuatl tomatl meant the husk tomato; the red one was xītomatl.",
   x:[["Nahuatl","ahuacatl","avocado"],["Nahuatl","chīlli","chili pepper"],["Nahuatl","tōtōtl","bird"]]}
 ],
 C:[
  {l:"Spanish", r:"am", n:"tomate", g:"tomato"},
  {l:"Greek", r:"me", n:"ντομάτα", t:"ntomáta (domáta)", g:"tomato"},
  {l:"Russian", r:"ee", n:"томат", t:"tomat", g:"tomato (also pomidor)"},
  {l:"Arabic", r:"mi", n:"طماطم", t:"ṭamāṭim", g:"tomatoes"},
  {l:"Hindi", r:"sa", n:"टमाटर", t:"ṭamāṭar", g:"tomato"},
  {l:"Korean", r:"ea", n:"토마토", t:"tomato", g:"tomato"},
  {l:"Japanese", r:"ea", n:"トマト", t:"tomato", g:"tomato"}
 ],
 B:{p:"Which of these came to English from Nahuatl?", y:["chocolate","avocado","coyote","ocelot"],
  n:[["potato","Taíno batata"],["banana","West African, via Portuguese"],["maize","Taíno mahiz"]]}},

{id:"coyote", w:"coyote", def:"a small wild dog of North America", track:"ancient",
 root:{k:"nah-coyotl", f:"coyōtl", l:"Nahuatl", g:"coyote"},
 L:[
  {f:"coyote", l:"Mexican Spanish", g:"coyote", why:"English coyote (1750s) from Mexican Spanish.",
   x:[["Spanish","coyuntura","joint, juncture"],["Spanish","zorro","fox"],["Spanish","lobo","wolf"]]},
  {f:"coyōtl", l:"Nahuatl", g:"coyote", why:"Nahuatl coyōtl; Coyoacán in Mexico City means 'place of coyotes'.",
   x:[["Nahuatl","ocēlōtl","jaguar (→ ocelot)"],["Nahuatl","itzcuīntli","dog"],["Nahuatl","tecolōtl","owl"]]}
 ],
 C:[
  {l:"Spanish", r:"am", n:"coyote", g:"coyote"},
  {l:"Russian", r:"ee", n:"койот", t:"koyot", g:"coyote"},
  {l:"Korean", r:"ea", n:"코요테", t:"koyote", g:"coyote"},
  {l:"Japanese", r:"ea", n:"コヨーテ", t:"koyōte", g:"coyote"}
 ],
 B:{p:"Which of these came to English from Nahuatl?", y:["ocelot","chili","tomato","avocado"],
  n:[["cougar","Tupi, via Portuguese and French"],["jaguar","Tupi/Guarani yaguara"],["moose","Eastern Abenaki moz"]]}},

{id:"avocado", w:"avocado", def:"a pear-shaped fruit with creamy green flesh", track:"ancient",
 root:{k:"nah-ahuacatl", f:"āhuacatl", l:"Nahuatl", g:"avocado"},
 L:[
  {f:"aguacate", l:"Spanish", g:"avocado", why:"English avocado reshaped Spanish aguacate after Spanish avocado 'lawyer' (folk etymology).",
   x:[["Spanish","aguacero","downpour"],["Spanish","abogado","lawyer"],["Spanish","agua","water"]]},
  {f:"āhuacatl", l:"Nahuatl", g:"avocado", why:"Nahuatl āhuacatl (guacamole is āhuacamōlli, 'avocado sauce').",
   x:[["Nahuatl","ātl","water"],["Nahuatl","cacahuatl","cacao"],["Nahuatl","ayohtli","squash"]]}
 ],
 C:[
  {l:"Spanish", r:"am", n:"aguacate", g:"avocado"},
  {l:"Portuguese", r:"we", n:"abacate", g:"avocado"},
  {l:"Greek", r:"me", n:"αβοκάντο", t:"avokánto", g:"avocado"},
  {l:"Russian", r:"ee", n:"авокадо", t:"avokado", g:"avocado"},
  {l:"Hebrew", r:"mi", n:"אבוקדו", t:"avokado", g:"avocado"},
  {l:"Korean", r:"ea", n:"아보카도", t:"abokado", g:"avocado"},
  {l:"Japanese", r:"ea", n:"アボカド", t:"abokado", g:"avocado"}
 ],
 B:{p:"Which of these came to English from Nahuatl?", y:["guacamole","chocolate","coyote"],
  n:[["papaya","Carib, via Spanish"],["cashew","Tupi acajú, via Portuguese"],["guava","Taíno guayabo"]]}}
];
