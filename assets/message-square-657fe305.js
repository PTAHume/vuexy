import{r as c,d as p,P as i}from"./index-ba44b7eb.js";function s(){return s=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},s.apply(this,arguments)}function u(e,o){if(e==null)return{};var t=g(e,o),r,n;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],!(o.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(t[r]=e[r])}return t}function g(e,o){if(e==null)return{};var t={},r=Object.keys(e),n,a;for(a=0;a<r.length;a++)n=r[a],!(o.indexOf(n)>=0)&&(t[n]=e[n]);return t}var l=c.forwardRef(function(e,o){var t=e.color,r=t===void 0?"currentColor":t,n=e.size,a=n===void 0?24:n,f=u(e,["color","size"]);return p.createElement("svg",s({ref:o,xmlns:"http://www.w3.org/2000/svg",width:a,height:a,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},f),p.createElement("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}))});l.propTypes={color:i.string,size:i.oneOfType([i.string,i.number])};l.displayName="MessageSquare";const h=l;export{h as M};
