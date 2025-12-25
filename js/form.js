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

const DEFAULT_IMAGE = 'img/upload-default-image.jpg';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// --------------------
// DOM элементы
// --------------------
const formUpload = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const submitButton = formUpload.querySelector('#upload-submit');
const hashtagsInput = formUpload.querySelector('.text__hashtags');
const descriptionInput = formUpload.querySelector('.text__description');
const previewImage = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

// --------------------
// Pristine
// --------------------
let pristine = null;

const initValidation = () => {
  if (!formUpload || typeof Pristine === 'undefined') {
    return;
  }

  pristine = new Pristine(formUpload, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__item--invalid',
    successClass: 'img-upload__item--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'pristine-error',
  });

  pristine.addValidator(
    hashtagsInput,
    validateHashtags,
    getHashtagErrorMessage
  );

  pristine.addValidator(
    descriptionInput,
    validateComment,
    getCommentErrorMessage
  );

  // ВАЖНО для тестов: ошибка появляется и исчезает при вводе
  descriptionInput.addEventListener('input', () => {
    pristine.validate(descriptionInput);
  });

  hashtagsInput.addEventListener('input', () => {
    pristine.validate(hashtagsInput);
  });
};

const resetValidation = () => {
  if (pristine) {
    pristine.reset();
  }
};

// --------------------
// Закрытие по Esc
// --------------------
const onDocumentKeydown = (evt) => {
  const isErrorOpen = Boolean(document.querySelector('.error'));
  const isFocused =
    document.activeElement === hashtagsInput ||
    document.activeElement === descriptionInput;

  if (isEscapeKey(evt) && !isFocused && !isErrorOpen) {
    evt.preventDefault();
    closeForm();
  }
};

// --------------------
// Открытие / закрытие формы
// --------------------
const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeForm() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  formUpload.reset();
  fileInput.value = '';
  previewImage.src = DEFAULT_IMAGE;

  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });

  resetEffects();
  resetScale();
  resetValidation();

  document.removeEventListener('keydown', onDocumentKeydown);
}
// --------------------
// Сообщения
// --------------------
const showMessage = (templateId, messageClass, innerClass, buttonClass) => {
  const template = document
    .querySelector(templateId)
    .content
    .querySelector(messageClass);

  const message = template.cloneNode(true);
  document.body.append(message);

  const close = () => {
    message.remove();
    document.removeEventListener('keydown', onEsc);
    window.removeEventListener('click', onOutsideClick);
  };

  function onEsc (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      close();
    }
  }

  function onOutsideClick(evt) {
    if (!evt.target.closest(innerClass)) {
      close();
    }
  }

  const button = message.querySelector(buttonClass);
  if (button) {
    button.addEventListener('click', close);
  }

  document.addEventListener('keydown', onEsc);
  window.addEventListener('click', onOutsideClick);
};

const showSuccessMessage = () =>
  showMessage('#success', '.success', '.success__inner', '.success__button');

const showErrorMessage = () =>
  showMessage('#error', '.error', '.error__inner', '.error__button');

// --------------------
// Отправка формы
// --------------------
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (!pristine || !pristine.validate()) {
    return;
  }

  blockSubmitButton();

  uploadData(
    new FormData(evt.target),
    () => {
      showSuccessMessage();
      closeForm();
      unblockSubmitButton();
    },
    () => {
      showErrorMessage();
      unblockSubmitButton();
    }
  );
};

// --------------------
// Инициализация
// --------------------
const initForm = () => {
  if (!formUpload) {
    return;
  }

  initValidation();
  initScale();
  initEffects();

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    const isValidType = FILE_TYPES.some((ext) =>
      fileName.endsWith(ext)
    );

    if (!isValidType) {
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    previewImage.src = fileUrl;

    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${fileUrl})`;
    });

    openForm();
  });

  cancelButton.addEventListener('click', closeForm);
  formUpload.addEventListener('submit', onFormSubmit);
};

initForm();

export { showErrorMessage, initForm };
