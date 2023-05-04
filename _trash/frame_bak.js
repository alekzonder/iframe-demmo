// window.addEventListener("unload", () => {
//   console.log("unload");
// });
// window.addEventListener("pagehide", (e) => {
//   console.log("pagehide", e.persisted, window.location.href);
// });
// window.addEventListener("pageshow", (e) => {
//   console.log("pageshow", e.persisted, window.location.href);
//   // if (!event.persisted) {
//   //   const navEntries = performance.getEntriesByType("navigation");
//   //   for (var i = 0; i < navEntries.length; i++) {
//   //     console.log("= Navigation entry[" + i + "]");
//   //     var p = navEntries[i];
//   //     console.log(p);
//   //     // p.notRestoredReason == [{url:"a.com", id: "x", blocked: true, reasons:["broadcast channel"], children:[]}]
//   //   }
//   // }
// });
// window.addEventListener("visibilitychange", () => {
//   console.log("visibilitychange");
// });

const frameId = window.frameElement.getAttribute('id');

window.addEventListener("popstate", () => {
  console.log("popstate");
});

window.addEventListener("pushstate", () => {
  console.log("pushstate");
});

window._originalHistoryBack = window.history.back;

window.history.back = function () {
  console.log(frameId, 'history.back');
  window._originalHistoryBack.call(window.history);
  window.parent.postMessage(JSON.stringify({id: frameId, type: 'HISTORY_BACK'}));
};

window.parent.postMessage(JSON.stringify({id: frameId, type: 'PAGE_READY'}));

console.log(frameId, 'frame inited');