/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    if (!element) {
      throw new Error("Передан пустой элемент в конструктор");
    }
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list({}, (err, response) => {
      let accountsSelect = this.element.querySelector(".accounts-select");

      accountsSelect.innerHTML = "";

      response.data.forEach((e) => {
        accountsSelect.insertAdjacentHTML(
          "beforeend",
          `<option value="${e.id}">${e.name}</option>`
        );
      });
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    Transaction.create(options, (err, response) => {
      this.element.reset();
      App.update();
      App.getModal("newIncome").close();
      App.getModal("newExpense").close();
    });
  }
}
