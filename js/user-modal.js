import { isEscapeKey } from './util.js';

function closeMessage(message) {
  message.remove();
}

function showMessageSuccess() {
  const success = document.querySelector('#success').content.querySelector('.success');
  const successCloneNode = success.cloneNode(true);
  const onPopupEscKeydownSuccess = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault;
      closeMessage(successCloneNode);
    }
  };

  document.body.append(successCloneNode);

  window.addEventListener('click', () => {
    closeMessage(successCloneNode);
  });

  window.addEventListener('keydown', onPopupEscKeydownSuccess);
  window.removeEventListener('keydown', onPopupEscKeydownSuccess);
}

function showMessageError() {
  const error = document.querySelector('#error').content.querySelector('.error');
  const errorButton = document.querySelector('.error__button');
  const errorCloneNode = error.cloneNode(true);
  const onPopupEscKeydownError = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault;
      closeMessage(errorCloneNode);
    }
  };

  document.body.append(errorCloneNode);

  errorButton.addEventListener('click', () => {
    closeMessage(errorCloneNode);
  });

  window.addEventListener('click', () => {
    closeMessage(errorCloneNode);
  });

  window.addEventListener('keydown', onPopupEscKeydownError);
  window.removeEventListener('keydown', onPopupEscKeydownError);
}

export { showMessageSuccess, showMessageError };
