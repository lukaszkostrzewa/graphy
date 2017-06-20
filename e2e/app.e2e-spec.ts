import { GraphyPage } from './app.po';

describe('graphy App', () => {
  let page: GraphyPage;

  beforeEach(() => {
    page = new GraphyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
