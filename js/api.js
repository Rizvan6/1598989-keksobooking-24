function getData(data) {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((cards) => {
      data(cards);
    });
}

function sendData(success, error, reset, body) {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        reset;
        success;
      } else {
        error;
      }
    })
    .catch(() => {
      error;
    });
}

export { getData, sendData };

