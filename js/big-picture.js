import { isEscapeKey} from './util.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
if (!bigPicture) {
  throw new Error('Element .big-picture not found');
}

const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const pictureCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const loadButton = bigPicture.querySelector('.comments-loader');
const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');

let commentsCount = COMMENTS_STEP;
let currentComments = [];

const openModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const createComment = (comment) => {
  const newComment = document.createElement('li');
  newComment.className = 'social__comment';

  const avatar = document.createElement('img');
  avatar.className = 'social__picture';
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  avatar.width = 35;
  avatar.height = 35;

  const text = document.createElement('p');
  text.className = 'social__text';
  text.textContent = comment.message;

  newComment.appendChild(avatar);
  newComment.appendChild(text);

  return newComment;
};

const renderComments = () => {
  socialComments.innerHTML = '';

  const shownCount = Math.min(commentsCount, currentComments.length);

  commentsShownCount.textContent = shownCount;
  commentsTotalCount.textContent = currentComments.length;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < shownCount; i++) {
    fragment.appendChild(createComment(currentComments[i]));
  }

  socialComments.appendChild(fragment);

  if (shownCount >= currentComments.length) {
    loadButton.classList.add('hidden');
  } else {
    loadButton.classList.remove('hidden');
  }
};

const show = (picture) => {
  const { url, likes, description } = picture;
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  pictureCaption.textContent = description;
};

const OnLoadButtonClick = () => {
  commentsCount += COMMENTS_STEP;
  renderComments();
};

function OnBigPictureEscKeyDown(evt){
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

function closeBigPicture(){
  commentsCount = COMMENTS_STEP;
  document.removeEventListener('keydown', OnBigPictureEscKeyDown);

  closeModal();
}

const onCloseBigPictureClick = () => {
  closeBigPicture();
};

const showBidPicture = (picture) => {
  commentsCount = COMMENTS_STEP;
  currentComments = picture.comments.slice();

  show(picture);

  renderComments();

  document.addEventListener('keydown', OnBigPictureEscKeyDown);

  openModal();
};

loadButton.addEventListener('click', OnLoadButtonClick);
closeButton.addEventListener('click', onCloseBigPictureClick);

export {showBidPicture};
