import { marker } from './map.js';
import { showMessageSuccess, showMessageError } from './user-modal.js';
import { sendData } from './api.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const ARRAY_GUESTS = [
  {
    text: 'для 1 гостя',
    value: '1',
  },
  {
    text: 'для 2 гостей',
    value: '2',
  },
  {
    text: 'для 3 гостей',
    value: '3',
  },
  {
    text: 'не для гостей',
    value: '100',
  },
];
const OBJ_ACCOMODATION_PRICES = { bungalow: 0, flat: 1000, hotel: 3000, house: 5000, palace: 10000 };
const adForm = document.querySelector('.ad-form');
const adFormTitleInput = adForm.querySelector('#title');
const adFormPriceInput = adForm.querySelector('#price');
const adFormAddressInput = adForm.querySelector('#address');
const adFormRoomsSelect = adForm.querySelector('#room_number');
const adFormCapacitySelect = adForm.querySelector('#capacity');
const adFormCapacityOptions = adFormCapacitySelect.querySelectorAll('option');
const adFormTypeSelect = adForm.querySelector('#type');
const adFormTimeFieldset = adForm.querySelector('.ad-form__element--time');
const adFormTimeinSelect = adForm.querySelector('#timein');
const adFormTimeoutSelect = adForm.querySelector('#timeout');
const adFormResetButton = adForm.querySelector('.ad-form__reset');
const mapFiltersForm = document.querySelector('.map__filters');

function resetElements(elements) {
  elements.forEach((element) => {
    if (!element.selected) {
      return element.remove();
    }
    return element;
  });
}

function resetForm() {
  mapFiltersForm.reset();
  adForm.reset();
  marker.setLatLng({
    lat: 35.68950,
    lng: 139.69171,
  });
  adFormAddressInput.value = Object.values(marker._latlng).join(', ');
}

function setInactiveCondition() {
  adForm.classList.add('ad-form--disabled');

  mapFiltersForm.classList.add('map__filters--disabled');
}

function setActiveCondition() {
  adForm.classList.remove('ad-form--disabled');

  mapFiltersForm.classList.remove('map__filters--disabled');
}

function showError(input, text) {
  input.setCustomValidity(text);
  input.style.borderColor = 'red';
}

function resetError(input) {
  input.setCustomValidity('');
  input.style.borderColor = '';
}

adFormTitleInput.addEventListener('invalid', () => {
  if (adFormTitleInput.validity.valueMissing) {
    showError(adFormTitleInput, 'Введите заголовок объявления.');
  } else {
    resetError(adFormTitleInput);
  }
});

adFormTitleInput.addEventListener('input', () => {
  if (adFormTitleInput.value.length < MIN_TITLE_LENGTH) {
    showError(adFormTitleInput, `Введите еще ${MIN_TITLE_LENGTH - adFormTitleInput.value.length} симв.`);
  } else if (adFormTitleInput.value.length > MAX_TITLE_LENGTH) {
    showError(adFormTitleInput, `Удалите лишние ${adFormTitleInput.value.length - MAX_TITLE_LENGTH} симв.`);
  } else {
    resetError(adFormTitleInput);
  }
});

adFormPriceInput.addEventListener('invlaid', () => {
  if (adFormPriceInput.validity.valueMissing) {
    showError(adFormPriceInput, 'Вы должны ввести цену за ночь.');
  } else {
    resetError(adFormPriceInput);
  }
});

adFormPriceInput.addEventListener('input', () => {
  if (adFormPriceInput.value.length > MAX_PRICE_VALUE) {
    showError(adFormPriceInput, `Значение должно быть меньше или равно ${MAX_PRICE_VALUE}`);
  }
  else if (adFormPriceInput.value.rangeUnderflow) {
    showError(adFormPriceInput, `минимальное значение должно быть ${adFormPriceInput.min}`);
  }
  else {
    resetError(adFormPriceInput);
  }
});

function setMinPrice(accomodation) {
  adFormPriceInput.min = OBJ_ACCOMODATION_PRICES[accomodation];
  adFormPriceInput.placeholder = OBJ_ACCOMODATION_PRICES[accomodation];
}

function getAppropriateMinPrice(evt) {
  const typeAccomodation = evt.target.value;

  switch (typeAccomodation) {
    case 'bungalow':
      setMinPrice(typeAccomodation);
      break;
    case 'flat':
      setMinPrice(typeAccomodation);
      break;
    case 'hotel':
      setMinPrice(typeAccomodation);
      break;
    case 'house':
      setMinPrice(typeAccomodation);
      break;
    case 'palace':
      setMinPrice(typeAccomodation);
      break;
  }
}

adFormTypeSelect.addEventListener('change', getAppropriateMinPrice);

adFormTimeFieldset.addEventListener('change', (evt) => {
  adFormTimeinSelect.value = evt.target.value;
  adFormTimeoutSelect.value = evt.target.value;
});

resetElements(adFormCapacityOptions);

function deleteGuests() {
  adFormCapacitySelect.options.length = 0;
}

function createGuest({ text, value }) {
  const guestElement = document.createElement('option');

  guestElement.innerText = text;
  guestElement.value = value;

  return guestElement;
}

function generateGuests(guests) {
  const fragmentGuests = document.createDocumentFragment();

  guests.forEach((guest) => {
    fragmentGuests.appendChild(createGuest(guest));
  });

  return fragmentGuests;
}

function getAppropriateGuests(evt) {
  const roomsCount = evt.target.value;
  let guests = [];

  switch (roomsCount) {
    case '1':
      guests = ARRAY_GUESTS.slice(0, 1);
      break;
    case '2':
      guests = ARRAY_GUESTS.slice(0, 2);
      break;
    case '3':
      guests = ARRAY_GUESTS.slice(0, 3);
      break;
    case '100':
      guests = ARRAY_GUESTS.slice(3);
      break;
  }

  deleteGuests();

  adFormCapacitySelect.appendChild(generateGuests(guests));
}

adFormRoomsSelect.addEventListener('change', getAppropriateGuests);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(showMessageSuccess, showMessageError, resetForm, formData);
});

adFormResetButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  resetForm();
});

export { setInactiveCondition, setActiveCondition, adFormAddressInput };
