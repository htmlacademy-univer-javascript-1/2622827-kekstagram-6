import { getPhotosArray } from './photos.js';
import { renderPictures } from './render-pictures.js';
import './form.js'; // Управление формой

const photos = getPhotosArray();

renderPictures(photos);
