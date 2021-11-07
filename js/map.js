import { setInactiveCondition, setActiveCondition, adFormAddressInput } from './form.js';
import { popupCard, popupOffers, getAccommodation, generateCapacity, generatePrice, generateTime, generateFeutureItems, generatePhotos } from './popup.js';

setInactiveCondition();

const map = L.map('map')
  .on('load', () => {
    setActiveCondition();
  })
  .setView({
    lat: 35.68950,
    lng: 139.69171,
  }, 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

const markerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker({
  lat: 35.68950,
  lng: 139.69171,
}, {
  draggable: true,
  icon: markerIcon,
}).addTo(map);

adFormAddressInput.value = Object.values(marker._latlng).join(', ');

marker.on('moveend', (evt) => {
  const userMove = evt.target.getLatLng();
  const coordinates = Object.values(userMove);
  const fixedCoordiantes = coordinates.map((coordinate) => coordinate.toFixed(5));

  adFormAddressInput.value = fixedCoordiantes;
});

popupOffers.forEach((popupOffer) => {
  const regularPoint = {
    title: popupOffer.popupTitle,
    lat: +Object.values(popupOffer.location)[0],
    lng: +Object.values(popupOffer.location)[1],
  };

  const regularMarkerIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const regularMarker = L.marker({
    lat: regularPoint.lat,
    lng: regularPoint.lng,
  }, {
    icon: regularMarkerIcon,
  });

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

  regularMarker.addTo(map).bindPopup(popupElements);
});

