import { OrderingSystemTemplatePage } from './app.po';

describe('OrderingSystem App', function() {
  let page: OrderingSystemTemplatePage;

  beforeEach(() => {
    page = new OrderingSystemTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
