import { isEscapeKey, isEnterKey } from './util.js';

function closeMessage(message) {
  message.remove();
}

function showMessageSuccess() {
  const success = document.querySelector('#success').content.querySelector('.success');
  const successCloneNode = success.cloneNode(true);
  document.body.append(successCloneNode);

  window.addEventListener('click', () => {
    closeMessage(successCloneNode);
    window.removeEventListener('click');
  });

  window.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault;
      closeMessage(successCloneNode);
      window.removeEventListener('keydown', (evt));
    }
  });
}

function showMessageError() {
  const error = document.querySelector('#error').content.querySelector('.error');
  const errorButton = document.querySelector('.error__button');
  const errorCloneNode = error.cloneNode(true);
  document.body.append(errorCloneNode);

  errorButton.addEventListener('click', () => {
    closeMessage(errorCloneNode);
    errorButton.removeEventListener('click');
  });

  errorButton.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      closeMessage(errorCloneNode);
      errorButton.removeEventListener('keydown', (evt));
    }
  });

  window.addEventListener('click', () => {
    closeMessage(errorCloneNode);
    window.removeEventListener('click');
  });

  window.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault;
      closeMessage(errorCloneNode);
      window.removeEventListener('keydown', (evt));
    }
  });
}

export { showMessageSuccess, showMessageError };
