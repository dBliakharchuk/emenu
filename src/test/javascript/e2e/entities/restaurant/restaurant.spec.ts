/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RestaurantComponentsPage from './restaurant.page-object';
import { RestaurantDeleteDialog } from './restaurant.page-object';
import RestaurantUpdatePage from './restaurant-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Restaurant e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let restaurantUpdatePage: RestaurantUpdatePage;
  let restaurantComponentsPage: RestaurantComponentsPage;
  let restaurantDeleteDialog: RestaurantDeleteDialog;

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

  it('should load Restaurants', async () => {
    await navBarPage.getEntityPage('restaurant');
    restaurantComponentsPage = new RestaurantComponentsPage();
    expect(await restaurantComponentsPage.getTitle().getText()).to.match(/Restaurants/);
  });

  it('should load create Restaurant page', async () => {
    await restaurantComponentsPage.clickOnCreateButton();
    restaurantUpdatePage = new RestaurantUpdatePage();
    expect(await restaurantUpdatePage.getPageTitle().getAttribute('id')).to.match(/emenuApp.restaurant.home.createOrEditLabel/);
  });

  it('should create and save Restaurants', async () => {
    const nbButtonsBeforeCreate = await restaurantComponentsPage.countDeleteButtons();

    await restaurantUpdatePage.setNameInput('name');
    expect(await restaurantUpdatePage.getNameInput()).to.match(/name/);
    await restaurantUpdatePage.setDescriptionInput('description');
    expect(await restaurantUpdatePage.getDescriptionInput()).to.match(/description/);
    await restaurantUpdatePage.idLocationSelectLastOption();
    await restaurantUpdatePage.userSelectLastOption();
    await waitUntilDisplayed(restaurantUpdatePage.getSaveButton());
    await restaurantUpdatePage.save();
    await waitUntilHidden(restaurantUpdatePage.getSaveButton());
    expect(await restaurantUpdatePage.getSaveButton().isPresent()).to.be.false;

    await restaurantComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await restaurantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Restaurant', async () => {
    await restaurantComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await restaurantComponentsPage.countDeleteButtons();
    await restaurantComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    restaurantDeleteDialog = new RestaurantDeleteDialog();
    expect(await restaurantDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/emenuApp.restaurant.delete.question/);
    await restaurantDeleteDialog.clickOnConfirmButton();

    await restaurantComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await restaurantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
