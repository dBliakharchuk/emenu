import { element, by, ElementFinder } from 'protractor';

export default class DishUpdatePage {
  pageTitle: ElementFinder = element(by.id('emenuApp.dish.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idDishInput: ElementFinder = element(by.css('input#dish-idDish'));
  nameInput: ElementFinder = element(by.css('input#dish-name'));
  descriptionInput: ElementFinder = element(by.css('input#dish-description'));
  priceInput: ElementFinder = element(by.css('input#dish-price'));
  categorySelect: ElementFinder = element(by.css('select#dish-category'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdDishInput(idDish) {
    await this.idDishInput.sendKeys(idDish);
  }

  async getIdDishInput() {
    return this.idDishInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setPriceInput(price) {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput() {
    return this.priceInput.getAttribute('value');
  }

  async categorySelectLastOption() {
    await this.categorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async categorySelectOption(option) {
    await this.categorySelect.sendKeys(option);
  }

  getCategorySelect() {
    return this.categorySelect;
  }

  async getCategorySelectedOption() {
    return this.categorySelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}