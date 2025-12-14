// Функция для проверки, нажата ли клавиша Escape
const isEscapeKey = (evt) => evt.key === 'Escape';


// Функция для склонения слов в зависимости от числа
const numDecline = (num, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[Math.min(num % 10, 5)]];
};

export {isEscapeKey, numDecline};
