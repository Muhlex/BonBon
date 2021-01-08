import { reactive, computed } from 'vue';
import { nanoid } from 'nanoid';

export default class Item {
  constructor({ id, label, cost, budgeted } = {}) {
    this._state = reactive({
      id: id || nanoid(), // Only used for Vue rendering purposes
      label: label || null,
      cost: cost || 0,
      budgeted: budgeted || false,
    });
  }

  get id() { return this._state.id; }

  get label() { return this._state.label; }
  set label(value) { this._state.label = value; }

  get cost() { return this._state.cost; }
  set cost(value) { this._state.cost = parseInt(value, 10); }

  get budgeted() { return this._state.budgeted; }
  set budgeted(value) { this._state.budgeted = Boolean(value); }

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
