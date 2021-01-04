import { reactive, computed } from 'vue';
import { nanoid } from 'nanoid';

export default class Item {
  constructor({ label, cost = 0, budgeted = false } = {}) {
    this._state = reactive({
      id: nanoid(),
      label,
      cost,
      budgeted,
    });
  }

  get id() { return this._state.id; }
  get label() { return this._state.label; }
  set label(value) { this._state.label = value; }
  get cost() { return this._state.cost; }
  set cost(value) { this._state.cost = value; }
  get budgeted() { return this._state.budgeted; }
  set budgeted(value) { this._state.budgeted = value; }

  // Can't use an actual JS getter or setter here because Vue marks the property as read-only
  // https://vue-composition-api-rfc.netlify.app/api.html#computed
  get floatCost() {
    return computed({
      get: () => (this.cost / 100),
      set: value => this.cost = parseInt(value * 100, 10),
    });
  }

  get costInCurrency() {
    return computed(() => (this.cost / 100).toFixed(2).replace('.', ','));
  }
}
