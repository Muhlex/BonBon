<template>
  {{ receiptData }}
  <img :src="receiptData.file">
  <button @click="onEditClick">edit file</button>
  <button @click="receiptData.setVendor('REWE')">rewe</button>
</template>

<script>
import Receipt from '../store/Receipt';
import { promptImageInput } from '../utils';

export default {
  name: 'SingleReceiptEdit',
  props: {
    receipt: {
      type: Receipt,
      default: undefined,
    },
  },
  data() {
    return {
      receiptData: this.receipt || new Receipt(),
    };
  },
  methods: {
    async onEditClick() {
      const file = await promptImageInput();
      this.receiptData.setFile(file);
    },
  },
};
</script>

<style>

</style>
