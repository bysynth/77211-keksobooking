'use strict';

var map = document.querySelector('.map');
var pinsBlock = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;

map.classList.remove('map--faded');

var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS_AND_CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES_WORDS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LINKS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var MOCKS_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var generateRandomNumberFromRange = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var takeRandomElement = function (array) {
  return array[generateRandomNumberFromRange(0, array.length - 1)];
};

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

var generateArrayWithRandomStrings = function (array) {
  var shuffledArray = shuffleArray(array);
  var result = [];

  for (var i = 0; i <= generateRandomNumberFromRange(0, shuffledArray.length); i++) {
    result[i] = shuffledArray[i];
  }

  return result;
};

var getElementWidth = function (element) {
  return element.offsetWidth;
};

// В функции специально добавлены значения PIN_WIDTH / 2 чтобы пины не выходили за границы карты
var generateLocationX = function () {
  var min = PIN_WIDTH / 2;
  var max = getElementWidth(map) - PIN_WIDTH / 2;

  return generateRandomNumberFromRange(min, max);
};

var generateMockDataObject = function (i) {
  var locationX = generateLocationX();
  var locationY = generateRandomNumberFromRange(LOCATION_MIN_Y, LOCATION_MAX_Y);
  var obj = {};
  obj.author = {
    avatar: AVATARS[i]
  };
  obj.offer = {
    title: TITLES[i],
    address: locationX + ', ' + locationY,
    price: generateRandomNumberFromRange(PRICE_MIN, PRICE_MAX),
    type: takeRandomElement(TYPES),
    rooms: generateRandomNumberFromRange(ROOMS_MIN, ROOMS_MAX),
    guests: generateRandomNumberFromRange(ROOMS_MIN, ROOMS_MAX),
    checkin: takeRandomElement(CHECKINS_AND_CHECKOUTS),
    checkout: takeRandomElement(CHECKINS_AND_CHECKOUTS),
    features: generateArrayWithRandomStrings(FEATURES_WORDS),
    description: '',
    photos: shuffleArray(PHOTOS_LINKS)
  };
  obj.location = {
    x: locationX,
    y: locationY
  };

  return obj;
};

var generateMockDataArray = function (number) {
  var array = [];

  for (var i = 0; i < number; i++) {
    array.push(generateMockDataObject(i));
  }

  return array;
};

var generatePin = function (data, i) {
  var pinElement = pinTemplate.cloneNode(true);
  var button = pinElement.querySelector('button');
  var img = pinElement.querySelector('img');

  button.style.left = (data[i].location.x - PIN_WIDTH / 2) + 'px';
  button.style.top = (data[i].location.y - PIN_HEIGHT) + 'px';
  img.src = data[i].author.avatar;
  img.alt = data[i].offer.title;

  return pinElement;
};

var renderPins = function (notices) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < notices.length; i++) {
    fragment.appendChild(generatePin(notices, i));
  }

  pinsBlock.appendChild(fragment);
};

var mockData = generateMockDataArray(MOCKS_COUNT);

renderPins(mockData);
