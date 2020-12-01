import { reactive } from 'vue';
import Receipt from './Receipt';

class Store {
  constructor() {
    this.state = reactive({ receipts: [] });
  }
  get receipts() {
    return this.state.receipts;
  }

  addReceipt(value) {
    // If a Receipt is passed, push it directly. Otherwise create one with the passed values.
    this.state.receipts.push((value instanceof Receipt) ? value : new Receipt(value));
  }
}

export default new Store();
