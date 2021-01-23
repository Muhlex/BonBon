<template>
  <div class="head">
    <h1>Receipts</h1>
  </div>

  <!-- Dummy-Data COntroles -->
  <div
    v-if="!hideDummyData" 
    class="dummy-data data-controles"
  >
    <button @click="addExampleReceipts">
      Add example receipts
    </button>
    <button @click="addExampleReceipt">
      Add single example receipt
    </button>
  </div>

  <DataTable
    id="receipt-list"
    :value="receipts"
    sortMode="single"
    sortField="date"
    :sortOrder="-1"
  >
    <Column 
      field="vendor"
      header="Vendor"
      :sortable="true"
    >
      <template #body="slotProps">
        {{ slotProps.data.vendor }}
      </template>
    </Column>
    <Column 
      field="date"
      header="Date"
      :sortable="true"
      class="test"
    >
      <template #body="slotProps">
        {{ slotProps.data.dateString }}
      </template>
    </Column>
    <Column 
      field="cost"
      header="Cost"
      :sortable="true"
    >
      <template #body="slotProps">
        {{ slotProps.data.costInCurrency }}
      </template>
    </Column>
    <Column 
      field="interaction"
    >
      <template #body="slotProps">
        <Button
          class="filter-button"
          @click="() => onEditClick(slotProps.data.id)"
        >
          <Icon name="edit" />
        </Button>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import store from '@/store';
import dateFormat from 'dateformat';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Icon from '@/components/Icon';

export default {
  name: 'ReceiptsList',
  components: {
    DataTable,
    Column,
    Button,
    Icon,
  },
  data() {
    return {
      store,
      expandedRows: [],
      // Dummy-Data Switch
      hideDummyData: false,
    };
  },
  computed: {
    receipts() {
      return store.receipts;
    },
  },
  created() {
    console.log(this.receipts);
  },
  mounted() {
    
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
    onViewClick(receiptID) {
      this.$router.push(`/receipts/${receiptID}`);
    },
    onEditClick(receiptID) {
      this.$router.push(`/receipts/${receiptID}/edit`);
    },
  },
};
</script>

<style lang="scss">
#receipt-list {
  margin-top: 16px;
  border: 1px solid lightgrey;
  border-radius: 8px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  span, p, td, button {
    font-size: 0.7rem !important;
    font-weight: 700;
  }

  button {
    padding: 4px;
  }

  tr > th,
  tr > td {
    padding: 12px 8px !important;
    width: 33.3% !important;

    &:last-child {
      padding: 12px 8px 12px 0 !important;
      width: 35px !important;
    }
  }
}
</style>

<style lang="scss" scoped>
// General Styles
// Lists
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

// Fonts
h1, h3, p {
  margin: 0;
}

h1 {
  text-align: center;
}

// Receipts Head Steyles
.head {
  // Box-Styles
  margin: 8px 0;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);

  // Color-Styles
  color: white;
  background: #2196F3;
}


// Dummy-Data Data-Controles
.data-controles {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 8px;

  button {
    font-size: 11px;
  }
}

</style>
