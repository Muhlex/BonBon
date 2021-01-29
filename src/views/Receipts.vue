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
    :value="filteredReceipts"
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
      <template #header>
        <Button
          class="filter-button set-filter"
          @click="() => open = true"
        >
          <Icon name="filter" />
        </Button>
      </template>
      <template #body="slotProps">
        <Button
          class="receipt-button view-button"
          @click="() => onViewClick(slotProps.data.id)"
        >
          <Icon name="view" />
        </Button>
        <Button
          class="receipt-button edit-button p-button-outlined"
          @click="() => onEditClick(slotProps.data.id)"
        >
          <Icon name="edit" />
        </Button>
      </template>
    </Column>
  </DataTable>

  <p v-if="error">No Filters matching. Please change Filters or Reset.</p>

  <FilterOverlay 
    v-model:store="store"
    v-model:open="open"
    @submitFilter="setFilters"
  />
</template>

<script>
import store from '@/store';
// import dateFormat from 'dateformat';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Icon from '@/components/Icon';

import FilterOverlay from '@/components/FilterOverlay';

export default {
  name: 'ReceiptsList',
  components: {
    DataTable,
    Column,
    Button,
    Icon,
    // Filter
    FilterOverlay,
  },
  data() {
    return {
      store,
      // FILTER DATA
      //Overlay Open;
      open: false,
      filters: {},
      // Dummy-Data Switch
      hideDummyData: false,
      myRecepits: this.receipts,
      // Error
      error: false,
    };
  },
  computed: {
    receipts() {
      return store.receipts;
    },
    filteredReceipts() {
      return this.filterReceipts();
    },
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
    setFilters(filters) {
      this.filters = filters;
      this.filterReceipts();
    },
    filterReceipts() {
      this.error = false;
      
      const f = this.filters;
      const filteredReceipts = [];

      if(Object.keys(f).length === 0) return this.receipts;

      this.receipts.filter(r => {
        const match = [];
        // Filter through FiltersArray
        Object.keys(this.filters).forEach(k => {
          switch(k) {
            case 'vendor':
              if(f[k] !== null) {
                r.vendor === f[k] ? match.push(true) : match.push(false);
              }
              break;
            case 'cost':
              if (f[k].length > 0) {
                //min-max-range
                if(f[k].length > 1) {
                  r.floatCost >= f[k][0] && r.floatCost <= f[k][1] ? match.push(true) : match.push(false);
                  break;
                }
                // min-range
                r.floatCost >= f[k][0] ? match.push(true) : match.push(false);
              }
              break;
            case 'timestamp':
              if(f[k] !== null) {
                r.date >= f[k][0] && r.date <= f[k][1] ? match.push(true) : match.push(false);
              }
              break;
          }
        });
        if (match.every(b => b === true)) filteredReceipts.push(r);
      });
      if(filteredReceipts.length === 0) this.error = true;
      return filteredReceipts;
    },
  },
};
</script>

<style lang="scss">
#receipt-list {
  margin-top: 16px;
  overflow: hidden;

  span, p, td, button {
    font-size: 0.7rem !important;
    font-weight: 700;
  }

  button {
    padding: 4px;
  }

  button + button{
    margin-left: 5px;
  }

  tr > th,
  tr > td {
    padding: 12px 8px !important;
    width: 33.3% !important;

    &:last-child {
      padding: 12px 8px 12px 0 !important;
      width: 75px !important;
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
