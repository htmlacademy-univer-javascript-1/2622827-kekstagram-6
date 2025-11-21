import {getRandomInteger, getRandomArrayElement} from './util.js';
import {generateComments} from './comments.js';
import {LIKES, PHOTOS_COUNT, DESCRIPTIONS} from './data.js';

const createUniquePhotoIds = () => {
  const ids = [];
  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    ids.push(i);
  }
  return ids.sort(() => Math.random() - 0.5);
};

// Создаем массив уникальных ID один раз
const photoIds = createUniquePhotoIds();

//Функция генерации массива фотографий
const generatePhoto = (_, index) => ({
  id: photoIds[index],
  url:  `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
  comments: generateComments()
});

const getPhotosArray = () => Array.from({length: PHOTOS_COUNT}, generatePhoto);

export {getPhotosArray };
