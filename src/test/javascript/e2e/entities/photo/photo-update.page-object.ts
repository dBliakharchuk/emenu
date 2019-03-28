import { element, by, ElementFinder } from 'protractor';

export default class PhotoUpdatePage {
  pageTitle: ElementFinder = element(by.id('emenuApp.photo.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idPhotoInput: ElementFinder = element(by.css('input#photo-idPhoto'));
  titleInput: ElementFinder = element(by.css('input#photo-title'));
  descriptionInput: ElementFinder = element(by.css('input#photo-description'));
  imageInput: ElementFinder = element(by.css('input#file_image'));
  heightInput: ElementFinder = element(by.css('input#photo-height'));
  widthInput: ElementFinder = element(by.css('input#photo-width'));
  takenInput: ElementFinder = element(by.css('input#photo-taken'));
  uploadedInput: ElementFinder = element(by.css('input#photo-uploaded'));
  restaurantSelect: ElementFinder = element(by.css('select#photo-restaurant'));
  dishSelect: ElementFinder = element(by.css('select#photo-dish'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdPhotoInput(idPhoto) {
    await this.idPhotoInput.sendKeys(idPhoto);
  }

  async getIdPhotoInput() {
    return this.idPhotoInput.getAttribute('value');
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

  async setHeightInput(height) {
    await this.heightInput.sendKeys(height);
  }

  async getHeightInput() {
    return this.heightInput.getAttribute('value');
  }

  async setWidthInput(width) {
    await this.widthInput.sendKeys(width);
  }

  async getWidthInput() {
    return this.widthInput.getAttribute('value');
  }

  async setTakenInput(taken) {
    await this.takenInput.sendKeys(taken);
  }

  async getTakenInput() {
    return this.takenInput.getAttribute('value');
  }

  async setUploadedInput(uploaded) {
    await this.uploadedInput.sendKeys(uploaded);
  }

  async getUploadedInput() {
    return this.uploadedInput.getAttribute('value');
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
