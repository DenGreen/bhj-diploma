/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  let errorCritical;
  let xhr = new XMLHttpRequest();
  let formData = new FormData();

  if (options.method === "GET") {
    options.url += `?`;

    for (let elementData in options.data) {
      options.url += `${elementData}=${options.data.elementData}&`;
    }
  } else {
    for (let elementData in options.data) {
      formData.append(elementData, options.data[elementData]);
    }
  }

  try {
    xhr.open(options.method, options.url);
    xhr.withCredentials = true;
    xhr.responseType = options.responseType;
    errorCritical = null;
  } catch (e) {
    errorCritical = e;
    options.callback(erorrCritical, xhr.response);
  }

  xhr.send(formData);

  xhr.onloadend = function () {
    if (xhr.status === 200 && xhr.response.success === true) {
      options.callback(errorCritical, xhr.response);
      return true;
    } else {
      options.callback(errorCritical, xhr.response);
      return false;
    }
  };
};
