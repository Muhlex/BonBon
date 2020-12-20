import { reactive, computed } from 'vue';
import { nanoid } from 'nanoid';

export default class Item {
  constructor({ label, cost = 0, budgeted = false } = {}) {
    Object.assign(this, reactive({
      id: nanoid(),
      label,
      cost,
      budgeted,
    }));
  }

  get costInCurrency() {
    return computed(() => (this.cost / 100).toFixed(2).replace('.', ','));
  }
}
