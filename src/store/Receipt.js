import { reactive, computed } from 'vue';
import dateFormat from 'dateformat';
import Item from './Item.js';

export default class Receipt {
  constructor({ id, timestamp, vendor, costOverride, file, items } = {}) {
    this._state = reactive({
      id: id || undefined, // Generated by Firestore
      timestamp: timestamp || new Date().toISOString(),
      vendor: vendor || null,
      // In a perfect world, the total is the sum of all items. Otherwise it's this:
      costOverride: costOverride || null,
      file: file || null,
      items: items ? items.map(item => item instanceof Item ? item : new Item(item)) : [],
    });
  }

  get id() { return this._state.id; }

  get timestamp() {
    return this._state.timestamp;
  }
  set timestamp(value) {
    this._state.timestamp = value instanceof Date ? value.toISOString() : value;
  }

  get date() {
    return computed({
      get: () => new Date(this.timestamp),
      set: value => this.timestamp = value.toISOString(),
    });
  }

  get dateString() { return computed(() => dateFormat(this.date, 'dd.mm.yyyy')); }

  get vendor() { return this._state.vendor; }
  set vendor(value) { this._state.vendor = value; }

  get file() { return this._state.file; }
  set file(value) { this._state.file = value; }

  get items() { return this._state.items; }
  set items(items) {
    this._state.items = items ? items.map(i => (i instanceof Item) ? i : new Item(i)) : [];
  }

  // Can't use an actual JS getter or setter here because Vue marks the property as read-only
  // https://vue-composition-api-rfc.netlify.app/api.html#computed
  get cost() {
    return computed({
      get: () => {
        // If a total is explicitly set for the receipt, use that. Otherwise use sum of all items.
        return this.hasUnknownItems ? this._state.costOverride : this.itemCost;
      },
      set: value => this._state.costOverride = parseInt(value, 10),
    });
  }

  get floatCost() {
    return computed({
      get: () => (this.cost / 100),
      set: value => this._state.costOverride = parseInt(value * 100, 10),
    });
  }

  get costInCurrency() {
    return computed(() => (this.cost / 100).toFixed(2).replace('.', ','));
  }

  get itemCost() {
    return computed(() => this._state.items.reduce((total, { cost }) => total + cost, 0) || 0);
  }

  get hasUnknownItems() {
    return computed(() => (typeof this._state.costOverride === 'number'));
  }

  get unknownItemsCostInCurrency() {
    const itemCost = this._state.items.reduce((total, { cost }) => total + cost, 0) || 0;
    return computed(() => ((this._state.costOverride - itemCost) / 100).toFixed(2).replace('.', ','));
  }

  get budgetedItems() {
    return computed(() => this.items.filter(item => item.budgeted));
  }

  resetCostOverride() {
    this._state.costOverride = null;
  }

  addItem(value = {}) {
    this._state.items.push((value instanceof Item) ? value : new Item(value));
  }

  deleteItem(id) {
    const index = this._state.items.findIndex(item => item.id === id);
    this._state.items.splice(index, 1);
  }
}
