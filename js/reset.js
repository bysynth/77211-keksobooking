'use strict';

(function () {

  var MainPinDefaulCoord = {
    LEFT: '570px',
    TOP: '375px'
  };

  var mainPin = window.map.mapBlock.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var resetButton = window.map.form.querySelector('.ad-form__reset');

  var deleteAllPins = function () {
    var pins = window.map.mapBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  var clearValidationMarks = function () {
    var marks = adForm.querySelectorAll('.input--invalid');
    marks.forEach(function (item) {
      item.classList.remove('input--invalid');
    });
  };

  var moveMainPinToDefaultCoord = function () {
    mainPin.style.top = MainPinDefaulCoord.TOP;
    mainPin.style.left = MainPinDefaulCoord.LEFT;
  };

  var disactivatePage = function () {
    if (window.map.mapBlock.querySelector('.popup')) {
      window.card.delete();
    }
    deleteAllPins();
    window.map.mapBlock.classList.add('map--faded');
    window.map.form.classList.add('ad-form--disabled');
    window.map.form.reset();
    window.map.setAddressCoordinates(window.map.inactivePageAddressCoordinates);
    window.form.onTypeSelectChange();
    window.form.roomsNumberSync();
    window.map.changeFormFieldsState(window.map.mapFiltersCollection, true);
    window.map.changeFormFieldsState(window.map.adFromFieldsets, true);
    window.images.clearAvatar();
    window.images.clearPhotos();
    moveMainPinToDefaultCoord();
    mainPin.addEventListener('mousedown', window.map.onMainPinMousedown);
  };

  var onResetButtonClick = function (evt) {
    evt.preventDefault();
    clearValidationMarks();
    disactivatePage();
  };

  resetButton.addEventListener('click', onResetButtonClick);

  window.reset = {
    disactivatePage: disactivatePage,
    deleteAllPins: deleteAllPins
  };

})();
