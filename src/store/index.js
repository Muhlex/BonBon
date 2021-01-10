import { reactive, readonly } from 'vue';
import firebase, { auth, userDoc } from '@/firebase';
import Receipt from './Receipt.js';

class Store {
  constructor() {
    this._state = reactive({
      receipts: [],
      user: null,
      authInitialized: false,
    });
    // Return a read-only proxy to make sure store data is only changed via firebase
    this.state = readonly(this._state);
  }

  get user() { return this.state.user; }
  get receipts() { return this.state.receipts; }
  get authInitialized() { return this.state.authInitialized; }

  signIn() {
    if (this.user) return;
    this._state.authInitialized = false;
    auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  signOut() {
    if (!this.user) return;
    return auth.signOut();
  }

  updateUser(value) {
    this._state.authInitialized = true;
    this._state.user = value;
  }

  updateReceipts(receipts) {
    this._state.receipts = receipts.map(receipt => {
      return receipt instanceof Receipt ? receipt : new Receipt(receipt);
    });
  }

  addReceipt(obj) {
    // Flatten state first
    const addObj = obj._state || obj;
    if (addObj.items) addObj.items = addObj.items.map(item => item._state || item);
    userDoc.collection('receipts').add(addObj);
  }

  deleteReceipt(id) {
    userDoc.collection('receipts').doc(id).delete();
  }

  getReceiptsSortedByDate() {
    const copy = this._state.receipts;
    return copy.sort((a, b) => a.timestamp - b.timestamp);
  }

  getBudgetedInRange(from, to = new Date()) {
    // Retrieve all items marked to appear in budget book in a specific time period.
    const receipts = this.receipts.filter(({ timestamp }) => timestamp > from && timestamp < to);
    return receipts.map(({ timestamp, budgetBookItems }) => ({ timestamp, items: budgetBookItems }));
  }
}

export default new Store();
