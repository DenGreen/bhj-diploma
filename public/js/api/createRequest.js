/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.responseType = options.responseType ? options.responseType  : 'text';

  if (options.method === "GET") {
    try {
      xhr.open(
        "GET",
        `${options.url}?mail=${options.data.mail}&password=${options.data.password}`
      );
      xhr.send();
    } catch (e) {
      options.callback(e);
    }
  } else {
    formData = new FormData();

    formData.append("password", `${options.data.mail}`);
    options.data.password ? formData.append("password", `${options.data.password}`):null;
    try {
      xhr.open("POST", `${options.url}`);
      xhr.send(formData);
    } catch (e) {
      options.callback(e);
    }
  }
  return xhr;
};