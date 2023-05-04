function iframeURLChange(iframe, callback) {
    const pagehideHandler = function () {
      setTimeout(() => {
        callback(iframe.contentWindow.location.href);
      }, 0);
    };
  
    iframe.addEventListener("load", pagehideHandler);
  }
  
  const framesHistory = {
    'frame1': [],
    'frame2': [],
  }
  
  window.addEventListener('message', (event) => {
    try {
      const data = JSON.parse(event.data);
      if (!data['_']) {
        return console.log('skip post message');
      }
  
      const id = data['id'];
  
      framesHistory[id].push(data['type']);
    } catch (e) {
      console.log('invalid post message');
    }
  });
  
  var frame1 = document.getElementById("frame1");
  
  iframeURLChange(frame1, (url) => {
    console.log(frame1.id,'url changed', url, frame1.contentWindow.history.length);
    console.log(framesHistory['frame1']);
  });
  
  var frame2 = document.getElementById("frame2");
  
  iframeURLChange(frame2, (url) => {
    console.log(frame2.id,'url changed', url, frame2.contentWindow.history.length);
    console.log(framesHistory['frame2']);
  });
  
  const resetFrame2 = () => {
    console.log('resetFrame2', framesHistory['frame2']);
  
    let historyBack = 0;
  
    framesHistory['frame2'].forEach((type, index) => {
      if (index === 0) {
        return;
      }
  
      if (type === 'PAGE_READY') {
        historyBack += 1;
      } else if (type === 'HISTORY_BACK') {
        historyBack -= 2;
      }
    });
  
    console.log('history.go', historyBack);
  
    history.go(historyBack * -1);
  
    framesHistory['frame2'] = [];
  };