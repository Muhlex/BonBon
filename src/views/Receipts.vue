<template>
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
