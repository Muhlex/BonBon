import { reactive, computed } from 'vue';
import { nanoid } from 'nanoid';

export default class Item {
  constructor({ label, cost }) {
    Object.assign(this, reactive({
      id: nanoid(),
      label,
      cost,
    }));
  }

  get costInCurrency() {
    return computed(() => (this.cost / 100).toFixed(2).replace('.', ','));
  }

  setLabel(value) {
    this.label = value;
  }
  setCost(value) {
    this.cost = value;
  }
}
