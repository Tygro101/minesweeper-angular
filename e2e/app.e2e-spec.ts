import { Test222Page } from './app.po';

describe('test222 App', () => {
  let page: Test222Page;

  beforeEach(() => {
    page = new Test222Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
