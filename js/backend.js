'use strict';

window.backend = (function () {
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    SAVE: 'https://js.dump.academy/keksobooking'
  };

  var ajax = function (onLoad, onError, method, uri, data) {
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
      ajax(onLoad, onError, 'GET', Url.LOAD);
    },
    save: function (data, onLoad, onError) {
      ajax(onLoad, onError, 'POST', Url.SAVE, data);
    }
  };
})();
