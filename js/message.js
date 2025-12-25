const DATA_ERROR_TIME = 5000;

const showDataError = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const dataErrorElement = dataErrorTemplate.cloneNode(true);

  document.body.append(dataErrorElement);

  // Удаляем через 5 секунд
  setTimeout(() => {
    dataErrorElement.remove();
  }, DATA_ERROR_TIME);
};

export { showDataError };
