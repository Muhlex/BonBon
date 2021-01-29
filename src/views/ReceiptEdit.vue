<template>
  <!-- eslint-disable vue/attribute-hyphenation -->
  <div class="fixed-content">
    <div class="input-group">
      <label for="receipt-edit-date">Date of purchase</label>
      <Calendar id="receipt-edit-date" v-model="receipt.date" date-format="dd.mm.yy" />
    </div>
    <div class="input-group">
      <label for="receipt-edit-vendor">Vendor</label>
      <AutoComplete id="receipt-edit-vendor" v-model="receipt.vendor" dropdown :suggestions="suggestedVendors"
                    @complete="onVendorInput"
      />
    </div>
    <template v-if="receipt.file">
      <PanZoomImage
        class="receipt-image-container"
        :src="receipt.file"
      />
      <Button class="icon-button" @click="onFileEdit">
        <Icon name="edit" alt="Edit Image" />
      </Button>
    </template>
    <button v-else class="receipt-image-container receipt-no-image" @click="onFileEdit">
      <Icon name="image-add" alt="Add image file" fill="white" size="2em" />
    </button>
  </div>

  <div class="static-content">
    <DataTable
      :value="tableItems"
      class="p-datatable-sm p-datatable-striped"
    >
      <Column headerStyle="width: 58px;">
        <template #body="item">
          <Button class="icon-button p-button-secondary p-button-outlined" @click="onItemDeleteClick(item.data.id)">
            <Icon name="delete" alt="Delete Product" />
          </Button>
        </template>
      </Column>
      <Column
        header="Product"
      >
        <template #body="item">
          <span v-if="item.data.unknown" class="unknown-item">{{ item.data.label }}</span>
          <InputText v-else v-model="item.data.label" />
        </template>
      </Column>
      <Column
        header="Price"
        headerStyle="width: 40%;"
      >
        <template #body="item">
          <span v-if="item.data.unknown">{{ item.data.costInCurrency }} €</span>
          <InputNumber v-else v-model="item.data.floatCost" mode="currency" currency="EUR" />
        </template>
      </Column>
      <template #footer>
        <Button style="padding-left: 0.5rem; margin: 0.5rem" @click="onAddItem">
          <Icon name="add" />Add Item
        </Button>
        <table>
          <tr>
            <td style="padding-left: 1rem">
              Total
            </td>
            <td style="width: 40%; padding: 0.5rem; margin: -0.5rem; margin-left: 0rem">
              <div class="p-inputgroup" :class="{ 'reset-available': receipt.hasUnknownItems }">
                <InputNumber v-model="receipt.floatCost" mode="currency" currency="EUR" />
                <Button v-if="receipt.hasUnknownItems" @click="onTotalReset">
                  <Icon name="delete-back" />
                </Button>
              </div>
            </td>
          </tr>
        </table>
      </template>
    </DataTable>
    <Button class="button-block" @click="onSaveClick">
      Save Receipt
    </Button>
  </div>
</template>

<script>
import PanZoomImage from '@/components/PanZoomImage';
import Icon from '@/components/Icon';
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
import Calendar from 'primevue/calendar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';

import store from '@/store';
import Receipt from '@/store/Receipt';
import { promptImageInput, convertImage } from '@/utils';

export default {
  name: 'ReceiptEdit',
  components: {
    PanZoomImage,
    Icon,
    Button,
    AutoComplete,
    Calendar,
    DataTable,
    Column,
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
  computed: {
    tableItems() {
      const items = [...this.receipt.items];
      if (this.receipt.hasUnknownItems) items.push(
        { label: 'Other', costInCurrency: this.receipt.unknownItemsCostInCurrency, unknown: true },
      );
      return items;
    },
  },
  created() {
    if (this.$route.params.id) this.receipt = store.getReceiptById(this.$route.params.id);
    else if (this.$route.params.dataURL) this.receipt.file = this.$route.params.dataURL;
  },
  unmounted() {
    this.cleanItems();
    if (this.receipt.id) store.updateReceipt(this.receipt);
  },
  methods: {
    onAddItem() {
      this.receipt.addItem();
    },
    onItemDeleteClick(id) {
      this.receipt.deleteItem(id);
    },
    onVendorInput({ query }) {
      this.suggestedVendors = Array.from(store.knownVendors).filter(vendors => {
        return vendors.toLowerCase().includes(query.toLowerCase());
      });
    },
    onTotalReset() {
      this.receipt.resetCostOverride();
    },
    async onFileEdit() {
      let dataURL = await promptImageInput(false);
      dataURL = await convertImage(dataURL);
      this.receipt.file = dataURL;
    },
    onSaveClick() {
      this.cleanItems();
      if (this.receipt.id) store.updateReceipt(this.receipt);
      else store.addReceipt(this.receipt);
      this.$router.back();
    },
    cleanItems() {
      // Removes empty items
      this.receipt.items = this.receipt.items.filter(({ label, cost }) => label || cost);
    },
  },
};
</script>

<style lang="scss" scoped>
$fixedHeight: 40vh;

.fixed-content {
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 100%;
  max-width: inherit;
  height: $fixedHeight;
  margin-left: -8px;
  padding: 0 8px 8px;
  background-color: var(--surface-a);
  border-bottom: 1px solid var(--surface-d);

  .receipt-image-container {
    height: 100%;
    border-radius: 0.5em;

    + button {
      position: absolute;
      bottom: 16px;
      right: 16px;
    }

    &.receipt-no-image {
      border: none;
      padding: 0;
      margin: 0;
      font-size: inherit;
      color: inherit;
      background: none;
      text-decoration: none;
      -webkit-appearance: none;
      -moz-appearance: none;

      height: 100%;
      background-color: rgba(black, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}

.static-content {
  padding-top: $fixedHeight;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5em;

  label {
    font-size: 0.875em;
    font-weight: bold;
  }
}

.p-inputtext, .p-inputnumber {
  width: 100%;
  ::v-deep(.p-inputnumber-input) { width: 100%; }
}

.p-button:not(.icon-button):not(.reset-total-button) {
  ::v-deep(i) { margin-right: 0.25em; }
}

::v-deep(.p-datatable.p-datatable-sm .p-datatable-footer) {
  padding: 0;

  td {
    padding: 0.5rem;
  }
}

.icon-button {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.reset-available {
  button {
    flex-shrink: 0;
    padding: 0.5rem;

    i { margin: 0 !important; }
  }

  span ::v-deep(input) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.button-block {
  display: block;
  margin: 0.5rem;
  width: calc(100% - 1rem);
}

.unknown-item {
  color: var(--text-color-secondary);
  font-style: italic;
}
</style>
