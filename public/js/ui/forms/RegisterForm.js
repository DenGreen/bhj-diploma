/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm{
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.register(options, (err, response) =>{
      let form = document.getElementById('register-form');
      
      if (response.success) {
        form.reset();
        App.setState('user-logged');
        let modal = App.getModal('register');
        modal.close();
      } else {
        form.reset();
        alert(response.error);
      }
    })
      
  }
}
