import { loadData } from './fetch.js';
import { renderPictures } from './render-pictures.js';
import { initFilters } from './filters.js';
import { showDataError } from './message.js';
import { initForm } from './form.js';

initForm();
// Загружаем данные
loadData(
  (photos) => {
    if (!photos || !Array.isArray(photos) || photos.length === 0) {return;}
    renderPictures(photos);
    initFilters(photos);
  },
  (err) => {
    // Показываем ошибку только если fetch реально не удался
    if (err) {
      showDataError();
    }
  }
);
