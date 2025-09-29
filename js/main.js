const PHOTOS_COUNT = 25;

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём', 'София', 'Дмитрий', 'Мария', 'Иван',
  'Александр', 'Екатерина', 'Олег', 'Анна', 'Никита',
  'Виктория', 'Сергей', 'Полина', 'Максим', 'Алиса'
];

const LIKES = {
  MIN: 15,
  MAX: 200
};

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createUniqueRandomGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (arr) => arr[createUniqueRandomGenerator(0, arr.length - 1)];

let commentIdCounter = 1;

const generateComment = () => {
  const messageCount = getRandomInteger(1, 2);
  let message = '';
  for (let i = 0; i < messageCount; i++) {
    if (i > 0) {message += ' ';}
    message += getRandomArrayElement(COMMENT_MESSAGES);
  }

  return {
    id: commentIdCounter++,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: message,
    name: getRandomArrayElement(NAMES),
  };
};

const generateComments = () => {
  const commentsCount = getRandomInteger(0, 30);
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    comments.push(generateComment());
  }
  return comments;
};

const generatePhoto = () => {
  const id = createUniqueRandomGenerator(1,25);
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Это фотография номер ${id}`,
    likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
    comments: generateComments(),
  };
};

const generatePhotos = () => {
  const photos = [];
  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    photos.push(generatePhoto(i));
  }
  return photos;
};

const kekstagram = Array.from({length: PHOTOS_COUNT}, generatePhotos);
