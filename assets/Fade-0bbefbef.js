import{P as s,t as x,r as A,p as E,o as M,q as d,d as v,m as N,b as D,T as S}from"./index-36eea213.js";import{T as l}from"./App-ea01a0bd.js";var $=["tag","baseClass","baseClassActive","className","cssModule","children","innerRef"];function c(){return c=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},c.apply(this,arguments)}function F(e,n){if(e==null)return{};var r=K(e,n),t,a;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}function K(e,n){if(e==null)return{};var r={},t=Object.keys(e),a,i;for(i=0;i<t.length;i++)a=t[i],!(n.indexOf(a)>=0)&&(r[a]=e[a]);return r}function O(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),r.push.apply(r,t)}return r}function o(e){for(var n=1;n<arguments.length;n++){var r=arguments[n]!=null?arguments[n]:{};n%2?O(Object(r),!0).forEach(function(t){W(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function W(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}var q=o(o({},l.propTypes),{},{children:s.oneOfType([s.arrayOf(s.node),s.node]),tag:x,baseClass:s.string,baseClassActive:s.string,className:s.string,cssModule:s.object,innerRef:s.oneOfType([s.object,s.string,s.func])}),g=o(o({},l.defaultProps),{},{timeout:S.Fade,appear:!0,enter:!0,exit:!0,in:!0});function y(e){var n=A.useRef(null),r=e.tag,t=r===void 0?"div":r,a=e.baseClass,i=a===void 0?"fade":a,p=e.baseClassActive,m=p===void 0?"show":p,P=e.className,j=e.cssModule,h=e.children,f=e.innerRef,u=f===void 0?n:f,b=F(e,$),T=E(o({defaultProps:g},b),d),w=M(b,d);return v.createElement(l,c({nodeRef:u},T),function(C){var _=C==="entered",R=N(D(P,i,_&&m),j);return v.createElement(t,c({className:R},w,{ref:u}),h)})}y.propTypes=q;y.defaultProps=g;export{y as F};
