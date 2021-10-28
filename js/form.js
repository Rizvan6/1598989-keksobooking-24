const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormChildren = mapFiltersForm.children;

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

