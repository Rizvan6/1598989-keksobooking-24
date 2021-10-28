const adForm = document.querySelector('.ad-form');
const adHeaders = adForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersElements = mapFiltersForm.children;

function setInactiveCondition() {
  adForm.classList.add('ad-form--disabled');

  for (let i = 0; i <= adHeaders.length - 1; i++) {
    adHeaders[i].disabled = true;
  }

  mapFiltersForm.classList.add('map__filters--disabled');

  for (let i = 0; i <= mapFiltersElements.length - 1; i++) {
    mapFiltersElements[i].disabled = true;
  }
}

setInactiveCondition();

function setActiveCondition() {
  adForm.classList.remove('ad-form--disabled');

  for (let i = 0; i <= adHeaders.length - 1; i++) {
    adHeaders[i].disabled = false;
  }

  mapFiltersForm.classList.remove('map__filters--disabled');

  for (let i = 0; i <= mapFiltersElements.length - 1; i++) {
    mapFiltersElements[i].disabled = false;
  }
}

setActiveCondition();

