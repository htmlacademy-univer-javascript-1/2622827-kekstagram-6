import { getPhotosArray } from './photos.js';
import { renderPictures } from './render-pictures.js';
import './form.js'; // Управление формой
import { initEffects } from './effects.js';
import { initScale } from './scale.js';

const photos = getPhotosArray();

renderPictures(photos);
initEffects();

document.addEventListener('DOMContentLoaded', () => {
  initScale();
});
