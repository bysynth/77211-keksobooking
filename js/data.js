'use strict';

(function () {

  var AVATARS = [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png'
  ];

  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var CHECKINS_AND_CHECKOUTS = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FEATURES_WORDS = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PHOTOS_LINKS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var MOCKS_COUNT = 8;

  var LocationLimitsData = {
    MIN_Y: 130,
    MAX_Y: 630
  };

  var PriceData = {
    MIN: 1000,
    MAX: 1000000
  };

  var RoomsData = {
    MIN: 1,
    MAX: 5
  };

  var PinData = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var takeRandomElement = function (array) {
    return array[window.utils.generateRandomNumberFromRange(0, array.length - 1)];
  };

  var generateLocationX = function () {
    var min = PinData.WIDTH / 2;
    var max = window.map.mapBlock.offsetWidth - PinData.WIDTH / 2;

    return window.utils.generateRandomNumberFromRange(min, max);
  };

  var generateMockDataObject = function (i) {
    var locationX = generateLocationX();
    var locationY = window.utils.generateRandomNumberFromRange(LocationLimitsData.MIN_Y, LocationLimitsData.MAX_Y);
    var obj = {};
    obj.author = {
      avatar: AVATARS[i]
    };
    obj.offer = {
      title: TITLES[i],
      address: locationX + ', ' + locationY,
      price: window.utils.generateRandomNumberFromRange(PriceData.MIN, PriceData.MAX),
      type: takeRandomElement(TYPES),
      rooms: window.utils.generateRandomNumberFromRange(RoomsData.MIN, RoomsData.MAX),
      guests: window.utils.generateRandomNumberFromRange(RoomsData.MIN, RoomsData.MAX),
      checkin: takeRandomElement(CHECKINS_AND_CHECKOUTS),
      checkout: takeRandomElement(CHECKINS_AND_CHECKOUTS),
      features: window.utils.shuffleArray(FEATURES_WORDS).slice(window.utils.generateRandomNumberFromRange(0, FEATURES_WORDS.length - 1)),
      description: '',
      photos: window.utils.shuffleArray(PHOTOS_LINKS)
    };
    obj.location = {
      x: locationX,
      y: locationY
    };

    return obj;
  };

  var generateMockDataArray = function () {
    var array = [];
    for (var i = 0; i < MOCKS_COUNT; i++) {
      array.push(generateMockDataObject(i));
    }

    return array;
  };

  window.data = {
    mocks: generateMockDataArray(),
    types: {
      flat: {
        ru: 'Квартира',
        price: 1000
      },
      bungalo: {
        ru: 'Бунгало',
        price: 0
      },
      house: {
        ru: 'Дом',
        price: 5000
      },
      palace: {
        ru: 'Дворец',
        price: 10000
      }
    },
    pin: PinData
  };

})();
