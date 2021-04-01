(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[12],{OTm4:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"c",(function(){return y}));var s=n("1OyB"),i=n("vuIU"),a=n("rePB"),r=n("B7GI"),l=n("XlTo");function o(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"===typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(e,t)}(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var s=0,i=function(){};return{s:i,n:function(){return s>=e.length?{done:!0}:{done:!1,value:e[s++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,r=!0,l=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return r=e.done,e},e:function(e){l=!0,a=e},f:function(){try{r||null==n.return||n.return()}finally{if(l)throw a}}}}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,s=new Array(t);n<t;n++)s[n]=e[n];return s}var c=function e(t){var n=this;Object(s.a)(this,e),Object(a.a)(this,"filesToLoad",[]);var i,r=o(t);try{var h=function(){var e=i.value,t=new l.k(e,(function(){console.log("Preloaded "+e)}));n.filesToLoad.push(t)};for(r.s();!(i=r.n()).done;)h()}catch(c){r.e(c)}finally{r.f()}},u=function e(){Object(s.a)(this,e)};Object(a.a)(u,"isRunning",!1);var p,m=u;!function(e){e[e.SynthBasic=0]="SynthBasic",e[e.SynthFM=1]="SynthFM",e[e.SynthAM=2]="SynthAM",e[e.SynthFatSawtooth=3]="SynthFatSawtooth",e[e.SynthMusicalJS=4]="SynthMusicalJS",e[e.Sampled_1=5]="Sampled_1",e[e.Sampled_2=6]="Sampled_2",e[e.SynthTest1=7]="SynthTest1",e[e.SynthTest2=8]="SynthTest2",e[e.SynthTest3=9]="SynthTest3",e[e.COUNT=10]="COUNT"}(p||(p={}));var y=function(e){var t=parseInt(e);return!isNaN(t)&&t>=0&&t<p.COUNT?t:p.SynthBasic},S=0,d=function(){function e(t){if(Object(s.a)(this,e),Object(a.a)(this,"id",0),Object(a.a)(this,"type",p.SynthBasic),Object(a.a)(this,"toneJS_Instrument",void 0),Object(a.a)(this,"musicalJS_Instrument",null),Object(a.a)(this,"isReady",!1),Object(a.a)(this,"preloader",null),Object(a.a)(this,"samplesMap",void 0),Object(a.a)(this,"baseURL",""),Object(a.a)(this,"play_Helper",void 0),Object(a.a)(this,"stop",void 0),Object(a.a)(this,"silence",void 0),this.id=S,S++,console.log("Created Instrument ID: "+this.id),console.log("So far, we have created "+S+" instruments."),this.type=t,this.type===p.SynthMusicalJS)console.log("Creating a Musical JS Instrument"),this.musicalJS_Instrument=new r.a.Instrument("piano"),this.isReady=!0,this.play_Helper=this.play_HelperMusicalJS,this.stop=this.stop_doNothing,this.silence=this.silence_musicalJS;else switch(console.log("Creating a Tone JS Instrument"),m.isRunning||l.o().then((function(){console.log("Tone is Ready!"),m.isRunning=!0})),this.type){case p.SynthBasic:default:this.setupBasicInstrument(),this.play_Helper=this.play_HelperToneJS,this.stop=this.stop_triggerReleaseNote,this.silence=this.silence_releaseAll;break;case p.Sampled_1:this.setupSampledInstrument1(),this.play_Helper=this.play_HelperToneJS,this.stop=this.stop_triggerReleaseNote,this.silence=this.silence_releaseAll;break;case p.Sampled_2:this.setupSampledInstrument2(),this.play_Helper=this.play_HelperToneJS,this.stop=this.stop_triggerReleaseNote,this.silence=this.silence_releaseAll;break;case p.SynthFM:this.setupFMInstrument(),this.play_Helper=this.play_HelperToneJS,this.stop=this.stop_triggerReleaseNote,this.silence=this.silence_releaseAll;break;case p.SynthAM:this.setupAMInstrument(),this.play_Helper=this.play_HelperToneJS,this.stop=this.stop_triggerReleaseNote,this.silence=this.silence_releaseAll;break;case p.SynthFatSawtooth:this.setupFatSawtoothInstrument(),this.play_Helper=this.play_HelperToneJS,this.stop=this.stop_triggerReleaseNote,this.silence=this.silence_releaseAll;break;case p.SynthTest1:this.setupTestInstrument1(),this.play_Helper=this.play_HelperToneJS,this.stop=this.stop_triggerReleaseNoParams,this.silence=this.silence_triggerRelease;break;case p.SynthTest2:this.setupTestInstrument2(),this.play_Helper=this.play_HelperToneJS,this.stop=this.stop_triggerReleaseNote,this.silence=this.silence_releaseAll;break;case p.SynthTest3:this.setupTestInstrument3(),this.play_Helper=this.play_HelperToneJS_PluckSynth,this.stop=this.stop_triggerReleaseNoParams,this.silence=this.silence_triggerRelease}}return Object(i.a)(e,[{key:"play",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;n>1?n=1:n<0&&(n=0),t<0&&(t=0);var s=t>0?" for ".concat(t," seconds"):"",i=" at velocity = "+n;console.log("Instrument: PLAY "+e+s+i);var a=e+20;this.play_Helper(a,t,n)}},{key:"play_HelperMusicalJS",value:function(e,t,n){this.musicalJS_Instrument.tone(-e)}},{key:"play_HelperToneJS",value:function(e,t,n){try{var s=l.m(e);t>0?this.toneJS_Instrument.triggerAttackRelease(s,t,l.n(),n):this.toneJS_Instrument.triggerAttack(s,l.n(),n)}catch(i){console.log(i)}}},{key:"play_HelperToneJS_PluckSynth",value:function(e,t,n){try{var s=l.m(e);this.toneJS_Instrument.triggerAttack(s)}catch(i){console.log(i)}}},{key:"stop_doNothing",value:function(e){}},{key:"stop_triggerReleaseNoParams",value:function(e){this.toneJS_Instrument.triggerRelease()}},{key:"stop_triggerReleaseNote",value:function(e){var t=e+20,n=l.m(t);this.toneJS_Instrument.triggerRelease(n)}},{key:"setupSampledInstrument1",value:function(){this.baseURL="/s/m/grand/",this.samplesMap={C1:"4.mp3",C2:"16.mp3",C3:"28.mp3",D3:"30.mp3",E3:"32.mp3",G3:"35.mp3",A3:"37.mp3",B3:"39.mp3",C4:"40.mp3",D4:"42.mp3",E4:"44.mp3",F4:"45.mp3",G4:"47.mp3",A4:"49.mp3",C5:"52.mp3",F5:"57.mp3",A5:"61.mp3",C6:"64.mp3",F6:"69.mp3",C7:"76.mp3",G7:"83.mp3",C8:"88.mp3"},this.setupSampledInstrument({attack:.01})}},{key:"setupSampledInstrument2",value:function(){this.baseURL="/s/m/bright/",this.samplesMap={C1:"4.mp3",G1:"11.mp3",C2:"16.mp3",G2:"23.mp3",C3:"28.mp3",G3:"35.mp3",C4:"40.mp3",G4:"47.mp3",C5:"52.mp3",G5:"59.mp3",C6:"64.mp3",G6:"71.mp3",C7:"76.mp3",G7:"83.mp3",C8:"88.mp3"},this.setupSampledInstrument({attack:.05})}},{key:"setupSampledInstrument",value:function(e){var t=this;this.isReady=!1;var n=[];for(var s in this.samplesMap){var i=this.samplesMap[s];n.push(this.baseURL+i)}this.preloader=new c(n);var a={urls:this.samplesMap,baseUrl:this.baseURL,attack:e.attack,release:.8,curve:"exponential",onload:function(){t.isReady=!0}};this.toneJS_Instrument=new l.i(a).toDestination()}},{key:"setupBasicInstrument",value:function(){console.log("Basic");var e=new l.g(l.j);e.toDestination(),this.toneJS_Instrument=e,this.isReady=!0}},{key:"setupFMInstrument",value:function(){console.log("SynthFM");var e=new l.g(l.c);e.toDestination(),this.toneJS_Instrument=e,this.isReady=!0}},{key:"setupFatSawtoothInstrument",value:function(){console.log("SynthFatSawtooth");var e=new l.g(l.j,{oscillator:{type:"fatsawtooth",count:3,spread:22}}),t=new l.h({preDelay:.1,decay:1,wet:.55});e.chain(t,l.b),this.toneJS_Instrument=e,this.isReady=!0}},{key:"setupAMInstrument",value:function(){console.log("SynthAM");var e=new l.g(l.a),t=new l.h({preDelay:.1,decay:1,wet:.55}),n=new l.l(8);e.chain(t,n,l.b),this.toneJS_Instrument=e,this.isReady=!0}},{key:"setupTestInstrument1",value:function(){console.log("Test 1: MetalSynth");var e=new l.g(l.d),t=new l.h({preDelay:.1,decay:.8,wet:.66}),n=new l.l(-10);e.chain(t,n,l.b),this.toneJS_Instrument=e,this.isReady=!0}},{key:"setupTestInstrument2",value:function(){console.log("Test 2: MonoSynth");var e=new l.g(l.e);e.toDestination(),this.toneJS_Instrument=e,this.isReady=!0}},{key:"setupTestInstrument3",value:function(){console.log("Test 2: PluckSynth");var e=new l.f({attackNoise:.2,dampening:2e3,resonance:.982,release:1}),t=new l.h({preDelay:.1,decay:2,wet:.75});e.chain(t,l.b),this.toneJS_Instrument=e,this.isReady=!0}},{key:"silence_releaseAll",value:function(){this.toneJS_Instrument.releaseAll()}},{key:"silence_triggerRelease",value:function(){this.toneJS_Instrument.triggerRelease()}},{key:"silence_musicalJS",value:function(){this.musicalJS_Instrument.silence()}},{key:"dispose",value:function(){console.log("Disposing of Instrument ID: "+this.id),this.preloader=null,this.toneJS_Instrument&&(this.toneJS_Instrument.dispose(),this.toneJS_Instrument=null),this.musicalJS_Instrument&&(this.musicalJS_Instrument=null)}},{key:"isInitialized",get:function(){return this.isReady}}]),e}();t.b=d},t1q6:function(e,t,n){"use strict";var s=n("nKUr"),i=n("q1tI"),a=n("xgb5"),r=n("kfFl"),l=n("yv+Y"),o=n("EQI2"),h=n("++HY"),c=n("+JwS"),u=n("Z3vd");t.a=function(e){var t=e.initialOpenState,n=e.preloadNow,p=Object(i.useState)(t),m=p[0],y=p[1],S=function(e,t){y(!1)};return Object(a.a)("keydown",(function(e){S()})),Object(i.useEffect)((function(){return function(){}}),[]),Object(s.jsx)("div",{children:Object(s.jsxs)(r.a,{onClose:S,"aria-labelledby":"dialog-title","aria-describedby":"dialog-description",open:m,onExited:n,children:[Object(s.jsx)(l.a,{id:"dialog-title",children:"Let's Make Music"}),Object(s.jsx)(o.a,{children:Object(s.jsx)(h.a,{id:"dialog-description",children:"This is going to be fun!"})}),Object(s.jsx)(c.a,{children:Object(s.jsx)(u.a,{variant:"contained",color:"primary",onClick:function(e){S()},children:"OK"})})]})})}}}]);