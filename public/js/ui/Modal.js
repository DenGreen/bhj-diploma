/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element){
      this.element = element;
    } else {
      throw new Error("Передан пустой элемент в конструктор");
    }
    this.registerEvents();
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    const dataModal = this.element.querySelectorAll('button');
    dataModal.forEach(elementModal => {
      if(elementModal.dataset.dismiss === 'modal'){
        elementModal.addEventListener('click', (e)=>{
          this.onClose(e);
        })
      }
    });
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( e ) {
    e.preventDefault();
    this.close();
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    const dataModal = this.element.querySelectorAll('button');
    dataModal.forEach(elementModal => {
      if(elementModal.dataset.dismiss === 'modal'){
        elementModal.removeEventListener('click', (e)=>{
          this.onClose(e);
        })
      }
    });
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.setAttribute("style", "display:block;");
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.setAttribute("style", "display:none;");
  }
}
