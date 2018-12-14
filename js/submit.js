'use strict';

(function () {

  var titleInput = window.map.form.querySelector('#title');
  var submitButton = window.map.form.querySelector('.ad-form__submit');
  var priceInput = window.map.form.querySelector('#price');

  var onTitleInputInput = function () {
    titleInput.classList.remove('input--invalid');
  };

  var onPriceInputInput = function () {
    priceInput.classList.remove('input--invalid');
  };

  var titleInputCheck = function () {
    if (!titleInput.validity.valid) {
      titleInput.classList.add('input--invalid');
      titleInput.addEventListener('input', onTitleInputInput);
    }
  };

  var priceInputCheck = function () {
    if (!priceInput.validity.valid) {
      priceInput.classList.add('input--invalid');
      priceInput.addEventListener('input', onPriceInputInput);
    }
  };

  var onSubmitButtonClick = function () {
    titleInputCheck();
    priceInputCheck();
  };

  submitButton.addEventListener('click', onSubmitButtonClick);

  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(window.map.form), window.messages.success, window.messages.error);
    evt.preventDefault();
  };

  window.map.form.addEventListener('submit', onFormSubmit);

})();
