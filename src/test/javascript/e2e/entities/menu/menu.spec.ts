/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MenuComponentsPage from './menu.page-object';
import { MenuDeleteDialog } from './menu.page-object';
import MenuUpdatePage from './menu-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Menu e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let menuUpdatePage: MenuUpdatePage;
  let menuComponentsPage: MenuComponentsPage;
  let menuDeleteDialog: MenuDeleteDialog;
  const fileToUpload = '../../../../../main/webapp/static/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);

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

  it('should load Menus', async () => {
    await navBarPage.getEntityPage('menu');
    menuComponentsPage = new MenuComponentsPage();
    expect(await menuComponentsPage.getTitle().getText()).to.match(/Menus/);
  });

  it('should load create Menu page', async () => {
    await menuComponentsPage.clickOnCreateButton();
    menuUpdatePage = new MenuUpdatePage();
    expect(await menuUpdatePage.getPageTitle().getAttribute('id')).to.match(/emenuApp.menu.home.createOrEditLabel/);
  });

  it('should create and save Menus', async () => {
    const nbButtonsBeforeCreate = await menuComponentsPage.countDeleteButtons();

    await menuUpdatePage.setNameInput('name');
    expect(await menuUpdatePage.getNameInput()).to.match(/name/);
    await menuUpdatePage.setDescriptionInput('description');
    expect(await menuUpdatePage.getDescriptionInput()).to.match(/description/);
    await menuUpdatePage.setImageInput(absolutePath);
    await menuUpdatePage.setImageContentInput('imageContent');
    expect(await menuUpdatePage.getImageContentInput()).to.match(/imageContent/);
    await menuUpdatePage.restaurantSelectLastOption();
    await waitUntilDisplayed(menuUpdatePage.getSaveButton());
    await menuUpdatePage.save();
    await waitUntilHidden(menuUpdatePage.getSaveButton());
    expect(await menuUpdatePage.getSaveButton().isPresent()).to.be.false;

    await menuComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await menuComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Menu', async () => {
    await menuComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await menuComponentsPage.countDeleteButtons();
    await menuComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    menuDeleteDialog = new MenuDeleteDialog();
    expect(await menuDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/emenuApp.menu.delete.question/);
    await menuDeleteDialog.clickOnConfirmButton();

    await menuComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await menuComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
