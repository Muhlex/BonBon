<template>
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
import store from '@/store';

export default {
  name: 'Receipts',
  data() {
    return {
      store,
    };
  },
};
</script>

<style>

</style>
