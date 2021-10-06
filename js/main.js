const getRandomInteger = function (min, max) {
  if (max - min <= 0 && max <= min) {
    return 'Ошибка. Некорректный набор чисел!';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInteger(20, 30);


const getRandomIntegerFloat = function (min, max, SymbolsAfterComma) {
  if (max - min <= 0 && max <= min) {
    return 'Ошибка. Некорректный набор чисел!';
  }
  return (Math.floor(Math.random() * (max - min + 1)) + min).toFixed(SymbolsAfterComma);
};

getRandomIntegerFloat(5.6973, 10.2365, 1);
