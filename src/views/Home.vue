<template>
  <hr>
  <button @click="addExampleReceipts">
    Reactively insert example receipt data.
  </button>
  <button @click="addExampleReceipt">
    Another one.
  </button>
  <button @click="makeItemsFree">
    Make all items free.
  </button>
  <button @click="clearStore">
    Clear store.
  </button>
  <hr>
  <Receipts />
</template>

<script>
import store from '@/store';
import Receipts from '@/views/Receipts';

export default {
  name: 'Home',
  components: {
    Receipts,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    addExampleReceipts() {
      store.addReceipt({ vendor: 'Edeka', overrideCost: 1499 });

      store.addReceipt({ vendor: 'REWE', items: [
        { label: 'Zahnpasta', cost: 149 },
        { label: 'Fertigpizza', cost: 320, budgeted: true },
        { label: 'Tomaten', cost: 76 },
      ] });
    },
    addExampleReceipt() {
      store.addReceipt({ vendor: 'Penny', overrideCost: 2580 });
    },
    makeItemsFree() {
      store.receipts.forEach(receipt => receipt.items.forEach(item => {
        item.cost = 0;
      }));
    },
    clearStore() {
      store.clear();
    },
  },
};
</script>
