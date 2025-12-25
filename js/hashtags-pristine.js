const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20; // включая #

let lastHashtagError = '';
let lastCommentError = '';

function validateHashtags(value) {
  lastHashtagError = '';

  const text = (value || '').trim().toLowerCase();

  if (text.length === 0) {return true;}

  const tags = text.split(/\s+/).filter(Boolean);

  const rules = [
    {
      check: tags.some((item) => item === '#'),
      error: 'Хэш-тег не может состоять только из символа #',
    },
    {
      check: tags.some((item) => !item.startsWith('#')),
      error: 'Хэш-тег должен начинаться с символа #',
    },
    {
      check: tags.some((item) => item.indexOf('#', 1) !== -1),
      error: 'Хэш-теги должны разделяться пробелами',
    },
    {
      check: tags.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина хэш-тега — ${MAX_SYMBOLS} символов (включая #)`,
    },
    {
      check: tags.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэш-тег содержит недопустимые символы',
    },
    {
      check: tags.some((item, i, arr) => arr.indexOf(item, i + 1) !== -1),
      error: 'Хэш-теги не должны повторяться',
    },
    {
      check: tags.length > MAX_HASHTAGS,
      error: `Максимальное количество хэш-тегов — ${MAX_HASHTAGS}`,
    },
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
  lastCommentError = '';
  const text = (value || '').trim();

  if (text.length <= 140) {
    return true;
  }

  lastCommentError = 'Максимальная длина комментария 140 символов';
  return false;
}

function getCommentErrorMessage() {
  return lastCommentError || '';
}

export {
  validateHashtags,
  validateComment,
  getHashtagErrorMessage,
  getCommentErrorMessage
};
