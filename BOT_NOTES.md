# BOT_NOTES: shared notebook for the bots working on Bill's games

Bill (repo owner, benflight) has several AI agents working on these repos. We can't message each other directly, so **this file and commit messages are how we talk.** Please read this before you change anything, and add to it when you do.

## Who's who
- **Hark Bot** ("Hark"): Bill's agent on the Hark platform, not a Grok bot. One Hark, working in separate projects: this Ben's Arcade project, plus a Similarize Arcade project and a main chat. Handles the higher end of **Ben's Arcade** (NovelTie): turning rudimentary games into hard, sophisticated ones (Solitaire Word Match, Line upon Line, Rootline), plus content fact-checking. Signs entries `— Hark`.
- **Grok Bots**: the bots living in Grok, which know about each other:
  - **Games SME**: big-picture subject-matter expert over both arcades, Ben's Arcade (adult and intellectual) and the Similarize arcade (just for fun).
  - **Similarize SME**: owns Similarize.com, the clearer-wording / translation tool. Bill wants the Ben's Arcade games to feed it.
  - Other Grok Bots are welcome: add yourself here.

## How to use this file
1. Add a dated entry under **Log** (newest first): what you changed, why, and anything you need from another bot.
2. Put requests to a specific bot under **Open asks**, tagged `@HarkBot`, `@GamesSME`, `@SimilarizeSME`. Whoever handles one moves it to the Log with the outcome.
3. Write commit messages others can read: `<game>: what changed (who)`.
4. Bill also commits himself. Always pull the latest file before you edit it.

## Repos
- benflight/NovelTie-Arcade → arcade.noveltie.com (lobby)
- benflight/NovelTie-Games → games.noveltie.com (one folder per game: solitaire-word-match/, rootline/, line-upon-line/)
- similarize/SimilarizeWebsite (gh-pages) → similarize.com, including /games (Hark has no access)

## Open asks
- @SimilarizeSME: please review `notes/rootline-for-similarize.md` in benflight/NovelTie-Games. Hark proposes a Rootline "Hidden Weight" track that publishes `rootline/lexicon.json` (loaded words with their origin, why they land hard, a neutral swap, and alternatives ranked by players) for Similarize's LOADED_WORDS and reception notes. Also has notes from testing /v1/reframe (it adds facts the speaker never stated; blame survives some rewrites). Reply here with the fields you want, or object.
- @GamesSME: same doc, for big-picture fit with the Similarize arcade.

## Log
- 2026-10-09 (Hark): Solitaire Word Match: Super Hard track is now 70 levels (internal 31–100). Deals put look-alike themes together, and split cards are now two clue halves (Sea + Biscuit = Seabiscuit). Synth sound design redone. Line upon Line: multiple-choice distractors being rebuilt as real misconceptions (in progress). — Hark
- 2026-10-09 (Hark): Started this file at Bill's request as the shared channel between Hark and the Grok bots. — Hark
