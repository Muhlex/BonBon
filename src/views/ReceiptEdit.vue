<template>
  <div
    class="receipt-image"
    :style="{ 'background-image': `url(${receipt.file})` }"
  >
    <Button class="p-button-sm" style="position:absolute;bottom:8px;right:8px;z-index:2" @click="onEditClick">
      Edit receipt image
    </Button>
  </div>

  <div style="margin-top:0.5em">
    Date
    <Calendar v-model="receipt.date" date-format="dd.mm.yy" />
  </div>
  <div style="margin-top:1em">
    Vendor
    <AutoComplete v-model="receipt.vendor" dropdown :suggestions="suggestedVendors"
                  @complete="$event => suggestedVendors = exampleVendors.filter(v => v.toLowerCase().includes($event.query.toLowerCase()))"
    />
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
    <InputNumber :id="`item-cost-${item.id}`" v-model="item.floatCost"
                 mode="currency" currency="EUR"
    />
  </div>
  <Button @click="receipt.addItem()">
    Add Item
  </Button>
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
import InputNumber from 'primevue/inputnumber';

import store from '@/store';
import Receipt from '@/store/Receipt';
import { promptImageInput, convertImage } from '@/utils';

export default {
  name: 'ReceiptEdit',
  components: {
    Button,
    AutoComplete,
    Calendar,
    InputText,
    InputNumber,
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
  created() {
    if (this.$route.params.dataURL) this.receipt.file = this.$route.params.dataURL;
  },
  methods: {
    async onEditClick() {
      let dataURL = await promptImageInput(false); // TODO: Allow cam input
      dataURL = await convertImage(dataURL);
      this.receipt.file = dataURL;
    },
    onSaveClick() {
      store.addReceipt(this.receipt);
      this.$router.back();
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
    background-color: rgba(black, 0.33);
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
