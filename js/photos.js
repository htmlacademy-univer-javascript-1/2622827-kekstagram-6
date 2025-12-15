import {loadData} from './fetch.js';


const getPhotosArray = async () => {
  const photos = await loadData();
  return photos;
};

export {getPhotosArray };
