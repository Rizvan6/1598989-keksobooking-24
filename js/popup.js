import { generateOffers } from './data.js';

const popupCard = document.querySelector('#card').content.querySelector('.popup');
const popupOffers = generateOffers(3);

function getAccommodation(accommodation) {
  switch (accommodation) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'hotel':
      return 'Отель';
    default:
      return '';
  }
}

function generateCapacity(rooms, guests) {
  if (!rooms || !guests) {
    return '';
  }

  return `${rooms} комнаты для ${guests} гостей`;
}

function generatePrice(price) {
  if (!price) {
    return '';
  }

  return `${price} ₽/ночь.`;
}

function generateTime(checkin, checkout) {
  if (!checkin || !checkout) {
    return '';
  }

  return `Заезд после ${checkin}, выезд до ${checkout}.`;
}

function generateFeutureItems(features, container) {
  const fragmentForItems = document.createDocumentFragment();

  features.forEach((feature) => {
    const featureItem = document.createElement('li');

    featureItem.className = `popup__feature popup__feature--${feature}`;

    fragmentForItems.append(featureItem);
  });

  container.innerHTML = '';
  container.append(fragmentForItems);
}

function generatePhotos(photos, container) {
  const fragmentForPhotos = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.width = 45;
    photoItem.height = 40;
    photoItem.alt = 'Фотография жилья';
    photoItem.src = photo;

    fragmentForPhotos.append(photoItem);
  });

  container.innerHTML = '';
  container.append(fragmentForPhotos);
}

export { popupCard, popupOffers, getAccommodation, generateCapacity, generatePrice, generateTime, generateFeutureItems, generatePhotos };
