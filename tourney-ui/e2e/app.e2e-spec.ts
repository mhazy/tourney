import { TourneyUiPage } from './app.po';

describe('tourney-ui App', function() {
  let page: TourneyUiPage;

  beforeEach(() => {
    page = new TourneyUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
