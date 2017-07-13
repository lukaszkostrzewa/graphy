import {GraphyPage} from './app.po';
import {browser, protractor} from 'protractor';
import {ExportUtil} from './export-util';
import {GraphPromise} from './graph-promise';

const exportGraph = ExportUtil.exportGraph;

describe('graphy App', () => {
  let page: GraphyPage;

  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    page = new GraphyPage();
    page.navigateTo();
  });

  describe('basic tests', () => {
    it('should have main toolbar', () => {
      expect(page.mainToolbar()).toBeTruthy();
    });

    it('should toggle between edit and view mode by clicking edit button', () => {
      page.buttons.edit().click();
      expect(page.isInEditMode()).toBeTruthy();

      page.buttons.edit().click();
      expect(page.isInEditMode()).toBeFalsy();
    });

    it('should open side menu after clicking on menu button', () => {
      expect(page.sideMenu().isDisplayed()).toBeFalsy();

      page.buttons.menu().click();

      expect(page.sideMenu().isDisplayed()).toBeTruthy();
    });
  });

  describe('context menu', () => {
    it('should not display context menu at start', () => {
      expect(page.contextMenu().getCssValue('display')).toEqual('none');
    });

    it('should display context menu on right click with proper elements in view mode', () => {
      browser.actions().mouseMove(page.graphContainer(), {x: 0, y: 0}).perform();

      browser.actions().click(protractor.Button.RIGHT).perform();

      expect(page.contextMenu().getCssValue('display')).toEqual('block');
      expect(page.visibleContextMenuItems().map(e => e.getAttribute('id')))
        .toEqual(['select-all', 'copy', 'cut', 'paste', 'undo', 'redo']);
    });

    it('should display context menu on right click with proper elements in edit mode', () => {
      page.buttons.edit().click();
      browser.actions().mouseMove(page.graphContainer(), {x: 0, y: 0}).perform();

      browser.actions().click(protractor.Button.RIGHT).perform();

      expect(page.contextMenu().getCssValue('display')).toEqual('block');
      expect(page.visibleContextMenuItems().map(e => e.getAttribute('id')))
        .toEqual(['add-node', 'select-all', 'group', 'ungroup', 'copy', 'cut', 'paste', 'undo', 'redo']);
    });
  });

  describe('shortcuts', () => {
    it('should toggle between edit and view mode with ctrl+`', () => {
      page.body().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, '`'));
      expect(page.isInEditMode()).toBeTruthy();

      page.body().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, '`'));
      expect(page.isInEditMode()).toBeFalsy();
    });

    it('should leave edit mode by pressing escape', () => {
      page.buttons.edit().click();

      page.body().sendKeys(protractor.Key.ESCAPE);

      expect(page.isInEditMode()).toBeFalsy();
    });
  });

  describe('graph operations (and export)', () => {

    it('should export graph with 3 nodes at the beginning', () => {
      const graph: GraphPromise = exportGraph(page);

      expect(graph.nodesCount()).toEqual(3);
    });

    it('should not add node after clicking on graph container in view mode', () => {
      browser.actions().mouseMove(page.graphContainer(), {x: 0, y: 0}).click().perform();

      expect(exportGraph(page).nodesCount()).toEqual(3);
    });

    it('should add node after clicking on graph container in edit mode', () => {
      page.buttons.edit().click();

      browser.actions().mouseMove(page.graphContainer(), {x: 0, y: 0}).click().perform();

      expect(exportGraph(page).nodesCount()).toEqual(4);
    });

    it('should remove all nodes and edges after ctrl+a and delete', () => {
      page.body().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
      page.body().sendKeys(protractor.Key.DELETE);

      const graph = exportGraph(page);

      expect(graph.nodesCount()).toEqual(0);
      expect(graph.edgesCount()).toEqual(0);
    });
  });

  afterAll(ExportUtil.deleteTmpFileIfExists);
});
