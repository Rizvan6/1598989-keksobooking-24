const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const adFormTitleInput = adForm.querySelector('#title');
const adFormPriceInput = adForm.querySelector('#price');
const adFormRoomsSelect = adForm.querySelector('#room_number');
const adFormRoomsOptions = adFormRoomsSelect.querySelectorAll('option');
const adFormCapacitySelect = adForm.querySelector('#capacity');
const adFormCapacityOptions = adFormCapacitySelect.querySelectorAll('option');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormChildren = mapFiltersForm.children;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

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

function showErrorForTitle() {
  if (adFormTitleInput.validity.valueMissing) {
    adFormTitleInput.setCustomValidity('Введите заголовок объявления.');
    adFormTitleInput.style.borderColor = 'red';
  } else if (adFormTitleInput.value.length < MIN_TITLE_LENGTH) {
    adFormTitleInput.setCustomValidity(`Введите еще ${MIN_TITLE_LENGTH - adFormTitleInput.value.length} симв.`);
    adFormTitleInput.style.borderColor = 'red';
  } else if (adFormTitleInput.value.length > MAX_TITLE_LENGTH) {
    adFormTitleInput.setCustomValidity(`Удалите лишние ${adFormTitleInput.value.length - MAX_TITLE_LENGTH} симв.`);
    adFormTitleInput.style.borderColor = 'red';
  } else {
    adFormTitleInput.setCustomValidity('');
    adFormTitleInput.style.borderColor = '';
  }

  adFormTitleInput.reportValidity('');
}

adFormTitleInput.addEventListener('blur', showErrorForTitle);

function showErrorForPrice() {
  if (adFormPriceInput.validity.valueMissing) {
    adFormPriceInput.setCustomValidity('Вы должны ввести цену за ночь.');
    adFormPriceInput.style.borderColor = 'red';
  } else if (adFormPriceInput.value.length > MAX_PRICE_VALUE) {
    adFormPriceInput.setCustomValidity(`Значение должно быть меньше или равно ${MAX_PRICE_VALUE}`);
    adFormPriceInput.style.borderColor = 'red';
  } else {
    adFormPriceInput.setCustomValidity('');
    adFormPriceInput.style.borderColor = '';
  }

  adFormPriceInput.reportValidity('');
}

adFormPriceInput.addEventListener('blur', showErrorForPrice);

/*
function getOverlapOfGuests(evt) {
  const currentValue = evt.target.value;

  for (let index = 0; index <= adFormCapacityOptions.length - 1; index++) {
    if (adFormCapacityOptions[index].value === '100' && adFormCapacityOptions[index].value === currentValue) {
      adFormCapacityOptions[index].disabled = false;
      adFormCapacityOptions[index].selected = true;
      adFormCapacityOptions[2].disabled = true;

    } else if (adFormCapacityOptions[index].value !== '100') {
      if (adFormCapacityOptions[index].value === currentValue || adFormCapacityOptions[index].value < currentValue) {
        adFormCapacityOptions[index].disabled = false;
        adFormCapacityOptions[index].selected = true;
      } else {
        adFormCapacityOptions[index].disabled = true;
      }
    }
    else {
      adFormCapacityOptions[index].disabled = true;
    }
  }
}

adFormRoomsSelect.addEventListener('change', getOverlapOfGuests);
*/

function getOverlapOfGuests() {
  const arrayGuests = ['для 1 гостя', 'для 2 гостей', 'для 3 гостей', 'не для гостей'];

  for (let index = 0; index <= adFormRoomsOptions.length; index++) {
    const roomsCount = adFormRoomsOptions[index].dataset.roomsCount;

    switch (roomsCount) {
      case '1':
        return arrayGuests.slice(0, 1);
      case '2':
        return arrayGuests.slice(0, 2);
      case '3':
        return arrayGuests.slice(0, 3);
      case '100':
        return arrayGuests.slice(3, 1);
    }
  }

  adFormCapacityOptions.forEach((adFormCapacityOption) => {
    const isNecessary = arrayGuests.some((arrayGuest) => adFormCapacityOption.textContent = arrayGuest);

    if (!isNecessary) {
      adFormCapacityOption.remove();
    }
  });
}

adFormRoomsSelect.addEventListener('change', getOverlapOfGuests);

adForm.addEventListener('submit', (evt) => {
  if (!adFormTitleInput.validity.valid) {
    evt.preventDefault();
    adFormTitleInput.addEventListener('invalid', showErrorForPrice);
  } else if (!adFormPriceInput.validity.valid) {
    evt.preventDefault();
    adFormPriceInput.addEventListener('invalid', showErrorForPrice);
  }
});
