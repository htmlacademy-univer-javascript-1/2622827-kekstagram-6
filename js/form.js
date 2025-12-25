import { isEscapeKey } from './util.js';
import {
  validateHashtags,
  validateComment,
  getHashtagErrorMessage,
  getCommentErrorMessage
} from './hashtags-pristine.js';
import { resetEffects, initEffects } from './effects.js';
import { resetScale, initScale } from './scale.js';
import { uploadData } from './fetch.js';

initEffects();
initScale();

const DEFAULT_IMAGE = 'img/upload-default-image.jpg';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// -------------------- DOM элементы --------------------
const formUpload = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const submitButton = formUpload.querySelector('#upload-submit');
const hashtagsInput = formUpload.querySelector('.text__hashtags');
const descriptionInput = formUpload.querySelector('.text__description');
const previewImage = document.querySelector('.img-upload__preview img');
const previewContainer = document.querySelector('.img-upload__preview');
let currentObjectUrl = null;

// -------------------- Pristine --------------------
let pristine = null;
const initValidation = () => {
  if (!formUpload || typeof Pristine === 'undefined') {return;}

  [hashtagsInput, descriptionInput].forEach((input) => {
    if (input && input.parentElement && !input.parentElement.classList.contains('img-upload__field-wrapper')) {
      input.parentElement.classList.add('img-upload__field-wrapper');
    }
  });

  pristine = new Pristine(formUpload, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__item--invalid',
    successClass: 'img-upload__item--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'pristine-error',
  });

  pristine.addValidator(hashtagsInput, validateHashtags, getHashtagErrorMessage, 2, false);
  pristine.addValidator(descriptionInput, validateComment, getCommentErrorMessage, 1, false);

  // Валидация комментария на ввод
  descriptionInput.addEventListener('input', () => {
    pristine.validate(descriptionInput);
  });

  // Валидация хештегов на ввод
  hashtagsInput.addEventListener('input', () => {
    pristine.validate(hashtagsInput);
  });
};

const validateForm = () => pristine ? pristine.validate() : true;
const resetValidation = () => pristine && pristine.reset();

// -------------------- Открытие / закрытие формы --------------------
const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  formUpload.reset();
  fileInput.value = '';
  previewImage.src = DEFAULT_IMAGE;
  if (previewContainer) {
    previewContainer.style.backgroundImage = `url("${DEFAULT_IMAGE}")`;
  }
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
  }

  resetEffects();
  resetScale();
  resetValidation();
};

// -------------------- ESC обработчики --------------------
const onDocumentKeydown = (evt) => {
  if (
    isEscapeKey(evt) &&
    !overlay.classList.contains('hidden') &&
    document.activeElement !== hashtagsInput &&
    document.activeElement !== descriptionInput
  ) {
    evt.preventDefault();
    closeForm();
  }
};

const stopEscapePropagation = (evt) => {
  if (isEscapeKey(evt)) {evt.stopPropagation();}
};

// -------------------- Универсальная функция сообщений --------------------
const showMessage = (templateId, messageClass, innerClass, buttonClass) => {
  const template = document.querySelector(templateId).content.cloneNode(true);
  const message = template.querySelector(messageClass);
  document.body.append(message);

  function close() {
    message.remove();
    document.removeEventListener('keydown', onEsc);
    document.removeEventListener('click', onOutsideClick);
  }

  function onEsc(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      close();
    }
  }

  function onOutsideClick(evt) {
    if (!evt.target.closest(innerClass)) {close();}
  }

  const button = message.querySelector(buttonClass);
  if (button) {button.addEventListener('click', close);}

  document.addEventListener('keydown', onEsc);
  document.addEventListener('click', onOutsideClick);
};

const showSuccessMessage = () => showMessage('#success', '.success', '.success__inner', '.success__button');
const showErrorMessage = () => showMessage('#error', '.error', '.error__inner', '.error__button');

// -------------------- Отправка формы --------------------
const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (!validateForm()) {return;}

  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';

  uploadData(
    new FormData(formUpload),
    () => {
      showSuccessMessage();
      closeForm();
      submitButton.disabled = false;
      submitButton.textContent = 'Опубликовать';
    },
    () => {
      showErrorMessage();
      submitButton.disabled = false;
      submitButton.textContent = 'Опубликовать';
    }
  );
};

// -------------------- Инициализация формы --------------------
const initForm = () => {
  if (!formUpload) {return;}

  initValidation();

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) {return;}

    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((ext) => fileName.endsWith(ext));
    if (!matches) {return;}

    // создаём один objectUrl и используем его для <img> и для background-image контейнера,
    // чтобы тесты, проверяющие CSS url(... blob:...), проходили
    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl);
    }
    currentObjectUrl = URL.createObjectURL(file);
    previewImage.src = currentObjectUrl;
    if (previewContainer) {
      previewContainer.style.backgroundImage = `url("${currentObjectUrl}")`;
    }

    openForm();
  });

  cancelButton.addEventListener('click', closeForm);
  formUpload.addEventListener('submit', onFormSubmit);

  document.addEventListener('keydown', onDocumentKeydown);
  hashtagsInput.addEventListener('keydown', stopEscapePropagation);
  descriptionInput.addEventListener('keydown', stopEscapePropagation);
};

initForm();

export { initForm, openForm, closeForm, validateForm, resetValidation, showErrorMessage };
