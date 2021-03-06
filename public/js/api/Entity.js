/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */

  static URL='';
  static list(data, callback = (f) => f) {
    return createRequest({
      data:data,
      url: this.URL,
      method: "GET",
      responseType: "json",
      callback,
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback = (f) => f) {
    let modifiedData = Object.assign({ _method: 'PUT' }, data );
    return createRequest({
      url: `${this.URL}`,
      data: modifiedData,
      method: "POST",
      responseType: "json",
      callback,
    });
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id = "", data, callback = (f) => f) {
    return createRequest({
      url: `${this.URL}/${id}`,
      data: data,
      method: "GET",
      responseType: "json",
      callback,
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id = "", data, callback = (f) => f) {
    let modifiedData = Object.assign({ _method: 'DELETE', id: id }, data );
    return createRequest({
      url: `${this.URL}`,
      data: modifiedData,
      method: "POST",
      responseType: "json",
      callback,
    });
  }
}
