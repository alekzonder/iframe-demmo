function iframeURLChange(iframe, callback) {
  const pagehideHandler = function () {
    setTimeout(() => {
      callback(iframe.contentWindow.location.href);
    }, 0);
  };

  function attachPagehide() {
    // console.log(iframe.id, iframe.contentWindow.history.length);
    iframe.contentWindow.removeEventListener("pagehide", pagehideHandler);
    iframe.contentWindow.addEventListener("pagehide", pagehideHandler);
  }

  iframe.addEventListener("load", attachPagehide);
  attachPagehide();
}

var frame1 = document.getElementById("frame1");

iframeURLChange(frame1, (url) => {
  console.log(frame1.id,'url changed', url, frame1.contentWindow.history.length);
  // history.pushState({}, "", "?t=" + Date.now());
});

var frame2 = document.getElementById("frame2");

iframeURLChange(frame2, (url) => {
  console.log(frame2.id,'url changed', url, frame2.contentWindow.history.length);
  // history.pushState({}, "", "?t=" + Date.now());
});