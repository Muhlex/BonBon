import { reactive, computed } from 'vue';
import { nanoid } from 'nanoid';
import Item from './Item.js';

export default class Receipt {
  constructor({ timestamp, vendor, overrideCost, file, items } = {}) {
    Object.assign(this, reactive({
      id: nanoid(),
      timestamp: timestamp || new Date(), // TODO: Stringify this
      vendor,
      overrideCost, // In a perfect world, the total is the sum of all items. Otherwise it's this.
      // Check if passed items are all instances of Item. Otherwise call the constructor.
      file,
      items: items ? items.map(item => (item instanceof Item) ? item : new Item(item)) : [],
    }));
  }

  set cost(value) {
    this.overrideCost = value;
  }

  get cost() {
    return computed(() => {
      // If a total is explicitly set for the receipt, use that. Otherwise use sum of all items.
      return (typeof this.overrideCost === 'number')
        ? this.overrideCost
        : this.items.reduce((total, { cost }) => total + cost, 0) || 0;
    });
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
