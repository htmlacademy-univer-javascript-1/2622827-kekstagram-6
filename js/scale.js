const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

// Ищем элементы внутри документа
const modalElement = document.querySelector('.img-upload');
const scaleValue = modalElement.querySelector('.scale__control--value');
const smallerBtn = modalElement.querySelector('.scale__control--smaller');
const biggerBtn = modalElement.querySelector('.scale__control--bigger');
const previewImg = modalElement.querySelector('.img-upload__preview img');

const setScale = (value) => {
  scaleValue.value = `${value}%`;
  previewImg.style.transform = `scale(${value / 100})`;
};

const onSmaller = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  const newValue = currentValue - STEP_SCALE;
  if (newValue >= MIN_SCALE) {
    setScale(newValue);
  }
};

const onBigger = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  const newValue = currentValue + STEP_SCALE;
  if (newValue <= MAX_SCALE) {
    setScale(newValue);
  }
};

export const initScale = () => {
  smallerBtn.addEventListener('click', onSmaller);
  biggerBtn.addEventListener('click', onBigger);
};

export const resetScale = () => {
  setScale(DEFAULT_SCALE);
};
