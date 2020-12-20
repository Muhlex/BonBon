<template>
  <div
    class="receipt-image"
    :style="{ 'background-image': `url(${receipt.file})` }"
  >
    <Button class="p-button-sm" style="position:absolute;bottom:8px;right:8px;z-index:2" @click="onEditClick">
      Edit receipt image
    </Button>
  </div>

  <div style="margin-top:1em">
    Vendor
    <AutoComplete v-model="receipt.vendor" dropdown :suggestions="suggestedVendors"
                  @complete="$event => suggestedVendors = exampleVendors.filter(v => v.toLowerCase().includes($event.query.toLowerCase()))"
    />
  </div>
  <div style="margin-top:0.5em">
    Date
    <Calendar v-model="receipt.timestamp" date-format="dd.mm.yy" />
  </div>

  <!-- Consider https://primefaces.org/primevue/showcase/#/datatable for displaying this data. -->
  <div style="display: flex;margin-top:2em">
    <div>
      Items
    </div>
    <div style="margin-left: 180px;">
      Cost (in ct)
    </div>
  </div>
  <div v-for="item in receipt.items" :key="item.id" class="p-fluid p-field row">
    <InputText :id="`item-label-${item.id}`" v-model="item.label" />
    <InputText :id="`item-cost-${item.id}`" v-model.number="item.cost" />
    <!-- <InputNumber :id="`item-cost-${item.id}`" v-model="inputCosts[index]"
                 mode="currency" currency="EUR"
    /> -->
  </div>
  <Button @click="receipt.addItem()">
    Add Item
  </Button>
  <!-- Empty fake items which add a new item when used. -->
  <!-- <div class="p-fluid p-field row">
    <InputText v-model="newItem.label" @input="onFakeItemInput" />
    <InputText v-model="newItem.cost" @input="onFakeItemInput" />
  </div> -->
  <div>
    <b>Total: {{ receipt.costInCurrency }} €</b>
  </div>
  <Button @click="onSaveClick">
    Save Receipt
  </Button>
</template>

<script>
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
//import InputNumber from 'primevue/inputnumber';

import store from '@/store';
import Receipt from '@/store/Receipt';
import { promptImageInput } from '@/utils';

export default {
  name: 'ReceiptEdit',
  components: {
    Button,
    AutoComplete,
    Calendar,
    InputText,
    //InputNumber,
  },
  data() {
    return {
      receipt: new Receipt(),
      suggestedVendors: [],
      exampleVendors: [
        'REWE',
        'LIDL',
        'real',
        'Edeka',
        'Kaufland',
        'PENNY Markt',
        'Naturgut',
        'ALDI Süd',
        'tegut',
        'Netto',
        'nahkauf',
        'Norma',
      ],
    };
  },
  watch: {
    '$route.params.dataURL': {
      immediate: true,
      handler(dataURL) {
        this.receipt.file = dataURL;
      },
    },
  },
  methods: {
    // onFakeItemInput() {
    //   const { label, cost } = this.newItem;
    //   if (label || cost) this.receipt.addItem({ label, cost: Number(cost) || undefined });
    //   this.newItem.cost = null;
    //   this.newItem.label = null;
    // },
    async onEditClick() {
      const dataURL = await promptImageInput();
      this.receipt.file = dataURL;
    },
    onSaveClick() {
      store.addReceipt(this.receipt);
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style lang="scss" scoped>
.receipt-image {
  position: relative;
  display: block;
  width: 100%;
  height: 20vh;
  background-size: cover;
  background-position: center center;
  border-radius: 0.5em;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(black, 0.5);
    z-index: 1;
  }
}

.row {
  display: flex;

 + .row {
   margin-top: 0.5em;
 }
}
</style>
