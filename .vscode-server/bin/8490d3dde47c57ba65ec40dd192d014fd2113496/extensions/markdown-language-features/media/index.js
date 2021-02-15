!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getSettings=t.getData=void 0;let o=void 0;function i(e){const t=document.getElementById("vscode-markdown-preview-data");if(t){const n=t.getAttribute(e);if(n)return JSON.parse(n)}throw new Error("Could not load data for "+e)}t.getData=i,t.getSettings=function(){if(o)return o;if(o=i("data-settings"),o)return o;throw new Error("Could not load settings")}},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getLineElementForFragment=t.getEditorLineNumberForPageOffset=t.scrollToRevealSourceLine=t.getLineElementsAtPageOffset=t.getElementsForSourceLine=void 0;const o=n(0);function i(e){return t=0,n=o.getSettings().lineCount-1,i=e,Math.min(n,Math.max(t,i));var t,n,i}const r=(()=>{let e;return()=>{if(!e){e=[{element:document.body,line:0}];for(const t of document.getElementsByClassName("code-line")){const n=+t.getAttribute("data-line");isNaN(n)||("CODE"===t.tagName&&t.parentElement&&"PRE"===t.parentElement.tagName?e.push({element:t.parentElement,line:n}):e.push({element:t,line:n}))}}return e}})();function s(e){const t=Math.floor(e),n=r();let o=n[0]||null;for(const e of n){if(e.line===t)return{previous:e,next:void 0};if(e.line>t)return{previous:o,next:e};o=e}return{previous:o}}function a(e){const t=r(),n=e-window.scrollY;let o=-1,i=t.length-1;for(;o+1<i;){const e=Math.floor((o+i)/2),r=c(t[e]);r.top+r.height>=n?i=e:o=e}const s=t[i],a=c(s);if(i>=1&&a.top>n){return{previous:t[o],next:s}}return i>1&&i<t.length&&a.top+a.height>n?{previous:s,next:t[i+1]}:{previous:s}}function c({element:e}){const t=e.getBoundingClientRect(),n=e.querySelector(".code-line");if(n){const e=n.getBoundingClientRect(),o=Math.max(1,e.top-t.top);return{top:t.top,height:o}}return t}t.getElementsForSourceLine=s,t.getLineElementsAtPageOffset=a,t.scrollToRevealSourceLine=function(e){if(!o.getSettings().scrollPreviewWithEditor)return;if(e<=0)return void window.scroll(window.scrollX,0);const{previous:t,next:n}=s(e);if(!t)return;let i=0;const r=c(t),a=r.top;if(n&&n.line!==t.line){i=a+(e-t.line)/(n.line-t.line)*(n.element.getBoundingClientRect().top-a)}else{const t=e-Math.floor(e);i=a+r.height*t}i=Math.abs(i)<1?Math.sign(i):i,window.scroll(window.scrollX,Math.max(1,window.scrollY+i))},t.getEditorLineNumberForPageOffset=function(e){const{previous:t,next:n}=a(e);if(t){const o=c(t),r=e-window.scrollY-o.top;if(n){const e=r/(c(n).top-o.top);return i(t.line+e*(n.line-t.line))}{const e=r/o.height;return i(t.line+e)}}return null},t.getLineElementForFragment=function(e){return r().find(t=>t.element.id===e)}},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});const o=n(7),i=n(8),r=n(9),s=n(2),a=n(0),c=n(10);let u=0;const l=new o.ActiveLineMarker,f=a.getSettings(),d=acquireVsCodeApi(),m=d.getState(),g={..."object"==typeof m?m:{},...a.getData("data-state")};d.setState(g);const p=r.createPosterForVsCode(d);function h(t){const n=document.getElementsByTagName("img");if(n.length>0){const o=Array.from(n).map(e=>e.complete?Promise.resolve():new Promise(t=>{e.addEventListener("load",()=>t()),e.addEventListener("error",()=>t())}));Promise.all(o).then(()=>e(t))}else e(t)}window.cspAlerter.setPoster(p),window.styleLoadingMonitor.setPoster(p),window.onload=()=>{y()},i.onceDocumentLoaded(()=>{const e=g.scrollProgress;"number"!=typeof e||f.fragment?f.scrollPreviewWithEditor&&h(()=>{if(f.fragment){g.fragment=void 0,d.setState(g);const e=s.getLineElementForFragment(f.fragment);e&&(u+=1,s.scrollToRevealSourceLine(e.line))}else isNaN(f.line)||(u+=1,s.scrollToRevealSourceLine(f.line))}):h(()=>{u+=1,window.scrollTo(0,e*document.body.clientHeight)})});const v=(()=>{const e=c(e=>{u+=1,h(()=>s.scrollToRevealSourceLine(e))},50);return t=>{isNaN(t)||(g.line=t,e(t))}})();let y=c(()=>{const e=[];let t=document.getElementsByTagName("img");if(t){let n;for(n=0;n<t.length;n++){const o=t[n];o.classList.contains("loading")&&o.classList.remove("loading"),e.push({id:o.id,height:o.height,width:o.width})}p.postMessage("cacheImageSizes",e)}},50);window.addEventListener("resize",()=>{u+=1,b(),y()},!0),window.addEventListener("message",e=>{if(e.data.source===f.source)switch(e.data.type){case"onDidChangeTextEditorSelection":l.onDidChangeTextEditorSelection(e.data.line);break;case"updateView":v(e.data.line)}},!1),document.addEventListener("dblclick",e=>{if(!f.doubleClickToSwitchToEditor)return;for(let t=e.target;t;t=t.parentNode)if("A"===t.tagName)return;const t=e.pageY,n=s.getEditorLineNumberForPageOffset(t);"number"!=typeof n||isNaN(n)||p.postMessage("didClick",{line:Math.floor(n)})});const w=["http:","https:","mailto:","vscode:","vscode-insiders:"];function b(){g.scrollProgress=window.scrollY/document.body.clientHeight,d.setState(g)}document.addEventListener("click",e=>{if(!e)return;let t=e.target;for(;t;){if(t.tagName&&"A"===t.tagName&&t.href){if(t.getAttribute("href").startsWith("#"))return;let n=t.getAttribute("data-href");if(!n){if(w.some(e=>t.href.startsWith(e)))return;n=t.getAttribute("href")}return/^[a-z\-]+:/i.test(n)?void 0:(p.postMessage("openLink",{href:n}),e.preventDefault(),void e.stopPropagation())}t=t.parentNode}},!0),window.addEventListener("scroll",c(()=>{if(b(),u>0)u-=1;else{const e=s.getEditorLineNumberForPageOffset(window.scrollY);"number"!=typeof e||isNaN(e)||p.postMessage("revealLine",{line:e})}},50))}).call(this,n(4).setImmediate)},function(e,t,n){(function(e){var o=void 0!==e&&e||"undefined"!=typeof self&&self||window,i=Function.prototype.apply;function r(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new r(i.call(setTimeout,o,arguments),clearTimeout)},t.setInterval=function(){return new r(i.call(setInterval,o,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},r.prototype.unref=r.prototype.ref=function(){},r.prototype.close=function(){this._clearFn.call(o,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout((function(){e._onTimeout&&e._onTimeout()}),t))},n(5),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n(1))},function(e,t,n){(function(e,t){!function(e,n){"use strict";if(!e.setImmediate){var o,i,r,s,a,c=1,u={},l=!1,f=e.document,d=Object.getPrototypeOf&&Object.getPrototypeOf(e);d=d&&d.setTimeout?d:e,"[object process]"==={}.toString.call(e.process)?o=function(e){t.nextTick((function(){g(e)}))}:!function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?e.MessageChannel?((r=new MessageChannel).port1.onmessage=function(e){g(e.data)},o=function(e){r.port2.postMessage(e)}):f&&"onreadystatechange"in f.createElement("script")?(i=f.documentElement,o=function(e){var t=f.createElement("script");t.onreadystatechange=function(){g(e),t.onreadystatechange=null,i.removeChild(t),t=null},i.appendChild(t)}):o=function(e){setTimeout(g,0,e)}:(s="setImmediate$"+Math.random()+"$",a=function(t){t.source===e&&"string"==typeof t.data&&0===t.data.indexOf(s)&&g(+t.data.slice(s.length))},e.addEventListener?e.addEventListener("message",a,!1):e.attachEvent("onmessage",a),o=function(t){e.postMessage(s+t,"*")}),d.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var i={callback:e,args:t};return u[c]=i,o(c),c++},d.clearImmediate=m}function m(e){delete u[e]}function g(e){if(l)setTimeout(g,0,e);else{var t=u[e];if(t){l=!0;try{!function(e){var t=e.callback,n=e.args;switch(n.length){case 0:t();break;case 1:t(n[0]);break;case 2:t(n[0],n[1]);break;case 3:t(n[0],n[1],n[2]);break;default:t.apply(void 0,n)}}(t)}finally{m(e),l=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,n(1),n(6))},function(e,t){var n,o,i=e.exports={};function r(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===r||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:r}catch(e){n=r}try{o="function"==typeof clearTimeout?clearTimeout:s}catch(e){o=s}}();var c,u=[],l=!1,f=-1;function d(){l&&c&&(l=!1,c.length?u=c.concat(u):f=-1,u.length&&m())}function m(){if(!l){var e=a(d);l=!0;for(var t=u.length;t;){for(c=u,u=[];++f<t;)c&&c[f].run();f=-1,t=u.length}c=null,l=!1,function(e){if(o===clearTimeout)return clearTimeout(e);if((o===s||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(e);try{o(e)}catch(t){try{return o.call(null,e)}catch(t){return o.call(this,e)}}}(e)}}function g(e,t){this.fun=e,this.array=t}function p(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new g(e,t)),1!==u.length||l||a(m)},g.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=p,i.addListener=p,i.once=p,i.off=p,i.removeListener=p,i.removeAllListeners=p,i.emit=p,i.prependListener=p,i.prependOnceListener=p,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ActiveLineMarker=void 0;const o=n(2);t.ActiveLineMarker=class{onDidChangeTextEditorSelection(e){const{previous:t}=o.getElementsForSourceLine(e);this._update(t&&t.element)}_update(e){this._unmarkActiveElement(this._current),this._markActiveElement(e),this._current=e}_unmarkActiveElement(e){e&&(e.className=e.className.replace(/\bcode-active-line\b/g,""))}_markActiveElement(e){e&&(e.className+=" code-active-line")}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.onceDocumentLoaded=void 0,t.onceDocumentLoaded=function(e){"loading"===document.readyState||"uninitialized"===document.readyState?document.addEventListener("DOMContentLoaded",e):e()}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createPosterForVsCode=void 0;const o=n(0);t.createPosterForVsCode=e=>new class{postMessage(t,n){e.postMessage({type:t,source:o.getSettings().source,body:n})}}},function(e,t,n){(function(t){var n=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,i=/^0b[01]+$/i,r=/^0o[0-7]+$/i,s=parseInt,a="object"==typeof t&&t&&t.Object===Object&&t,c="object"==typeof self&&self&&self.Object===Object&&self,u=a||c||Function("return this")(),l=Object.prototype.toString,f=Math.max,d=Math.min,m=function(){return u.Date.now()};function g(e,t,n){var o,i,r,s,a,c,u=0,l=!1,g=!1,v=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function y(t){var n=o,r=i;return o=i=void 0,u=t,s=e.apply(r,n)}function w(e){return u=e,a=setTimeout(T,t),l?y(e):s}function b(e){var n=e-c;return void 0===c||n>=t||n<0||g&&e-u>=r}function T(){var e=m();if(b(e))return E(e);a=setTimeout(T,function(e){var n=t-(e-c);return g?d(n,r-(e-u)):n}(e))}function E(e){return a=void 0,v&&o?y(e):(o=i=void 0,s)}function L(){var e=m(),n=b(e);if(o=arguments,i=this,c=e,n){if(void 0===a)return w(c);if(g)return a=setTimeout(T,t),y(c)}return void 0===a&&(a=setTimeout(T,t)),s}return t=h(t)||0,p(n)&&(l=!!n.leading,r=(g="maxWait"in n)?f(h(n.maxWait)||0,t):r,v="trailing"in n?!!n.trailing:v),L.cancel=function(){void 0!==a&&clearTimeout(a),u=0,o=c=i=a=void 0},L.flush=function(){return void 0===a?s:E(m())},L}function p(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function h(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==l.call(e)}(e))return NaN;if(p(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=p(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(n,"");var a=i.test(e);return a||r.test(e)?s(e.slice(2),a?2:8):o.test(e)?NaN:+e}e.exports=function(e,t,n){var o=!0,i=!0;if("function"!=typeof e)throw new TypeError("Expected a function");return p(n)&&(o="leading"in n?!!n.leading:o,i="trailing"in n?!!n.trailing:i),g(e,t,{leading:o,maxWait:t,trailing:i})}}).call(this,n(1))}]);