/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import IngredientComponentsPage from './ingredient.page-object';
import { IngredientDeleteDialog } from './ingredient.page-object';
import IngredientUpdatePage from './ingredient-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Ingredient e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ingredientUpdatePage: IngredientUpdatePage;
  let ingredientComponentsPage: IngredientComponentsPage;
  let ingredientDeleteDialog: IngredientDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Ingredients', async () => {
    await navBarPage.getEntityPage('ingredient');
    ingredientComponentsPage = new IngredientComponentsPage();
    expect(await ingredientComponentsPage.getTitle().getText()).to.match(/Ingredients/);
  });

  it('should load create Ingredient page', async () => {
    await ingredientComponentsPage.clickOnCreateButton();
    ingredientUpdatePage = new IngredientUpdatePage();
    expect(await ingredientUpdatePage.getPageTitle().getAttribute('id')).to.match(/emenuApp.ingredient.home.createOrEditLabel/);
  });

  it('should create and save Ingredients', async () => {
    const nbButtonsBeforeCreate = await ingredientComponentsPage.countDeleteButtons();

    await ingredientUpdatePage.setNameInput('name');
    expect(await ingredientUpdatePage.getNameInput()).to.match(/name/);
    const selectedIsAllergic = await ingredientUpdatePage.getIsAllergicInput().isSelected();
    if (selectedIsAllergic) {
      await ingredientUpdatePage.getIsAllergicInput().click();
      expect(await ingredientUpdatePage.getIsAllergicInput().isSelected()).to.be.false;
    } else {
      await ingredientUpdatePage.getIsAllergicInput().click();
      expect(await ingredientUpdatePage.getIsAllergicInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(ingredientUpdatePage.getSaveButton());
    await ingredientUpdatePage.save();
    await waitUntilHidden(ingredientUpdatePage.getSaveButton());
    expect(await ingredientUpdatePage.getSaveButton().isPresent()).to.be.false;

    await ingredientComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await ingredientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Ingredient', async () => {
    await ingredientComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await ingredientComponentsPage.countDeleteButtons();
    await ingredientComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    ingredientDeleteDialog = new IngredientDeleteDialog();
    expect(await ingredientDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/emenuApp.ingredient.delete.question/);
    await ingredientDeleteDialog.clickOnConfirmButton();

    await ingredientComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await ingredientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
