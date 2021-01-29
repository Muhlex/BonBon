<template>
  <!-- eslint-disable vue/attribute-hyphenation -->
  <div class="head">
    <h1>Receipts</h1>
  </div>

  <div
    v-if="!receipts.length"
  >
    <p>You did not add any purchases yet.</p>
    <p>Try adding a receipt using the button in the bottom right!</p>
  </div>

  <DataTable
    v-else
    id="receipt-list"
    :value="filteredReceipts"
    sortMode="single"
    sortField="date"
    :sortOrder="-1"
    class="p-datatable-striped"
    selectionMode="single"
    @rowClick="onRowClick"
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
          class="receipt-button edit-button p-button-outlined"
          @click="e => onEditClick(e, slotProps.data.id)"
        >
          <Icon name="edit" />
        </Button>
      </template>
    </Column>
  </DataTable>

  <p v-if="error">
    No Filters matching. Please change Filters or Reset.
  </p>

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
    onRowClick(event) {
      this.$router.push(`/receipts/${event.data.id}`);
    },
    onEditClick(event, receiptID) {
      event.stopPropagation();
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
    font-size: 0.875rem !important;
  }

  button {
    padding: 4px;
  }

  button + button {
    margin-left: 5px;
  }

  tr > th,
  tr > td {
    padding: 12px 8px !important;
    width: 33.3% !important;

    &:last-child {
      padding: 12px 8px 12px 0 !important;
      width: 40px !important;
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

.head {
  margin: -0.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: var(--surface-b);
}
</style>
