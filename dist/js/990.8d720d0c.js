"use strict";(self["webpackChunkdumpster_diving_ionic"]=self["webpackChunkdumpster_diving_ionic"]||[]).push([[990],{990:function(t,e,n){n.r(e),n.d(e,{createSwipeBackGesture:function(){return o}});var i=n(587),r=n(515);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const o=(t,e,n,o,s)=>{const a=t.ownerDocument.defaultView,c=t=>t.startX<=50&&e(),u=t=>{const e=t.deltaX,n=e/a.innerWidth;o(n)},d=t=>{const e=t.deltaX,n=a.innerWidth,r=e/n,o=t.velocityX,c=n/2,u=o>=0&&(o>.2||t.deltaX>c),d=u?1-r:r,l=d*n;let h=0;if(l>5){const t=l/Math.abs(o);h=Math.min(t,540)}s(u,r<=0?.01:(0,i.j)(0,r,.9999),h)};return(0,r.A)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:c,onStart:n,onMove:u,onEnd:d})}}}]);
//# sourceMappingURL=990.8d720d0c.js.map