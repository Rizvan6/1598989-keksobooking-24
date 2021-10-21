function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

function getRandomFloat(min, max, amountSymbolsAfterComma = 2) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));

  return (Math.random() * (upper - lower) + lower).toFixed(amountSymbolsAfterComma);
}

function getRandomArrayItem(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

function getArrayRandomLength(array) {
  return array.slice(0, getRandomInteger(1, array.length - 1));
}


export { getRandomInteger, getRandomFloat, getRandomArrayItem, getArrayRandomLength };
