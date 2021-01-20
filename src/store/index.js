import { reactive, readonly, computed } from 'vue';
import firebase, { auth, userDoc } from '@/firebase';
import Receipt from './Receipt.js';

import dummyData from './dummyData';

class Store {
  constructor() {
    this._state = reactive({
      receipts: [],
      user: null,
      authInitialized: false,
      dataInitialized: false,

      dummyReceipts: dummyData.receipts.map(r => new Receipt(r)),
    });
    // Return a read-only proxy to make sure store data is only changed via firebase
    this.state = readonly(this._state);
  }

  get user() { return this.state.user; }
  get receipts() {
    return [...this._state.receipts, ...this._state.dummyReceipts];
  }
  get authInitialized() { return this.state.authInitialized; }
  get dataInitialized() { return this.state.dataInitialized; }

  get knownVendors() {
    return computed(() => new Set(this.receipts.filter(r => r.vendor).map(r => r.vendor))).value;
  }

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
    this._state.user = value;
    this._state.authInitialized = true;
  }

  updateReceipts(receipts) {
    this._state.receipts = receipts.map(receipt => {
      return receipt instanceof Receipt ? receipt : new Receipt(receipt);
    });
    this._state.dataInitialized = true;
  }

  _flattenReceipt(r) {
    const flatR = r._state || r;
    if (flatR.items) flatR.items = flatR.items.map(item => item._state || item);
    return flatR;
  }

  addReceipt(r) {
    // Flatten state first
    userDoc.collection('receipts').add(this._flattenReceipt(r));
  }

  updateReceipt(r) {
    userDoc.collection('receipts').doc(r.id).update(this._flattenReceipt(r));
  }

  deleteReceipt(id) {
    userDoc.collection('receipts').doc(id).delete();
  }

  getReceiptById(id) {
    return this.receipts.find(receipt => receipt.id === id);
  }

  getReceiptsSortedByDate() {
    const copy = [...this.receipts];
    return computed(() => copy.sort((a, b) => a.date - b.date));
  }

  getBudgetedInRange(from, to = new Date()) {
    // Retrieve all items marked to appear in budget book in a specific time period.
    const receipts = this.receipts.filter(({ timestamp }) => timestamp > from && timestamp < to);
    return receipts.map(({ timestamp, budgetBookItems }) => ({ timestamp, items: budgetBookItems }));
  }
}

export default new Store();
