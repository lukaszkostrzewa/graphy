import { GraphyPage } from './app.po';

describe('graphy App', () => {
  let page: GraphyPage;

  beforeEach(() => {
    page = new GraphyPage();
  });

  it('should have main toolbar', () => {
    page.navigateTo();
    expect(page.getMainToolbar()).toBeTruthy();
  });
});
