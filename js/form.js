const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const adFormTitleInput = adForm.querySelector('#title');
const adFormPriceInput = adForm.querySelector('#price');
const adFormRoomsSelect = adForm.querySelector('#room_number');
const adFormCapacitySelect = adForm.querySelector('#capacity');
const adFormCapacityOptions = adFormCapacitySelect.querySelectorAll('option');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormChildren = mapFiltersForm.children;
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

function setInactiveCondition() {
  adForm.classList.add('ad-form--disabled');

  for (let i = 0; i <= adFormFieldsets.length - 1; i++) {
    adFormFieldsets[i].disabled = true;
  }

  mapFiltersForm.classList.add('map__filters--disabled');

  for (let i = 0; i <= mapFiltersFormChildren.length - 1; i++) {
    mapFiltersFormChildren[i].disabled = true;
  }
}

setInactiveCondition();

function setActiveCondition() {
  adForm.classList.remove('ad-form--disabled');

  for (let i = 0; i <= adFormFieldsets.length - 1; i++) {
    adFormFieldsets[i].disabled = false;
  }

  mapFiltersForm.classList.remove('map__filters--disabled');

  for (let i = 0; i <= mapFiltersFormChildren.length - 1; i++) {
    mapFiltersFormChildren[i].disabled = false;
  }
}

setActiveCondition();


function showError(variable, text) {
  variable.setCustomValidity(text);
  variable.style.borderColor = 'red';
}

function doReset(variable) {
  variable.setCustomValidity('');
  variable.style.borderColor = '';
}


function checkErrorTitle() {
  if (adFormTitleInput.validity.valueMissing) {
    showError(adFormTitleInput, 'Введите заголовок объявления.');
  } else if (adFormTitleInput.value.length < MIN_TITLE_LENGTH) {
    showError(adFormTitleInput, `Введите еще ${MIN_TITLE_LENGTH - adFormTitleInput.value.length} симв.`);
  } else if (adFormTitleInput.value.length > MAX_TITLE_LENGTH) {
    showError(adFormTitleInput, `Удалите лишние ${adFormTitleInput.value.length - MAX_TITLE_LENGTH} симв.`);
  } else {
    doReset(adFormTitleInput);
  }

  adFormTitleInput.reportValidity('');
}

adFormTitleInput.addEventListener('blur', checkErrorTitle);

function checkErrorPrice() {
  if (adFormPriceInput.validity.valueMissing) {
    showError(adFormPriceInput, 'Вы должны ввести цену за ночь.');
  } else if (adFormPriceInput.value.length > MAX_PRICE_VALUE) {
    showError(adFormPriceInput, `Значение должно быть меньше или равно ${MAX_PRICE_VALUE}`);
  } else {
    doReset(adFormPriceInput);
  }

  adFormPriceInput.reportValidity('');
}

adFormPriceInput.addEventListener('blur', checkErrorPrice);


adFormCapacityOptions.forEach((adFormCapacityOption) => {
  if (!adFormCapacityOption.selected) {
    return adFormCapacityOption.remove();
  } else {
    return adFormCapacityOption;
  }
});

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

function getOverlapOfGuests(evt) {
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

adFormRoomsSelect.addEventListener('change', getOverlapOfGuests);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!adFormTitleInput.validity.valid) {
    adFormTitleInput.addEventListener('invalid', checkErrorTitle);
  } else if (!adFormPriceInput.validity.valid) {
    adFormPriceInput.addEventListener('invalid', checkErrorPrice);
  }
});
