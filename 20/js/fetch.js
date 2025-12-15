const API_URLS = {
  GET: 'https://29.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://29.javascript.htmlacademy.pro/kekstagram',
};

// Универсальный запрос
const sendRequest = (onSuccess, onError, method = 'GET', body = null) => {
  fetch(API_URLS[method], {
    method: method,
    body: body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
};

const loadData = (onSuccess, onError) => sendRequest(onSuccess, onError, 'GET');
const uploadData = (body, onSuccess, onError) => sendRequest(onSuccess, onError, 'POST', body);

export { loadData, uploadData };
