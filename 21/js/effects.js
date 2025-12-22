// Элементы управления эффектами
const effectLevel = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const previewImg = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects');

// Текущий эффект
let currentEffect = 'none';

// Настройки каждого эффекта
const EFFECT_SETTINGS = {
  none: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 1,
    filter: () => '',
  },
  chrome: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    filter: (value) => `grayscale(${value})`,
  },
  sepia: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    filter: (value) => `sepia(${value})`,
  },
  marvin: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    filter: (value) => `invert(${value}%)`,
  },
  phobos: {
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    filter: (value) => `blur(${value}px)`,
  },
  heat: {
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    filter: (value) => `brightness(${value})`,
  },
};

// -----------------------------
// Инициализация слайдера
// -----------------------------
noUiSlider.create(sliderElement, {
  start: 1,
  step: 0.1,
  range: {
    min: 0,
    max: 1,
  },
  connect: 'lower',
});

// -----------------------------
// Обновление фильтра по движению слайдера
// -----------------------------
sliderElement.noUiSlider.on('update', (values) => {
  const value = values[0];
  sliderValue.value = value;

  if (currentEffect === 'none') {
    previewImg.style.filter = '';
    return;
  }

  const effect = EFFECT_SETTINGS[currentEffect];
  previewImg.style.filter = effect.filter(value);
});

// -----------------------------
// Применение выбранного эффекта
// -----------------------------
const applyEffect = (effectName) => {
  currentEffect = effectName;

  const effect = EFFECT_SETTINGS[currentEffect];

  sliderElement.noUiSlider.updateOptions({
    range: effect.range,
    start: effect.start,
    step: effect.step
  });
  sliderElement.noUiSlider.set(effect.start);

  if (currentEffect === 'none') {
    effectLevel.classList.add('hidden');
    previewImg.style.filter = '';
  } else {
    effectLevel.classList.remove('hidden');
    previewImg.style.filter = effect.filter(effect.start);
  }
};

// -----------------------------
// Переключение эффекта
// -----------------------------
effectsList.addEventListener('change', (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {return;}

  applyEffect(evt.target.value);
});

// -----------------------------
// Инициализация эффектов
// -----------------------------
export const initEffects = () => {
  applyEffect('none');
};

// -----------------------------
// Сброс эффектов к значению по умолчанию
// -----------------------------
export const resetEffects = () => {
  applyEffect('none');
};
