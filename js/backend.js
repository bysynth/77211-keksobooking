'use strict';

window.backend = (function () {
  var url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    SAVE: 'https://js.dump.academy/keksobooking'
  };

  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  var ajax = function (data, onLoad, onError, method, uri) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, uri);
    xhr.send(data);
  };

  return {
    load: function (onLoad, onError) {
      ajax(null, onLoad, onError, 'GET', url.LOAD);
    },
    save: function (data, onLoad, onError) {
      ajax(data, onLoad, onError, 'POST', url.SAVE);
    }
  };
})();
