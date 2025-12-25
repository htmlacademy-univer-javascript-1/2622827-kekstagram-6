import { renderPictures } from './render-pictures.js';
import { debounce } from './util.js';

const FILTER_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');
const filtersContainer = document.querySelector('.img-filters__buttons');

let photos = [];

// Очистка старых миниатюр
const clearPictures = () => {
  document.querySelectorAll('.picture').forEach((el) => el.remove());
};

// Фильтры
const getDefaultPhotos = () => photos.slice();
const getRandomPhotos = () => photos.slice().sort(() => Math.random() - 0.5).slice(0, FILTER_COUNT);
const getDiscussedPhotos = () => photos.slice().sort((a, b) => b.comments.length - a.comments.length);

// Перерисовка
const applyFilter = (filterId) => {
  clearPictures();

  let filteredPhotos;

  switch (filterId) {
    case 'filter-random':
      filteredPhotos = getRandomPhotos();
      break;
    case 'filter-discussed':
      filteredPhotos = getDiscussedPhotos();
      break;
    default:
      filteredPhotos = getDefaultPhotos();
  }

  renderPictures(filteredPhotos);
};

// Debounce
const debouncedApplyFilter = debounce(applyFilter, DEBOUNCE_DELAY);

// Обработчик клика
const onFilterClick = (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  const activeButton = filtersContainer.querySelector('.img-filters__button--active');
  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }

  evt.target.classList.add('img-filters__button--active');

  debouncedApplyFilter(evt.target.id);
};

// Инициализация
const initFilters = (loadedPhotos) => {
  photos = loadedPhotos.slice();
  imgFilters.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', onFilterClick);
};

export { initFilters };
