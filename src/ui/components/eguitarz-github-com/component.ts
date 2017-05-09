import Component, { tracked } from "@glimmer/component";

export default class EguitarzGithubCom extends Component {
  @tracked page = 'about-me';

  @tracked('page')
  get isHome() {
    return this.page === 'about-me';
  }

  select(page) {
    this.page = page;
  }
}
