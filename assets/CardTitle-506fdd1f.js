import{P as n,t as l,m as c,j as p,k as u}from"./index-2970b7da.js";var f=["className","cssModule","tag"];function g(t,o){if(t==null)return{};var s=m(t,o),e,a;if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(a=0;a<r.length;a++)e=r[a],!(o.indexOf(e)>=0)&&Object.prototype.propertyIsEnumerable.call(t,e)&&(s[e]=t[e])}return s}function m(t,o){if(t==null)return{};var s={},e=Object.keys(t),a,r;for(r=0;r<e.length;r++)a=e[r],!(o.indexOf(a)>=0)&&(s[a]=t[a]);return s}var v={className:n.string,cssModule:n.object,tag:l};function y(t){var o=t.className,s=t.cssModule,e=t.tag,a=e===void 0?"div":e,r=g(t,f),i=c(p(o,"card-title"),s);return u(a,{...r,className:i})}y.propTypes=v;export{y as C};