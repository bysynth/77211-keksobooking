'use strict';

var map = document.querySelector('.map');
var pinsBlock = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

  pinElement.querySelector('button').style.left = (data[i].location.x - PIN_WIDTH / 2) + 'px';
  pinElement.querySelector('button').style.top = (data[i].location.y - PIN_HEIGHT) + 'px';
  pinElement.querySelector('img').src = data[i].author.avatar;
  pinElement.querySelector('img').alt = data[i].offer.title;

  return pinElement;
};

var renderPins = function (ads) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(generatePin(ads, i));
  }

  pinsBlock.appendChild(fragment);
};

var clearNode = function (node) {
  for (var i = node.children.length - 1; i >= 0; i--) {
    var child = node.children[i];
    child.parentElement.removeChild(child);
  }
};

var generateCard = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);
  var featuresNode = cardElement.querySelector('.popup__features');
  var avatar = cardElement.querySelector('.popup__avatar');
  var title = cardElement.querySelector('.popup__title');
  var address = cardElement.querySelector('.popup__text--address');
  var price = cardElement.querySelector('.popup__text--price');
  var type = cardElement.querySelector('.popup__type');
  var capacity = cardElement.querySelector('.popup__text--capacity');
  var time = cardElement.querySelector('.popup__text--time');
  var description = cardElement.querySelector('.popup__description');
  var photos = cardElement.querySelector('.popup__photos');

  var typeString = '';
  switch (ad.offer.type) {
    case 'flat':
      typeString = 'Квартира';
      break;
    case 'bungalo':
      typeString = 'Бунгало';
      break;
    case 'house':
      typeString = 'Дом';
      break;
    case 'palace':
      typeString = 'Дворец';
  }
  var roomsString = '';
  switch (ad.offer.rooms.toString()) {
    case '1':
      roomsString = ' комната для ';
      break;
    case '2':
    case '3':
    case '4':
      roomsString = ' комнаты для ';
      break;
    case '5':
      roomsString = ' комнат для ';
  }
  var guestsString = '';
  switch (ad.offer.guests.toString()) {
    case '1':
      guestsString = ' гостя';
      break;
    case '2':
    case '3':
    case '4':
    case '5':
      guestsString = ' гостей';
      break;
  }

  avatar.src = ad.author.avatar;
  title.textContent = ad.offer.title;
  address.textContent = ad.offer.address;
  price.textContent = ad.offer.price + '₽/ночь';
  type.textContent = typeString;
  capacity.textContent = ad.offer.rooms + roomsString + ad.offer.guests + guestsString;
  time.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  clearNode(featuresNode);

  for (var i = 0; i < ad.offer.features.length; i++) {
    var feature = ad.offer.features[i];

    switch (feature) {
      case 'wifi':
        featuresNode.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--wifi"></li>');
        break;
      case 'dishwasher':
        featuresNode.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--dishwasher"></li>');
        break;
      case 'parking':
        featuresNode.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--parking"></li>');
        break;
      case 'washer':
        featuresNode.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--washer"></li>');
        break;
      case 'elevator':
        featuresNode.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--elevator"></li>');
        break;
      case 'conditioner':
        featuresNode.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--conditioner"></li>');
        break;
    }
  }

  description.textContent = ad.offer.description;

  clearNode(photos);

  for (var j = 0; j < ad.offer.photos.length; j++) {
    photos.insertAdjacentHTML('beforeend', '<img src="' + ad.offer.photos[j] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
  }

  return cardElement;
};

var renderCard = function () {
  map.insertBefore(generateCard(mockData[0]), map.children[1]);
};

var mockData = generateMockDataArray(MOCKS_COUNT);

renderPins(mockData);
renderCard();
