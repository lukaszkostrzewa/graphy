import { browser, by, element } from 'protractor';

export class GraphyPage {
  navigateTo() {
    return browser.get('/');
  }

  getMainToolbar() {
    return element(by.css('md-toolbar')).getSize();
  }
}
