/* Rootline Word Bank config: the ONE place to switch environments.
   PROD SWITCH: set USE = "prod" below (and bump CACHE in sw.js) when Webmaster promotes the bank and the
   real Turnstile site key is filled in. If Rootline later moves to another site (e.g. similarize.com), add that
   page host to the Turnstile widget's domains, put the API host in `apiHosts`, and add the origin to ALLOWED_ORIGINS
   in the Worker's wrangler.toml. Nothing else in the game is host-specific.
   `?bank=<url>` may only point at `apiHosts` (https). localhost / 127.0.0.1 (http allowed) are added ONLY when the
   page itself is served from a dev/staging host (DEV_PAGES), never on games.noveltie.com.
   `?bank=off` disables uploads for this tab only; `?bank=reset` clears a saved override. */
(function () {
  var ENVS = {
    staging: {
      api: "https://rootline-bank-staging.ben-e22.workers.dev",
      /* Cloudflare's documented TEST site key (invisible, always passes). Replace with the real staging/prod
         site key once Webmaster creates the widget; the Worker's TURNSTILE_SECRET must be the matching secret. */
      turnstileSiteKey: "1x00000000000000000000BB"
    },
    prod: {
      api: "https://rootline-bank.ben-e22.workers.dev",
      turnstileSiteKey: "" /* TODO(Webmaster): real Turnstile site key for games.noveltie.com. Empty = no uploads (queued). */
    }
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
