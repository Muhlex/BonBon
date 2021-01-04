import { reactive, computed } from 'vue';
import { nanoid } from 'nanoid';
import dateFormat from 'dateformat';
import Item from './Item.js';

export default class Receipt {
  constructor({ timestamp, vendor, overrideCost, file, items } = {}) {
    this._state = reactive({
      id: nanoid(),
      timestamp: timestamp || Date.now(),
      vendor,
      overrideCost, // In a perfect world, the total is the sum of all items. Otherwise it's this.
      file,
      items: items ? items.map(item => (item instanceof Item) ? item : new Item(item)) : [],
    });
  }

  get id() { return this._state.id; }
  get timestamp() { return this._state.timestamp; }
  set timestamp(value) { this._state.timestamp = value; }
  get vendor() { return this._state.vendor; }
  set vendor(value) { this._state.vendor = value; }
  get file() { return this._state.file; }
  set file(value) { this._state.file = value; }
  get items() { return this._state.items; }
  set items(value) { this._state.items = value; }

  get cost() {
    return computed({
      get: () => {
        // If a total is explicitly set for the receipt, use that. Otherwise use sum of all items.
        return (typeof this.overrideCost === 'number')
          ? this.overrideCost
          : this.items.reduce((total, { cost }) => total + cost, 0) || 0;
      },
      set: value => this.overrideCost = parseInt(value, 10),
    });
  }

  get date() {
    return new Date(this.timestamp);
  }
  set date(value) {
    this.timestamp = value.toISOString();
  }

  get dateString() {
    return dateFormat(this.date, 'd.m.yyyy');
  }

  get costInCurrency() {
    return computed(() => (this.cost / 100).toFixed(2).replace('.', ','));
  }

  get budgetedItems() {
    return this.items.filter(item => item.budgeted);
  }

  addItem(value) {
    // If an Item is passed, push it directly. Otherwise create one with the passed values.
    this.items.push((value instanceof Item) ? value : new Item(value));
  }
}
