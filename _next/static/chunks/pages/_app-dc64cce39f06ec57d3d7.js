_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[13],{"/0+H":function(e,t,r){"use strict";t.__esModule=!0,t.isInAmpMode=c,t.useAmp=function(){return c(o.default.useContext(a.AmpStateContext))};var n,o=(n=r("q1tI"))&&n.__esModule?n:{default:n},a=r("lwAK");function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,r=void 0!==t&&t,n=e.hybrid,o=void 0!==n&&n,a=e.hasQuery,c=void 0!==a&&a;return r||o&&c}},0:function(e,t,r){r("74v/"),e.exports=r("nOHt")},"2mql":function(e,t,r){"use strict";var n=r("TOwV"),o={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},a={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},c={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},i={};function u(e){return n.isMemo(e)?c:i[e.$$typeof]||o}i[n.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},i[n.Memo]=c;var s=Object.defineProperty,f=Object.getOwnPropertyNames,l=Object.getOwnPropertySymbols,p=Object.getOwnPropertyDescriptor,d=Object.getPrototypeOf,y=Object.prototype;e.exports=function e(t,r,n){if("string"!==typeof r){if(y){var o=d(r);o&&o!==y&&e(t,o,n)}var c=f(r);l&&(c=c.concat(l(r)));for(var i=u(t),b=u(r),m=0;m<c.length;++m){var h=c[m];if(!a[h]&&(!n||!n[h])&&(!b||!b[h])&&(!i||!i[h])){var v=p(r,h);try{s(t,h,v)}catch(O){}}}}return t}},"4qKB":function(e,t,r){"use strict";var n;!function(e){var t,r;e.MIN_SONG_VERSION=1,e.MAX_SONG_VERSION=2;(r=t||(t=e.StoreKeys||(e.StoreKeys={}))).SONG_VERSION="songVersion",r.FILE_TIMESTAMP="fileTimestamp",r.UPDATED_TRACKS_LIST="updatedTracks",r.UPDATED_TRACKS_TIMESTAMP="updatedTracksTimestamp",r.TRACK_NUMBER="trackNumber",r.CHECKBOX_VALUE="checkboxValue",r.TRACK_NUMBER_TO_CHECKBOX_VALUE="trackNumber=>checkboxValue",r.PLAYED_NOTEGROUP_ID="playedNoteGroupID",r.PIANO_TYPE="pianoType",r.GUITAR_TYPE="guitarType";var n,o;e.DEFAULT_DOWNLOAD_DATA="8J+OtQ==";(o=n||(n=e.Instrument||(e.Instrument={}))).GUITAR="guitar",o.UKULELE_HIGH_G="ukulele_high_g",o.UKULELE_LOW_G="ukulele_low_g"}(n||(n={})),t.a=n},"74v/":function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r("cha2")}])},"7W2i":function(e,t,r){var n=r("SksO");e.exports=function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&n(e,t)}},"8Kt/":function(e,t,r){"use strict";r("lSNA");t.__esModule=!0,t.defaultHead=f,t.default=void 0;var n,o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var a=n?Object.getOwnPropertyDescriptor(e,o):null;a&&(a.get||a.set)?Object.defineProperty(r,o,a):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(r("q1tI")),a=(n=r("Xuae"))&&n.__esModule?n:{default:n},c=r("lwAK"),i=r("FYa8"),u=r("/0+H");function s(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function f(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function l(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var p=["name","httpEquiv","charSet","itemProp"];function d(e,t){return e.reduce((function(e,t){var r=o.default.Children.toArray(t.props.children);return e.concat(r)}),[]).reduce(l,[]).reverse().concat(f(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,r=new Set,n={};return function(o){var a=!0;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){var c=o.key.slice(o.key.indexOf("$")+1);e.has(c)?a=!1:e.add(c)}switch(o.type){case"title":case"base":t.has(o.type)?a=!1:t.add(o.type);break;case"meta":for(var i=0,u=p.length;i<u;i++){var s=p[i];if(o.props.hasOwnProperty(s))if("charSet"===s)r.has(s)?a=!1:r.add(s);else{var f=o.props[s],l=n[s]||new Set;l.has(f)?a=!1:(l.add(f),n[s]=l)}}}return a}}()).reverse().map((function(e,t){var r=e.key||t;return o.default.cloneElement(e,{key:r})}))}function y(e){var t=e.children,r=(0,o.useContext)(c.AmpStateContext),n=(0,o.useContext)(i.HeadManagerContext);return o.default.createElement(a.default,{reduceComponentsToState:d,headManager:n,inAmpMode:(0,u.isInAmpMode)(r)},t)}y.rewind=function(){};var b=y;t.default=b},Bnag:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},EbDI:function(e,t){e.exports=function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},FYa8:function(e,t,r){"use strict";var n;t.__esModule=!0,t.HeadManagerContext=void 0;var o=((n=r("q1tI"))&&n.__esModule?n:{default:n}).default.createContext({});t.HeadManagerContext=o},Ijbi:function(e,t,r){var n=r("WkPL");e.exports=function(e){if(Array.isArray(e))return n(e)}},Nsbk:function(e,t){function r(t){return e.exports=r=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},r(t)}e.exports=r},PJYZ:function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},RIqP:function(e,t,r){var n=r("Ijbi"),o=r("EbDI"),a=r("ZhPi"),c=r("Bnag");e.exports=function(e){return n(e)||o(e)||a(e)||c()}},TOwV:function(e,t,r){"use strict";e.exports=r("qT12")},Xuae:function(e,t,r){"use strict";var n=r("RIqP"),o=r("lwsE"),a=r("W8MJ"),c=(r("PJYZ"),r("7W2i")),i=r("a1gu"),u=r("Nsbk");function s(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=u(e);if(t){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return i(this,r)}}t.__esModule=!0,t.default=void 0;var f=r("q1tI"),l=function(e){c(r,e);var t=s(r);function r(e){var a;return o(this,r),(a=t.call(this,e))._hasHeadManager=void 0,a.emitChange=function(){a._hasHeadManager&&a.props.headManager.updateHead(a.props.reduceComponentsToState(n(a.props.headManager.mountedInstances),a.props))},a._hasHeadManager=a.props.headManager&&a.props.headManager.mountedInstances,a}return a(r,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),r}(f.Component);t.default=l},YFqc:function(e,t,r){e.exports=r("cTJO")},a1gu:function(e,t,r){var n=r("cDf5"),o=r("PJYZ");e.exports=function(e,t){return!t||"object"!==n(t)&&"function"!==typeof t?o(e):t}},cTJO:function(e,t,r){"use strict";var n=r("J4zp"),o=r("284h");t.__esModule=!0,t.default=void 0;var a=o(r("q1tI")),c=r("elyg"),i=r("nOHt"),u=r("vNVm"),s={};function f(e,t,r,n){if((0,c.isLocalURL)(t)){e.prefetch(t,r,n).catch((function(e){0}));var o=n&&"undefined"!==typeof n.locale?n.locale:e&&e.locale;s[t+"%"+r+(o?"%"+o:"")]=!0}}var l=function(e){var t=!1!==e.prefetch,r=(0,i.useRouter)(),o=r&&r.pathname||"/",l=a.default.useMemo((function(){var t=(0,c.resolveHref)(o,e.href,!0),r=n(t,2),a=r[0],i=r[1];return{href:a,as:e.as?(0,c.resolveHref)(o,e.as):i||a}}),[o,e.href,e.as]),p=l.href,d=l.as,y=e.children,b=e.replace,m=e.shallow,h=e.scroll,v=e.locale;"string"===typeof y&&(y=a.default.createElement("a",null,y));var O=a.Children.only(y),g=O&&"object"===typeof O&&O.ref,_=(0,u.useIntersection)({rootMargin:"200px"}),S=n(_,2),j=S[0],E=S[1],P=a.default.useCallback((function(e){j(e),g&&("function"===typeof g?g(e):"object"===typeof g&&(g.current=e))}),[g,j]);(0,a.useEffect)((function(){var e=E&&t&&(0,c.isLocalURL)(p),n="undefined"!==typeof v?v:r&&r.locale,o=s[p+"%"+d+(n?"%"+n:"")];e&&!o&&f(r,p,d,{locale:n})}),[d,p,E,v,t,r]);var T={ref:P,onClick:function(e){O.props&&"function"===typeof O.props.onClick&&O.props.onClick(e),e.defaultPrevented||function(e,t,r,n,o,a,i,u){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,c.isLocalURL)(r))&&(e.preventDefault(),null==i&&(i=n.indexOf("#")<0),t[o?"replace":"push"](r,n,{shallow:a,locale:u}).then((function(e){e&&i&&(window.scrollTo(0,0),document.body.focus())})))}(e,r,p,d,b,m,h,v)},onMouseEnter:function(e){(0,c.isLocalURL)(p)&&(O.props&&"function"===typeof O.props.onMouseEnter&&O.props.onMouseEnter(e),f(r,p,d,{priority:!0}))}};return(e.passHref||"a"===O.type&&!("href"in O.props))&&(T.href=(0,c.addBasePath)((0,c.addLocale)(d,"undefined"!==typeof v?v:r&&r.locale,r&&r.defaultLocale))),a.default.cloneElement(O,T)};t.default=l},cha2:function(e,t,r){"use strict";r.r(t);var n=r("rePB"),o=r("nKUr"),a=r("4qKB"),c=r("qO+3"),i=function(e){return function(t){return function(r){var n;return console.group("REDUX DISPATCH => "+r.type),console.log("action"),console.dir(r),n=t(r),console.log("state"),console.dir(e.getState()),console.groupEnd(),n}}},u=r("q1tI"),s=r("ANjH");function f(e){return function(t){var r=t.dispatch,n=t.getState;return function(t){return function(o){return"function"===typeof o?o(r,n,e):t(o)}}}}var l=f();l.withExtraArgument=f;var p=l;function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var b=a.a.StoreKeys,m=null,h={};h[b.SONG_VERSION]=1,h[b.FILE_TIMESTAMP]=0,h[b.UPDATED_TRACKS_LIST]=[],h[b.UPDATED_TRACKS_TIMESTAMP]=0,h[b.TRACK_NUMBER_TO_CHECKBOX_VALUE]={},h[b.PLAYED_NOTEGROUP_ID]="";var v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0,r=y({},e);switch(t.type){case c.a.Toggle.onSongVersionFormatChanged:var n=t.payload[b.SONG_VERSION];("number"!==typeof n||n<a.a.MIN_SONG_VERSION||n>a.a.MAX_SONG_VERSION)&&(n=h[b.SONG_VERSION]),r[b.SONG_VERSION]=n;break;case c.a.FileChooser.onFileLoaded:r[b.FILE_TIMESTAMP]=(new Date).getTime();break;case c.a.Song.onTracksUpdated:r[b.UPDATED_TRACKS_LIST]=t.payload[b.UPDATED_TRACKS_LIST],r[b.UPDATED_TRACKS_TIMESTAMP]=(new Date).getTime();break;case c.a.Toggle.onCheckboxChanged:var o=t.payload[b.TRACK_NUMBER],i=t.payload[b.CHECKBOX_VALUE],u=r[b.TRACK_NUMBER_TO_CHECKBOX_VALUE];u[o]=i;break;case c.a.Song.onPlayNoteGroup:r[b.PLAYED_NOTEGROUP_ID]=t.payload[b.PLAYED_NOTEGROUP_ID]}return r};function O(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h;return Object(s.c)(v,e,Object(s.a)(i,p))}function g(e){return Object(u.useMemo)((function(){return t=e,m?t&&(m=O(y(y({},m.getState()),t))):m=O(t),m;var t}),[e])}var _=r("MX0m"),S=r.n(_),j=r("8Kt/"),E=r.n(j),P=r("YFqc"),T=r.n(P),w=function(e){var t=e.title,r=e.children;return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(E.a,{children:Object(o.jsx)("title",{className:"jsx-2526262285",children:t})}),Object(o.jsx)("header",{className:"jsx-2526262285",children:Object(o.jsx)("nav",{className:"jsx-2526262285",children:Object(o.jsx)(T.a,{href:"/",children:Object(o.jsx)("a",{className:"jsx-2526262285",children:"sqpt.gthb.io"})})})}),Object(o.jsx)("main",{className:"jsx-2526262285",children:r}),Object(o.jsx)("footer",{className:"jsx-2526262285",children:"\xa9 2021 SquarePoet"}),Object(o.jsx)(S.a,{id:"2526262285",children:["html,body{background-color:#232323;}",'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";color:#bbb;margin:20px;font-size:16pt;line-height:150%;}',"a{color:#7cd;-webkit-text-decoration:none;text-decoration:none;}","a:hover{-webkit-text-decoration:underline;text-decoration:underline;}","nav{border-bottom:1px solid #555;margin-bottom:10px;}","footer{text-align:left;position:fixed;font-size:12pt;bottom:10px;right:10px;}",".DEBUG_LAYOUT{border:1px solid pink;}"]})]})},x=r("/MKj");function M(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function C(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?M(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):M(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}t.default=function(e){var t=e.Component,r=e.pageProps;console.log("Props:"),console.log(r),r.title||(r.title="Default Title");var n=g(r.initialReduxState);return Object(o.jsx)(x.a,{store:n,children:Object(o.jsx)(w,{title:r.title,children:Object(o.jsx)(t,C({},r))})})}},lSNA:function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},lwAK:function(e,t,r){"use strict";var n;t.__esModule=!0,t.AmpStateContext=void 0;var o=((n=r("q1tI"))&&n.__esModule?n:{default:n}).default.createContext({});t.AmpStateContext=o},"qO+3":function(e,t,r){"use strict";var n,o;(o=n||(n={})).FileChooser={onFileLoaded:"onFileLoaded"},o.Toggle={onSongVersionFormatChanged:"onSongVersionFormatChanged",onCheckboxChanged:"onCheckboxChanged"},o.Song={onTracksUpdated:"onTracksUpdated",onPlayNoteGroup:"onPlayNoteGroup"},t.a=n},qT12:function(e,t,r){"use strict";var n="function"===typeof Symbol&&Symbol.for,o=n?Symbol.for("react.element"):60103,a=n?Symbol.for("react.portal"):60106,c=n?Symbol.for("react.fragment"):60107,i=n?Symbol.for("react.strict_mode"):60108,u=n?Symbol.for("react.profiler"):60114,s=n?Symbol.for("react.provider"):60109,f=n?Symbol.for("react.context"):60110,l=n?Symbol.for("react.async_mode"):60111,p=n?Symbol.for("react.concurrent_mode"):60111,d=n?Symbol.for("react.forward_ref"):60112,y=n?Symbol.for("react.suspense"):60113,b=n?Symbol.for("react.suspense_list"):60120,m=n?Symbol.for("react.memo"):60115,h=n?Symbol.for("react.lazy"):60116,v=n?Symbol.for("react.block"):60121,O=n?Symbol.for("react.fundamental"):60117,g=n?Symbol.for("react.responder"):60118,_=n?Symbol.for("react.scope"):60119;function S(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case o:switch(e=e.type){case l:case p:case c:case u:case i:case y:return e;default:switch(e=e&&e.$$typeof){case f:case d:case h:case m:case s:return e;default:return t}}case a:return t}}}function j(e){return S(e)===p}t.AsyncMode=l,t.ConcurrentMode=p,t.ContextConsumer=f,t.ContextProvider=s,t.Element=o,t.ForwardRef=d,t.Fragment=c,t.Lazy=h,t.Memo=m,t.Portal=a,t.Profiler=u,t.StrictMode=i,t.Suspense=y,t.isAsyncMode=function(e){return j(e)||S(e)===l},t.isConcurrentMode=j,t.isContextConsumer=function(e){return S(e)===f},t.isContextProvider=function(e){return S(e)===s},t.isElement=function(e){return"object"===typeof e&&null!==e&&e.$$typeof===o},t.isForwardRef=function(e){return S(e)===d},t.isFragment=function(e){return S(e)===c},t.isLazy=function(e){return S(e)===h},t.isMemo=function(e){return S(e)===m},t.isPortal=function(e){return S(e)===a},t.isProfiler=function(e){return S(e)===u},t.isStrictMode=function(e){return S(e)===i},t.isSuspense=function(e){return S(e)===y},t.isValidElementType=function(e){return"string"===typeof e||"function"===typeof e||e===c||e===p||e===u||e===i||e===y||e===b||"object"===typeof e&&null!==e&&(e.$$typeof===h||e.$$typeof===m||e.$$typeof===s||e.$$typeof===f||e.$$typeof===d||e.$$typeof===O||e.$$typeof===g||e.$$typeof===_||e.$$typeof===v)},t.typeOf=S},rePB:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},vNVm:function(e,t,r){"use strict";var n=r("J4zp"),o=r("TqRt");t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,r=e.disabled||!i,o=(0,a.useRef)(),s=(0,a.useState)(!1),f=n(s,2),l=f[0],p=f[1],d=(0,a.useCallback)((function(e){o.current&&(o.current(),o.current=void 0),r||l||e&&e.tagName&&(o.current=function(e,t,r){var n=function(e){var t=e.rootMargin||"",r=u.get(t);if(r)return r;var n=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=n.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)}))}),e);return u.set(t,r={id:t,observer:o,elements:n}),r}(r),o=n.id,a=n.observer,c=n.elements;return c.set(e,t),a.observe(e),function(){a.unobserve(e),0===c.size&&(a.disconnect(),u.delete(o))}}(e,(function(e){return e&&p(e)}),{rootMargin:t}))}),[r,t,l]);return(0,a.useEffect)((function(){i||l||(0,c.default)((function(){return p(!0)}))}),[l]),[d,l]};var a=r("q1tI"),c=o(r("0G5g")),i="undefined"!==typeof IntersectionObserver;var u=new Map},wx14:function(e,t,r){"use strict";function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}r.d(t,"a",(function(){return n}))},yLpj:function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(n){"object"===typeof window&&(r=window)}e.exports=r},zLVn:function(e,t,r){"use strict";function n(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}r.d(t,"a",(function(){return n}))}},[[0,0,1,4,7,11,10]]]);