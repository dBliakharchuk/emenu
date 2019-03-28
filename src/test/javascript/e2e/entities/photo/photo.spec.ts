/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PhotoComponentsPage from './photo.page-object';
import { PhotoDeleteDialog } from './photo.page-object';
import PhotoUpdatePage from './photo-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Photo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let photoUpdatePage: PhotoUpdatePage;
  let photoComponentsPage: PhotoComponentsPage;
  let photoDeleteDialog: PhotoDeleteDialog;
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

  it('should load Photos', async () => {
    await navBarPage.getEntityPage('photo');
    photoComponentsPage = new PhotoComponentsPage();
    expect(await photoComponentsPage.getTitle().getText()).to.match(/Photos/);
  });

  it('should load create Photo page', async () => {
    await photoComponentsPage.clickOnCreateButton();
    photoUpdatePage = new PhotoUpdatePage();
    expect(await photoUpdatePage.getPageTitle().getAttribute('id')).to.match(/emenuApp.photo.home.createOrEditLabel/);
  });

  it('should create and save Photos', async () => {
    const nbButtonsBeforeCreate = await photoComponentsPage.countDeleteButtons();

    await photoUpdatePage.setIdPhotoInput('5');
    expect(await photoUpdatePage.getIdPhotoInput()).to.eq('5');
    await photoUpdatePage.setTitleInput('title');
    expect(await photoUpdatePage.getTitleInput()).to.match(/title/);
    await photoUpdatePage.setDescriptionInput('description');
    expect(await photoUpdatePage.getDescriptionInput()).to.match(/description/);
    await photoUpdatePage.setImageInput(absolutePath);
    await photoUpdatePage.setHeightInput('5');
    expect(await photoUpdatePage.getHeightInput()).to.eq('5');
    await photoUpdatePage.setWidthInput('5');
    expect(await photoUpdatePage.getWidthInput()).to.eq('5');
    await photoUpdatePage.setTakenInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await photoUpdatePage.getTakenInput()).to.contain('2001-01-01T02:30');
    await photoUpdatePage.setUploadedInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await photoUpdatePage.getUploadedInput()).to.contain('2001-01-01T02:30');
    await photoUpdatePage.restaurantSelectLastOption();
    await photoUpdatePage.dishSelectLastOption();
    await waitUntilDisplayed(photoUpdatePage.getSaveButton());
    await photoUpdatePage.save();
    await waitUntilHidden(photoUpdatePage.getSaveButton());
    expect(await photoUpdatePage.getSaveButton().isPresent()).to.be.false;

    await photoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await photoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Photo', async () => {
    await photoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await photoComponentsPage.countDeleteButtons();
    await photoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    photoDeleteDialog = new PhotoDeleteDialog();
    expect(await photoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/emenuApp.photo.delete.question/);
    await photoDeleteDialog.clickOnConfirmButton();

    await photoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await photoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
