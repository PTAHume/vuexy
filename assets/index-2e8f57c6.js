import{D as ue,C as Se,w as u,b as Ze,B as ee,be as re,r as $,a3 as Re,bf as Te,Q as ve,s as we}from"./index-9f6d8844.js";import{a as ge,g as ke,f as er,s as rr,A as tr}from"./App-f2959991.js";import{u as De,C as H}from"./index.esm-626b9d3a.js";import{C as Le}from"./Card-128da412.js";import{C as _e}from"./CardBody-d043e87a.js";import{C as Pe}from"./CardHeader-fb69c611.js";import{C as Me}from"./CardTitle-514b21bc.js";import{F as $e}from"./Form-da08bd07.js";import{F as J}from"./FormFeedback-d5f74e5e.js";import{I as X,L as G}from"./Label-1262359e.js";import{S as ir}from"./react-select.esm-07358c8a.js";import{A as nr,w as or,S as sr}from"./ext-component-sweet-alerts-f24d0910.js";import{c as je,a as ae,o as ar}from"./customSelectValidation-cdf71302.js";import{C as cr}from"./check-a627512a.js";import"./Fade-197d599b.js";var ur={},le={};le.byteLength=fr;le.toByteArray=dr;le.fromByteArray=yr;var L=[],R=[],lr=typeof Uint8Array<"u"?Uint8Array:Array,ye="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var W=0,hr=ye.length;W<hr;++W)L[W]=ye[W],R[ye.charCodeAt(W)]=W;R["-".charCodeAt(0)]=62;R["_".charCodeAt(0)]=63;function qe(c){var l=c.length;if(l%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var f=c.indexOf("=");f===-1&&(f=l);var m=f===l?0:4-f%4;return[f,m]}function fr(c){var l=qe(c),f=l[0],m=l[1];return(f+m)*3/4-m}function pr(c,l,f){return(l+f)*3/4-f}function dr(c){var l,f=qe(c),m=f[0],x=f[1],p=new lr(pr(c,m,x)),h=0,o=x>0?m-4:m,y;for(y=0;y<o;y+=4)l=R[c.charCodeAt(y)]<<18|R[c.charCodeAt(y+1)]<<12|R[c.charCodeAt(y+2)]<<6|R[c.charCodeAt(y+3)],p[h++]=l>>16&255,p[h++]=l>>8&255,p[h++]=l&255;return x===2&&(l=R[c.charCodeAt(y)]<<2|R[c.charCodeAt(y+1)]>>4,p[h++]=l&255),x===1&&(l=R[c.charCodeAt(y)]<<10|R[c.charCodeAt(y+1)]<<4|R[c.charCodeAt(y+2)]>>2,p[h++]=l>>8&255,p[h++]=l&255),p}function mr(c){return L[c>>18&63]+L[c>>12&63]+L[c>>6&63]+L[c&63]}function xr(c,l,f){for(var m,x=[],p=l;p<f;p+=3)m=(c[p]<<16&16711680)+(c[p+1]<<8&65280)+(c[p+2]&255),x.push(mr(m));return x.join("")}function yr(c){for(var l,f=c.length,m=f%3,x=[],p=16383,h=0,o=f-m;h<o;h+=p)x.push(xr(c,h,h+p>o?o:h+p));return m===1?(l=c[f-1],x.push(L[l>>2]+L[l<<4&63]+"==")):m===2&&(l=(c[f-2]<<8)+c[f-1],x.push(L[l>>10]+L[l>>4&63]+L[l<<2&63]+"=")),x.join("")}var Be={};/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */Be.read=function(c,l,f,m,x){var p,h,o=x*8-m-1,y=(1<<o)-1,j=y>>1,w=-7,A=f?x-1:0,T=f?-1:1,C=c[l+A];for(A+=T,p=C&(1<<-w)-1,C>>=-w,w+=o;w>0;p=p*256+c[l+A],A+=T,w-=8);for(h=p&(1<<-w)-1,p>>=-w,w+=m;w>0;h=h*256+c[l+A],A+=T,w-=8);if(p===0)p=1-j;else{if(p===y)return h?NaN:(C?-1:1)*(1/0);h=h+Math.pow(2,m),p=p-j}return(C?-1:1)*h*Math.pow(2,p-m)};Be.write=function(c,l,f,m,x,p){var h,o,y,j=p*8-x-1,w=(1<<j)-1,A=w>>1,T=x===23?Math.pow(2,-24)-Math.pow(2,-77):0,C=m?0:p-1,O=m?1:-1,V=l<0||l===0&&1/l<0?1:0;for(l=Math.abs(l),isNaN(l)||l===1/0?(o=isNaN(l)?1:0,h=w):(h=Math.floor(Math.log(l)/Math.LN2),l*(y=Math.pow(2,-h))<1&&(h--,y*=2),h+A>=1?l+=T/y:l+=T*Math.pow(2,1-A),l*y>=2&&(h++,y/=2),h+A>=w?(o=0,h=w):h+A>=1?(o=(l*y-1)*Math.pow(2,x),h=h+A):(o=l*Math.pow(2,A-1)*Math.pow(2,x),h=0));x>=8;c[f+C]=o&255,C+=O,o/=256,x-=8);for(h=h<<x|o,j+=x;j>0;c[f+C]=h&255,C+=O,h/=256,j-=8);c[f+C-O]|=V*128};/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */(function(c){const l=le,f=Be,m=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;c.Buffer=o,c.SlowBuffer=fe,c.INSPECT_MAX_BYTES=50;const x=2147483647;c.kMaxLength=x,o.TYPED_ARRAY_SUPPORT=p(),!o.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error=="function"&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function p(){try{const t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),t.foo()===42}catch{return!1}}Object.defineProperty(o.prototype,"parent",{enumerable:!0,get:function(){if(o.isBuffer(this))return this.buffer}}),Object.defineProperty(o.prototype,"offset",{enumerable:!0,get:function(){if(o.isBuffer(this))return this.byteOffset}});function h(t){if(t>x)throw new RangeError('The value "'+t+'" is invalid for option "size"');const e=new Uint8Array(t);return Object.setPrototypeOf(e,o.prototype),e}function o(t,e,r){if(typeof t=="number"){if(typeof e=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return A(t)}return y(t,e,r)}o.poolSize=8192;function y(t,e,r){if(typeof t=="string")return T(t,e);if(ArrayBuffer.isView(t))return O(t);if(t==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(D(t,ArrayBuffer)||t&&D(t.buffer,ArrayBuffer)||typeof SharedArrayBuffer<"u"&&(D(t,SharedArrayBuffer)||t&&D(t.buffer,SharedArrayBuffer)))return V(t,e,r);if(typeof t=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');const i=t.valueOf&&t.valueOf();if(i!=null&&i!==t)return o.from(i,e,r);const n=he(t);if(n)return n;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof t[Symbol.toPrimitive]=="function")return o.from(t[Symbol.toPrimitive]("string"),e,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}o.from=function(t,e,r){return y(t,e,r)},Object.setPrototypeOf(o.prototype,Uint8Array.prototype),Object.setPrototypeOf(o,Uint8Array);function j(t){if(typeof t!="number")throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function w(t,e,r){return j(t),t<=0?h(t):e!==void 0?typeof r=="string"?h(t).fill(e,r):h(t).fill(e):h(t)}o.alloc=function(t,e,r){return w(t,e,r)};function A(t){return j(t),h(t<0?0:_(t)|0)}o.allocUnsafe=function(t){return A(t)},o.allocUnsafeSlow=function(t){return A(t)};function T(t,e){if((typeof e!="string"||e==="")&&(e="utf8"),!o.isEncoding(e))throw new TypeError("Unknown encoding: "+e);const r=U(t,e)|0;let i=h(r);const n=i.write(t,e);return n!==r&&(i=i.slice(0,n)),i}function C(t){const e=t.length<0?0:_(t.length)|0,r=h(e);for(let i=0;i<e;i+=1)r[i]=t[i]&255;return r}function O(t){if(D(t,Uint8Array)){const e=new Uint8Array(t);return V(e.buffer,e.byteOffset,e.byteLength)}return C(t)}function V(t,e,r){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(r||0))throw new RangeError('"length" is outside of buffer bounds');let i;return e===void 0&&r===void 0?i=new Uint8Array(t):r===void 0?i=new Uint8Array(t,e):i=new Uint8Array(t,e,r),Object.setPrototypeOf(i,o.prototype),i}function he(t){if(o.isBuffer(t)){const e=_(t.length)|0,r=h(e);return r.length===0||t.copy(r,0,0,e),r}if(t.length!==void 0)return typeof t.length!="number"||xe(t.length)?h(0):C(t);if(t.type==="Buffer"&&Array.isArray(t.data))return C(t.data)}function _(t){if(t>=x)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+x.toString(16)+" bytes");return t|0}function fe(t){return+t!=t&&(t=0),o.alloc(+t)}o.isBuffer=function(e){return e!=null&&e._isBuffer===!0&&e!==o.prototype},o.compare=function(e,r){if(D(e,Uint8Array)&&(e=o.from(e,e.offset,e.byteLength)),D(r,Uint8Array)&&(r=o.from(r,r.offset,r.byteLength)),!o.isBuffer(e)||!o.isBuffer(r))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===r)return 0;let i=e.length,n=r.length;for(let s=0,a=Math.min(i,n);s<a;++s)if(e[s]!==r[s]){i=e[s],n=r[s];break}return i<n?-1:n<i?1:0},o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.concat=function(e,r){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(e.length===0)return o.alloc(0);let i;if(r===void 0)for(r=0,i=0;i<e.length;++i)r+=e[i].length;const n=o.allocUnsafe(r);let s=0;for(i=0;i<e.length;++i){let a=e[i];if(D(a,Uint8Array))s+a.length>n.length?(o.isBuffer(a)||(a=o.from(a)),a.copy(n,s)):Uint8Array.prototype.set.call(n,a,s);else if(o.isBuffer(a))a.copy(n,s);else throw new TypeError('"list" argument must be an Array of Buffers');s+=a.length}return n};function U(t,e){if(o.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||D(t,ArrayBuffer))return t.byteLength;if(typeof t!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);const r=t.length,i=arguments.length>2&&arguments[2]===!0;if(!i&&r===0)return 0;let n=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return me(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return r*2;case"hex":return r>>>1;case"base64":return Ne(t).length;default:if(n)return i?-1:me(t).length;e=(""+e).toLowerCase(),n=!0}}o.byteLength=U;function pe(t,e,r){let i=!1;if((e===void 0||e<0)&&(e=0),e>this.length||((r===void 0||r>this.length)&&(r=this.length),r<=0)||(r>>>=0,e>>>=0,r<=e))return"";for(t||(t="utf8");;)switch(t){case"hex":return Ge(this,e,r);case"utf8":case"utf-8":return Z(this,e,r);case"ascii":return Oe(this,e,r);case"latin1":case"binary":return Ve(this,e,r);case"base64":return k(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Ye(this,e,r);default:if(i)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),i=!0}}o.prototype._isBuffer=!0;function P(t,e,r){const i=t[e];t[e]=t[r],t[r]=i}o.prototype.swap16=function(){const e=this.length;if(e%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let r=0;r<e;r+=2)P(this,r,r+1);return this},o.prototype.swap32=function(){const e=this.length;if(e%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let r=0;r<e;r+=4)P(this,r,r+3),P(this,r+1,r+2);return this},o.prototype.swap64=function(){const e=this.length;if(e%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let r=0;r<e;r+=8)P(this,r,r+7),P(this,r+1,r+6),P(this,r+2,r+5),P(this,r+3,r+4);return this},o.prototype.toString=function(){const e=this.length;return e===0?"":arguments.length===0?Z(this,0,e):pe.apply(this,arguments)},o.prototype.toLocaleString=o.prototype.toString,o.prototype.equals=function(e){if(!o.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e?!0:o.compare(this,e)===0},o.prototype.inspect=function(){let e="";const r=c.INSPECT_MAX_BYTES;return e=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(e+=" ... "),"<Buffer "+e+">"},m&&(o.prototype[m]=o.prototype.inspect),o.prototype.compare=function(e,r,i,n,s){if(D(e,Uint8Array)&&(e=o.from(e,e.offset,e.byteLength)),!o.isBuffer(e))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(r===void 0&&(r=0),i===void 0&&(i=e?e.length:0),n===void 0&&(n=0),s===void 0&&(s=this.length),r<0||i>e.length||n<0||s>this.length)throw new RangeError("out of range index");if(n>=s&&r>=i)return 0;if(n>=s)return-1;if(r>=i)return 1;if(r>>>=0,i>>>=0,n>>>=0,s>>>=0,this===e)return 0;let a=s-n,d=i-r;const I=Math.min(a,d),E=this.slice(n,s),F=e.slice(r,i);for(let g=0;g<I;++g)if(E[g]!==F[g]){a=E[g],d=F[g];break}return a<d?-1:d<a?1:0};function K(t,e,r,i,n){if(t.length===0)return-1;if(typeof r=="string"?(i=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,xe(r)&&(r=n?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(n)return-1;r=t.length-1}else if(r<0)if(n)r=0;else return-1;if(typeof e=="string"&&(e=o.from(e,i)),o.isBuffer(e))return e.length===0?-1:Q(t,e,r,i,n);if(typeof e=="number")return e=e&255,typeof Uint8Array.prototype.indexOf=="function"?n?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):Q(t,[e],r,i,n);throw new TypeError("val must be string, number or Buffer")}function Q(t,e,r,i,n){let s=1,a=t.length,d=e.length;if(i!==void 0&&(i=String(i).toLowerCase(),i==="ucs2"||i==="ucs-2"||i==="utf16le"||i==="utf-16le")){if(t.length<2||e.length<2)return-1;s=2,a/=2,d/=2,r/=2}function I(F,g){return s===1?F[g]:F.readUInt16BE(g*s)}let E;if(n){let F=-1;for(E=r;E<a;E++)if(I(t,E)===I(e,F===-1?0:E-F)){if(F===-1&&(F=E),E-F+1===d)return F*s}else F!==-1&&(E-=E-F),F=-1}else for(r+d>a&&(r=a-d),E=r;E>=0;E--){let F=!0;for(let g=0;g<d;g++)if(I(t,E+g)!==I(e,g)){F=!1;break}if(F)return E}return-1}o.prototype.includes=function(e,r,i){return this.indexOf(e,r,i)!==-1},o.prototype.indexOf=function(e,r,i){return K(this,e,r,i,!0)},o.prototype.lastIndexOf=function(e,r,i){return K(this,e,r,i,!1)};function te(t,e,r,i){r=Number(r)||0;const n=t.length-r;i?(i=Number(i),i>n&&(i=n)):i=n;const s=e.length;i>s/2&&(i=s/2);let a;for(a=0;a<i;++a){const d=parseInt(e.substr(a*2,2),16);if(xe(d))return a;t[r+a]=d}return a}function ie(t,e,r,i){return se(me(e,t.length-r),t,r,i)}function ne(t,e,r,i){return se(Je(e),t,r,i)}function B(t,e,r,i){return se(Ne(e),t,r,i)}function N(t,e,r,i){return se(Xe(e,t.length-r),t,r,i)}o.prototype.write=function(e,r,i,n){if(r===void 0)n="utf8",i=this.length,r=0;else if(i===void 0&&typeof r=="string")n=r,i=this.length,r=0;else if(isFinite(r))r=r>>>0,isFinite(i)?(i=i>>>0,n===void 0&&(n="utf8")):(n=i,i=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");const s=this.length-r;if((i===void 0||i>s)&&(i=s),e.length>0&&(i<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");let a=!1;for(;;)switch(n){case"hex":return te(this,e,r,i);case"utf8":case"utf-8":return ie(this,e,r,i);case"ascii":case"latin1":case"binary":return ne(this,e,r,i);case"base64":return B(this,e,r,i);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return N(this,e,r,i);default:if(a)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),a=!0}},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function k(t,e,r){return e===0&&r===t.length?l.fromByteArray(t):l.fromByteArray(t.slice(e,r))}function Z(t,e,r){r=Math.min(t.length,r);const i=[];let n=e;for(;n<r;){const s=t[n];let a=null,d=s>239?4:s>223?3:s>191?2:1;if(n+d<=r){let I,E,F,g;switch(d){case 1:s<128&&(a=s);break;case 2:I=t[n+1],(I&192)===128&&(g=(s&31)<<6|I&63,g>127&&(a=g));break;case 3:I=t[n+1],E=t[n+2],(I&192)===128&&(E&192)===128&&(g=(s&15)<<12|(I&63)<<6|E&63,g>2047&&(g<55296||g>57343)&&(a=g));break;case 4:I=t[n+1],E=t[n+2],F=t[n+3],(I&192)===128&&(E&192)===128&&(F&192)===128&&(g=(s&15)<<18|(I&63)<<12|(E&63)<<6|F&63,g>65535&&g<1114112&&(a=g))}}a===null?(a=65533,d=1):a>65535&&(a-=65536,i.push(a>>>10&1023|55296),a=56320|a&1023),i.push(a),n+=d}return oe(i)}const M=4096;function oe(t){const e=t.length;if(e<=M)return String.fromCharCode.apply(String,t);let r="",i=0;for(;i<e;)r+=String.fromCharCode.apply(String,t.slice(i,i+=M));return r}function Oe(t,e,r){let i="";r=Math.min(t.length,r);for(let n=e;n<r;++n)i+=String.fromCharCode(t[n]&127);return i}function Ve(t,e,r){let i="";r=Math.min(t.length,r);for(let n=e;n<r;++n)i+=String.fromCharCode(t[n]);return i}function Ge(t,e,r){const i=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>i)&&(r=i);let n="";for(let s=e;s<r;++s)n+=Ke[t[s]];return n}function Ye(t,e,r){const i=t.slice(e,r);let n="";for(let s=0;s<i.length-1;s+=2)n+=String.fromCharCode(i[s]+i[s+1]*256);return n}o.prototype.slice=function(e,r){const i=this.length;e=~~e,r=r===void 0?i:~~r,e<0?(e+=i,e<0&&(e=0)):e>i&&(e=i),r<0?(r+=i,r<0&&(r=0)):r>i&&(r=i),r<e&&(r=e);const n=this.subarray(e,r);return Object.setPrototypeOf(n,o.prototype),n};function b(t,e,r){if(t%1!==0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}o.prototype.readUintLE=o.prototype.readUIntLE=function(e,r,i){e=e>>>0,r=r>>>0,i||b(e,r,this.length);let n=this[e],s=1,a=0;for(;++a<r&&(s*=256);)n+=this[e+a]*s;return n},o.prototype.readUintBE=o.prototype.readUIntBE=function(e,r,i){e=e>>>0,r=r>>>0,i||b(e,r,this.length);let n=this[e+--r],s=1;for(;r>0&&(s*=256);)n+=this[e+--r]*s;return n},o.prototype.readUint8=o.prototype.readUInt8=function(e,r){return e=e>>>0,r||b(e,1,this.length),this[e]},o.prototype.readUint16LE=o.prototype.readUInt16LE=function(e,r){return e=e>>>0,r||b(e,2,this.length),this[e]|this[e+1]<<8},o.prototype.readUint16BE=o.prototype.readUInt16BE=function(e,r){return e=e>>>0,r||b(e,2,this.length),this[e]<<8|this[e+1]},o.prototype.readUint32LE=o.prototype.readUInt32LE=function(e,r){return e=e>>>0,r||b(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+this[e+3]*16777216},o.prototype.readUint32BE=o.prototype.readUInt32BE=function(e,r){return e=e>>>0,r||b(e,4,this.length),this[e]*16777216+(this[e+1]<<16|this[e+2]<<8|this[e+3])},o.prototype.readBigUInt64LE=q(function(e){e=e>>>0,z(e,"offset");const r=this[e],i=this[e+7];(r===void 0||i===void 0)&&v(e,this.length-8);const n=r+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24,s=this[++e]+this[++e]*2**8+this[++e]*2**16+i*2**24;return BigInt(n)+(BigInt(s)<<BigInt(32))}),o.prototype.readBigUInt64BE=q(function(e){e=e>>>0,z(e,"offset");const r=this[e],i=this[e+7];(r===void 0||i===void 0)&&v(e,this.length-8);const n=r*2**24+this[++e]*2**16+this[++e]*2**8+this[++e],s=this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+i;return(BigInt(n)<<BigInt(32))+BigInt(s)}),o.prototype.readIntLE=function(e,r,i){e=e>>>0,r=r>>>0,i||b(e,r,this.length);let n=this[e],s=1,a=0;for(;++a<r&&(s*=256);)n+=this[e+a]*s;return s*=128,n>=s&&(n-=Math.pow(2,8*r)),n},o.prototype.readIntBE=function(e,r,i){e=e>>>0,r=r>>>0,i||b(e,r,this.length);let n=r,s=1,a=this[e+--n];for(;n>0&&(s*=256);)a+=this[e+--n]*s;return s*=128,a>=s&&(a-=Math.pow(2,8*r)),a},o.prototype.readInt8=function(e,r){return e=e>>>0,r||b(e,1,this.length),this[e]&128?(255-this[e]+1)*-1:this[e]},o.prototype.readInt16LE=function(e,r){e=e>>>0,r||b(e,2,this.length);const i=this[e]|this[e+1]<<8;return i&32768?i|4294901760:i},o.prototype.readInt16BE=function(e,r){e=e>>>0,r||b(e,2,this.length);const i=this[e+1]|this[e]<<8;return i&32768?i|4294901760:i},o.prototype.readInt32LE=function(e,r){return e=e>>>0,r||b(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},o.prototype.readInt32BE=function(e,r){return e=e>>>0,r||b(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},o.prototype.readBigInt64LE=q(function(e){e=e>>>0,z(e,"offset");const r=this[e],i=this[e+7];(r===void 0||i===void 0)&&v(e,this.length-8);const n=this[e+4]+this[e+5]*2**8+this[e+6]*2**16+(i<<24);return(BigInt(n)<<BigInt(32))+BigInt(r+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24)}),o.prototype.readBigInt64BE=q(function(e){e=e>>>0,z(e,"offset");const r=this[e],i=this[e+7];(r===void 0||i===void 0)&&v(e,this.length-8);const n=(r<<24)+this[++e]*2**16+this[++e]*2**8+this[++e];return(BigInt(n)<<BigInt(32))+BigInt(this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+i)}),o.prototype.readFloatLE=function(e,r){return e=e>>>0,r||b(e,4,this.length),f.read(this,e,!0,23,4)},o.prototype.readFloatBE=function(e,r){return e=e>>>0,r||b(e,4,this.length),f.read(this,e,!1,23,4)},o.prototype.readDoubleLE=function(e,r){return e=e>>>0,r||b(e,8,this.length),f.read(this,e,!0,52,8)},o.prototype.readDoubleBE=function(e,r){return e=e>>>0,r||b(e,8,this.length),f.read(this,e,!1,52,8)};function S(t,e,r,i,n,s){if(!o.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>n||e<s)throw new RangeError('"value" argument is out of bounds');if(r+i>t.length)throw new RangeError("Index out of range")}o.prototype.writeUintLE=o.prototype.writeUIntLE=function(e,r,i,n){if(e=+e,r=r>>>0,i=i>>>0,!n){const d=Math.pow(2,8*i)-1;S(this,e,r,i,d,0)}let s=1,a=0;for(this[r]=e&255;++a<i&&(s*=256);)this[r+a]=e/s&255;return r+i},o.prototype.writeUintBE=o.prototype.writeUIntBE=function(e,r,i,n){if(e=+e,r=r>>>0,i=i>>>0,!n){const d=Math.pow(2,8*i)-1;S(this,e,r,i,d,0)}let s=i-1,a=1;for(this[r+s]=e&255;--s>=0&&(a*=256);)this[r+s]=e/a&255;return r+i},o.prototype.writeUint8=o.prototype.writeUInt8=function(e,r,i){return e=+e,r=r>>>0,i||S(this,e,r,1,255,0),this[r]=e&255,r+1},o.prototype.writeUint16LE=o.prototype.writeUInt16LE=function(e,r,i){return e=+e,r=r>>>0,i||S(this,e,r,2,65535,0),this[r]=e&255,this[r+1]=e>>>8,r+2},o.prototype.writeUint16BE=o.prototype.writeUInt16BE=function(e,r,i){return e=+e,r=r>>>0,i||S(this,e,r,2,65535,0),this[r]=e>>>8,this[r+1]=e&255,r+2},o.prototype.writeUint32LE=o.prototype.writeUInt32LE=function(e,r,i){return e=+e,r=r>>>0,i||S(this,e,r,4,4294967295,0),this[r+3]=e>>>24,this[r+2]=e>>>16,this[r+1]=e>>>8,this[r]=e&255,r+4},o.prototype.writeUint32BE=o.prototype.writeUInt32BE=function(e,r,i){return e=+e,r=r>>>0,i||S(this,e,r,4,4294967295,0),this[r]=e>>>24,this[r+1]=e>>>16,this[r+2]=e>>>8,this[r+3]=e&255,r+4};function Ee(t,e,r,i,n){Ce(e,i,n,t,r,7);let s=Number(e&BigInt(4294967295));t[r++]=s,s=s>>8,t[r++]=s,s=s>>8,t[r++]=s,s=s>>8,t[r++]=s;let a=Number(e>>BigInt(32)&BigInt(4294967295));return t[r++]=a,a=a>>8,t[r++]=a,a=a>>8,t[r++]=a,a=a>>8,t[r++]=a,r}function Ie(t,e,r,i,n){Ce(e,i,n,t,r,7);let s=Number(e&BigInt(4294967295));t[r+7]=s,s=s>>8,t[r+6]=s,s=s>>8,t[r+5]=s,s=s>>8,t[r+4]=s;let a=Number(e>>BigInt(32)&BigInt(4294967295));return t[r+3]=a,a=a>>8,t[r+2]=a,a=a>>8,t[r+1]=a,a=a>>8,t[r]=a,r+8}o.prototype.writeBigUInt64LE=q(function(e,r=0){return Ee(this,e,r,BigInt(0),BigInt("0xffffffffffffffff"))}),o.prototype.writeBigUInt64BE=q(function(e,r=0){return Ie(this,e,r,BigInt(0),BigInt("0xffffffffffffffff"))}),o.prototype.writeIntLE=function(e,r,i,n){if(e=+e,r=r>>>0,!n){const I=Math.pow(2,8*i-1);S(this,e,r,i,I-1,-I)}let s=0,a=1,d=0;for(this[r]=e&255;++s<i&&(a*=256);)e<0&&d===0&&this[r+s-1]!==0&&(d=1),this[r+s]=(e/a>>0)-d&255;return r+i},o.prototype.writeIntBE=function(e,r,i,n){if(e=+e,r=r>>>0,!n){const I=Math.pow(2,8*i-1);S(this,e,r,i,I-1,-I)}let s=i-1,a=1,d=0;for(this[r+s]=e&255;--s>=0&&(a*=256);)e<0&&d===0&&this[r+s+1]!==0&&(d=1),this[r+s]=(e/a>>0)-d&255;return r+i},o.prototype.writeInt8=function(e,r,i){return e=+e,r=r>>>0,i||S(this,e,r,1,127,-128),e<0&&(e=255+e+1),this[r]=e&255,r+1},o.prototype.writeInt16LE=function(e,r,i){return e=+e,r=r>>>0,i||S(this,e,r,2,32767,-32768),this[r]=e&255,this[r+1]=e>>>8,r+2},o.prototype.writeInt16BE=function(e,r,i){return e=+e,r=r>>>0,i||S(this,e,r,2,32767,-32768),this[r]=e>>>8,this[r+1]=e&255,r+2},o.prototype.writeInt32LE=function(e,r,i){return e=+e,r=r>>>0,i||S(this,e,r,4,2147483647,-2147483648),this[r]=e&255,this[r+1]=e>>>8,this[r+2]=e>>>16,this[r+3]=e>>>24,r+4},o.prototype.writeInt32BE=function(e,r,i){return e=+e,r=r>>>0,i||S(this,e,r,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[r]=e>>>24,this[r+1]=e>>>16,this[r+2]=e>>>8,this[r+3]=e&255,r+4},o.prototype.writeBigInt64LE=q(function(e,r=0){return Ee(this,e,r,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),o.prototype.writeBigInt64BE=q(function(e,r=0){return Ie(this,e,r,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function Fe(t,e,r,i,n,s){if(r+i>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function Ae(t,e,r,i,n){return e=+e,r=r>>>0,n||Fe(t,e,r,4),f.write(t,e,r,i,23,4),r+4}o.prototype.writeFloatLE=function(e,r,i){return Ae(this,e,r,!0,i)},o.prototype.writeFloatBE=function(e,r,i){return Ae(this,e,r,!1,i)};function Ue(t,e,r,i,n){return e=+e,r=r>>>0,n||Fe(t,e,r,8),f.write(t,e,r,i,52,8),r+8}o.prototype.writeDoubleLE=function(e,r,i){return Ue(this,e,r,!0,i)},o.prototype.writeDoubleBE=function(e,r,i){return Ue(this,e,r,!1,i)},o.prototype.copy=function(e,r,i,n){if(!o.isBuffer(e))throw new TypeError("argument should be a Buffer");if(i||(i=0),!n&&n!==0&&(n=this.length),r>=e.length&&(r=e.length),r||(r=0),n>0&&n<i&&(n=i),n===i||e.length===0||this.length===0)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(i<0||i>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-r<n-i&&(n=e.length-r+i);const s=n-i;return this===e&&typeof Uint8Array.prototype.copyWithin=="function"?this.copyWithin(r,i,n):Uint8Array.prototype.set.call(e,this.subarray(i,n),r),s},o.prototype.fill=function(e,r,i,n){if(typeof e=="string"){if(typeof r=="string"?(n=r,r=0,i=this.length):typeof i=="string"&&(n=i,i=this.length),n!==void 0&&typeof n!="string")throw new TypeError("encoding must be a string");if(typeof n=="string"&&!o.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(e.length===1){const a=e.charCodeAt(0);(n==="utf8"&&a<128||n==="latin1")&&(e=a)}}else typeof e=="number"?e=e&255:typeof e=="boolean"&&(e=Number(e));if(r<0||this.length<r||this.length<i)throw new RangeError("Out of range index");if(i<=r)return this;r=r>>>0,i=i===void 0?this.length:i>>>0,e||(e=0);let s;if(typeof e=="number")for(s=r;s<i;++s)this[s]=e;else{const a=o.isBuffer(e)?e:o.from(e,n),d=a.length;if(d===0)throw new TypeError('The value "'+e+'" is invalid for argument "value"');for(s=0;s<i-r;++s)this[s+r]=a[s%d]}return this};const Y={};function de(t,e,r){Y[t]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name}get code(){return t}set code(n){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:n,writable:!0})}toString(){return`${this.name} [${t}]: ${this.message}`}}}de("ERR_BUFFER_OUT_OF_BOUNDS",function(t){return t?`${t} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError),de("ERR_INVALID_ARG_TYPE",function(t,e){return`The "${t}" argument must be of type number. Received type ${typeof e}`},TypeError),de("ERR_OUT_OF_RANGE",function(t,e,r){let i=`The value of "${t}" is out of range.`,n=r;return Number.isInteger(r)&&Math.abs(r)>2**32?n=be(String(r)):typeof r=="bigint"&&(n=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(n=be(n)),n+="n"),i+=` It must be ${e}. Received ${n}`,i},RangeError);function be(t){let e="",r=t.length;const i=t[0]==="-"?1:0;for(;r>=i+4;r-=3)e=`_${t.slice(r-3,r)}${e}`;return`${t.slice(0,r)}${e}`}function ze(t,e,r){z(e,"offset"),(t[e]===void 0||t[e+r]===void 0)&&v(e,t.length-(r+1))}function Ce(t,e,r,i,n,s){if(t>r||t<e){const a=typeof e=="bigint"?"n":"";let d;throw s>3?e===0||e===BigInt(0)?d=`>= 0${a} and < 2${a} ** ${(s+1)*8}${a}`:d=`>= -(2${a} ** ${(s+1)*8-1}${a}) and < 2 ** ${(s+1)*8-1}${a}`:d=`>= ${e}${a} and <= ${r}${a}`,new Y.ERR_OUT_OF_RANGE("value",d,t)}ze(i,n,s)}function z(t,e){if(typeof t!="number")throw new Y.ERR_INVALID_ARG_TYPE(e,"number",t)}function v(t,e,r){throw Math.floor(t)!==t?(z(t,r),new Y.ERR_OUT_OF_RANGE(r||"offset","an integer",t)):e<0?new Y.ERR_BUFFER_OUT_OF_BOUNDS:new Y.ERR_OUT_OF_RANGE(r||"offset",`>= ${r?1:0} and <= ${e}`,t)}const We=/[^+/0-9A-Za-z-_]/g;function He(t){if(t=t.split("=")[0],t=t.trim().replace(We,""),t.length<2)return"";for(;t.length%4!==0;)t=t+"=";return t}function me(t,e){e=e||1/0;let r;const i=t.length;let n=null;const s=[];for(let a=0;a<i;++a){if(r=t.charCodeAt(a),r>55295&&r<57344){if(!n){if(r>56319){(e-=3)>-1&&s.push(239,191,189);continue}else if(a+1===i){(e-=3)>-1&&s.push(239,191,189);continue}n=r;continue}if(r<56320){(e-=3)>-1&&s.push(239,191,189),n=r;continue}r=(n-55296<<10|r-56320)+65536}else n&&(e-=3)>-1&&s.push(239,191,189);if(n=null,r<128){if((e-=1)<0)break;s.push(r)}else if(r<2048){if((e-=2)<0)break;s.push(r>>6|192,r&63|128)}else if(r<65536){if((e-=3)<0)break;s.push(r>>12|224,r>>6&63|128,r&63|128)}else if(r<1114112){if((e-=4)<0)break;s.push(r>>18|240,r>>12&63|128,r>>6&63|128,r&63|128)}else throw new Error("Invalid code point")}return s}function Je(t){const e=[];for(let r=0;r<t.length;++r)e.push(t.charCodeAt(r)&255);return e}function Xe(t,e){let r,i,n;const s=[];for(let a=0;a<t.length&&!((e-=2)<0);++a)r=t.charCodeAt(a),i=r>>8,n=r%256,s.push(n),s.push(i);return s}function Ne(t){return l.toByteArray(He(t))}function se(t,e,r,i){let n;for(n=0;n<i&&!(n+r>=e.length||n>=t.length);++n)e[n+r]=t[n];return n}function D(t,e){return t instanceof e||t!=null&&t.constructor!=null&&t.constructor.name!=null&&t.constructor.name===e.name}function xe(t){return t!==t}const Ke=function(){const t="0123456789abcdef",e=new Array(256);for(let r=0;r<16;++r){const i=r*16;for(let n=0;n<16;++n)e[i+n]=t[r]+t[n]}return e}();function q(t){return typeof BigInt>"u"?Qe:t}function Qe(){throw new Error("BigInt not supported")}})(ur);const wr=new ue,gr=async c=>{try{const l=new FormData;return l.append("id",c.id),l.append("email",c.email),l.append("password",c.password),l.append("name",c.name),l.append("mobile",c.mobile),l.append("status",c.status),c.image&&c.image instanceof File&&l.append("image",c.image),await wr.updateUserDetails(l)}catch(l){throw l}},Br={confirmCheckbox:!1},ce=or(sr),Er=({id:c})=>{const l=ge(),f=Se(),m=new ue,{control:x,setError:p,handleSubmit:h,formState:{errors:o}}=De({defaultValues:Br}),y=async()=>{const w=await ce.fire({title:"Are you sure?",text:"Are you sure you would like to deactivate  account?",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, delete it!",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-danger ms-1"},buttonsStyling:!1});if(w.value)try{l(re(!0)),await m.deleteUserAccount(c),l(re(!1)),ce.fire({icon:"success",title:"Deleted!",text:"Account has been deactivated.",customClass:{confirmButton:"btn btn-success"}}),f(ke())}catch(A){console.log(A)}else w.dismiss===ce.DismissReason.cancel&&ce.fire({title:"Cancelled",text:"Deactivation Cancelled!!",icon:"error",customClass:{confirmButton:"btn btn-success"}})},j=w=>{w.confirmCheckbox===!0?y():p("confirmCheckbox",{type:"manual"})};return u.jsxs(Le,{children:[u.jsx(Pe,{className:"border-bottom",children:u.jsx(Me,{tag:"h4",children:"Delete Account"})}),u.jsxs(_e,{className:"py-2 my-25",children:[u.jsxs(nr,{color:"warning",children:[u.jsx("h4",{className:"alert-heading",children:"Are you sure you want to delete your account?"}),u.jsx("div",{className:"alert-body fw-normal",children:"Once you delete your account, there is no going back. Please be certain."})]}),u.jsxs($e,{onSubmit:h(j),children:[u.jsxs("div",{className:"form-check",children:[u.jsx(H,{control:x,name:"confirmCheckbox",render:({field:w})=>u.jsx(X,{...w,type:"checkbox",id:"confirmCheckbox",checked:w.value,invalid:o.confirmCheckbox&&!0})}),u.jsx(G,{for:"confirmCheckbox",className:Ze("form-check-label",{"text-danger":o&&o.confirmCheckbox}),children:"I confirm my account deactivation"}),o&&o.confirmCheckbox&&u.jsx(J,{children:"Please confirm that you want to delete account"})]}),u.jsx("div",{className:"mt-1",children:u.jsx(ee,{color:"danger",children:"Deactivate Account"})})]})]})]})},Ir=({redux:c})=>{var K,Q,te,ie,ne;const[l,f]=$.useState(!1),m=[{value:1,label:"Active"},{value:0,label:"Inactive"}],[x,p]=$.useState(""),[h,o]=$.useState(null),[y,j]=$.useState(""),w=ge(),A=new ue,{id:T}=Re(),C=B=>{const N=B.target.files;if(N.length>0){o(N[0]);const k=new FileReader;k.onload=function(){j(k.result)},k.readAsDataURL(N[0])}else o(null),j("")},O=()=>{p("")};$.useEffect(()=>{var N,k;const B=y||((N=c.profile)!=null&&N.image?`${A.baseurl()}${(k=c.profile)==null?void 0:k.image}`:er);p(B)},[(K=c.profile)==null?void 0:K.image,y]);const V=je().shape({name:ae().required("Name is required"),email:ae().required("Valid email required"),password:ae().required("Password required"),mobile:ae().required("mobile required"),status:je().transform((B,N)=>N??B).typeError("Status is required")}),{reset:he,control:_,handleSubmit:fe,formState:{errors:U}}=De({resolver:ar(V)}),pe=async B=>{var N,k,Z;f(!0);try{const M={id:T,email:B.email,password:B.password,name:B.name,mobile:B.mobile,status:parseInt((N=B.status)==null?void 0:N.value,10)};h?M.image=h:(k=c.profile)!=null&&k.image?M.image=(Z=c.profile)==null?void 0:Z.image:M.image="";const oe=await gr(M);oe.status===201&&(f(!1),localStorage.setItem("lastUpdated",Date.now()),w(Te(oe.data)),ve(u.jsxs("div",{className:"d-flex",children:[u.jsx("div",{className:"me-1",children:u.jsx(tr,{size:"sm",color:"success",icon:u.jsx(cr,{size:12})})}),u.jsxs("div",{className:"d-flex flex-column",children:[u.jsx("h6",{children:"Form Submitted!"}),u.jsx("div",{}),u.jsx("span",{children:"You have successfully updated the User details!"})]})]})))}catch(M){console.error(M)}finally{f(!1)}},P=()=>{he({email:"",mobile:"",password:"",name:""})};return u.jsxs($.Fragment,{children:[u.jsxs(Le,{children:[u.jsx(Pe,{className:"border-bottom",children:u.jsx(Me,{tag:"h4",children:"Edit User Details"})}),u.jsxs(_e,{className:"py-2 my-25",children:[u.jsxs("div",{className:"d-flex",children:[u.jsx("div",{className:"me-25",children:u.jsx("img",{className:"rounded me-50",src:x,alt:"Generic placeholder image",height:"70",width:"100"})}),u.jsx("div",{className:"d-flex align-items-end mt-75 ms-1",children:u.jsxs("div",{children:[u.jsxs(ee,{tag:G,className:"mb-75 me-75",size:"sm",color:"primary",children:["Upload",u.jsx(X,{type:"file",onChange:C,hidden:!0,accept:"image/*"})]}),u.jsx(ee,{className:"mb-75",color:"secondary",size:"sm",outline:!0,onClick:O,children:"Reset"}),u.jsx("p",{className:"mb-0",children:"Allowed JPG, GIF or PNG. Max size of 800kB"})]})})]}),u.jsxs($e,{className:"mt-2 pt-50",onSubmit:fe(pe),children:[u.jsxs("div",{className:"mb-1",children:[u.jsx(G,{className:"form-label",for:"NameAsync",children:"Name"}),u.jsx(H,{defaultValue:((Q=c.profile)==null?void 0:Q.name)||"",control:_,rules:{required:"Name is required"},id:"NameAsync",name:"name",render:({field:B})=>u.jsx(X,{...B,placeholder:"Name",invalid:U.name&&!0})}),U.name&&u.jsx(J,{children:U.name.message})]}),u.jsxs("div",{className:"mb-1",children:[u.jsx(G,{className:"form-label",for:"mobileAsync",children:"Mobile Phone"}),u.jsx(H,{defaultValue:((te=c.profile)==null?void 0:te.mobile)||"",control:_,rules:{required:"Mobile is required"},id:"mobileAsync",name:"mobile",render:({field:B})=>u.jsx(X,{...B,placeholder:"Phone",type:"mobile",invalid:U.mobile&&!0})}),U.mobile&&u.jsx(J,{children:U.mobile.message})]}),u.jsxs("div",{className:"mb-1",children:[u.jsx(G,{className:"form-label",for:"emailAsync",children:"Email"}),u.jsx(H,{name:"email",id:"emailAsync",defaultValue:((ie=c.profile)==null?void 0:ie.email)||"",control:_,rules:{required:"Email is required"},render:({field:B})=>u.jsx(X,{...B,type:"email",placeholder:"example@email.com",invalid:U.email&&!0})}),U.email&&u.jsx(J,{children:U.email.message})]}),u.jsxs("div",{className:"mb-1",children:[u.jsx(G,{className:"form-label",for:"passwordAsync",children:"Password"}),u.jsx(H,{defaultValue:((ne=c.profile)==null?void 0:ne.password)||"",control:_,rules:{required:"Password is required"},id:"passwordAsync",name:"password",render:({field:B})=>u.jsx(X,{...B,type:"password",placeholder:"Password",invalid:U.password&&!0})}),U.password&&u.jsx(J,{children:U.password.message})]}),u.jsxs("div",{className:"mb-1",children:[u.jsx(G,{className:"form-label",for:"statusAsync",children:"Status"}),u.jsx(H,{name:"status",id:"statusAsync",control:_,defaultValue:m.find(B=>{var N;return B.value===(c.profile&&parseInt((N=c.profile)==null?void 0:N.status,10))}),render:({field:B})=>u.jsx(ir,{options:m,classNamePrefix:"select",className:U.status?"isInvalid":"none",theme:rr,...B,value:B.value}),autocomplete:"off"}),U.status&&u.jsx(J,{style:{display:"flex"},children:U.status.message})]}),u.jsxs("div",{className:"d-flex",children:[u.jsx(ee,{className:"me-1",color:"primary",disabled:l,type:"submit",children:"Submit"}),u.jsx(ee,{outline:!0,color:"secondary",type:"reset",onClick:P,children:"Reset"})]}),u.jsx("div",{id:"loading-overlay",style:{display:l?"flex":"none"},children:u.jsx("div",{className:"loader"})})]})]})]}),u.jsx(Er,{id:T})]})},Fr=({dataVersion:c})=>{const l=Se(),{id:f}=Re(),m=ge(),x=new ue;we(h=>h.userProfile.userData),we(h=>h.userProfile.version);const p=$.useCallback(async()=>{try{m(re(!0));const o=(await x.getUserData(f)).data[0];m(Te(o)),m(re(!1))}catch(h){console.log(h),h.response.status===404?l(ke()):console.log("Error",h.message),m(re(!1))}},[f,m]);return $.useEffect(()=>{p()},[p]),$.useEffect(()=>{const h=o=>{o.key==="lastUpdated"&&p()};return window.addEventListener("storage",h),()=>{window.removeEventListener("storage",h)}},[p]),null},qr=()=>{const c=we(f=>f.userProfile),l=c.loading;return u.jsxs("div",{children:[u.jsx(Fr,{dataVersion:c.version,redux:c}),l?u.jsx("div",{id:"loading-overlay",style:{display:"flex"},children:u.jsx("div",{className:"loader"})}):u.jsx(Ir,{dataVersion:c.version,redux:c})]})};export{qr as default};
