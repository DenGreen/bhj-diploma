/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static URL = "/user";

  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return localStorage.user && JSON.parse(localStorage.user);
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = (f) => f) {
    createRequest({
      url: this.URL + "/current",
      data: data,
      method: "GET",
      responseType: "json",
      callback: (err, response) => {
        if (response.user) {
          User.setCurrent(response.user);
        } else {
          User.unsetCurrent();
        }
        callback(err, response);
      },
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = (f) => f) {
    let a = {
      url: this.URL + "/login",
      data: data,
      method: `POST`,
      responseType: "json",
      callback: (err, response) => {
        if (response.success) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      }
    }
    console.log(a)
    createRequest({
      url: this.URL + "/login",
      data: data,
      method: `POST`,
      responseType: "json",
      callback: (err, response) => {
        if (response.success) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      },
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback = (f) => f) {
    console.log(this.URL)
    createRequest({
      url: this.URL + "/register",
      data: data,
      method: `POST`,
      responseType: "json",
      callback: (err, response) => {
        if (response.success) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      },
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = (f) => f) {
    return createRequest({
      url: this.URL + "/logout",
      data: data,
      method: `POST`,
      responseType: "json",
      callback: (err, response) => {
        if (response.success) {
          User.unsetCurrent();
        }
        callback(err, response);
      },
    });
  }
}
