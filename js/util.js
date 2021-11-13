function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function isEnterKey(evt) {
  return evt.key === 'Enter';
}

function closeMessage(message) {
  message.remove();
}

function showMessageSuccess() {
  const success = document.querySelector('#success').content.querySelector('.success');
  const successClone = success.cloneNode(true);

  document.body.append(successClone);

  window.addEventListener('click', () => {
    closeMessage(successClone);
  });

  window.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeMessage(successClone);
    }
  });
}

function showMessageError() {
  const error = document.querySelector('#error').content.querySelector('.error');
  const errorButton = document.querySelector('.error__button');
  const errorClone = error.cloneNode(true);

  document.body.append(errorClone);

  errorButton.addEventListener('click', () => {
    closeMessage(errorClone);
  });

  errorButton.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      closeMessage(errorClone);
    }
  });

  window.addEventListener('click', () => {
    closeMessage(errorClone);
  });

  window.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeMessage(errorClone);
    }
  });
}


export { showMessageSuccess, showMessageError };
