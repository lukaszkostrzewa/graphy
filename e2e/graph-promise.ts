import {promise} from 'selenium-webdriver';
import {browser} from 'protractor';
import * as fs from 'fs';

export class GraphPromise implements promise.Promise<any> {

  private wrapped: promise.Promise<any>;

  constructor(filePath: string) {
    this.wrapped = browser.driver
      .wait(() => fs.existsSync(filePath))
      .then(() => {
        const graphString = fs.readFileSync(filePath, {encoding: 'utf8'});
        const graph = JSON.parse(graphString);
        return graph.elements;
      });
  }

  nodesCount(): promise.Promise<number> {
    return this.wrapped.then(elements => elements.nodes ? elements.nodes.length : 0);
  }

  edgesCount() {
    return this.wrapped.then(elements => elements.edges ? elements.edges.length : 0);
  }

  then(opt_callback, opt_errback) {
    return this.wrapped.then(opt_callback, opt_errback);
  }

  thenCatch(errback) {
    return this.wrapped.thenCatch(errback);
  }

  catch(errback) {
    return this.wrapped.catch(errback);
  }

  thenFinally(callback) {
    return this.wrapped.thenFinally(callback);
  }

  cancel(opt_reason) {
    return this.wrapped.cancel(opt_reason);
  }

  isPending(): boolean {
    return this.wrapped.isPending();
  }
}
