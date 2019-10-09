import { element, by, ElementFinder } from 'protractor';

export default class IngredientToDishUpdatePage {
  pageTitle: ElementFinder = element(by.id('emenuApp.ingredientToDish.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  unitInput: ElementFinder = element(by.css('input#ingredient-to-dish-unit'));
  weightInput: ElementFinder = element(by.css('input#ingredient-to-dish-weight'));
  isMainInput: ElementFinder = element(by.css('input#ingredient-to-dish-isMain'));
  isHiddenInput: ElementFinder = element(by.css('input#ingredient-to-dish-isHidden'));
  toIngredientSelect: ElementFinder = element(by.css('select#ingredient-to-dish-toIngredient'));
  toDishSelect: ElementFinder = element(by.css('select#ingredient-to-dish-toDish'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUnitInput(unit) {
    await this.unitInput.sendKeys(unit);
  }

  async getUnitInput() {
    return this.unitInput.getAttribute('value');
  }

  async setWeightInput(weight) {
    await this.weightInput.sendKeys(weight);
  }

  async getWeightInput() {
    return this.weightInput.getAttribute('value');
  }

  getIsMainInput() {
    return this.isMainInput;
  }
  getIsHiddenInput() {
    return this.isHiddenInput;
  }
  async toIngredientSelectLastOption() {
    await this.toIngredientSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async toIngredientSelectOption(option) {
    await this.toIngredientSelect.sendKeys(option);
  }

  getToIngredientSelect() {
    return this.toIngredientSelect;
  }

  async getToIngredientSelectedOption() {
    return this.toIngredientSelect.element(by.css('option:checked')).getText();
  }

  async toDishSelectLastOption() {
    await this.toDishSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async toDishSelectOption(option) {
    await this.toDishSelect.sendKeys(option);
  }

  getToDishSelect() {
    return this.toDishSelect;
  }

  async getToDishSelectedOption() {
    return this.toDishSelect.element(by.css('option:checked')).getText();
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
