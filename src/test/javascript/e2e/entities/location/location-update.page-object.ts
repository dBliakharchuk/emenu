import { element, by, ElementFinder } from 'protractor';

export default class LocationUpdatePage {
  pageTitle: ElementFinder = element(by.id('emenuApp.location.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  addressGMInput: ElementFinder = element(by.css('input#location-addressGM'));
  countryInput: ElementFinder = element(by.css('input#location-country'));
  cityInput: ElementFinder = element(by.css('input#location-city'));
  streetInput: ElementFinder = element(by.css('input#location-street'));
  bildingInput: ElementFinder = element(by.css('input#location-bilding'));
  postcodeInput: ElementFinder = element(by.css('input#location-postcode'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAddressGMInput(addressGM) {
    await this.addressGMInput.sendKeys(addressGM);
  }

  async getAddressGMInput() {
    return this.addressGMInput.getAttribute('value');
  }

  async setCountryInput(country) {
    await this.countryInput.sendKeys(country);
  }

  async getCountryInput() {
    return this.countryInput.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return this.cityInput.getAttribute('value');
  }

  async setStreetInput(street) {
    await this.streetInput.sendKeys(street);
  }

  async getStreetInput() {
    return this.streetInput.getAttribute('value');
  }

  async setBildingInput(bilding) {
    await this.bildingInput.sendKeys(bilding);
  }

  async getBildingInput() {
    return this.bildingInput.getAttribute('value');
  }

  async setPostcodeInput(postcode) {
    await this.postcodeInput.sendKeys(postcode);
  }

  async getPostcodeInput() {
    return this.postcodeInput.getAttribute('value');
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
