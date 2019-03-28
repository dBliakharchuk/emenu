import { element, by, ElementFinder } from 'protractor';

export default class MenuUpdatePage {
  pageTitle: ElementFinder = element(by.id('emenuApp.menu.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idMenuInput: ElementFinder = element(by.css('input#menu-idMenu'));
  nameInput: ElementFinder = element(by.css('input#menu-name'));
  descriptionInput: ElementFinder = element(by.css('input#menu-description'));
  imageInput: ElementFinder = element(by.css('input#file_image'));
  restaurantSelect: ElementFinder = element(by.css('select#menu-restaurant'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdMenuInput(idMenu) {
    await this.idMenuInput.sendKeys(idMenu);
  }

  async getIdMenuInput() {
    return this.idMenuInput.getAttribute('value');
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

  async restaurantSelectLastOption() {
    await this.restaurantSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async restaurantSelectOption(option) {
    await this.restaurantSelect.sendKeys(option);
  }

  getRestaurantSelect() {
    return this.restaurantSelect;
  }

  async getRestaurantSelectedOption() {
    return this.restaurantSelect.element(by.css('option:checked')).getText();
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
