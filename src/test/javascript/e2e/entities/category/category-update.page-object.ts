import { element, by, ElementFinder } from 'protractor';

export default class CategoryUpdatePage {
  pageTitle: ElementFinder = element(by.id('emenuApp.category.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idCategoryInput: ElementFinder = element(by.css('input#category-idCategory'));
  nameInput: ElementFinder = element(by.css('input#category-name'));
  descriptionInput: ElementFinder = element(by.css('input#category-description'));
  menuSelect: ElementFinder = element(by.css('select#category-menu'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdCategoryInput(idCategory) {
    await this.idCategoryInput.sendKeys(idCategory);
  }

  async getIdCategoryInput() {
    return this.idCategoryInput.getAttribute('value');
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

  async menuSelectLastOption() {
    await this.menuSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async menuSelectOption(option) {
    await this.menuSelect.sendKeys(option);
  }

  getMenuSelect() {
    return this.menuSelect;
  }

  async getMenuSelectedOption() {
    return this.menuSelect.element(by.css('option:checked')).getText();
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
