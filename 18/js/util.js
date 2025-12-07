// Функция для генерации случайного числа в диапазоне
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция получения случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция для генерации уникального ID
const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

// Функция для проверки, нажата ли клавиша Escape
const isEscapeKey = (evt) => evt.key === 'Escape';


// Функция для склонения слов в зависимости от числа
const numDecline = (num, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[Math.min(num % 10, 5)]];
};

export {getRandomInteger, getRandomArrayElement, createIdGenerator, isEscapeKey, numDecline};
