<template>
  <HelloWorld />
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
  <ul>
    <li v-for="receipt in store.receipts" :key="receipt.id">
      {{ receipt.vendor }}: {{ receipt.costInCurrency }}€
      <ul>
        <li v-for="item in receipt.items" :key="item.id">
          {{ item.label }} ({{ item.costInCurrency }}€ [{{ item.cost }} in cents])
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';
import store from '../store';

export default {
  name: 'Home',
  components: {
    HelloWorld,
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
        item.setCost(0);
      }));
    },
    clearStore() {
      store.clear();
    },
  },
};
</script>
