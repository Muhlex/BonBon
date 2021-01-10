<template>
  <button @click="addExampleReceipts">
    Add example receipts
  </button>
  <button @click="addExampleReceipt">
    Add single example receipt
  </button>
  <ul>
    <li v-for="receipt in store.receipts" :key="receipt.id">
      <b>{{ receipt.vendor }} [{{ receipt.costInCurrency }}€]</b>
      <button @click="store.deleteReceipt(receipt.id)">
        X
      </button>
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
      store.addReceipt({ vendor: 'Edeka', costOverride: 1499 });

      store.addReceipt({ vendor: 'REWE', items: [
        { label: 'Zahnpasta', cost: 149 },
        { label: 'Fertigpizza', cost: 320, budgeted: true },
        { label: 'Tomaten', cost: 76 },
      ] });
    },
    addExampleReceipt() {
      store.addReceipt({ vendor: 'PENNY Markt', costOverride: 2580 });
    },
  },
};
</script>

<style>

</style>
