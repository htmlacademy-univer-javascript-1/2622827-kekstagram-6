import { isEscapeKey } from './util.js';
import {
  validateHashtags,
  validateComment,
  getHashtagErrorMessage,
  getCommentErrorMessage
} from './hashtags-pristine.js';
import { resetEffects } from './effects.js';
import { resetScale } from './scale.js';

// Элементы формы
const formUpload = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const submitButton = formUpload ? formUpload.querySelector('#upload-submit') : null;

// Поля ввода
let hashtagsInput = null;
let descriptionInput = null;

if (formUpload) {
  hashtagsInput = formUpload.querySelector('.text__hashtags');
  descriptionInput = formUpload.querySelector('.text__description');
}

// Pristine
let pristine = null;

// Инициализация Pristine
const initValidation = () => {
  if (!formUpload || typeof Pristine === 'undefined') {return false;}

  pristine = new Pristine(formUpload, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__item--invalid',
    successClass: 'img-upload__item--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__error-text',
  });

  pristine.addValidator(
    hashtagsInput,
    validateHashtags,
    getHashtagErrorMessage,
    2,
    false
  );

  pristine.addValidator(
    descriptionInput,
    validateComment,
    getCommentErrorMessage,
    1,
    false
  );

  return true;
};

// Проверка валидности
const validateForm = () => pristine ? pristine.validate() : false;

// Сброс
const resetValidation = () => pristine && pristine.reset();

// Открытие формы
const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  updateSubmitButtonState();
};

// Закрытие формы
const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  formUpload.reset();
  fileInput.value = '';
  resetEffects();
  resetScale();
  resetValidation();
  updateSubmitButtonState();
};

// Обновление кнопки submit
function updateSubmitButtonState() {
  if (!submitButton) {return;}
  submitButton.disabled = !validateForm();
}

// Блок ESC в полях
const stopPropagationOnEscape = (evt) => {
  if (isEscapeKey(evt)) {evt.stopPropagation();}
};

const onHashtagInput = () => updateSubmitButtonState();
const onCommentInput = () => updateSubmitButtonState();

// Сообщение об успехе
function showSuccessMessage() {
  const template = document.querySelector('#success').content.cloneNode(true);
  const success = template.querySelector('.success');
  document.body.append(success);

  const close = () => {
    success.remove();
    document.removeEventListener('keydown', onEsc);
  };

  function onEsc(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      close();
    }
  }

  success.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('success__button')) {
      close();
    }
  });

  document.addEventListener('keydown', onEsc);
}

// Сообщение об ошибке
function showErrorMessage() {
  const template = document.querySelector('#error').content.cloneNode(true);
  const error = template.querySelector('.error');
  document.body.append(error);

  const close = () => {
    error.remove();
    document.removeEventListener('keydown', onEsc);
  };

  function onEsc(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      close();
    }
  }

  error.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('error__button')) {
      close();
    }
  });

  document.addEventListener('keydown', onEsc);
}

// AJAX отправка данных
const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (!validateForm()) {return;}

  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';

  const formData = new FormData(formUpload);

  try {
    const response = await fetch('https://29.javascript.htmlacademy.pro/kekstagram', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error();
    }

    showSuccessMessage();
    closeForm();

  } catch (err) {
    showErrorMessage();
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  }
};

// Инициализация формы
const initForm = () => {
  if (!formUpload || !fileInput || !overlay || !cancelButton) {return;}

  initValidation();

  fileInput.addEventListener('change', openForm);
  cancelButton.addEventListener('click', closeForm);

  formUpload.addEventListener('submit', onFormSubmit);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt) && !overlay.classList.contains('hidden')) {
      const hashtagsFocused = document.activeElement === hashtagsInput;
      const descriptionFocused = document.activeElement === descriptionInput;

      if (!hashtagsFocused && !descriptionFocused) {
        evt.preventDefault();
        closeForm();
      }
    }
  });

  hashtagsInput.addEventListener('keydown', stopPropagationOnEscape);
  hashtagsInput.addEventListener('input', onHashtagInput);

  descriptionInput.addEventListener('keydown', stopPropagationOnEscape);
  descriptionInput.addEventListener('input', onCommentInput);

  updateSubmitButtonState();
};

if (formUpload) {initForm();}

export {
  initForm,
  openForm,
  closeForm,
  validateForm,
  resetValidation,
  updateSubmitButtonState
};
