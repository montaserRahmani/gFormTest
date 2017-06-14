import { GFormTestPage } from './app.po';

describe('g-form-test App', () => {
  let page: GFormTestPage;

  beforeEach(() => {
    page = new GFormTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
