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
      this.element.account_id.innerHTML = '';
      for (let account of response.data) {
        this.element.account_id.innerHTML += `<option value="${account.id}">${account.name}</option>`;
      }
    })

    /*Account.list({}, (err, response) => {
      if (response.success) {
        response.data.forEach((e) => {
          this.element
            .querySelector(".accounts-select")
            .insertAdjacentHTML(
              "beforeend",
              `<option value="${e.user_id}">${e.name}</option>`
            );
        });
      } else {
        alert(response.error);
      }
    });*/
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    Transaction.create(options, (err, response) => {
      if (response.success) {
        this.element.reset();
        App.update();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
      } else {
        alert(response.error);
      }
    });
  }
}
