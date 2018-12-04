'use strict';

var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS_AND_CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES_WORDS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LINKS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LocationData = {
  minY: 130,
  maxY: 630
};
var PriceData = {
  min: 1000,
  max: 1000000
};
var RoomsData = {
  min: 1,
  max: 5
};
var PinData = {
  width: 50,
  height: 70
};
var MainPinData = {
  width: 65,
  height: 65,
  arrowHeight: 22
};
var MOCKS_COUNT = 8;
var ESC_CODE = 27;

// -------------------------------------------------------------------

var map = document.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.querySelectorAll('fieldset');
var addressInput = adForm.querySelector('#address');
var pinsBlock = map.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content;
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// -------------------------------------------------------------------

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
    top: pinData.top + Math.round(MainPinData.width / 2),
    left: pinData.left + Math.round(MainPinData.height / 2) - mapData.left
  };
  return inactiveCoordinates;
};

var getMainPinActiveCoordinates = function () {
  var pinData = getCoordinates(mainPin);
  var inactiveCoordinates = getMainPinInactiveCoordinates();

  var activeCoordinates = {
    top: pinData.top + MainPinData.height + MainPinData.arrowHeight,
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

// ----- Установка неактивного состояния страницы -----

changeFieldsetState(true);
var inactivePageAddressCoordinates = getMainPinInactiveCoordinates();
setAddressCoordinates(inactivePageAddressCoordinates);

// -------------------------------------------------------------------

var generateRandomNumberFromRange = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var takeRandomElement = function (array) {
  return array[generateRandomNumberFromRange(0, array.length - 1)];
};

var shuffleArray = function (array) {
  var arrayCopy = array.slice();

  for (var i = arrayCopy.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arrayCopy[i];
    arrayCopy[i] = arrayCopy[j];
    arrayCopy[j] = temp;
  }

  return arrayCopy;
};

var getElementWidth = function (element) {
  return element.offsetWidth;
};

var generateLocationX = function () {
  var min = PinData.width / 2;
  var max = getElementWidth(map) - PinData.width / 2;

  return generateRandomNumberFromRange(min, max);
};

var generateMockDataObject = function (i) {
  var locationX = generateLocationX();
  var locationY = generateRandomNumberFromRange(LocationData.minY, LocationData.maxY);
  var obj = {};
  obj.author = {
    avatar: AVATARS[i]
  };
  obj.offer = {
    title: TITLES[i],
    address: locationX + ', ' + locationY,
    price: generateRandomNumberFromRange(PriceData.min, PriceData.max),
    type: takeRandomElement(TYPES),
    rooms: generateRandomNumberFromRange(RoomsData.min, RoomsData.max),
    guests: generateRandomNumberFromRange(RoomsData.min, RoomsData.max),
    checkin: takeRandomElement(CHECKINS_AND_CHECKOUTS),
    checkout: takeRandomElement(CHECKINS_AND_CHECKOUTS),
    features: shuffleArray(FEATURES_WORDS).slice(generateRandomNumberFromRange(0, FEATURES_WORDS.length - 1)),
    description: '',
    photos: shuffleArray(PHOTOS_LINKS)
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

var generatePin = function (data) {
  var pinElement = pinTemplate.cloneNode(true);
  var button = pinElement.querySelector('button');
  var img = pinElement.querySelector('img');

  button.style.left = (data.location.x - PinData.width / 2) + 'px';
  button.style.top = (data.location.y - PinData.height) + 'px';
  img.src = data.author.avatar;
  img.alt = data.offer.title;

  button.addEventListener('click', function (evt) {
    onPinClick(evt, data);
  });

  return pinElement;
};

var renderPins = function (ads) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(generatePin(ads[i]));
  }

  pinsBlock.appendChild(fragment);
};

var clearNode = function (node) {
  for (var i = node.children.length - 1; i >= 0; i--) {
    var child = node.children[i];
    child.parentElement.removeChild(child);
  }
};

var numDecline = function (count, one, two, five) {
  count = Math.floor(Math.abs(count)) % 100;
  if (count > 10 && count < 20) {
    return five;
  }
  count = count % 10;
  if (count === 1) {
    return one;
  }
  if (count >= 2 && count <= 4) {
    return two;
  }
  return five;
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
  var closePopup = cardElement.querySelector('.popup__close');

  var types = {
    flat: {
      ru: 'Квартира'
    },
    bungalo: {
      ru: 'Бунгало'
    },
    house: {
      ru: 'Дом'
    },
    palace: {
      ru: 'Дворец'
    }
  };

  var roomsString = numDecline(ad.offer.rooms, ' комната для ', ' комнаты для ', ' комнат для ');
  var guestsString = numDecline(ad.offer.guests, ' гостя', ' гостей', ' гостей');

  avatar.src = ad.author.avatar;
  title.textContent = ad.offer.title;
  address.textContent = ad.offer.address;
  price.textContent = ad.offer.price + '₽/ночь';
  type.textContent = types[ad.offer.type].ru;
  capacity.textContent = ad.offer.rooms + roomsString + ad.offer.guests + guestsString;
  time.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  clearNode(featuresNode);

  for (var i = 0; i < ad.offer.features.length; i++) {
    var feature = ad.offer.features[i];

    featuresNode.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + feature + '"></li>');
  }

  description.textContent = ad.offer.description;

  clearNode(photos);

  for (var j = 0; j < ad.offer.photos.length; j++) {
    photos.insertAdjacentHTML('beforeend', '<img src="' + ad.offer.photos[j] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
  }

  closePopup.addEventListener('click', deleteCard);
  document.addEventListener('keydown', onPopupKeydown);

  return cardElement;
};

var mockData = generateMockDataArray();

// -------------------------------------------------------------------

var renderCard = function (dataObj) {
  var card = generateCard(dataObj);
  map.insertBefore(card, map.children[1]);
};

var clearPinActiveClass = function () {
  var activePin = pinsBlock.querySelector('.map__pin--active');

  activePin.classList.remove('map__pin--active');
  activePin.blur();
};

var deleteCard = function () {
  map.querySelector('.popup').remove();
  clearPinActiveClass();
};

// -------------------------------------------------------------------

var onPinClick = function (evt, data) {
  if (map.querySelector('.popup')) {
    deleteCard();
  }

  renderCard(data);

  evt.currentTarget.classList.add('map__pin--active');
};

var onPopupKeydown = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    deleteCard();
  }
  document.removeEventListener('keydown', onPopupKeydown);
};

// -------------------------------------------------------------------

var activePageAddressCoordinates = getMainPinActiveCoordinates();

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  changeFieldsetState(false);
};

// ----- Активация страницы -----

var onMainPinMouseup = function () {
  activatePage();
  setAddressCoordinates(activePageAddressCoordinates);
  renderPins(mockData);
  mainPin.removeEventListener('mouseup', onMainPinMouseup);
};

mainPin.addEventListener('mouseup', onMainPinMouseup);
