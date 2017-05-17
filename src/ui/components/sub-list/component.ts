import Component, { tracked } from "@glimmer/component";

const coffee: Array<{id: string, content: Array<string>}> = [{
  id: 'beans',
  content: [
    'Three African',
    'Giant Steps',
    'Kona'
  ]}, {
  id: 'methods',
  content: [
    'Aeropress',
    'French Press',
    'Moka Pot',
    'The Kalita Wave Dripper',
    'The Vietnamese Drip Filter',
    'Cold Drip Brewing'
  ]
}];

export default class SubList extends Component {
  @tracked('args')
  get isCoffee() {
    return this.args.topic === 'coffee';
  }  
}
