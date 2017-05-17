import Component, { tracked } from "@glimmer/component";

export default class MyLife extends Component {
  @tracked topic: string = 'coffee';

  selectTopic(topic) {
    this.topic = topic;
  }
}
