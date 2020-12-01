import { reactive, computed } from 'vue';
import { nanoid } from 'nanoid';
import Item from './item';

export default class Receipt {
  constructor({ timestamp, vendor, overrideCost, items }) {
    this.state = reactive({
      id: nanoid(),
      timestamp: timestamp || new Date(),
      vendor,
      overrideCost, // In a perfect world, the total is the sum of all items. Otherwise it's this.
      items: items || [],
    });
  }

  // No idea if exposing the state can be done with less boilerplate code
  get id() {
    return this.state.id;
  }
  get timestamp() {
    return this.state.timestamp;
  }
  get vendor() {
    return this.state.vendor;
  }
  get cost() {
    return computed(() => {
      // If a total is explicitly set for the receipt, use that. Otherwise use sum of all items.
      return (typeof this.state.overrideCost === 'number')
        ? this.state.overrideCost
        : this.state.items.reduce((total, { cost }) => total + cost, 0) || 0;
    });
  }
  get costInCurrency() {
    return computed(() => (this.cost / 100).toFixed(2).replace('.', ','));
  }
  get items() {
    return this.state.items;
  }

  setVendor(value) {
    this.state.vendor = value;
  }
  setCost(value) {
    this.state.overrideCost = value;
  }
  setTimestamp(value) {
    this.state.timestamp = value || new Date();
  }

  addItem(value) {
    // If an Item is passed, push it directly. Otherwise create one with the passed values.
    this.state.items.push((value instanceof Item) ? value : new Item(value));
  }
}
