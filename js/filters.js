'use strict';

(function () {

  var PriceLimit = {
    LOW: 10000,
    HIGH: 50000
  };

  var updatePins = function (offers) {
    var filteredOffers = offers.slice();

    var selectors = Array.from(window.map.filtersForm.querySelectorAll('.map__filter'));
    var checkboxes = Array.from(window.map.filtersForm.querySelectorAll('.map__checkbox:checked'));
    var filterInputs = selectors.concat(checkboxes);

    var Rule = {
      'housing-type': 'type',
      'housing-rooms': 'rooms',
      'housing-guests': 'guests'
    };

    var filterByValue = function (element, property) {
      return filteredOffers.filter(function (offerData) {
        return offerData.offer[property].toString() === element.value;
      });
    };

    var filterByPrice = function (priceFilter) {
      return filteredOffers.filter(function (offerData) {
        var result;
        switch (priceFilter.value) {
          case 'middle':
            result = offerData.offer.price >= PriceLimit.LOW && offerData.offer.price < PriceLimit.HIGH;
            break;
          case 'low':
            result = offerData.offer.price < PriceLimit.LOW;
            break;
          case 'high':
            result = offerData.offer.price >= PriceLimit.HIGH;
            break;
        }
        return result;
      });
    };

    var filterByFeatures = function (item) {
      return filteredOffers.filter(function (offerData) {
        return offerData.offer.features.indexOf(item.value) >= 0;
      });
    };

    filterInputs.forEach(function (item) {
      if (item.tagName === 'SELECT' && item.value !== 'any') {
        filteredOffers = (item.id !== 'housing-price') ? filterByValue(item, Rule[item.id]) : filterByPrice(item);
      } else if (item.tagName === 'INPUT') {
        filteredOffers = filterByFeatures(item);
      }
    });

    window.reset.deleteAllPins();
    window.card.delete();

    window.pins.render(filteredOffers);


  };

  window.filters = {
    updatePins: updatePins
  };

})();
