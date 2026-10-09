Subject: Rootline → Similarize: a "Hidden Weight" lexicon, plus notes from testing the reframe tool

What Similarize does today (tested Oct 9, 2026)
- Phrase in → "How this may land" notes (client-side reception(): LOADED_WORDS / LOADED_PHRASES, absolutes, caps, filler) → up to 3 reframes from POST fe-voice-mint…/v1/reframe (grok-4-fast-non-reasoning, labels like Direct / Specific / Request).

What I noticed
1. It invents context. "Stop being so hysterical" came back as "Lower your voice… I can't follow when you shout." Nobody said anything about shouting. The prompt should forbid adding facts the speaker didn't state.
2. Blame survives the rewrite. "You never listen to me" → "You don't hear what I'm saying." That's still a you-accusation. At least one option should always be an I-statement plus a request.
3. The loaded-word list covers political heat (idiot, fascist, illegals, rigged) but misses words whose sting is in their origin: hysterical (Greek hystera, womb), gypped (from "Gypsy," a slur against the Romani), welsh on a bet (likely an old jab at the Welsh), lame, crazy/insane, cretin, spaz, "dumb" (originally meant mute). These are exactly what Rootline is built to find.
4. The reception notes are generic. "A loaded word may pull people into a side fight" never names the word or explains why it stings. Naming it, with a one-line origin, is more persuasive and teaches.

What Rootline produces for Similarize: the Hidden Weight lexicon
A new Rootline track, "Hidden Weight": players dig the root of a word that lands harder than people realize, then choose which of three substitutes keeps the meaning without the sting.

The work product is one versioned JSON file, rootline-lexicon.json, one entry per word:
{
  "word": "hysterical", "forms": ["hysteria","hysterics"],
  "origin": "Greek hystera, womb (via Latin hystericus)",
  "why_it_lands": "Rooted in the old medical idea that 'wandering wombs' made women irrational; still read as dismissing someone's emotions, often a woman's.",
  "heat": 2,                        // 0 neutral · 1 mild · 2 loaded · 3 slur
  "category": "gendered",           // gendered | ethnic | disability | religious | violent | political | drift
  "neutral": "very upset",          // drop-in for LOADED_WORDS
  "alternatives": [{"text":"overwhelmed","votes":0},{"text":"very upset","votes":0},{"text":"panicked","votes":0}],
  "false_friends": [{"lang":"es","form":"histérico","note":"same charge"}],
  "sources": ["…"], "verified": "2026-10-09"
}
- Similarize can load it straight away: word→neutral extends LOADED_WORDS; why_it_lands fills a specific reception note ("'Hysterical' comes from the Greek for womb…"); heat sets how strongly to warn; alternatives feed the reframe prompt as preferred swaps.
- Player votes rank the alternatives over time, giving crowd-tested substitutes (needs a small vote endpoint, e.g. POST /v1/vote on the existing fe-voice-mint worker; until then votes stay on the device).
- Cross-language entries (false friends, cognates that carry different charge) prepare Similarize for translation, the Duolingo-style direction.

Phase 1 (no backend): curate around 60 entries (gendered, ethnic, disability, religious, violent metaphors, meaning drift), fact-checked against Grokipedia with Wiktionary/Etymonline as tiebreakers. Ship the track in Rootline and publish rootline-lexicon.json at games.noveltie.com/rootline/lexicon.json for Similarize to fetch.
Phase 2: vote endpoint plus a "Reframe Judge" round: players see a harsh phrase and Similarize's three reframes, then pick the one that keeps the meaning and lands best, or flag one that invents facts. That's labeled preference data for tuning the /v1/reframe prompt.
