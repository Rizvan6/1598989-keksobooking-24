import { getRandomInteger, getRandomFloat, getRandomArrayItem, getArrayRandomLength } from './util.js';
import { TITLES, ACCOMMODATIONS, CHECKINS, CHECKOUTS, FEATURES, DESCRIPTIONS, PHOTOS } from './data.js';

// Задание 4.9 Больше деталей

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

generateOffers(10);

