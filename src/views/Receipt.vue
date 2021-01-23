<template>
  <!-- eslint-disable vue/attribute-hyphenation -->
  <h2>{{ receipt.vendor }} <small>{{ receipt.dateString }}</small></h2>
  <PanZoomImage
    v-if="receipt.file"
    class="receipt-image-container"
    :class="{ 'receipt-image-expanded': imageExpanded }"
    :src="receipt.file"
    @click="imageExpanded = !imageExpanded"
  />
  <DataTable
    :value="tableItems"
    removableSort
    class="p-datatable-sm p-datatable-striped"
  >
    <Column
      header="Product"
      field="label"
      :sortable="true"
    >
      <template #body="item">
        <span :class="{ 'unknown-item': item.data.unknown }">{{ item.data.label }}</span>
      </template>
    </Column>
    <Column
      header="Price (in €)"
      field="costInCurrency"
      :sortable="true"
      bodyStyle="text-align: right;"
      headerStyle="text-align: right; width: 40%;"
    />
    <template #footer>
      <table>
        <tr>
          <td>Total</td>
          <td style="text-align: right; width: 40%;">
            {{ receipt.costInCurrency }}
          </td>
        </tr>
      </table>
    </template>
  </DataTable>
  <div class="button-group">
    <Button @click="onReceiptEdit">
      <Icon name="edit" />Edit
    </Button>
    <Button class="p-button-danger icon-button" @click="displayDeleteModal = true">
      <Icon name="delete" altText="Delete" />
    </Button>
    <Dialog v-model:visible="displayDeleteModal" modal dismissableMask class="modal">
      <template #header>
        <h3>Delete Receipt</h3>
      </template>
      Are you sure you want to delete this receipt? This cannot be undone.
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" autofocus @click="displayDeleteModal = false" />
        <Button label="Yes" icon="pi pi-check" class="p-button-danger" @click="onReceiptDeleteConfirm" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import store from '@/store';

import PanZoomImage from '@/components/PanZoomImage';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Icon from '@/components/Icon';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  name: 'ReceiptEdit',
  components: {
    PanZoomImage,
    Button,
    Dialog,
    Icon,
    DataTable,
    Column,
  },
  data() {
    return {
      receipt: undefined,
      imageExpanded: false,
      displayDeleteModal: false,
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
  },
  methods: {
    onReceiptEdit() {
      this.$router.push(`/receipts/${this.receipt.id}/edit`);
    },
    onReceiptDeleteConfirm() {
      store.deleteReceipt(this.receipt.id);
      this.$router.push('/receipts');
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin-top: 0;
}

.receipt-image-container {
  height: 20vh;
  border-radius: 0.5em;
  cursor: pointer;

  transition: height 200ms ease;

  &.receipt-image-expanded {
    height: 75vh;

    &::v-deep(img) {
      min-height: 100%;
      object-fit: cover;
    }
  }
}

.p-datatable {
  margin-top: 1em;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  margin: 1em 0;

  button + button { margin-left: 0.5em; }
}

.p-button:not(.icon-button) {
  ::v-deep(i) { margin-right: 0.25em; }
}

.icon-button {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

::v-deep(.modal) {
  margin: 8px;
}

.unknown-item {
  color: var(--text-color-secondary);
  font-style: italic;
}
</style>
