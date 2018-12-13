'use strict';

window.messages = (function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var deleteMessage = function (type) {
    main.removeChild(main.querySelector(type));
  };

  var onErrorCloseClick = function () {
    deleteMessage('.error');
    document.removeEventListener('click', onErrorClick);
    document.removeEventListener('keydown', onErrorKeydown);
  };

  var onErrorKeydown = function (evt) {
    if (window.utils.isEscEvent(evt)) {
      deleteMessage('.error');
      document.removeEventListener('keydown', onErrorKeydown);
      document.removeEventListener('click', onErrorClick);
    }
  };

  var onErrorClick = function () {
    deleteMessage('.error');
    document.removeEventListener('click', onErrorClick);
    document.removeEventListener('keydown', onErrorKeydown);
  };

  var onSuccessKeydown = function (evt) {
    if (window.utils.isEscEvent(evt)) {
      deleteMessage('.success');
      document.removeEventListener('keydown', onSuccessKeydown);
      document.removeEventListener('click', onSuccessClick);
    }
  };

  var onSuccessClick = function () {
    deleteMessage('.success');
    document.removeEventListener('click', onSuccessClick);
    document.removeEventListener('keydown', onSuccessKeydown);
  };

  return {
    error: function (message) {
      var errorElement = errorTemplate.cloneNode(true);
      var errorMessage = errorElement.querySelector('.error__message');
      var errorClose = errorElement.querySelector('.error__button');

      errorMessage.textContent = message;

      errorClose.addEventListener('click', onErrorCloseClick);
      document.addEventListener('keydown', onErrorKeydown);
      document.addEventListener('click', onErrorClick);

      main.appendChild(errorElement);
    },
    success: function () {
      var successElement = successTemplate.cloneNode(true);

      document.addEventListener('keydown', onSuccessKeydown);
      document.addEventListener('click', onSuccessClick);

      main.appendChild(successElement);
      window.reset();
    }
  };
})();
