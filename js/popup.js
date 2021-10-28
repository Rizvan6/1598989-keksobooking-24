import { generateOffers } from './data.js';

const popupCard = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const popupOffers = generateOffers(1);

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

popupOffers.forEach((popupOffer) => {
  const popupElements = popupCard.cloneNode(true);
  const popupAvatar = popupElements.querySelector('.popup__avatar');
  const popupTitle = popupElements.querySelector('.popup__title');
  const popupAddress = popupElements.querySelector('.popup__text--address');
  const popupPrice = popupElements.querySelector('.popup__text--price');
  const popupType = popupElements.querySelector('.popup__type');
  const popupCapacity = popupElements.querySelector('.popup__text--capacity');
  const popupTime = popupElements.querySelector('.popup__text--time');
  const popupDescription = popupElements.querySelector('.popup__description');
  const popupFeaturesContainer = popupElements.querySelector('.popup__features');
  const features = popupOffer.offer.features;
  const popupPhotosContainer = popupElements.querySelector('.popup__photos');
  const photos = popupOffer.offer.photos;

  popupAvatar.src = popupOffer.author.avatar || '';
  popupTitle.textContent = popupOffer.offer.title || '';
  popupAddress.textContent = Object.values(popupOffer.offer.address).join(', ') || '';
  popupPrice.textContent = generatePrice(popupOffer.offer.price);
  popupType.textContent = getAccommodation(popupOffer.offer.type);
  popupCapacity.textContent = generateCapacity(popupOffer.offer.rooms, popupOffer.offer.guests);
  popupTime.textContent = generateTime(popupOffer.offer.checkin, popupOffer.offer.checkout);
  popupDescription.textContent = popupOffer.offer.description || '';

  generateFeutureItems(features, popupFeaturesContainer);

  generatePhotos(photos, popupPhotosContainer);

  mapCanvas.append(popupElements);
});
