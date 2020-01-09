(this["webpackJsonpminesweeper-pet-project"]=this["webpackJsonpminesweeper-pet-project"]||[]).push([[0],[,,,,,,,,,,,,,function(e,t,i){e.exports=i(31)},,,,,function(e,t,i){},function(e,t,i){},,,function(e,t,i){},function(e,t,i){},function(e,t,i){},,,,,function(e,t,i){},function(e,t,i){},function(e,t,i){"use strict";i.r(t);var n,r,o,a,c,s,l,u,p,d,f,m,b,v,h,y,O,g,k,w,j,E,C,M=i(0),D=i.n(M),N=i(7),S=i.n(N),T=(i(18),i(19),i(4)),F=(i(22),Object(T.c)((function(e){var t=e.state,i=e.opened,n=e.marked,r=e.minesCount,o=e.handleClick;return D.a.createElement("div",{onClick:o,className:"block".concat(n?" marked":""," ").concat(i?"opened ".concat(t," ").concat(function(e){var t,i={1:"one",2:"two",3:"three",4:"four",5:"five",6:"six",7:"seven",8:"eight",9:"nine"};return null!==(t=null===i||void 0===i?void 0:i[e])&&void 0!==t?t:"zero"}(r)):"closed")},i&&r>0&&r)}))),P=(i(23),Object(T.c)((function(e){var t=e.win,i=e.gameOver,n=e.handleClick;return D.a.createElement("div",{onClick:n,className:"face".concat(t?" face--win":"").concat(i?" face--game-over":"")})}))),z=(i(24),i(5)),I=i(6),G=i(11),B=i(12),L=i(2),W=(i(25),i(1)),_={beginner:{id:"beginner",name:"\u041d\u043e\u0432\u0438\u0447\u043e\u043a",cols:9,rows:9,mines:10},intermediate:{id:"intermediate",name:"\u041b\u044e\u0431\u0438\u0442\u0435\u043b\u044c",cols:16,rows:16,mines:40},professional:{id:"professional",name:"\u041f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b",cols:30,rows:16,mines:99}},R=i(3),x={opened:!1,state:"empty",marked:!1},A=new(n=Object(R.persist)("object"),r=Object(R.persist)("list"),o=W.action.bound,a=W.action.bound,c=W.action.bound,s=W.action.bound,l=W.action.bound,u=W.action.bound,p=W.action.bound,d=W.action.bound,f=W.action.bound,m=W.action.bound,b=W.action.bound,v=function(){function e(){var t=this;Object(G.a)(this,e),Object(z.a)(this,"difficulty",h,this),Object(z.a)(this,"field",y,this),Object(z.a)(this,"gameOver",O,this),Object(z.a)(this,"isMarking",g,this),Object(z.a)(this,"win",k,this),Object(z.a)(this,"gameStarted",w,this),Object(z.a)(this,"minesCount",j,this),Object(z.a)(this,"time",E,this),Object(z.a)(this,"startTimeout",C,this),this.noClosedFieldsLeft=function(){for(var e=t.difficulty,i=e.cols,n=e.rows,r=t.field,o=0;o<n;o++)for(var a=0;a<i;a++)if(!r[o][a].opened&&!r[o][a].marked)return!1;return!0},this.generateField(),this.placeMines(),this.placeNumbers()}return Object(B.a)(e,[{key:"setDifficulty",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"beginner";this.difficulty=_[e],this.restartGame()}},{key:"setMarkingState",value:function(e){this.isMarking=e}},{key:"generateField",value:function(){for(var e=this.difficulty,t=e.cols,i=e.rows,n=this.field,r=0;r<i;r++){n.push([]);for(var o=0;o<t;o++)n[r].push(x)}}},{key:"placeMines",value:function(){for(var t=this.difficulty,i=t.mines,n=t.rows,r=t.cols,o=this.field,a=0;a<i;a++){var c=p(),s=Object(I.a)(c,2),l=s[0],u=s[1];this.field[l][u].state="mine"}function p(){for(var t=e.getRandomInt(n),i=e.getRandomInt(r);"empty"!=o[t][i].state;)t=e.getRandomInt(n),i=e.getRandomInt(r);return[t,i]}}},{key:"placeNumbers",value:function(){for(var e=this.difficulty,t=e.cols,i=e.rows,n=this.field,r=0;r<i;r++)for(var o=0;o<t;o++)"mine"!==n[r][o].state&&(n[r][o].minesCount=a(r,o),n[r][o].minesCount>0&&(n[r][o].state="closeToMine"));function a(e,t){var i=0;return[[e-1,t-1],[e,t-1],[e+1,t-1],[e-1,t],[e,t],[e+1,t],[e-1,t+1],[e,t+1],[e+1,t+1]].forEach((function(e){var t,r=Object(I.a)(e,2),o=r[0],a=r[1];(null===n||void 0===n?void 0:null===(t=n[o])||void 0===t?void 0:t[a])&&"mine"===n[o][a].state&&i++})),i}}},{key:"openField",value:function(){for(var e=this.difficulty,t=e.cols,i=e.rows,n=this.field,r=0;r<i;r++)for(var o=0;o<t;o++)n[r][o].opened=!0;console.log(Object(W.toJS)(n))}},{key:"restartGame",value:function(){this.gameOver=!1,this.win=!1,this.time=0,this.minesCount=this.difficulty.mines,this.field=[],this.gameStarted=!1,clearInterval(this.startTimeout),this.generateField(),this.placeMines(),this.placeNumbers()}},{key:"startTimer",value:function(){var e=this;this.startTimeout=setInterval((function(){e.time+=1e3}),1e3)}},{key:"checkClosedBlock",value:function(e,t){if(!this.win){this.gameStarted||(this.gameStarted=!0,this.startTimer());var i=this.field,n=this.isMarking,r=this.openField,o=this.setGameOver,a=this.checkWin,c=i[e][t];if(n){if(c.opened&&"closeToMine"===c.state&&function(e,t){var n=0;return[[e-1,t-1],[e,t-1],[e+1,t-1],[e-1,t],[e,t],[e+1,t],[e-1,t+1],[e,t+1],[e+1,t+1]].forEach((function(e){var t,r=Object(I.a)(e,2),o=r[0],a=r[1],c=null===i||void 0===i?void 0:null===(t=i[o])||void 0===t?void 0:t[a];c&&c.marked&&n++})),i[e][t].minesCount===n}(e,t))return void function(e,t){[[e-1,t-1],[e,t-1],[e+1,t-1],[e-1,t],[e,t],[e+1,t],[e-1,t+1],[e,t+1],[e+1,t+1]].forEach((function(e){var t,n=Object(I.a)(e,2),r=n[0],o=n[1],a=null===i||void 0===i?void 0:null===(t=i[r])||void 0===t?void 0:t[o];!a||a.marked||a.opened||s(r,o)}))}(e,t);if(c.opened)return;c.marked=!c.marked,c.marked?this.minesCount--:this.minesCount++,a()}else{if(c.opened||c.marked&&!n)return;s(e,t)}}function s(e,t){var n=i[e][t];if("mine"===n.state)return r(),o(!0),void(n.state="destroyed");!function e(t,n){var r;if(!(null===i||void 0===i?void 0:null===(r=i[t])||void 0===r?void 0:r[n])||i[t][n].marked||i[t][n].opened||"mine"===i[t][n].state)return;i[t][n].opened=!0,[[t-1,n-1],[t,n-1],[t+1,n-1],[t-1,n],[t,n],[t+1,n],[t-1,n+1],[t,n+1],[t+1,n+1]].forEach((function(r){var o,a=Object(I.a)(r,2),c=a[0],s=a[1];t==c&&n==s||"empty"===(null===i||void 0===i?void 0:null===(o=i[t])||void 0===o?void 0:o[n].state)&&e(c,s)}))}(e,t),a()}}},{key:"setGameOver",value:function(e){this.gameOver=e,e&&clearInterval(this.startTimeout)}},{key:"checkWin",value:function(){if(0===this.minesCount&&this.noClosedFieldsLeft()&&!this.gameOver)return this.win=!0,void clearInterval(this.startTimeout);this.win=!1}}],[{key:"getRandomInt",value:function(e){return Math.floor(Math.random()*Math.floor(e))}}]),e}(),h=Object(L.a)(v.prototype,"difficulty",[n,W.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return _.intermediate}}),y=Object(L.a)(v.prototype,"field",[r,W.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),O=Object(L.a)(v.prototype,"gameOver",[R.persist,W.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),g=Object(L.a)(v.prototype,"isMarking",[R.persist,W.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),k=Object(L.a)(v.prototype,"win",[R.persist,W.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),w=Object(L.a)(v.prototype,"gameStarted",[R.persist,W.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),j=Object(L.a)(v.prototype,"minesCount",[R.persist,W.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),E=Object(L.a)(v.prototype,"time",[R.persist,W.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),C=Object(L.a)(v.prototype,"startTimeout",[R.persist,W.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),Object(L.a)(v.prototype,"setDifficulty",[o],Object.getOwnPropertyDescriptor(v.prototype,"setDifficulty"),v.prototype),Object(L.a)(v.prototype,"setMarkingState",[a],Object.getOwnPropertyDescriptor(v.prototype,"setMarkingState"),v.prototype),Object(L.a)(v.prototype,"generateField",[c],Object.getOwnPropertyDescriptor(v.prototype,"generateField"),v.prototype),Object(L.a)(v.prototype,"placeMines",[s],Object.getOwnPropertyDescriptor(v.prototype,"placeMines"),v.prototype),Object(L.a)(v.prototype,"placeNumbers",[l],Object.getOwnPropertyDescriptor(v.prototype,"placeNumbers"),v.prototype),Object(L.a)(v.prototype,"openField",[u],Object.getOwnPropertyDescriptor(v.prototype,"openField"),v.prototype),Object(L.a)(v.prototype,"restartGame",[p],Object.getOwnPropertyDescriptor(v.prototype,"restartGame"),v.prototype),Object(L.a)(v.prototype,"startTimer",[d],Object.getOwnPropertyDescriptor(v.prototype,"startTimer"),v.prototype),Object(L.a)(v.prototype,"checkClosedBlock",[f],Object.getOwnPropertyDescriptor(v.prototype,"checkClosedBlock"),v.prototype),Object(L.a)(v.prototype,"setGameOver",[m],Object.getOwnPropertyDescriptor(v.prototype,"setGameOver"),v.prototype),Object(L.a)(v.prototype,"checkWin",[b],Object.getOwnPropertyDescriptor(v.prototype,"checkWin"),v.prototype),v);i(29);var J=function(e){var t=e.digits,i=void 0===t?3:t,n=""+e.count;return D.a.createElement("div",{className:"counter"},n.padStart(i,"0"))},$=(i(30),function(e){var t=e.difficulty,i=e.setDifficulty;return D.a.createElement("div",{className:"frame difficulty"},"\u0421\u043b\u043e\u0436\u043d\u043e\u0441\u0442\u044c:",D.a.createElement("select",{name:"difficulty",className:"difficulty__select",onChange:function(e){null===i||void 0===i||i(e.target.value)},value:t.id},Object.keys(_).map((function(e){return D.a.createElement("option",{className:"difficulty__item",key:_[e].id,value:_[e].id},_[e].name)}))))}),q=Object(T.c)((function(){var e=function(e){var t=Object(M.useState)(!1),i=Object(I.a)(t,2),n=i[0],r=i[1];function o(t){t.key===e&&r(!0)}var a=function(t){t.key===e&&r(!1)};return Object(M.useEffect)((function(){return window.addEventListener("keydown",o),window.addEventListener("keyup",a),function(){window.removeEventListener("keydown",o),window.removeEventListener("keyup",a)}}),[]),n}("Shift"),t=D.a.useContext(T.a).AppStore,i=t.minesCount,n=t.time,r=t.field,o=t.win,a=t.gameOver,c=t.difficulty,s=t.checkClosedBlock,l=t.restartGame,u=t.setMarkingState,p=t.setDifficulty;return u(e),D.a.createElement("div",{className:"board"},D.a.createElement("div",{className:"field"},D.a.createElement("div",{className:"board__header-row"},D.a.createElement(J,{count:i}),D.a.createElement(P,{win:o,gameOver:a,handleClick:l}),D.a.createElement(J,{count:n/1e3})),D.a.createElement("div",{className:"frame"},r.map((function(e,t){return D.a.createElement("div",{className:"row",key:t},e.map((function(e,i){var n=e.state,r=e.opened,o=e.marked,a=e.minesCount,c=void 0===a?0:a;return D.a.createElement(F,{handleClick:function(){return s(t,i)},state:n,opened:r,marked:o,minesCount:c,key:i})})))}))),D.a.createElement($,{difficulty:c,setDifficulty:p})))})),H=function(){return Object(R.create)()("app-store",A).then((function(){A.gameStarted&&A.startTimer()})),D.a.createElement(T.b,{AppStore:A},D.a.createElement("div",{className:"App"},D.a.createElement(q,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));S.a.render(D.a.createElement(H,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[13,1,2]]]);
//# sourceMappingURL=main.c8a44969.chunk.js.map