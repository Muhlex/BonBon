<template>
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
  <ul>
    <li v-for="receipt in store.receipts" :key="receipt.id">
      <b>{{ receipt.vendor }} [{{ receipt.costInCurrency }}€]</b>
      <img :src="receipt.file" style="max-width: 150px;max-height: 150px;">
      <ul>
        <li v-for="item in receipt.items" :key="item.id">
          {{ item.label }} [{{ item.costInCurrency }}€]
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import store from '@/store';

export default {
  name: 'ReceiptsList',
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
      store.addReceipt({ vendor: 'PENNY Markt', overrideCost: 2580 });
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

<style>

</style>
