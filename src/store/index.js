import { reactive, watch } from 'vue';
import { cloneDeep } from 'lodash';
import Receipt from './Receipt.js';

class Store {
  constructor({ receipts } = {}) {
    this._state = reactive({
      // Check if passed receipts are all instances of Receipt. Otherwise call the constructor.
      receipts: receipts ? receipts.map(r => (r instanceof Receipt) ? r : new Receipt(r)) : [],
    });

    // Watch for any state changes and save them locally (this could send them to a server one day)
    watch(this._state, (newValue) => {
      // Flatten the store to remove state objects.
      // E. g. Store._state.Receipt._state.Item._state becomes Store.Receipt.Item
      const flattenState = obj => {
        for (const key in obj) {
          // If there is another object, recursively do the same one level deeper.
          if (typeof obj[key] == 'object' && obj[key] !== null) {
            flattenState(obj[key]);
          }

          // If '_state' is found, copy it's properties one level up and delete it.
          if (key === '_state') {
            obj = Object.setPrototypeOf(obj, Object); // apparently this is slow
            Object.assign(obj, obj[key]);
            delete obj[key];
          }
        }
      };

      const persistState = cloneDeep(newValue);
      flattenState(persistState);
      localStorage.setItem('bonbon.data', JSON.stringify(persistState)); // TODO: Use Firebase
    });
  }

  get receipts() { return this._state.receipts; }
  set receipts(value) { this._state.receipts = value; }

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
