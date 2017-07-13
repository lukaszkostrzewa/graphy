import {GraphPromise} from "./graph-promise";
import {GraphyPage} from "./app.po";
import * as fs from "fs";

const TMP_EXPORT_FILE = process.cwd() + '/e2e/tmp/g.json';

export class ExportUtil {

  static exportGraph(page: GraphyPage): GraphPromise {
    page.buttons.menu().click();
    page.buttons.exportOpen().click();

    expect(page.dialogs.exportDialog().isDisplayed()).toBeTruthy();

    ExportUtil.setValueOnInputElement(page.inputs.exportFilename(), 'g')
      .then(page.buttons.doExport().click);

    ExportUtil.deleteTmpFileIfExists();

    return new GraphPromise(TMP_EXPORT_FILE);
  }

  static deleteTmpFileIfExists() {
    if (fs.existsSync(TMP_EXPORT_FILE)) {
      fs.unlinkSync(TMP_EXPORT_FILE);
    }
  }

  /**
   * This method tries recursively set value to the input element. For some reason, sometimes
   * it happens that not all characters are sent to the input after invoking sendKeys() method.
   *
   * @link https://github.com/angular/protractor/issues/2019
   * @param inputElement to set value
   * @param value to set
   * @return {Promise<R>}
   */
  private static setValueOnInputElement(inputElement, value: string) {
    inputElement.clear();
    inputElement.sendKeys(value);

    return inputElement.getAttribute('value')
      .then(insertedValue => {
        if (insertedValue !== value) {
          return this.setValueOnInputElement(inputElement, value);
        } else {
          return null;
        }
      });
  }
}
