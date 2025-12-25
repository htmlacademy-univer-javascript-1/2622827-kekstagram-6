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
  const value = parseInt(scaleValue.value, 10);
  const newValue = Math.max(MIN_SCALE, value - STEP_SCALE);
  setScale(newValue);
};

// Увеличение
const onBigger = () => {
  const value = parseInt(scaleValue.value, 10);
  const newValue = Math.min(MAX_SCALE, value + STEP_SCALE);
  setScale(newValue);
};

// Инициализация
export const initScale = () => {
  setScale(DEFAULT_SCALE);

  smallerBtn.addEventListener('click', onSmaller);
  biggerBtn.addEventListener('click', onBigger);
};

// Сброс масштаба
export const resetScale = () => {
  setScale(DEFAULT_SCALE);
};
