'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin').content;
  var pinsBlock = window.map.mapBlock.querySelector('.map__pins');

  var onPinClick = function (evt, data) {
    if (window.map.mapBlock.querySelector('.popup')) {
      window.card.delete();
    }

    window.card.render(data);

    evt.currentTarget.classList.add('map__pin--active');
  };

  var generatePin = function (data) {
    var pinElement = pinTemplate.cloneNode(true);
    var button = pinElement.querySelector('button');
    var img = pinElement.querySelector('img');
    button.style.left = (data.location.x - window.data.pin.WIDTH / 2) + 'px';
    button.style.top = (data.location.y - window.data.pin.HEIGHT) + 'px';
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

  var clearPinActiveClass = function () {
    var activePin = pinsBlock.querySelector('.map__pin--active');
    activePin.classList.remove('map__pin--active');
    activePin.blur();
  };

  window.pins = {
    render: renderPins,
    clearActivePin: clearPinActiveClass
  };

})();
