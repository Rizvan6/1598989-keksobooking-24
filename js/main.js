function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

getRandomInteger(1, 5);

function getRandomFloat(min, max, amountSymbolsAfterComma = 2) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));

  return (Math.random() * (upper - lower) + lower).toFixed(amountSymbolsAfterComma);
}

getRandomFloat(24.243, 28.223);

// Задание 4.9 Больше деталей
const TITLES = ['Объявление-1', 'Объявление-2', 'Объявление-3', 'Объявление-4'];
const ACCOMMODATIONS = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['Просторное', 'Удобное', 'Уютное', 'Комфортное'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

function generateAvatarUrl(index) {
  return `img/avatars/user${index}.png`;
}

function addZeroIfNeeds(str) {
  return str.length < 2 ? `0${str}` : str;
}

function getRandomArrayItem(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

function getArrayRandomLength(array) {
  return array.slice(0, getRandomInteger(1, array.length - 1));
}

function generateOffers(amount) {
  const arrayOffers = [];

  for (let index = 1; index <= amount; index++) {
    const coordinates = {
      lat: getRandomFloat(35.65000, 35.70000),
      lng: getRandomFloat(139.70000, 139.80000),
    };
    arrayOffers.push({
      author: {
        avatar: generateAvatarUrl(addZeroIfNeeds(index.toString())),
      },
      offer: {
        title: getRandomArrayItem(TITLES),
        address: coordinates,
        price: getRandomInteger(0, 20000),
        type: getRandomArrayItem(ACCOMMODATIONS),
        rooms: getRandomInteger(0, 10),
        guests: getRandomInteger(0, 6),
        checkin: getRandomArrayItem(CHECKINS),
        checkout: getRandomArrayItem(CHECKOUTS),
        features: getArrayRandomLength(FEATURES),
        description: getRandomArrayItem(DESCRIPTIONS),
        photos: getArrayRandomLength(PHOTOS),
      },
      location: coordinates,
    });
  }
  return arrayOffers;
}

generateOffers(10);

