import { computed } from 'vue';
import { nanoid } from 'nanoid';

export default class Item {
  constructor({ label, cost, budgeted = false }) {
    Object.assign(this, {
      id: nanoid(),
      label,
      cost,
      budgeted,
    });
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
