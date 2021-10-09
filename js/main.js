/* eslint-disable no-console */
function testMinMaxNumbers(min, max) {
  return max - min <= 0 && max <= min;
}


function getRandomInteger(min, max) {
  if (testMinMaxNumbers(min, max)) {
    console.error('Ошибка ввода');

    return;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInteger(20, 30);


function getRandomFloat(min, max, amountSymbolsAfterComma) {
  if (testMinMaxNumbers(min, max)) {
    console.error('Ошибка ввода');

    return;
  }

  return ((Math.random() * (max - min + 1)) + min).toFixed(amountSymbolsAfterComma);
}

getRandomFloat(5.697, 10.236, 1);
