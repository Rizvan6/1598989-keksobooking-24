function debounce(callback, timeoutDelay) {
  let timeoutId;

  return function () {
    const fnCall = () => {
      callback.apply(this, arguments);
    };

    clearTimeout(timeoutId);

    timeoutId = setTimeout(fnCall, timeoutDelay);

  };
}

export { debounce };

