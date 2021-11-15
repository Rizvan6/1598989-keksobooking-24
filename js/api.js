async function getData() {
  const dataCards = await fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => data);
  return dataCards;
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
        reset();
        success();
      } else {
        error();
      }
    })
    .catch(() => {
      error();
    });
}

export { getData, sendData };

