/* Rootline Word Bank config: the ONE place to switch environments.
   PROD SWITCH: when Webmaster promotes the bank, set `api` to the prod Worker
   (https://rootline-bank.ben-e22.workers.dev) and bump CACHE in sw.js.
   If Rootline later moves to another site (e.g. similarize.com), change `api`/`hosts` here and add that
   origin to ALLOWED_ORIGINS in the Worker's wrangler.toml. Nothing else in the game is host-specific.
   `hosts`: the only API hosts a `?bank=<url>` override may point at (and the only ones that persist).
   http:// is accepted for localhost / 127.0.0.1 only. `?bank=off` disables uploads for this tab only;
   `?bank=reset` clears a saved override. */
window.ROOTLINE_BANK_CONFIG = {
  api: "https://rootline-bank-staging.ben-e22.workers.dev",
  hosts: ["rootline-bank-staging.ben-e22.workers.dev", "rootline-bank.ben-e22.workers.dev", "localhost", "127.0.0.1"]
};
