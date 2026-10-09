/* Rootline Word Bank config: the ONE place to switch environments.
   PROD SWITCH: set USE = "prod" below (and bump CACHE in sw.js) when Webmaster promotes the bank. If Rootline later moves to another site (e.g. similarize.com), add that
   page host to the Turnstile widget's domains, put the API host in `apiHosts`, and add the origin to ALLOWED_ORIGINS
   in the Worker's wrangler.toml. Nothing else in the game is host-specific.
   `?bank=<url>` may only point at `apiHosts` (https). localhost / 127.0.0.1 (http allowed) are added ONLY when the
   page itself is served from a dev/staging host (DEV_PAGES), never on games.noveltie.com.
   `?bank=off` disables uploads for this tab only; `?bank=reset` clears a saved override. */
(function () {
  /* Turnstile: ONE real Managed widget (Webmaster, 2026-10-09), site key below, domains games.noveltie.com and
     rootline-game-staging.ben-e22.workers.dev. The Worker's TURNSTILE_SECRET (both envs) is that widget's secret and
     TURNSTILE_HOSTNAMES pins the hostname. A new page host must be added to the widget's domains first. */
  var TURNSTILE_SITE_KEY = "0x4AAAAAAFSWlyiLgn9OEzbY";
  var ENVS = {
    staging: { api: "https://rootline-bank-staging.ben-e22.workers.dev", turnstileSiteKey: TURNSTILE_SITE_KEY },
    prod:    { api: "https://rootline-bank.ben-e22.workers.dev",         turnstileSiteKey: TURNSTILE_SITE_KEY }
  };
  var USE = "staging";   /* PROD SWITCH */
  var apiHosts = ["rootline-bank-staging.ben-e22.workers.dev", "rootline-bank.ben-e22.workers.dev"];
  var DEV_PAGES = ["localhost", "127.0.0.1", "rootline-game-staging.ben-e22.workers.dev"];
  function build(pageHost) {
    var dev = DEV_PAGES.indexOf(pageHost) >= 0;
    return { env: USE, api: ENVS[USE].api, turnstileSiteKey: ENVS[USE].turnstileSiteKey,
             hosts: apiHosts.concat(dev ? ["localhost", "127.0.0.1"] : []) };
  }
  window.ROOTLINE_BANK_CONFIG = build(location.hostname);
  window.ROOTLINE_BANK_CONFIG_FOR = build;   /* tests: what a given page host would get */
})();
