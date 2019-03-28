import { element, by, ElementFinder } from 'protractor';

export default class RestaurantUpdatePage {
  pageTitle: ElementFinder = element(by.id('emenuApp.restaurant.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idRestaurantInput: ElementFinder = element(by.css('input#restaurant-idRestaurant'));
  nameInput: ElementFinder = element(by.css('input#restaurant-name'));
  descriptionInput: ElementFinder = element(by.css('input#restaurant-description'));
  idRestaurantSelect: ElementFinder = element(by.css('select#restaurant-idRestaurant'));
  userSelect: ElementFinder = element(by.css('select#restaurant-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdRestaurantInput(idRestaurant) {
    await this.idRestaurantInput.sendKeys(idRestaurant);
  }

  async getIdRestaurantInput() {
    return this.idRestaurantInput.getAttribute('value');
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

  async idRestaurantSelectLastOption() {
    await this.idRestaurantSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async idRestaurantSelectOption(option) {
    await this.idRestaurantSelect.sendKeys(option);
  }

  getIdRestaurantSelect() {
    return this.idRestaurantSelect;
  }

  async getIdRestaurantSelectedOption() {
    return this.idRestaurantSelect.element(by.css('option:checked')).getText();
  }

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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
