const frameId = window.frameElement.getAttribute('id');

window._originalHistoryBack = window.history.back;

window.history.back = function () {
  console.log(frameId, 'history.back');
  window._originalHistoryBack.call(window.history);
  window.parent.postMessage(JSON.stringify({id: frameId, type: 'HISTORY_BACK'}));
};

window.parent.postMessage(JSON.stringify({id: frameId, type: 'PAGE_READY'}));

console.log(frameId, 'frame inited');