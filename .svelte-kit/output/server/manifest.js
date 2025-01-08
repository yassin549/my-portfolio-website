export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["dock/finder.png","favicon.png","icons/django.svg","icons/finder.png","icons/github.png","icons/python.svg","icons/react.svg","og-image.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".txt":"text/plain"},
	_: {
		client: {"start":"_app/immutable/entry/start.CWptrHqZ.js","app":"_app/immutable/entry/app.C0It3wZH.js","imports":["_app/immutable/entry/start.CWptrHqZ.js","_app/immutable/chunks/entry.C1FwdwnS.js","_app/immutable/chunks/scheduler.C7cMvADo.js","_app/immutable/chunks/index.DuUNMUIN.js","_app/immutable/entry/app.C0It3wZH.js","_app/immutable/chunks/scheduler.C7cMvADo.js","_app/immutable/chunks/index.Bwdxa9M9.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
