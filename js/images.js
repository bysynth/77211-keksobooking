'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarArea = window.map.form.querySelector('.ad-form__field');
  var avatarFileChooser = avatarArea.querySelector('#avatar');
  var avatarDropArea = avatarArea.querySelector('.ad-form-header__drop-zone');
  var avatarPreview = window.map.form.querySelector('.ad-form-header__preview img');
  var photoContainer = window.map.form.querySelector('.ad-form__photo-container');
  var photoFileChooser = photoContainer.querySelector('#images');
  var photoDropArea = photoContainer.querySelector('.ad-form__drop-zone');
  var photoBox = photoContainer.querySelector('.ad-form__photo');

  var preventDefaults = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
    avatarDropArea.addEventListener(eventName, preventDefaults);
    photoDropArea.addEventListener(eventName, preventDefaults);
  });

  var imagePreview = function (file, destination) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (destination === 'avatar') {
          avatarPreview.src = reader.result;
        } else {
          photoContainer.appendChild(renderPhotoPreview(reader.result));
        }
      });

      reader.readAsDataURL(file);
    } else {
      window.messages.error('Неверный формат файла');
    }
  };

  var renderPhotoPreview = function (imgData) {
    photoBox.remove();
    var photo = photoBox.cloneNode();
    var img = document.createElement('img');
    img.alt = 'Фотография жилья';
    img.width = '70';
    img.height = '70';
    img.src = imgData;
    photo.appendChild(img);
    return photo;
  };

  var onAvatarFileChooserChange = function () {
    var file = avatarFileChooser.files[0];
    imagePreview(file, 'avatar');
  };

  var onAvatarDropAreaDrop = function (evt) {
    var file = evt.dataTransfer.files[0];
    imagePreview(file, 'avatar');
  };

  var onPhotoFileChooserChange = function () {
    var files = photoFileChooser.files;
    if (files.length > 1) {
      var filesArray = Array.from(files);
      for (var i = 0; i < filesArray.length; i++) {
        imagePreview(filesArray[i], 'photos');
      }
    } else {
      var file = photoFileChooser.files[0];
      imagePreview(file, 'photos');
    }
  };

  var onPhotoDropAreaDrop = function (evt) {
    var files = evt.dataTransfer.files;
    if (files.length > 1) {
      var filesArray = Array.from(files);
      for (var i = 0; i < filesArray.length; i++) {
        imagePreview(filesArray[i], 'photos');
      }
    } else {
      var file = evt.dataTransfer.files[0];
      imagePreview(file, 'photos');
    }
  };

  avatarFileChooser.addEventListener('change', onAvatarFileChooserChange);
  avatarDropArea.addEventListener('drop', onAvatarDropAreaDrop);
  photoFileChooser.addEventListener('change', onPhotoFileChooserChange);
  photoDropArea.addEventListener('drop', onPhotoDropAreaDrop);

  var clearAvatar = function () {
    avatarPreview.src = 'img/muffin-grey.svg';
  };

  var clearPhotos = function () {
    var photos = photoContainer.querySelectorAll('.ad-form__photo');
    photos.forEach(function (photo) {
      photo.remove();
    });
    photoContainer.appendChild(photoBox);
  };

  window.images = {
    clearAvatar: clearAvatar,
    clearPhotos: clearPhotos
  };

})();
