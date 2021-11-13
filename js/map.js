import { setInactiveCondition, setActiveCondition, adFormAddressInput } from './form.js';
import { generatePopupCard } from './popup.js';
// import { getData } from './api.js';

let OFFERS = [];
const POPUP_CARDS_COUNT = 10;

setInactiveCondition();

const map = L.map('map')
  .on('load', async () => {
    setActiveCondition();
    await fetchOffers();
    setPoints();
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
  const userMovedCoordinates = evt.target.getLatLng();
  const coordinatesValues = Object.values(userMovedCoordinates);
  const fixedCoordiantes = coordinatesValues.map((coordinateValue) => coordinateValue.toFixed(5));

  adFormAddressInput.value = fixedCoordiantes;
});

async function fetchOffers() {
  await fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((cards) => {
      OFFERS = cards.slice(0, POPUP_CARDS_COUNT);
    });

  // await getData(OFFERS, POPUP_CARDS_COUNT);
}

function addMarker(offer) {
  const regularPoint = {
    lat: offer.location.lat,
    lng: offer.location.lng,
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

  regularMarker.addTo(map).bindPopup(generatePopupCard(offer));
}

function setPoints() {
  OFFERS.forEach((offer) => {
    addMarker(offer);
  });
}

export { marker };
