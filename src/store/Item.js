import { reactive, computed } from 'vue';
import { nanoid } from 'nanoid';

export default class Item {
  constructor({ label, cost }) {
    this.state = reactive({
      id: nanoid(),
      label,
      cost,
    });
  }

  // No idea if exposing the state can be done with less boilerplate code
  get id() {
    return this.state.id;
  }
  get label() {
    return this.state.label;
  }
  get cost() {
    return this.state.cost;
  }
  get costInCurrency() {
    return computed(() => (this.cost / 100).toFixed(2).replace('.', ','));
  }

  setLabel(value) {
    this.state.label = value;
  }
  setCost(value) {
    this.state.cost = value;
  }
}
