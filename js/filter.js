import { setPoints, OFFERS, markerGroup } from './map.js';

const mapFiltersForm = document.querySelector('.map__filters');
const mapFilterFeatures = mapFiltersForm.querySelectorAll('[name="features"]');
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
let arrayFeatures = [];
let chosenFilters = [];

function startMapFiltersFormListener() {
  mapFiltersForm.addEventListener('change', onChangeForm);
}

function onChangeForm(evt) {
  const targetElement = evt.target;

  const filterData = {
    name: targetElement.name,
    value: targetElement.value,
  };

  if (targetElement.name === 'features') {
    arrayFeatures = Array
      .from(mapFilterFeatures)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    filterData.value = arrayFeatures;
  }

  if (checkChosenFilters(filterData.name)) {
    updateChosenFilters(filterData);
  } else {
    chosenFilters.push(filterData);
  }

  markerGroup.clearLayers();
  return setPoints(filterOffers(OFFERS));
}

function checkChosenFilters(name) {
  if (!chosenFilters.length) {
    return false;
  } else {
    return chosenFilters.find((chosenFilter) => chosenFilter.name === name);
  }
}

function updateChosenFilters(filterData) {
  chosenFilters = chosenFilters.map((chosenFilter) => {
    if (chosenFilter.name === filterData.name) {
      chosenFilter = filterData;
    }

    return chosenFilter;
  });
}

function filterOffers(offers) {
  if (!chosenFilters.length) {
    return offers;
  }

  let newOffers = [...offers];

  chosenFilters.forEach((chosenFilter) => {
    newOffers = getFilterFunction(chosenFilter, newOffers);
  });

  return newOffers;
}

function getFilterFunction(filterData, offers) {
  switch (filterData.name) {
    case 'housing-type':
      return getMapFiltersType(filterData, offers);
    case 'housing-price':
      return getMapFiltersPrice(filterData, offers);
    case 'housing-rooms':
      return getMapFiltersRooms(filterData, offers);
    case 'housing-guests':
      return getMapFilterGuests(filterData, offers);
    case 'features':
      return getMapFilterFeatures(filterData, offers);
  }
}

function getMapFiltersType(filterData, offers) {
  return offers.filter((offerItem) => {
    if (filterData.value === offerItem.offer.type) {
      return true;
    } else if (filterData.value === 'any') {
      return true;
    } else {
      return false;
    }
  });
}

function getMapFiltersPrice(filterData, offers) {
  return offers.filter((offerItem) => {
    if (filterData.value === 'middle') {
      if (offerItem.offer.price >= LOW_PRICE && offerItem.offer.price <= HIGH_PRICE) {
        return true;
      }
    } else if (filterData.value === 'low') {
      if (offerItem.offer.price <= LOW_PRICE) {
        return true;
      }
    } else if (filterData.value === 'high') {
      if (offerItem.offer.price > HIGH_PRICE) {
        return true;
      }
    } else if (filterData.value === 'any') {
      return true;
    } else {
      return false;
    }
  });
}

function getMapFiltersRooms(filterData, offers) {
  return offers.filter((offerItem) => {
    if (Number(filterData.value) === offerItem.offer.rooms) {
      return true;
    } else if (filterData.value === 'any') {
      return true;
    } else {
      return false;
    }
  });
}

function getMapFilterGuests(filterData, offers) {
  return offers.filter((offerItem) => {
    if (Number(filterData.value) === offerItem.offer.guests) {
      return true;
    } else if (filterData.value === 'any') {
      return true;
    } else {
      return false;
    }
  });
}

function getMapFilterFeatures(filterData, offers) {
  return offers.filter((offerItem) => {
    const filtersValue = filterData.value;

    if (!offerItem.offer.features) {
      return false;
    }

    const FilteredFeatures = filtersValue.every((value) => offerItem.offer.features.includes(value));

    return FilteredFeatures;
  });
}

export { startMapFiltersFormListener };
