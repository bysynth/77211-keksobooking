'use strict';

window.utils = (function () {
  var ESC_CODE = 27;

  return {
    isEscEvent: function (evt) {
      return evt.keyCode === ESC_CODE;
    },
    generateRandomNumberFromRange: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    shuffleArray: function (array) {
      var arrayCopy = array.slice();
      for (var i = arrayCopy.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[j];
        arrayCopy[j] = temp;
      }
      return arrayCopy;
    },
    clearNode: function (node) {
      for (var i = node.children.length - 1; i >= 0; i--) {
        var child = node.children[i];
        child.parentElement.removeChild(child);
      }
    },
    numDecline: function (count, one, two, five) {
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
    }
  };

})();
