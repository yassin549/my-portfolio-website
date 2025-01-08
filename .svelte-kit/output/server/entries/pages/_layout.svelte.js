import { c as create_ssr_component } from "../../chunks/ssr.js";
import "../../chunks/index.js";
const css = {
  code: "html, body{height:100%;margin:0;padding:0;overflow:hidden}",
  map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import \\"../app.css\\";\\nimport { browser } from \\"$app/environment\\";\\nimport { error } from \\"@sveltejs/kit\\";\\nif (browser) {\\n  window.onerror = (msg, url, lineNo, columnNo, err) => {\\n    console.error(\\"Error: \\", { msg, url, lineNo, columnNo, err });\\n    return false;\\n  };\\n}\\n<\/script>\\n\\n<slot />\\n\\n<style>\\n  :global(html, body) {\\n    height: 100%;\\n    margin: 0;\\n    padding: 0;\\n    overflow: hidden;\\n  }\\n</style>"],"names":[],"mappings":"AAcU,UAAY,CAClB,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,MACZ"}'
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
