
const lengthString = function (string, maxLength) {
  return String.Length(string) <= maxLength;
};

const isPalindrome = function (string) {
  const cleanedStr = string.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversedStr = cleanedStr.split('').reverse().join('');
  return cleanedStr === reversedStr;
};

lengthString('проверяемая строка', 20);
isPalindrome('топот');
