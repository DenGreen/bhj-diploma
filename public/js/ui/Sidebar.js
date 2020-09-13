
/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const body = document.querySelector('body');

    sidebarToggle.addEventListener('click', (e)=>{
      e.preventDefault();
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const menuItemLogin = document.querySelector('.menu-item_login');
    const menuItemRegister = document.querySelector('.menu-item_register');
    const menuItemLogout = document.querySelector('.menu-item_logout');
    let element=0;

    menuItemLogin.addEventListener('click', function(){
      element = App.getModal('login');
      element.open();
    });

    menuItemRegister.addEventListener('click', function(){
      element = App.getModal('register');
      element.open();
    });

    menuItemLogout.addEventListener('click', function(){
      User.logout(User.current(), (err, response) => {
        if(response.success){
          App.setState( 'init' );
        }
      });
    })
    

  }

}
