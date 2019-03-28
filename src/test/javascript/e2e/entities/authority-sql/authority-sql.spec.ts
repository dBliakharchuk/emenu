/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AuthoritySqlComponentsPage from './authority-sql.page-object';
import { AuthoritySqlDeleteDialog } from './authority-sql.page-object';
import AuthoritySqlUpdatePage from './authority-sql-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('AuthoritySql e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let authoritySqlUpdatePage: AuthoritySqlUpdatePage;
  let authoritySqlComponentsPage: AuthoritySqlComponentsPage;
  let authoritySqlDeleteDialog: AuthoritySqlDeleteDialog;

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

  it('should load AuthoritySqls', async () => {
    await navBarPage.getEntityPage('authority-sql');
    authoritySqlComponentsPage = new AuthoritySqlComponentsPage();
    expect(await authoritySqlComponentsPage.getTitle().getText()).to.match(/Authority Sqls/);
  });

  it('should load create AuthoritySql page', async () => {
    await authoritySqlComponentsPage.clickOnCreateButton();
    authoritySqlUpdatePage = new AuthoritySqlUpdatePage();
    expect(await authoritySqlUpdatePage.getPageTitle().getAttribute('id')).to.match(/emenuApp.authoritySql.home.createOrEditLabel/);
  });

  it('should create and save AuthoritySqls', async () => {
    const nbButtonsBeforeCreate = await authoritySqlComponentsPage.countDeleteButtons();

    await authoritySqlUpdatePage.setNameInput('name');
    expect(await authoritySqlUpdatePage.getNameInput()).to.match(/name/);
    // authoritySqlUpdatePage.userSelectLastOption();
    await waitUntilDisplayed(authoritySqlUpdatePage.getSaveButton());
    await authoritySqlUpdatePage.save();
    await waitUntilHidden(authoritySqlUpdatePage.getSaveButton());
    expect(await authoritySqlUpdatePage.getSaveButton().isPresent()).to.be.false;

    await authoritySqlComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await authoritySqlComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last AuthoritySql', async () => {
    await authoritySqlComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await authoritySqlComponentsPage.countDeleteButtons();
    await authoritySqlComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    authoritySqlDeleteDialog = new AuthoritySqlDeleteDialog();
    expect(await authoritySqlDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/emenuApp.authoritySql.delete.question/);
    await authoritySqlDeleteDialog.clickOnConfirmButton();

    await authoritySqlComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await authoritySqlComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
