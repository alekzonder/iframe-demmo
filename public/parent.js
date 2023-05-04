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
  } catch (e) {
    console.log('invalid post message');
  }
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