import{P as i,t as c,m as p,b as u,d as f}from"./index-38dac1c3.js";var g=["className","cssModule","tag"];function o(){return o=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&(t[e]=a[e])}return t},o.apply(this,arguments)}function m(t,n){if(t==null)return{};var a=b(t,n),e,r;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(r=0;r<s.length;r++)e=s[r],!(n.indexOf(e)>=0)&&Object.prototype.propertyIsEnumerable.call(t,e)&&(a[e]=t[e])}return a}function b(t,n){if(t==null)return{};var a={},e=Object.keys(t),r,s;for(s=0;s<e.length;s++)r=e[s],!(n.indexOf(r)>=0)&&(a[r]=t[r]);return a}var v={className:i.string,cssModule:i.object,tag:c};function d(t){var n=t.className,a=t.cssModule,e=t.tag,r=e===void 0?"p":e,s=m(t,g),l=p(u(n,"card-text"),a);return f.createElement(r,o({},s,{className:l}))}d.propTypes=v;export{d as C};