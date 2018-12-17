'use strict';

(function () {

  var ComparePrice = {
    LOW: 10000,
    HIGH: 50000
  };

  var updatePins = function (offers) {
    var filteredOffers = offers.slice();

    var selectorFilters = window.map.filtersForm.querySelectorAll('.map__filter');
    var featuresFilters = window.map.filtersForm.querySelectorAll('.map__checkbox:checked');

    var FilterRules = {
      'housing-type': 'type',
      'housing-rooms': 'rooms',
      'housing-guests': 'guests'
    };

    window.reset.deleteAllPins();
    window.card.delete();

    var filterByValue = function (element, property) {
      return filteredOffers.filter(function (offerData) {
        return offerData.offer[property].toString() === element.value;
      });
    };

    var filterByPrice = function (priceFilter) {
      return filteredOffers.filter(function (offerData) {
        var priceFilterValues = {
          'middle': offerData.offer.price >= ComparePrice.LOW && offerData.offer.price < ComparePrice.HIGH,
          'low': offerData.offer.price < ComparePrice.LOW,
          'high': offerData.offer.price >= ComparePrice.HIGH
        };

        return priceFilterValues[priceFilter.value];
      });
    };

    var filterByFeatures = function (item) {
      return filteredOffers.filter(function (offerData) {
        return offerData.offer.features.indexOf(item.value) >= 0;
      });
    };

    if (selectorFilters.length !== null) {
      selectorFilters.forEach(function (item) {
        if (item.value !== 'any') {
          if (item.id !== 'housing-price') {
            filteredOffers = filterByValue(item, FilterRules[item.id]);
          } else {
            filteredOffers = filterByPrice(item);
          }
        }
      });
    }

    if (featuresFilters !== null) {
      featuresFilters.forEach(function (item) {
        filteredOffers = filterByFeatures(item);
      });
    }

    if (filteredOffers.length) {
      window.pins.render(filteredOffers);
    }

  };

  window.filters = {
    updatePins: updatePins
  };

})();
