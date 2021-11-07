import { getRandomInteger, getRandomFloat, getRandomArrayItem, getArrayRandomLength } from './util.js';

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

export { generateOffers };
