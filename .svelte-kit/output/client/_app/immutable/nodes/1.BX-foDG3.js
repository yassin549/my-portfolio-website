import{s as S,e as d,t as g,a as j,c as f,b as $,d as v,f as _,g as q,h as y,i as h,j as A,k as l,l as C,n as E,m as D}from"../chunks/scheduler.C7cMvADo.js";import{S as G,i as H}from"../chunks/index.Bwdxa9M9.js";import{s as I}from"../chunks/entry.eYN9bZ0Q.js";const V=()=>{const t=I;return{page:{subscribe:t.page.subscribe},navigating:{subscribe:t.navigating.subscribe},updated:t.updated}},w={subscribe(t){return V().page.subscribe(t)}};function z(t){var x;let e,s,r=t[0].status+"",c,m,u=((x=t[0].error)==null?void 0:x.message)+"",p,b,n,k="Go back home";return{c(){e=d("div"),s=d("h1"),c=g(r),m=g(": "),p=g(u),b=j(),n=d("a"),n.textContent=k,this.h()},l(o){e=f(o,"DIV",{class:!0});var a=$(e);s=f(a,"H1",{class:!0});var i=$(s);c=v(i,r),m=v(i,": "),p=v(i,u),i.forEach(_),b=q(a),n=f(a,"A",{href:!0,class:!0,"data-svelte-h":!0}),y(n)!=="svelte-11tu1n7"&&(n.textContent=k),a.forEach(_),this.h()},h(){h(s,"class","svelte-1kb3sg2"),h(n,"href","/"),h(n,"class","svelte-1kb3sg2"),h(e,"class","error-container svelte-1kb3sg2")},m(o,a){A(o,e,a),l(e,s),l(s,c),l(s,m),l(s,p),l(e,b),l(e,n)},p(o,[a]){var i;a&1&&r!==(r=o[0].status+"")&&C(c,r),a&1&&u!==(u=((i=o[0].error)==null?void 0:i.message)+"")&&C(p,u)},i:E,o:E,d(o){o&&_(e)}}}function B(t,e,s){let r;return D(t,w,c=>s(0,r=c)),[r]}let L=class extends G{constructor(e){super(),H(this,e,B,z,S,{})}};export{L as component};
