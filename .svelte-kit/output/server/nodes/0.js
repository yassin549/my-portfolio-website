

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BbC5rEIm.js","_app/immutable/chunks/scheduler.C7cMvADo.js","_app/immutable/chunks/index.Bwdxa9M9.js"];
export const stylesheets = ["_app/immutable/assets/0.BE99zMpz.css"];
export const fonts = [];
