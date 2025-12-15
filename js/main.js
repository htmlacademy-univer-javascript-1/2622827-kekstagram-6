import { loadData } from './fetch.js';
import { renderPictures } from './render-pictures.js';
import './form.js'; // Управление формой


// Загрузка миниатюр
loadData(
  (data) => {
    renderPictures(data.slice());
  },
  () => {
    // Показываем ошибку через универсальный модуль сообщений
    const event = new CustomEvent('showError');
    document.body.dispatchEvent(event);
  }
);
