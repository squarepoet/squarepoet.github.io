(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"23aj":function(t,e,n){"use strict";n.r(e);var r=n("q1tI"),o=n.n(r),i=n("YFqc"),a=n.n(i),u=o.a.createElement;e.default=function(){return u("div",null,u("div",null,"Authoring Tools"),u("div",null,u(a.a,{href:"https://github.com/squarepoet/squarepoet.github.io"},u("a",null,"Repository"))),u("div",null,u(a.a,{href:"/piano/v1/"},"Piano 1")),u("div",null,u(a.a,{href:"/piano/v2/"},"Piano 2")),u("div",null,u(a.a,{href:"/guitar/v1/"},"Guitar 1")),u("div",null,u(a.a,{href:"/guitar/v2/"},"Guitar 2")),u("div",null,u(a.a,{href:"/about/"},u("a",null,"About"))))}},"7W2i":function(t,e,n){var r=n("SksO");t.exports=function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}},Bldr:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n("23aj")}])},Nsbk:function(t,e){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(e)}t.exports=n},PJYZ:function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}},YFqc:function(t,e,n){t.exports=n("cTJO")},a1gu:function(t,e,n){var r=n("cDf5"),o=n("PJYZ");t.exports=function(t,e){return!e||"object"!==r(e)&&"function"!==typeof e?o(t):e}},cTJO:function(t,e,n){"use strict";var r=n("lwsE"),o=n("W8MJ"),i=n("7W2i"),a=n("a1gu"),u=n("Nsbk");function f(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=u(t);if(e){var o=u(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return a(this,n)}}var s=n("TqRt"),c=n("284h");e.__esModule=!0,e.default=void 0;var l,p=c(n("q1tI")),h=n("QmWs"),v=n("g/15"),d=s(n("nOHt")),y=n("elyg");function w(t){return t&&"object"===typeof t?(0,v.formatWithValidation)(t):t}var g=new Map,b=window.IntersectionObserver,_={};function m(){return l||(b?l=new b((function(t){t.forEach((function(t){if(g.has(t.target)){var e=g.get(t.target);(t.isIntersecting||t.intersectionRatio>0)&&(l.unobserve(t.target),g.delete(t.target),e())}}))}),{rootMargin:"200px"}):void 0)}var E=function(t){i(a,t);var e=f(a);function a(t){var n;return r(this,a),(n=e.call(this,t)).p=void 0,n.cleanUpListeners=function(){},n.formatUrls=function(t){var e=null,n=null,r=null;return function(o,i){if(r&&o===e&&i===n)return r;var a=t(o,i);return e=o,n=i,r=a,a}}((function(t,e){return{href:(0,y.addBasePath)(w(t)),as:e?(0,y.addBasePath)(w(e)):e}})),n.linkClicked=function(t){var e=t.currentTarget,r=e.nodeName,o=e.target;if("A"!==r||!(o&&"_self"!==o||t.metaKey||t.ctrlKey||t.shiftKey||t.nativeEvent&&2===t.nativeEvent.which)){var i=n.formatUrls(n.props.href,n.props.as),a=i.href,u=i.as;if(function(t){var e=(0,h.parse)(t,!1,!0),n=(0,h.parse)((0,v.getLocationOrigin)(),!1,!0);return!e.host||e.protocol===n.protocol&&e.host===n.host}(a)){var f=window.location.pathname;a=(0,h.resolve)(f,a),u=u?(0,h.resolve)(f,u):a,t.preventDefault();var s=n.props.scroll;null==s&&(s=u.indexOf("#")<0),d.default[n.props.replace?"replace":"push"](a,u,{shallow:n.props.shallow}).then((function(t){t&&s&&(window.scrollTo(0,0),document.body.focus())}))}}},n.p=!1!==t.prefetch,n}return o(a,[{key:"componentWillUnmount",value:function(){this.cleanUpListeners()}},{key:"getPaths",value:function(){var t=window.location.pathname,e=this.formatUrls(this.props.href,this.props.as),n=e.href,r=e.as,o=(0,h.resolve)(t,n);return[o,r?(0,h.resolve)(t,r):o]}},{key:"handleRef",value:function(t){var e=this;this.p&&b&&t&&t.tagName&&(this.cleanUpListeners(),_[this.getPaths().join("%")]||(this.cleanUpListeners=function(t,e){var n=m();return n?(n.observe(t),g.set(t,e),function(){try{n.unobserve(t)}catch(e){console.error(e)}g.delete(t)}):function(){}}(t,(function(){e.prefetch()}))))}},{key:"prefetch",value:function(t){if(this.p){var e=this.getPaths();d.default.prefetch(e[0],e[1],t).catch((function(t){0})),_[e.join("%")]=!0}}},{key:"render",value:function(){var t=this,e=this.props.children,r=this.formatUrls(this.props.href,this.props.as),o=r.href,i=r.as;"string"===typeof e&&(e=p.default.createElement("a",null,e));var a=p.Children.only(e),u={ref:function(e){t.handleRef(e),a&&"object"===typeof a&&a.ref&&("function"===typeof a.ref?a.ref(e):"object"===typeof a.ref&&(a.ref.current=e))},onMouseEnter:function(e){a.props&&"function"===typeof a.props.onMouseEnter&&a.props.onMouseEnter(e),t.prefetch({priority:!0})},onClick:function(e){a.props&&"function"===typeof a.props.onClick&&a.props.onClick(e),e.defaultPrevented||t.linkClicked(e)}};!this.props.passHref&&("a"!==a.type||"href"in a.props)||(u.href=i||o);var f=n("P5f7").rewriteUrlForNextExport;return u.href&&"undefined"!==typeof __NEXT_DATA__&&__NEXT_DATA__.nextExport&&(u.href=f(u.href)),p.default.cloneElement(a,u)}}]),a}(p.Component);e.default=E}},[["Bldr",0,1,2]]]);