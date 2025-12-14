const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleValue = document.querySelector('.scale__control--value');
const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');
const previewImg = document.querySelector('.img-upload__preview img');


// Установка масштаба
const setScale = (value) => {
  scaleValue.value = `${value}%`;
  previewImg.style.transform = `scale(${value / 100})`;
};

// Уменьшение
const onSmaller = () => {
  let value = parseInt(scaleValue.value, 10);
  value = Math.max(MIN_SCALE, value - STEP_SCALE);
  setScale(value);
};

// Увеличение
const onBigger = () => {
  let value = parseInt(scaleValue.value, 10);
  value = Math.min(MAX_SCALE, value + STEP_SCALE);
  setScale(value);
};

// Прямое изменение значения инпута масштаба
const onScaleInputChange = () => {
  let value = parseInt(scaleValue.value, 10);

  if (Number.isNaN(value)) {
    value = DEFAULT_SCALE;
  }

  value = Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
  setScale(value);
};

// Инициализация
export const initScale = () => {
  setScale(DEFAULT_SCALE);

  smallerBtn.addEventListener('click', onSmaller);
  biggerBtn.addEventListener('click', onBigger);
  scaleValue.addEventListener('input', onScaleInputChange);
};

// Сброс масштаба к значению по умолчанию
export const resetScale = () => setScale(DEFAULT_SCALE);
