_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[19],{"/EDR":function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t("23aj")}])},"23aj":function(e,n,t){"use strict";t.r(n),t.d(n,"__N_SSG",(function(){return i}));var r=t("nKUr"),c=t("YFqc"),o=t.n(c),i=!0;n.default=function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)("div",{children:Object(r.jsx)(o.a,{href:"/piano/v1",children:Object(r.jsx)("a",{children:"Piano 1"})})}),Object(r.jsx)("div",{children:Object(r.jsx)(o.a,{href:"/piano/v2",children:Object(r.jsx)("a",{children:"Piano 2"})})}),Object(r.jsx)("div",{children:Object(r.jsx)(o.a,{href:"/guitar/v1",children:Object(r.jsx)("a",{children:"Guitar 1"})})}),Object(r.jsx)("div",{children:Object(r.jsx)(o.a,{href:"/guitar/v2",children:Object(r.jsx)("a",{children:"Guitar 2"})})}),Object(r.jsx)("div",{children:Object(r.jsx)(o.a,{href:"/midi",children:Object(r.jsx)("a",{children:"MIDI"})})}),Object(r.jsx)("div",{children:Object(r.jsx)(o.a,{href:"/about",children:Object(r.jsx)("a",{children:"About"})})})]})}},YFqc:function(e,n,t){e.exports=t("cTJO")},cTJO:function(e,n,t){"use strict";var r=t("J4zp"),c=t("284h");n.__esModule=!0,n.default=void 0;var o=c(t("q1tI")),i=t("elyg"),a=t("nOHt"),u=t("vNVm"),s={};function l(e,n,t,r){if((0,i.isLocalURL)(n)){e.prefetch(n,t,r).catch((function(e){0}));var c=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;s[n+"%"+t+(c?"%"+c:"")]=!0}}var f=function(e){var n=!1!==e.prefetch,t=(0,a.useRouter)(),c=t&&t.pathname||"/",f=o.default.useMemo((function(){var n=(0,i.resolveHref)(c,e.href,!0),t=r(n,2),o=t[0],a=t[1];return{href:o,as:e.as?(0,i.resolveHref)(c,e.as):a||o}}),[c,e.href,e.as]),d=f.href,h=f.as,p=e.children,v=e.replace,j=e.shallow,b=e.scroll,O=e.locale;"string"===typeof p&&(p=o.default.createElement("a",null,p));var x=o.Children.only(p),_=x&&"object"===typeof x&&x.ref,y=(0,u.useIntersection)({rootMargin:"200px"}),w=r(y,2),g=w[0],E=w[1],m=o.default.useCallback((function(e){g(e),_&&("function"===typeof _?_(e):"object"===typeof _&&(_.current=e))}),[_,g]);(0,o.useEffect)((function(){var e=E&&n&&(0,i.isLocalURL)(d),r="undefined"!==typeof O?O:t&&t.locale,c=s[d+"%"+h+(r?"%"+r:"")];e&&!c&&l(t,d,h,{locale:r})}),[h,d,E,O,n,t]);var M={ref:m,onClick:function(e){x.props&&"function"===typeof x.props.onClick&&x.props.onClick(e),e.defaultPrevented||function(e,n,t,r,c,o,a,u){("A"!==e.currentTarget.nodeName||!function(e){var n=e.currentTarget.target;return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,i.isLocalURL)(t))&&(e.preventDefault(),null==a&&(a=r.indexOf("#")<0),n[c?"replace":"push"](t,r,{shallow:o,locale:u}).then((function(e){e&&a&&(window.scrollTo(0,0),document.body.focus())})))}(e,t,d,h,v,j,b,O)},onMouseEnter:function(e){(0,i.isLocalURL)(d)&&(x.props&&"function"===typeof x.props.onMouseEnter&&x.props.onMouseEnter(e),l(t,d,h,{priority:!0}))}};return(e.passHref||"a"===x.type&&!("href"in x.props))&&(M.href=(0,i.addBasePath)((0,i.addLocale)(h,"undefined"!==typeof O?O:t&&t.locale,t&&t.defaultLocale))),o.default.cloneElement(x,M)};n.default=f},vNVm:function(e,n,t){"use strict";var r=t("J4zp"),c=t("TqRt");n.__esModule=!0,n.useIntersection=function(e){var n=e.rootMargin,t=e.disabled||!a,c=(0,o.useRef)(),s=(0,o.useState)(!1),l=r(s,2),f=l[0],d=l[1],h=(0,o.useCallback)((function(e){c.current&&(c.current(),c.current=void 0),t||f||e&&e.tagName&&(c.current=function(e,n,t){var r=function(e){var n=e.rootMargin||"",t=u.get(n);if(t)return t;var r=new Map,c=new IntersectionObserver((function(e){e.forEach((function(e){var n=r.get(e.target),t=e.isIntersecting||e.intersectionRatio>0;n&&t&&n(t)}))}),e);return u.set(n,t={id:n,observer:c,elements:r}),t}(t),c=r.id,o=r.observer,i=r.elements;return i.set(e,n),o.observe(e),function(){o.unobserve(e),0===i.size&&(o.disconnect(),u.delete(c))}}(e,(function(e){return e&&d(e)}),{rootMargin:n}))}),[t,n,f]);return(0,o.useEffect)((function(){a||f||(0,i.default)((function(){return d(!0)}))}),[f]),[h,f]};var o=t("q1tI"),i=c(t("0G5g")),a="undefined"!==typeof IntersectionObserver;var u=new Map}},[["/EDR",0,1,8,10]]]);