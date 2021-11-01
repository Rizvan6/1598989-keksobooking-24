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

adFormTitleInput.addEventListener('input', showErrorForTitle);
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

adFormPriceInput.addEventListener('input', showErrorForPrice);
adFormPriceInput.addEventListener('blur', showErrorForPrice);

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

adForm.addEventListener('submit', (evt) => {
  if (!adFormTitleInput.validity.valid) {
    adFormTitleInput.addEventListener('invalid', showErrorForPrice);
    evt.preventDefault();
  } else if (!adFormPriceInput.validity.valid) {
    adFormPriceInput.addEventListener('invalid', showErrorForPrice);
    evt.preventDefault();
  }
});
