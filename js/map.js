'use strict';

(function () {

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('#address');
  var fieldsets = adForm.querySelectorAll('fieldset');

  var MainPinData = {
    WIDTH: 58,
    HEIGHT: 62,
    ARROW_HEIGHT: 17
  };

  var DragNDropMapRestriction = {
    MAP_TOP: 51,
    MAP_BOTTOM: 551,
    MAP_LEFT: 10,
    MAP_RIGHT: 75
  };

  var changeFieldsetState = function (state) {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = state;
    }
  };

  var getCoordinates = function (element) {
    var boxData = element.getBoundingClientRect();

    var boxCoordinates = {
      top: boxData.top + window.pageYOffset,
      left: boxData.left + window.pageXOffset
    };
    return boxCoordinates;
  };

  var getMainPinInactiveCoordinates = function () {
    var pinData = getCoordinates(mainPin);
    var mapData = getCoordinates(map);

    var inactiveCoordinates = {
      top: pinData.top + MainPinData.WIDTH / 2,
      left: pinData.left + MainPinData.HEIGHT / 2 - mapData.left
    };
    return inactiveCoordinates;
  };

  var getMainPinActiveCoordinates = function () {
    var pinData = getCoordinates(mainPin);
    var inactiveCoordinates = getMainPinInactiveCoordinates();

    var activeCoordinates = {
      top: pinData.top + MainPinData.HEIGHT + MainPinData.ARROW_HEIGHT,
      left: inactiveCoordinates.left
    };
    return activeCoordinates;
  };

  var setAddressCoordinates = function (coords) {
    var x = coords.left;
    var y = coords.top;

    var value = addressInput.value = x + ', ' + y;
    return value;
  };

  changeFieldsetState(true);
  var inactivePageAddressCoordinates = getMainPinInactiveCoordinates();
  setAddressCoordinates(inactivePageAddressCoordinates);

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    changeFieldsetState(false);

    window.backend.load(window.pins.render, window.messages.error);
  };

  var onMainPinMousedown = function (evt) {
    evt.preventDefault();
    if (map.classList.contains('map--faded')) {
      activatePage();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMainPinMousemove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      if (mainPin.offsetTop - shift.y <= DragNDropMapRestriction.MAP_TOP) {
        mainPin.style.top = DragNDropMapRestriction.MAP_TOP + 'px';
      }
      if (mainPin.offsetTop - shift.y >= DragNDropMapRestriction.MAP_BOTTOM) {
        mainPin.style.top = DragNDropMapRestriction.MAP_BOTTOM + 'px';
      }

      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      if (mainPin.offsetLeft - shift.x <= DragNDropMapRestriction.MAP_LEFT) {
        mainPin.style.left = DragNDropMapRestriction.MAP_LEFT + 'px';
      }
      if (mainPin.offsetLeft - shift.x >= map.offsetWidth - DragNDropMapRestriction.MAP_RIGHT) {
        mainPin.style.left = map.offsetWidth - DragNDropMapRestriction.MAP_RIGHT + 'px';
      }

      setAddressCoordinates(getMainPinActiveCoordinates());
    };

    var onMainPinMouseup = function (upEvt) {
      upEvt.preventDefault();
      setAddressCoordinates(getMainPinActiveCoordinates());
      document.removeEventListener('mousemove', onMainPinMousemove);
      document.removeEventListener('mouseup', onMainPinMouseup);
    };

    document.addEventListener('mousemove', onMainPinMousemove);
    document.addEventListener('mouseup', onMainPinMouseup);
  };

  mainPin.addEventListener('mousedown', onMainPinMousedown);

  window.map = {
    mapBlock: map,
    form: adForm,
    mainPin: mainPin,
    setAddressCoordinates: setAddressCoordinates,
    inactivePageAddressCoordinates: inactivePageAddressCoordinates,
    changeFieldsetState: changeFieldsetState,
    onMainPinMousedown: onMainPinMousedown
  };

})();
