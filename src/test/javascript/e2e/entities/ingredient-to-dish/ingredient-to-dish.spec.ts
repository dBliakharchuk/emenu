/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import IngredientToDishComponentsPage from './ingredient-to-dish.page-object';
import { IngredientToDishDeleteDialog } from './ingredient-to-dish.page-object';
import IngredientToDishUpdatePage from './ingredient-to-dish-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('IngredientToDish e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ingredientToDishUpdatePage: IngredientToDishUpdatePage;
  let ingredientToDishComponentsPage: IngredientToDishComponentsPage;
  let ingredientToDishDeleteDialog: IngredientToDishDeleteDialog;

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

  it('should load IngredientToDishes', async () => {
    await navBarPage.getEntityPage('ingredient-to-dish');
    ingredientToDishComponentsPage = new IngredientToDishComponentsPage();
    expect(await ingredientToDishComponentsPage.getTitle().getText()).to.match(/Ingredient To Dishes/);
  });

  it('should load create IngredientToDish page', async () => {
    await ingredientToDishComponentsPage.clickOnCreateButton();
    ingredientToDishUpdatePage = new IngredientToDishUpdatePage();
    expect(await ingredientToDishUpdatePage.getPageTitle().getAttribute('id')).to.match(/emenuApp.ingredientToDish.home.createOrEditLabel/);
  });

  it('should create and save IngredientToDishes', async () => {
    const nbButtonsBeforeCreate = await ingredientToDishComponentsPage.countDeleteButtons();

    await ingredientToDishUpdatePage.setUnitInput('unit');
    expect(await ingredientToDishUpdatePage.getUnitInput()).to.match(/unit/);
    await ingredientToDishUpdatePage.setWeightInput('5');
    expect(await ingredientToDishUpdatePage.getWeightInput()).to.eq('5');
    const selectedIsMain = await ingredientToDishUpdatePage.getIsMainInput().isSelected();
    if (selectedIsMain) {
      await ingredientToDishUpdatePage.getIsMainInput().click();
      expect(await ingredientToDishUpdatePage.getIsMainInput().isSelected()).to.be.false;
    } else {
      await ingredientToDishUpdatePage.getIsMainInput().click();
      expect(await ingredientToDishUpdatePage.getIsMainInput().isSelected()).to.be.true;
    }
    const selectedIsHidden = await ingredientToDishUpdatePage.getIsHiddenInput().isSelected();
    if (selectedIsHidden) {
      await ingredientToDishUpdatePage.getIsHiddenInput().click();
      expect(await ingredientToDishUpdatePage.getIsHiddenInput().isSelected()).to.be.false;
    } else {
      await ingredientToDishUpdatePage.getIsHiddenInput().click();
      expect(await ingredientToDishUpdatePage.getIsHiddenInput().isSelected()).to.be.true;
    }
    await ingredientToDishUpdatePage.toIngredientSelectLastOption();
    await ingredientToDishUpdatePage.toDishSelectLastOption();
    await waitUntilDisplayed(ingredientToDishUpdatePage.getSaveButton());
    await ingredientToDishUpdatePage.save();
    await waitUntilHidden(ingredientToDishUpdatePage.getSaveButton());
    expect(await ingredientToDishUpdatePage.getSaveButton().isPresent()).to.be.false;

    await ingredientToDishComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await ingredientToDishComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last IngredientToDish', async () => {
    await ingredientToDishComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await ingredientToDishComponentsPage.countDeleteButtons();
    await ingredientToDishComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    ingredientToDishDeleteDialog = new IngredientToDishDeleteDialog();
    expect(await ingredientToDishDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/emenuApp.ingredientToDish.delete.question/);
    await ingredientToDishDeleteDialog.clickOnConfirmButton();

    await ingredientToDishComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await ingredientToDishComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
