import {getRandomArrayElement, getRandomInteger} from './util.js';
import {COMMENT_MESSAGES, NAMES} from './data.js';

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

export {generateComments};
