import { element, by, ElementFinder } from 'protractor';

export default class RestaurantUpdatePage {
  pageTitle: ElementFinder = element(by.id('emenuApp.restaurant.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#restaurant-name'));
  descriptionInput: ElementFinder = element(by.css('input#restaurant-description'));
  imageInput: ElementFinder = element(by.css('input#file_image'));
  idLocationSelect: ElementFinder = element(by.css('select#restaurant-idLocation'));
  userSelect: ElementFinder = element(by.css('select#restaurant-user'));

  getPageTitle() {
    return this.pageTitle;
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

  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return this.imageInput.getAttribute('value');
  }

  async idLocationSelectLastOption() {
    await this.idLocationSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async idLocationSelectOption(option) {
    await this.idLocationSelect.sendKeys(option);
  }

  getIdLocationSelect() {
    return this.idLocationSelect;
  }

  async getIdLocationSelectedOption() {
    return this.idLocationSelect.element(by.css('option:checked')).getText();
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
