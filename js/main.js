import { loadData } from './fetch.js';
import { renderPictures } from './render-pictures.js';
import { initFilters } from './filters.js';
import { showErrorMessage } from './form.js';

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
      showErrorMessage();
    }
  }
);
