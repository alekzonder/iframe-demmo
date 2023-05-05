const framesHistory = {
  'frame1': [],
  'frame2': [],
}

window.addEventListener('message', (event) => {
  try {
    const data = JSON.parse(event.data);
    if (!data['type']) {
      return console.log('skip post message');
    }

    const id = data['id'];

    framesHistory[id].push(data['type']);

    console.log('got message', data['id'], data['type'], framesHistory[id]);
  } catch (e) {
    console.log('invalid post message');
  }
});

const calcFrame2HistoryBack = () => {
  console.log('resetFrame2', framesHistory['frame2']);

  if (framesHistory['frame2'].length === 1) {
    console.log('no history');
    return 0;
  }

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

  return historyBack;
};

const resetFrame2 = () => {
  const historyBack = calcFrame2HistoryBack();

  if (historyBack === 0) {
    console.log('no history changes needed');
    return;
  }

  console.log('history.go', historyBack);

  history.go(historyBack * -1);

  framesHistory['frame2'] = [];
};