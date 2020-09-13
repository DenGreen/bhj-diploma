/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(options) {
    User.login(options, (err, response) => {
      let form = document.getElementById("login-form");
      
      if (response.success) {
        form.reset();
        App.setState("user-logged");
        let modal = App.getModal("login");
        modal.close();
      } else {
        form.reset();
        alert(response.error);
      }
    });
  }
}
