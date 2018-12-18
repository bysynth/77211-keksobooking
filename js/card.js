'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = window.map.mapBlock.querySelector('.map__filters-container');

  var generateCard = function (ad, types) {
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

    var roomsString = window.utils.numDecline(ad.offer.rooms, ' комната для ', ' комнаты для ', ' комнат для ');
    var guestsString = window.utils.numDecline(ad.offer.guests, ' гостя', ' гостей', ' гостей');

    avatar.src = ad.author.avatar;

    if (ad.offer.title) {
      title.textContent = ad.offer.title;
    } else {
      title.remove();
    }

    if (ad.offer.address) {
      address.textContent = ad.offer.address;
    } else {
      address.remove();
    }

    if (ad.offer.price) {
      price.textContent = ad.offer.price + '₽/ночь';
    } else {
      price.remove();
    }

    if (ad.offer.type) {
      type.textContent = types[ad.offer.type].ru;
    } else {
      type.remove();
    }

    if (ad.offer.rooms && ad.offer.guests) {
      capacity.textContent = ad.offer.rooms + roomsString + ad.offer.guests + guestsString;
    } else {
      capacity.remove();
    }

    if (ad.offer.checkin && ad.offer.checkout) {
      time.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    } else {
      time.remove();
    }

    if (ad.offer.features && ad.offer.features.length !== 0) {
      window.utils.clearNode(featuresNode);
      for (var i = 0; i < ad.offer.features.length; i++) {
        var feature = ad.offer.features[i];
        featuresNode.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + feature + '"></li>');
      }
    } else {
      featuresNode.remove();
    }

    if (ad.offer.description) {
      description.textContent = ad.offer.description;
    } else {
      description.remove();
    }

    if (ad.offer.photos && ad.offer.photos.length !== 0) {
      window.utils.clearNode(photos);
      for (var j = 0; j < ad.offer.photos.length; j++) {
        photos.insertAdjacentHTML('beforeend', '<img src="' + ad.offer.photos[j] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
      }
    } else {
      photos.remove();
    }

    closePopup.addEventListener('click', deleteCard);
    document.addEventListener('keydown', onCardKeydown);

    return cardElement;
  };

  var renderCard = function (dataObj) {
    var card = generateCard(dataObj, window.data.types);
    window.map.mapBlock.insertBefore(card, mapFiltersContainer);
  };

  var deleteCard = function () {
    var card = window.map.mapBlock.querySelector('.popup');
    if (card) {
      card.remove();
    }
    window.pins.clearActivePin();
    document.removeEventListener('keydown', onCardKeydown);
  };

  var onCardKeydown = function (evt) {
    if (window.utils.isEscEvent(evt)) {
      deleteCard();
    }
  };

  window.card = {
    render: renderCard,
    delete: deleteCard
  };

})();
