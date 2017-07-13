import {browser, by, element} from 'protractor';
import {promise} from "selenium-webdriver";

export class GraphyPage {

  navigateTo() {
    return browser.get('/');
  }

  body() {
    return browser.element(by.css('body'));
  }

  mainToolbar() {
    return element(by.css('md-toolbar')).getSize();
  }

  graphContainer() {
    return element(by.css('#graph-container'));
  }

  contextMenu() {
    return element(by.css('.cy-context-menus-cxt-menu'));
  }

  isInEditMode(): promise.Promise<boolean> {
    return this.graphContainer().getAttribute('class')
      .then(cl => cl.includes('edit-mode'));
  }

  visibleContextMenuItems() {
    return this.contextMenu()
      .$$('.cy-context-menus-cxt-menuitem')
      .filter(e => e.isDisplayed());
  }

  sideMenu() {
    return element(by.css('md-sidenav'));
  }

  buttons = {
    edit() {
      return element(by.css('#btn-edit'));
    },

    menu() {
      return element(by.css('.btn-menu'));
    },

    doExport() {
      return element(by.css('#btn-export'));
    },

    exportOpen() {
      return element(by.css('#btn-export-open'));
    }
  };

  dialogs = {
    exportDialog() {
      return element(by.css('app-export-dialog'));
    }
  };

  inputs = {
    exportFilename() {
      return element(by.css('.filename'));
    }
  }
}
