import { MoneyApiPage } from './app.po';

describe('money-api App', () => {
  let page: MoneyApiPage;

  beforeEach(() => {
    page = new MoneyApiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
