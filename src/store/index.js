import { reactive } from 'vue';
import Receipt from './Receipt';

class Store {
  constructor() {
    // Assign the reactive class attributes directly to the instance.
    Object.assign(this, reactive({
      receipts: [],
    }));
  }

  addReceipt(value) {
    // If a Receipt is passed, push it directly. Otherwise create one with the passed values.
    this.receipts.push((value instanceof Receipt) ? value : new Receipt(value));
  }
}

export default new Store();
