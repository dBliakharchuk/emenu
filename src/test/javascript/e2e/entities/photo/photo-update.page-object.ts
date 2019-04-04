import { element, by, ElementFinder } from 'protractor';

export default class PhotoUpdatePage {
  pageTitle: ElementFinder = element(by.id('emenuApp.photo.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#photo-title'));
  descriptionInput: ElementFinder = element(by.css('input#photo-description'));
  imageInput: ElementFinder = element(by.css('input#file_image'));
  restaurantSelect: ElementFinder = element(by.css('select#photo-restaurant'));
  dishSelect: ElementFinder = element(by.css('select#photo-dish'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
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

  async dishSelectLastOption() {
    await this.dishSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async dishSelectOption(option) {
    await this.dishSelect.sendKeys(option);
  }

  getDishSelect() {
    return this.dishSelect;
  }

  async getDishSelectedOption() {
    return this.dishSelect.element(by.css('option:checked')).getText();
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
