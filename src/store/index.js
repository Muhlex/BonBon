import { reactive, watch } from 'vue';
import Receipt from './Receipt';

class Store {
  constructor({ receipts }) {
    const state = reactive({
      // Check if passed receipts are all instances of Receipt. Otherwise call the constructor.
      receipts: receipts ? receipts.map(r => (r instanceof Receipt) ? r : new Receipt(r)) : [],
    });

    // Watch for any state changes and save them locally (this could send them to a server one day)
    watch(state, (newValue) => {
      localStorage.setItem('bonbon.data', JSON.stringify(newValue)); // TODO: Use Firebase
    });

    // Assign the reactive class attributes directly to the instance.
    Object.assign(this, state);
  }

  getBudgetedInRange(from, to = new Date()) {
    // Retrieve all items marked to appear in budget book in a specific time period.
    const receipts = this.receipts.filter(({ timestamp }) => timestamp > from && timestamp < to);
    return receipts.map(({ timestamp, budgetBookItems }) => ({ timestamp, items: budgetBookItems }));
  }

  addReceipt(value) {
    // If a Receipt is passed, push it directly. Otherwise create one with the passed values.
    this.receipts.push((value instanceof Receipt) ? value : new Receipt(value));
  }

  clear() {
    this.receipts.splice(0);
  }
}

const state = JSON.parse(localStorage.getItem('bonbon.data')); // TODO: Use Firebase
const store = state ? new Store(state) : new Store();

export default store;
