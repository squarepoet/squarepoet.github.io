_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[13],{"094J":function(t,e,r){"use strict";(function(t){var n=r("q1tI"),a=r("puqk"),s={},o=function(t,e,r){return s[t]||(s[t]={callbacks:[],value:r}),s[t].callbacks.push(e),{deregister:function(){var r=s[t].callbacks,n=r.indexOf(e);n>-1&&r.splice(n,1)},emit:function(r){s[t].value!==r&&(s[t].value=r,s[t].callbacks.forEach((function(t){e!==t&&t(r)})))}}};e.a=function(e,r){if(void 0===r&&(r="undefined"!=typeof t&&t.localStorage?t.localStorage:"undefined"!=typeof globalThis&&globalThis.localStorage?globalThis.localStorage:"undefined"!=typeof window&&window.localStorage?window.localStorage:"undefined"!=typeof localStorage?localStorage:null),r){var s=(i=r,{get:function(t,e){var r=i.getItem(t);return null==r?"function"==typeof e?e():e:JSON.parse(r)},set:function(t,e){i.setItem(t,JSON.stringify(e))}});return function(t){return function(t,e,r){var s=r.get,i=r.set,c=Object(n.useRef)(null),u=Object(n.useState)((function(){return s(e,t)})),l=u[0],f=u[1];Object(a.a)("storage",(function(t){if(t.key===e){var r=JSON.parse(t.newValue);l!==r&&f(r)}})),Object(n.useEffect)((function(){return c.current=o(e,f,t),function(){c.current.deregister()}}),[t,e]);var d=Object(n.useCallback)((function(t){var r="function"==typeof t?t(l):t;i(e,r),f(r),c.current.emit(t)}),[l,i,e]);return[l,d]}(t,e,s)}}var i;return n.useState}}).call(this,r("yLpj"))},BsWD:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r("a3WO");function a(t,e){if(t){if("string"===typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},ODXe:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r("BsWD");function a(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,a=!1,s=void 0;try{for(var o,i=t[Symbol.iterator]();!(n=(o=i.next()).done)&&(r.push(o.value),!e||r.length!==e);n=!0);}catch(c){a=!0,s=c}finally{try{n||null==i.return||i.return()}finally{if(a)throw s}}return r}}(t,e)||Object(n.a)(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},a3WO:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},jLID:function(t,e,r){"use strict";r.r(e),r.d(e,"__N_SSG",(function(){return w}));var n=r("ODXe"),a=r("nKUr"),s=r("MX0m"),o=r.n(s),i=r("1OyB"),c=r("vuIU"),u=r("rePB"),l=r("tzYf"),f=null,d=["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"],h={1:44,2:39,3:35,4:30,5:25,6:20},p=function(){function t(){Object(i.a)(this,t),Object(u.a)(this,"setGuitarTab",void 0),Object(u.a)(this,"getSharps",void 0),Object(u.a)(this,"getFlats",void 0),Object(u.a)(this,"getGuitarTab",void 0),Object(u.a)(this,"getGuitarTabTextArea",void 0),Object(u.a)(this,"getGuitarCanvas",void 0),Object(u.a)(this,"isFocusedOnSharpsInput",void 0),Object(u.a)(this,"isFocusedOnFlatsInput",void 0),Object(u.a)(this,"noteOffsetForString",[0,7,2,10,5,0,7]),Object(u.a)(this,"piano",null),Object(u.a)(this,"fretOffset",0),Object(u.a)(this,"stringOffset",0),Object(u.a)(this,"noteGroups",[]),Object(u.a)(this,"keyboardLabels",[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l",";"],["z","x","c","v","b","n","m",",",".","/"]]),Object(u.a)(this,"keyCodeToFret",{90:0,88:1,67:2,86:3,66:4,78:5,77:6,188:7,190:8,191:9,65:0,83:1,68:2,70:3,71:4,72:5,74:6,75:7,76:8,186:9,59:9,222:10,81:0,87:1,69:2,82:3,84:4,89:5,85:6,73:7,79:8,80:9,219:10,221:11,220:12,49:0,50:1,51:2,52:3,53:4,54:5,55:6,56:7,57:8,48:9,189:10,187:11}),Object(u.a)(this,"keyCodeToString",{90:4,88:4,67:4,86:4,66:4,78:4,77:4,188:4,190:4,191:4,65:3,83:3,68:3,70:3,71:3,72:3,74:3,75:3,76:3,186:3,59:3,222:3,81:2,87:2,69:2,82:2,84:2,89:2,85:2,73:2,79:2,80:2,219:2,221:2,220:2,49:1,50:1,51:1,52:1,53:1,54:1,55:1,56:1,57:1,48:1,189:1,187:1}),this.setupCopyHandler()}return Object(c.a)(t,[{key:"setupCopyHandler",value:function(){var t=this;document.querySelector("html").addEventListener("copy",(function(e){e.preventDefault(),e.clipboardData&&e.clipboardData.setData("text/plain",t.getNoteGroupsAsSpaceDelimitedString())})),document.querySelector("html").addEventListener("cut",(function(e){e.preventDefault(),e.clipboardData&&e.clipboardData.setData("text/plain",t.getNoteGroupsAsSpaceDelimitedString()),setTimeout((function(){t.resetData()}),100)}))}},{key:"resetOffsets",value:function(){this.fretOffset=0,this.stringOffset=0,this.saveAndShowData()}},{key:"resetData",value:function(){this.noteGroups=[],this.saveAndShowData()}},{key:"deleteLastGroup",value:function(){this.noteGroups.pop(),this.saveAndShowData()}},{key:"saveAndShowData",value:function(){this.updateGuitarTabInTextArea(),this.drawFrets()}},{key:"updateGuitarTabInTextArea",value:function(){this.setGuitarTab(this.getNoteGroupsAsSpaceDelimitedString())}},{key:"getNoteGroupsAsSpaceDelimitedString",value:function(){return this.noteGroups.join(" ")}},{key:"splitNoteGroup",value:function(t){var e={6:"X",5:"X",4:"X",3:"X",2:"X",1:"X"};if(6==t.length)for(var r=t.toUpperCase().split("").reverse(),n=1;n<=6;n++)"X"!=r[n-1]&&(e[n]=r[n-1]);else{var a=t.split("_"),s=a[0],o=a[1];e[s]=o}return e}},{key:"mergeGroupIntoArray",value:function(t,e){if(console.log(t+" "+e),6==t.length)for(var r=t.toUpperCase().split(""),n=0;n<6;n++)"X"!=r[n]&&(e[n]=r[n]);else{var a=t.split("_"),s=a[0],o=parseInt(a[1]);o>9&&(o=o.toString(16).toUpperCase()),e[6-s]=o}}},{key:"mergeLastTwoGroups",value:function(){if(!(this.noteGroups.length<2)){var t=this.noteGroups.pop(),e=this.noteGroups.pop(),r=["X","X","X","X","X","X"];this.mergeGroupIntoArray(e,r),this.mergeGroupIntoArray(t,r),this.noteGroups.push(r.join("")),this.saveAndShowData()}}},{key:"drawStringsAndFrets",value:function(t){t.fillStyle="rgba(255,255,255,0.1)",t.fillRect(0,0,30,280),t.lineWidth=1;for(var e=1;e<=6;e++){t.beginPath();var r=.08*e;t.strokeStyle="rgba(255,255,255,".concat(r,")"),t.moveTo(0,40*e),t.lineTo(1040,40*e),t.stroke()}t.beginPath(),t.lineWidth=1,t.strokeStyle="rgba(255,255,255,0.5)";for(var n=1;n<=11;n++){var a=85*n+20;t.beginPath(),t.moveTo(a,0),t.lineTo(a,280),t.stroke()}}},{key:"getMostRecentNoteGroup",value:function(){var t=this.noteGroups[this.noteGroups.length-1];return this.splitNoteGroup(t)}},{key:"playMostRecentGroup",value:function(){if(0!==this.noteGroups.length)for(var t=this.getMostRecentNoteGroup(),e=1;e<=6;e++){var r=t[e];if("X"!=r){r=parseInt(r);var n=h[e]+r;this.playPianoNote(n)}}else console.log("No note groups to play.")}},{key:"playPianoNote",value:function(t){console.log("PLAY "+t),f.play(t,.4,.8)}},{key:"drawMostRecentGroup",value:function(t){if(0!=this.noteGroups.length)for(var e=this.getMostRecentNoteGroup(),r=1;r<=6;r++){var n=e[r];if("X"!=n){var a=85*(n=parseInt(n))+(0==n?15:-22.5),s=40*r;t.beginPath(),t.arc(a,s,14,0,2*Math.PI),t.fillStyle="rgba(180,180,0,0.5)",t.fill()}}}},{key:"drawFrets",value:function(){var t=this.getGuitarCanvas();if(t&&t.getContext){var e=t.getContext("2d");e&&(e.fillStyle="#131313",e.fillRect(0,0,t.width,t.height),this.drawStringsAndFrets(e),this.drawKeyLabels(e),this.drawMostRecentGroup(e))}}},{key:"drawKeyLabels",value:function(t){t.font="14px Tahoma",t.lineJoin="round",t.lineWidth=6;for(var e=1;e<=6;e++)for(var r=0;r<=12;r++){var n=0==r?10:-27.5,a=this.noteOffsetForString[e],s=d[(a+r)%12];t.fillStyle="C"===s?"#F55":"#FFF";var o=85*r+n,i=40*e+6;t.fillText(s,o,i)}t.font="15px Hack, Consolas, Courier",t.fillStyle="#FF4";for(var c=1;c<=4;c++)for(var u=0;u<10;u++){var l=this.keyboardLabels[c-1][u],f=u+this.fretOffset,h=85*f+(0==f?10:-27.5),p=40*(c+this.stringOffset)+22;t.fillText(l,h,p)}}},{key:"loadNoteGroupsFromGuitarTab",value:function(t){var e=t.trim();this.noteGroups=""==e?[]:e.split(" "),this.updateGuitarTabInTextArea()}},{key:"play",value:function(t,e){if(this.keyCodeToFret.hasOwnProperty(t)){var r=this.keyCodeToFret[t]+this.fretOffset;console.log("Adjusted Fret "+r);var n=this.keyCodeToString[t]+this.stringOffset,a=this.noteOffsetForString[n],s=d[(a+r)%12].toLowerCase();-1!=this.getSharps().indexOf(s)&&e++,-1!=this.getFlats().indexOf(s)&&e--,r+=e,this.noteGroups.push(n+"_"+r);var o=h[n]+r;this.playPianoNote(o),this.saveAndShowData()}}},{key:"onKeyDown",value:function(t){if(!this.isFocusedOnSharpsInput()&&!this.isFocusedOnFlatsInput()&&(f||(f=new l.b(l.a.Sampled_1)).initWebAudio(),(!t.metaKey||37==t.keyCode||39==t.keyCode)&&!t.altKey)){var e=0;switch(t.ctrlKey?e=-1:t.shiftKey&&(e=1),t.preventDefault(),t.keyCode){case 32:this.playMostRecentGroup();break;case 192:console.log("SHIFT + `"),this.resetData();break;case 27:t.shiftKey?this.resetData():this.resetOffsets();break;case 8:this.deleteLastGroup();break;case 9:this.mergeLastTwoGroups();break;case 37:this.fretOffset--,this.fretOffset<0&&(this.fretOffset=0),this.drawFrets();break;case 39:this.fretOffset++,this.fretOffset>3&&(this.fretOffset=3),this.drawFrets();break;case 38:this.stringOffset--,this.stringOffset<0&&(this.stringOffset=0),this.drawFrets();break;case 40:this.stringOffset++,this.stringOffset>2&&(this.stringOffset=2),this.drawFrets();break;default:this.play(t.keyCode,e)}}}}]),t}(),b=function(){return Object(a.jsxs)("div",{className:"jsx-3523198805 root",children:["shift + esc \u2192 clear",Object(a.jsx)("br",{className:"jsx-3523198805"}),"cmd + c \u2192 copy ",Object(a.jsx)("br",{className:"jsx-3523198805"}),"arrow keys \u2192 adjust",Object(a.jsx)("br",{className:"jsx-3523198805"}),"tab \u2192 combine",Object(a.jsx)(o.a,{id:"3523198805",children:[".root.jsx-3523198805{float:right;text-align:right;}"]})]})},v=r("q1tI"),g=r("094J"),j=Object(v.forwardRef)((function(t,e){var r=t.label,s=t.persistedStateKey,i=Object(g.a)(s)(""),c=Object(n.a)(i,2),u=c[0],l=c[1],f=Object(v.useRef)();return Object(v.useImperativeHandle)(e,(function(){return{hasFocus:function(){return f.current===document.activeElement}}})),Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:"jsx-2989423958",children:[r," \xa0",Object(a.jsx)("input",{ref:f,value:u,onChange:function(t){console.log("onChange"),l(t.target.value.toUpperCase().replace(/[^ABCDEFG]+/g,""))},onKeyDown:function(t){},onKeyUp:function(t){console.log("onKeyUp "+t.keyCode),l(t.target.value.toUpperCase().replace(/[^ABCDEFG]+/g,""))},onBlur:function(t){},className:"jsx-2989423958"})]}),Object(a.jsx)(o.a,{id:"2989423958",children:["div.jsx-2989423958{display:block;border:1px solid red;}"]})]})})),y=r("xgb5");console.log("index.tsx loaded!");var O=Object(g.a)("guitar_tab"),x=null;x=new p;var w=!0;e.default=function(){console.log("Page Function Called");var t=O(""),e=Object(n.a)(t,2),r=e[0],s=e[1],i=Object(v.useRef)(),c=Object(v.useRef)(),u=Object(v.useRef)(),l=Object(v.useRef)();return Object(y.a)("keydown",(function(t){x.onKeyDown(t)})),Object(v.useEffect)((function(){console.log("USE EFFECT on every render!"),x.setGuitarTab=s,x.getSharps=function(){return""},x.getFlats=function(){return""},x.getGuitarTab=function(){return r},x.getGuitarTabTextArea=function(){return i.current},x.isFocusedOnSharpsInput=function(){return!(!u||!u.current)&&u.current.hasFocus()},x.isFocusedOnFlatsInput=function(){return!(!l||!l.current)&&l.current.hasFocus()},x.getGuitarCanvas=function(){return c.current}})),Object(v.useEffect)((function(){console.log("Local Storage is currently:"),console.log(localStorage),x.loadNoteGroupsFromGuitarTab(r),x.drawFrets()}),[]),Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(b,{}),Object(a.jsxs)("div",{className:"jsx-1699099381 sharps-and-flats",children:[Object(a.jsx)(j,{ref:u,label:"sharps",persistedStateKey:"guitar_sharps"}),Object(a.jsx)(j,{ref:l,label:"flats",persistedStateKey:"guitar_flats"})]}),Object(a.jsx)("div",{className:"jsx-1699099381 clear"}),Object(a.jsx)("br",{className:"jsx-1699099381"}),Object(a.jsxs)("div",{className:"jsx-1699099381 content",children:[Object(a.jsx)("textarea",{ref:i,rows:3,cols:80,defaultValue:r,readOnly:!0,className:"jsx-1699099381 textarea"}),Object(a.jsx)("canvas",{ref:c,width:"1040",height:"280",className:"jsx-1699099381 canvas"})]}),Object(a.jsx)(o.a,{id:"3641922067",children:["body{margin:15px 20px;}"]}),Object(a.jsx)(o.a,{id:"2696048111",children:[".sharps-and-flats.jsx-1699099381{margin-right:40px;float:left;text-align:right;}",".clear.jsx-1699099381{clear:right;}",".content.jsx-1699099381{width:100%;text-align:center;}",".textarea.jsx-1699099381{font-family:Inconsolata,Menlo,Monaco,Courier,monospace;font-size:16pt;width:100%;background-color:#444;color:#ddd;}",".canvas.jsx-1699099381{border:1px solid rgba(0,0,0,0.2);}","input.jsx-1699099381{background-color:#444;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:1px solid #222;padding:6px;width:100px;color:#ddd;}"]})]})}},puqk:function(t,e,r){"use strict";(function(t){var n=r("q1tI");e.a=function(e,r,a,s){void 0===a&&(a=t),void 0===s&&(s={});var o=Object(n.useRef)(),i=s.capture,c=s.passive,u=s.once;Object(n.useEffect)((function(){o.current=r}),[r]),Object(n.useEffect)((function(){if(a&&a.addEventListener){var t=function(t){return o.current(t)},r={capture:i,passive:c,once:u};return a.addEventListener(e,t,r),function(){a.removeEventListener(e,t,r)}}}),[e,a,i,c,u])}}).call(this,r("yLpj"))},wCx2:function(t,e,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/guitar/v1",function(){return r("jLID")}])},yLpj:function(t,e){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(n){"object"===typeof window&&(r=window)}t.exports=r}},[["wCx2",0,1,2,3,5]]]);