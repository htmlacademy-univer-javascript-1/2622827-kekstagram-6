const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;
const MAX_COMMENT_LENGTH = 140;

let lastHashtagError = '';
let lastCommentError = '';

function validateHashtags(value) {
  lastHashtagError = '';

  const text = (value || '').trim().toLowerCase();
  if (!text) {return true;}

  const tags = text.split(/\s+/).filter(Boolean);

  const rules = [
    { check: tags.some((tag) => tag === '#'), error: 'Хэш-тег не может состоять только из символа #' },
    { check: tags.some((tag) => !tag.startsWith('#')), error: 'Хэш-тег должен начинаться с символа #' },
    { check: tags.some((tag) => tag.indexOf('#', 1) !== -1), error: 'Хэш-теги должны разделяться пробелами' },
    { check: tags.some((tag) => tag.length > MAX_SYMBOLS), error: `Максимальная длина хэш-тега — ${MAX_SYMBOLS} символов (включая #)` },
    { check: tags.some((tag) => !/^#[a-zа-яё0-9]{1,19}$/i.test(tag)), error: 'Хэш-тег содержит недопустимые символы' },
    { check: tags.some((tag, i, arr) => arr.indexOf(tag, i + 1) !== -1), error: 'Хэш-теги не должны повторяться' },
    { check: tags.length > MAX_HASHTAGS, error: `Максимальное количество хэш-тегов — ${MAX_HASHTAGS}` },
  ];

  for (const rule of rules) {
    if (rule.check) {
      lastHashtagError = rule.error;
      return false;
    }
  }

  return true;
}

function getHashtagErrorMessage() {
  return lastHashtagError || '';
}

function validateComment(value) {
  const text = value || '';
  if (text.length > MAX_COMMENT_LENGTH) {
    lastCommentError = `Максимальная длина комментария — ${MAX_COMMENT_LENGTH} символов`;
    return false;
  }
  return true;
}

function getCommentErrorMessage() {
  return lastCommentError;
}


export {
  validateHashtags,
  validateComment,
  getHashtagErrorMessage,
  getCommentErrorMessage
};
