import { element, by, ElementFinder } from 'protractor';

export default class IngredientUpdatePage {
  pageTitle: ElementFinder = element(by.id('emenuApp.ingredient.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#ingredient-name'));
  isAllergicInput: ElementFinder = element(by.css('input#ingredient-isAllergic'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  getIsAllergicInput() {
    return this.isAllergicInput;
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
