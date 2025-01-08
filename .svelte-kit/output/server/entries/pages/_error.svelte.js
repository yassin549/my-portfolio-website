import { g as getContext, c as create_ssr_component, a as subscribe, e as escape } from "../../chunks/ssr.js";
import "../../chunks/exports.js";
import { o as onMount } from "../../chunks/ssr2.js";
function get(key, parse = JSON.parse) {
  try {
    return parse(sessionStorage[key]);
  } catch {
  }
}
const SNAPSHOT_KEY = "sveltekit:snapshot";
const SCROLL_KEY = "sveltekit:scroll";
const is_legacy = onMount.toString().includes("$$") || /function \w+\(\) \{\}/.test(onMount.toString());
if (is_legacy) {
  ({
    data: {},
    form: null,
    error: null,
    params: {},
    route: { id: null },
    state: {},
    status: -1,
    url: new URL("https://example.com")
  });
}
get(SCROLL_KEY) ?? {};
get(SNAPSHOT_KEY) ?? {};
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const css = {
  code: ".error-container.svelte-1kb3sg2{height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(to bottom right, #4f46e5, #7c3aed);color:white;text-align:center;padding:2rem}h1.svelte-1kb3sg2{font-size:2rem;margin-bottom:1rem}a.svelte-1kb3sg2{color:white;text-decoration:underline;font-size:1.125rem}a.svelte-1kb3sg2:hover{text-decoration:none}",
  map: `{"version":3,"file":"+error.svelte","sources":["+error.svelte"],"sourcesContent":["<script>\\n  import { page } from '$app/stores';\\n<\/script>\\n\\n<div class=\\"error-container\\">\\n  <h1>{$page.status}: {$page.error?.message}</h1>\\n  <a href=\\"/\\">Go back home</a>\\n</div>\\n\\n<style>\\n  .error-container {\\n    height: 100vh;\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    justify-content: center;\\n    background: linear-gradient(to bottom right, #4f46e5, #7c3aed);\\n    color: white;\\n    text-align: center;\\n    padding: 2rem;\\n  }\\n\\n  h1 {\\n    font-size: 2rem;\\n    margin-bottom: 1rem;\\n  }\\n\\n  a {\\n    color: white;\\n    text-decoration: underline;\\n    font-size: 1.125rem;\\n  }\\n\\n  a:hover {\\n    text-decoration: none;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAUE,+BAAiB,CACf,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,UAAU,CAAE,gBAAgB,EAAE,CAAC,MAAM,CAAC,KAAK,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CAC9D,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,IACX,CAEA,iBAAG,CACD,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,IACjB,CAEA,gBAAE,CACA,KAAK,CAAE,KAAK,CACZ,eAAe,CAAE,SAAS,CAC1B,SAAS,CAAE,QACb,CAEA,gBAAC,MAAO,CACN,eAAe,CAAE,IACnB"}`
};
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<div class="error-container svelte-1kb3sg2"><h1 class="svelte-1kb3sg2">${escape($page.status)}: ${escape($page.error?.message)}</h1> <a href="/" class="svelte-1kb3sg2" data-svelte-h="svelte-11tu1n7">Go back home</a> </div>`;
});
export {
  Error$1 as default
};
