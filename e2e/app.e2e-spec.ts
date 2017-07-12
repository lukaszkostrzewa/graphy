import { GraphyPage } from './app.po';
import {browser} from "protractor";

describe('graphy App', () => {
  let page: GraphyPage;

  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    page = new GraphyPage();
  });

  it('should have main toolbar', () => {
    page.navigateTo();
    expect(page.getMainToolbar()).toBeTruthy();
  });
});
