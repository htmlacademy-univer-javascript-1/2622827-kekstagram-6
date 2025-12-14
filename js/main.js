import { loadData } from './fetch.js';
import { renderPictures } from './render-pictures.js';
import './form.js'; // Управление формой
import { initEffects } from './effects.js';
import { initScale } from './scale.js';

let photos = [];

// Загрузка миниатюр
loadData(
  (data) => {
    photos = data.slice();
    renderPictures(data.slice());
  },
  () => {
    // Показываем ошибку через универсальный модуль сообщений
    const event = new CustomEvent('showError');
    document.body.dispatchEvent(event);
  }
);

initEffects();
document.addEventListener('DOMContentLoaded', () => {
  initScale();
});
