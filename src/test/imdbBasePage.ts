import {
  WebDriver,
  Builder,
  Capabilities,
  until,
  By,
} from "selenium-webdriver";

export class BasePage {
  driver: WebDriver;
  url: string = "https://www.imdb.com/?ref_=nv_home";

  // IMDb home page Menu button
  menu: By = By.css("#imdbHeader-navDrawerOpen");
  // IMDb home page Search Bar
  searchBar: By = By.id("suggestion-search");
  // IMDb movie result button
  searchItemBtn: By = By.xpath(
    "//a[contains(@href, '/title/tt12252296?ref_=nv_sr_srsg_0')]"
  );
  // IMDb movie title view
  movieTitleView: By = By.xpath(
    "//h1[contains(@data-testid, 'hero-title-block__title')]"
  );
  celebs: By = By.css('label[for="nav-link-categories-celebs"]');
  born: By = By.xpath("//a[contains(@href, '/feature/bornondate/?ref_=nv_cel_brn')]");
  actor: By = By.xpath("//div[contains(@class, 'lister-item mode-detail')][1]//h3[contains(@class, 'lister-item-header')]//a[contains(@href, '/name/nm4793106')]");

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async navigate() {
    await this.driver.get(this.url);
  }
  async quit() {
    await this.driver.quit()
  }

  async click(elementBy: By) {
    await this.driver.wait(until.elementLocated(elementBy));
    return (await this.driver.findElement(elementBy)).click();
  }

  async getAttribute(elementBy: By, attribute: string) {
    await this.driver.wait(until.elementLocated(elementBy));
    return (await this.driver.findElement(elementBy)).getAttribute(attribute);
  }

  async sendKeys(elementBy: By, keys) {
    await this.driver.wait(until.elementLocated(elementBy));
    return this.driver.findElement(elementBy).sendKeys(keys);
  }

  async getText(elementBy: any) {
    await this.driver.wait(until.elementLocated(elementBy));
    return (await this.driver.findElement(elementBy)).getText();
  }

  async doSearch(text: string) {
    return this.sendKeys(this.searchBar, `${text}`);
  }

  async getSearchResults() {
    await this.driver.findElement(this.movieTitleView);
    return await this.driver.findElement(this.movieTitleView).getText();
  }
}
