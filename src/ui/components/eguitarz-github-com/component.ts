import Component, { tracked } from "@glimmer/component";

export default class EguitarzGithubCom extends Component {
  @tracked page = 'about-me';

  @tracked('page')
  get isHome() {
    return this.page === 'about-me';
  }

  @tracked('page')
  get leftPanelClass() {
    return this.isHome ? '' : 'App__Left--rotate';
  }

  @tracked('page')
  get homeButtonClass() {
    return this.isHome ? '' : 'App__Menu__home--expand';
  }

  select(page) {
    this.page = page;
  }
}
