'use strict';

(function () {

  var typeSelect = window.map.form.querySelector('#type');
  var priceInput = window.map.form.querySelector('#price');

  var onTypeSelectChange = function () {
    var selectedOptionValue = typeSelect.options[typeSelect.selectedIndex].value;

    priceInput.min = window.data.types[selectedOptionValue].price;
    priceInput.placeholder = priceInput.min;
  };

  typeSelect.addEventListener('change', onTypeSelectChange);

  var timeinSelect = window.map.form.querySelector('#timein');
  var timeoutSelect = window.map.form.querySelector('#timeout');

  var onTimeinSelectChange = function () {
    var timeinSelectedIndex = timeinSelect.options.selectedIndex;

    timeoutSelect.options.selectedIndex = timeinSelectedIndex;
  };

  var onTimeoutSelectChange = function () {
    var timeoutSelectedIndex = timeoutSelect.options.selectedIndex;

    timeinSelect.options.selectedIndex = timeoutSelectedIndex;
  };

  timeinSelect.addEventListener('change', onTimeinSelectChange);
  timeoutSelect.addEventListener('change', onTimeoutSelectChange);

  var CapacityData = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var roomNumberSelect = window.map.form.querySelector('#room_number');
  var capacitySelect = window.map.form.querySelector('#capacity');

  var onRoomNumberSelectChange = function () {
    var capacityOptionsArray = Array.from(capacitySelect.options);
    if (capacityOptionsArray.length > 0) {
      capacityOptionsArray.forEach(function (item) {
        item.selected = (CapacityData[roomNumberSelect.value][0] === item.value);
        item.hidden = !(CapacityData[roomNumberSelect.value].indexOf(item.value) >= 0);
      });
    }
  };

  onRoomNumberSelectChange();

  roomNumberSelect.addEventListener('change', onRoomNumberSelectChange);

  window.form = {
    roomsNumberSync: onRoomNumberSelectChange,
    onTypeSelectChange: onTypeSelectChange
  };

})();
