_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[18],{BsWD:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n("a3WO");function o(e,t){if(e){if("string"===typeof e)return Object(a.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(a.a)(e,t):void 0}}},a3WO:function(e,t,n){"use strict";function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}n.d(t,"a",(function(){return a}))},nbY2:function(e,t,n){"use strict";n.r(t),n.d(t,"__N_SSG",(function(){return E}));var a=n("nKUr"),o=n("MX0m"),r=n.n(o),s=n("a3WO");var i=n("BsWD");function c(e){return function(e){if(Array.isArray(e))return Object(s.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(i.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var l=n("1OyB"),d=n("vuIU"),f=n("rePB"),u=function(){function e(t){Object(l.a)(this,e),Object(f.a)(this,"context",void 0),Object(f.a)(this,"filesToLoad",void 0),this.context=new AudioContext,this.filesToLoad=t;for(var n=0;n<this.filesToLoad.length;n++)this.load(this.filesToLoad[n])}return Object(d.a)(e,[{key:"load",value:function(e){var t=this,n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onload=function(){t.context.decodeAudioData(n.response,(function(t){console.log("Loaded Buffer "+e),console.log(t)}),(function(t){console.log("Failed to Decode Buffer "+e)}))},n.onerror=function(){console.log("Failed to Load URL "+e)},console.log("Requesting "+e),n.send()}}]),e}(),m=n("tzYf"),x=null,j=null;function p(e){document.getElementById("textarea").innerText=e}function g(){var e=document.getElementById("pianoCanvas");if(!e||!e.getContext)return null;var t=e.getContext("2d");return t||null}var b={90:18,88:20,67:21,86:23,66:25,78:27,77:28,188:30,190:32,191:33,65:35,83:37,68:39,70:40,71:42,72:44,74:45,75:47,76:49,186:51,59:51,222:52,81:47,87:49,69:51,82:52,84:54,89:56,85:57,73:59,79:61,80:63,219:64,221:66,220:68,49:59,50:61,51:63,52:64,53:66,54:68,55:69,56:71,57:73,48:75,189:76,187:78},h=function(){var e="",t="",n=[],a=0,o=[2,-1,5,7,-1,10,0],r=[1,3,4,6,8,9,11],s=["a","b","c","d","e","f","g"],i=["z","x","c","v","b","n","m",",",".","/","a","s","d","f","g","h","j","k","l",";","r","t","y","u","i","o","p","4","5","6","7","8","9","0","-","="];function l(){console.log("Reset Everything!"),a=0,n=[],d()}function d(){var e=n.join(" ");localStorage.text=e,p(e),f()}function f(){var e=g();e&&(e.fillStyle="#444",e.fillRect(0,0,2080,300),function(e){e.strokeStyle="#000",e.lineWidth=.2,e.fillStyle="#FFF";for(var t=0;t<52;t++)e.fillRect(20*t,0,20,120),e.strokeRect(20*t,0,20,120);e.fillStyle="#FCC",e.fillRect(460,0,20,120)}(e),function(e){e.fillStyle="#323232";for(var t=0;t<7;t++)for(var n=0;n<7;n++)1!=n&&4!=n&&e.fillRect(12+20*(n+7*t),0,16,72);e.fillRect(992,0,16,72)}(e),function(e){e.textAlign="center";for(var t=1;t<=88;t++){var n=t%12;if(r.includes(n)){var o=Math.floor(t/12),c=r.indexOf(n),l=7*o+c,d=s[c];e.font="c"==d?"bold 13px Tahoma":"13px Tahoma",e.fillStyle="#777",e.fillText(d,20*l+10,100),e.font="12px Consolas",e.fillStyle="#999",e.fillText(t,20*l+10,115)}}e.font="15px Consolas",e.fillStyle="#FFF",e.textAlign="center";for(var f=7*(a+2)-4,u=i.length,m=0;m<u;m++)e.fillText(i[m],20*(m+f)+10,140)}(e),function(e){var t=n.slice(-1);if(0!=t.length){var a=t[0].split(".");for(var s in a){var i=a[s],c=i%12,l=Math.floor((i-1)/12);if(e.beginPath(),o.includes(c)){var d=7*l+o.indexOf(c);e.arc(20*d+20,60,6,0,2*Math.PI,!1)}else{var f=7*l+r.indexOf(c);e.arc(20*f+10,96,7,0,2*Math.PI,!1)}e.fillStyle="#BB0",e.fill()}}}(e))}function h(){var n;localStorage.sharps||(localStorage.sharps=""),e=localStorage.sharps,n=e,document.getElementById("sharps-text").value=n,localStorage.flats||(localStorage.flats=""),function(e){var t=document.getElementById("flats-text");console.log("We are trying to set flats: [".concat(e,"]")),t.value=e}(t=localStorage.flats)}return{start:function(){!function(){localStorage.text||(localStorage.text="");var e=localStorage.text.trim();p((n=""==e?[]:e.split(" ")).join(" "))}(),h();var e=g();e&&e.scale(2,2),f()},keydown:function(o){if(x||(x=new u(["/s/m/grand/4.mp3","/s/m/grand/16.mp3","/s/m/grand/28.mp3","/s/m/grand/30.mp3","/s/m/grand/32.mp3","/s/m/grand/35.mp3","/s/m/grand/37.mp3","/s/m/grand/39.mp3","/s/m/grand/40.mp3","/s/m/grand/42.mp3","/s/m/grand/44.mp3","/s/m/grand/45.mp3","/s/m/grand/47.mp3","/s/m/grand/49.mp3","/s/m/grand/52.mp3","/s/m/grand/57.mp3","/s/m/grand/61.mp3","/s/m/grand/64.mp3","/s/m/grand/69.mp3","/s/m/grand/76.mp3","/s/m/grand/83.mp3","/s/m/grand/88.mp3"])),j||(j=new m.b).initWebAudio(),document.getElementById("flats-text")!==document.activeElement&&document.getElementById("sharps-text")!==document.activeElement)if(91!=o.keyCode&&93!=o.keyCode||document.getElementById("textarea").select(),o.metaKey)88!=o.keyCode&&67!=o.keyCode||setTimeout(l,100);else if(!o.altKey){var i=0;switch(o.ctrlKey?i=-1:o.shiftKey&&(i=1),o.preventDefault(),o.keyCode){case 32:console.log("DO NOTHING ON SPACE");break;case 27:o.shiftKey?l():(console.log("Reset Offsets"),a=0);break;case 192:l();break;case 8:n.pop(),d();break;case 9:!function(){if(n.length>=2){var e=(n.pop()+"."+n.pop()).split(".");e=c(new Set(e)).sort(),n.push(e.join(".")),d()}}();break;case 38:a++,f();break;case 40:a--,f();break;default:!function(o,i){if(b.hasOwnProperty(o)){var c=b[o]%12,l=r.indexOf(c),f=s[l];-1!=e.indexOf(f)&&i++,-1!=t.indexOf(f)&&i--;var u=b[o]+i+12*a;if(u<1||u>88)return;n.push(u+""),j.play(u,.4,.8),d()}}(o.keyCode,i)}}},keyup:function(e){localStorage.sharps=document.getElementById("sharps-text").value.toLowerCase(),localStorage.flats=document.getElementById("flats-text").value.toLowerCase()}}}(),v=n("q1tI"),y=function(e){var t=e.width;return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("div",{className:r.a.dynamic([["2109619428",[t]]]),children:"\xa0"}),Object(a.jsx)(r.a,{id:"2109619428",dynamic:[t],children:["div.__jsx-style-dynamic-selector{display:inline-block;min-width:".concat(t,"px;}")]})]})},O=function(){return Object(a.jsx)(y,{width:20})},w=function(){return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:"jsx-2586494596",children:["shift + esc \u2192 clear ",Object(a.jsx)(O,{})," cmd + c \u2192 copy",Object(a.jsx)("br",{className:"jsx-2586494596"}),"shift \u2192 sharp ",Object(a.jsx)(O,{})," ctrl \u2192 flat",Object(a.jsx)("br",{className:"jsx-2586494596"}),"up/down \u2192 +/- octave ",Object(a.jsx)(O,{})," tab \u2192 combine"]}),Object(a.jsx)(r.a,{id:"2586494596",children:["div.jsx-2586494596{font-size:14pt;float:right;text-align:right;}"]})]})},S=function(){return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:"jsx-3001134974",children:["sharps: ",Object(a.jsx)("input",{id:"sharps-text",className:"jsx-3001134974"}),Object(a.jsx)("br",{className:"jsx-3001134974"}),"flats: ",Object(a.jsx)("input",{id:"flats-text",className:"jsx-3001134974"})]}),Object(a.jsx)(r.a,{id:"3001134974",children:["div.jsx-3001134974{float:left;margin-right:20px;text-align:right;}","input.jsx-3001134974{width:150px;}"]})]})},k=n("xgb5"),E=!0;t.default=function(){return Object(k.a)("keydown",(function(e){h.keydown(e)})),Object(k.a)("keyup",(function(e){h.keyup(e)})),Object(v.useEffect)((function(){h.start()}),[]),Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)("div",{children:[Object(a.jsx)(w,{}),Object(a.jsx)(S,{}),Object(a.jsx)("div",{className:"jsx-204195529",children:Object(a.jsx)(r.a,{id:"204195529",children:["div.jsx-204195529{clear:both;}"]})}),Object(a.jsx)("br",{}),Object(a.jsxs)("div",{id:"content",className:"jsx-291391794",children:[Object(a.jsx)("textarea",{id:"textarea",rows:8,cols:100,className:"jsx-291391794"}),Object(a.jsx)("canvas",{id:"pianoCanvas",width:2080,height:300,className:"jsx-291391794"}),Object(a.jsx)(r.a,{id:"291391794",children:["div.jsx-291391794{width:100%;text-align:center;}","textarea.jsx-291391794{font-family:Hack,Inconsolata,Menlo,Monaco,monospace;font-size:16pt;box-sizing:border-box;border:none;width:1044px;display:block;margin:0 auto;}","canvas.jsx-291391794{border:2px solid #444;width:1040px;height:150px;display:block;margin:0 auto;}"]})]})]})})}},ngH8:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/piano/v1",function(){return n("nbY2")}])}},[["ngH8",0,1,2,3,5]]]);