(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(3),l=a.n(o);a(13);var c=function(){const[e,t]=Object(n.useState)({lat:null,lon:null}),[a,o]=Object(n.useState)(null),[l,c]=Object(n.useState)(""),i="69477da39ac3c78569c0c90d7d5791e1";return Object(n.useEffect)(()=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(e=>{const{latitude:a,longitude:n}=e.coords;t({lat:a,lon:n}),((e,t)=>{e&&t&&fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${e}&lon=${t}&appid=${i}&units=metric&lang=fa`).then(e=>e.json()).then(e=>{200===e.cod?o(e):alert("\u062e\u0637\u0627 \u062f\u0631 \u062f\u0631\u06cc\u0627\u0641\u062a \u0627\u0637\u0644\u0627\u0639\u0627\u062a \u0622\u0628\u200c\u0648\u0647\u0648\u0627!")}).catch(()=>{alert("\u062e\u0637\u0627 \u062f\u0631 \u062f\u0631\u06cc\u0627\u0641\u062a \u0627\u0637\u0644\u0627\u0639\u0627\u062a \u0622\u0628\u200c\u0648\u0647\u0648\u0627.")})})(a,n)},e=>{alert("\u062f\u0633\u062a\u0631\u0633\u06cc \u0628\u0647 \u0645\u0648\u0642\u0639\u06cc\u062a \u0645\u06a9\u0627\u0646\u06cc \u0631\u062f \u0634\u062f \u06cc\u0627 \u062e\u0637\u0627\u06cc\u06cc \u0631\u062e \u062f\u0627\u062f.")}):alert("\u0645\u0631\u0648\u0631\u06af\u0631 \u0634\u0645\u0627 \u0627\u0632 \u0645\u0648\u0642\u0639\u06cc\u062a \u0645\u06a9\u0627\u0646\u06cc \u067e\u0634\u062a\u06cc\u0628\u0627\u0646\u06cc \u0646\u0645\u06cc\u200c\u06a9\u0646\u062f.")},[]),r.a.createElement("div",{style:{textAlign:"center",padding:50,fontFamily:"Tahoma",minHeight:"100vh",...(()=>{if(!a||!a.weather)return{};switch(a.weather[0].main.toLowerCase()){case"clear":return{background:"linear-gradient(to top, #fceabb, #f8b500)",color:"#333"};case"clouds":return{background:"linear-gradient(to top, #d7d2cc, #304352)",color:"#fff"};case"rain":case"drizzle":return{background:"linear-gradient(to top, #4b79a1, #283e51)",color:"#fff"};case"snow":return{background:"linear-gradient(to top, #e6dada, #274046)",color:"#333"};case"fog":case"mist":return{background:"linear-gradient(to top, #3e5151, #decba4)",color:"#333"};case"thunderstorm":return{background:"linear-gradient(to top, #141e30, #243b55)",color:"#fff"};default:return{background:"#f0f0f0",color:"#333"}}})()}},r.a.createElement("h1",null,"\u0648\u0636\u0639\u06cc\u062a \u0622\u0628\u200c\u0648\u200c\u0647\u0648\u0627 \u2600\ufe0f\ud83c\udf27\ufe0f"),r.a.createElement("div",{style:{marginBottom:20}},r.a.createElement("input",{type:"text",placeholder:"\u0646\u0627\u0645 \u0634\u0647\u0631 \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f...",value:l,onChange:e=>c(e.target.value),style:{padding:"10px",fontSize:"16px",borderRadius:"5px",width:"200px"}}),r.a.createElement("button",{onClick:()=>{l&&fetch(`https://api.openweathermap.org/data/2.5/weather?q=${l}&appid=${i}&units=metric&lang=fa`).then(e=>e.json()).then(e=>{200===e.cod?(o(e),t({lat:e.coord.lat,lon:e.coord.lon})):alert("\u0634\u0647\u0631 \u067e\u06cc\u062f\u0627 \u0646\u0634\u062f!")}).catch(()=>{alert("\u062e\u0637\u0627 \u062f\u0631 \u062f\u0631\u06cc\u0627\u0641\u062a \u0627\u0637\u0644\u0627\u0639\u0627\u062a \u0634\u0647\u0631.")})},style:{marginLeft:"10px",padding:"10px 20px",fontSize:"16px",borderRadius:"5px",cursor:"pointer"}},"\u062c\u0633\u062a\u062c\u0648")),a&&a.main&&a.weather?r.a.createElement("div",null,r.a.createElement("h2",null,a.name),r.a.createElement("img",{src:`https://openweathermap.org/img/wn/${a.weather[0].icon}@2x.png`,alt:"\u0648\u0636\u0639\u06cc\u062a \u0622\u0633\u0645\u0627\u0646"}),r.a.createElement("p",null,"\ud83c\udf21\ufe0f \u062f\u0645\u0627: ",a.main.temp," \u062f\u0631\u062c\u0647 \u0633\u0627\u0646\u062a\u06cc\u200c\u06af\u0631\u0627\u062f"),r.a.createElement("p",null,"\ud83c\udf24\ufe0f \u0622\u0633\u0645\u0627\u0646: ",a.weather[0].description)):e.lat&&r.a.createElement("p",null,"\u062f\u0631 \u062d\u0627\u0644 \u062f\u0631\u06cc\u0627\u0641\u062a \u0627\u0637\u0644\u0627\u0639\u0627\u062a \u0622\u0628\u200c\u0648\u0647\u0648\u0627..."))};var i=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,15)).then(t=>{let{getCLS:a,getFID:n,getFCP:r,getLCP:o,getTTFB:l}=t;a(e),n(e),r(e),o(e),l(e)})};l.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(c,null))),i()},4:function(e,t,a){e.exports=a(14)}},[[4,1,2]]]);
//# sourceMappingURL=main.ee1a0edd.chunk.js.map