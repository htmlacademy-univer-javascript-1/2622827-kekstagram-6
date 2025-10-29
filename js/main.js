import { getPhotosArray } from './photos.js';
import { renderPictures } from './render-pictures.js';

const photos = getPhotosArray();

renderPictures(photos);
