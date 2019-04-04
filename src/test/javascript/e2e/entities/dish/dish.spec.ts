/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DishComponentsPage from './dish.page-object';
import { DishDeleteDialog } from './dish.page-object';
import DishUpdatePage from './dish-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Dish e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dishUpdatePage: DishUpdatePage;
  let dishComponentsPage: DishComponentsPage;
  let dishDeleteDialog: DishDeleteDialog;

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

  it('should load Dishes', async () => {
    await navBarPage.getEntityPage('dish');
    dishComponentsPage = new DishComponentsPage();
    expect(await dishComponentsPage.getTitle().getText()).to.match(/Dishes/);
  });

  it('should load create Dish page', async () => {
    await dishComponentsPage.clickOnCreateButton();
    dishUpdatePage = new DishUpdatePage();
    expect(await dishUpdatePage.getPageTitle().getAttribute('id')).to.match(/emenuApp.dish.home.createOrEditLabel/);
  });

  it('should create and save Dishes', async () => {
    const nbButtonsBeforeCreate = await dishComponentsPage.countDeleteButtons();

    await dishUpdatePage.setNameInput('name');
    expect(await dishUpdatePage.getNameInput()).to.match(/name/);
    await dishUpdatePage.setDescriptionInput('description');
    expect(await dishUpdatePage.getDescriptionInput()).to.match(/description/);
    await dishUpdatePage.setPriceInput('5');
    expect(await dishUpdatePage.getPriceInput()).to.eq('5');
    await dishUpdatePage.categorySelectLastOption();
    await waitUntilDisplayed(dishUpdatePage.getSaveButton());
    await dishUpdatePage.save();
    await waitUntilHidden(dishUpdatePage.getSaveButton());
    expect(await dishUpdatePage.getSaveButton().isPresent()).to.be.false;

    await dishComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await dishComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Dish', async () => {
    await dishComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await dishComponentsPage.countDeleteButtons();
    await dishComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    dishDeleteDialog = new DishDeleteDialog();
    expect(await dishDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/emenuApp.dish.delete.question/);
    await dishDeleteDialog.clickOnConfirmButton();

    await dishComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await dishComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
