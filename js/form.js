const adForm = document.querySelector('.ad-form');
const adHeader = adForm.querySelector('.ad-form-header');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersElements = mapFiltersForm.children;


function inactiveCondition() {
  adForm.classList.add('ad-form--disabled');
  adHeader.disabled = true;
  mapFiltersForm.classList.add('map__filters--disabled');
  mapFiltersElements.disabled = true;
}

inactiveCondition();

function activeCondition() {
  adForm.classList.remove('ad-form--disabled');
  adHeader.disabled = false;
  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFiltersElements.disabled = false;
}

activeCondition();
