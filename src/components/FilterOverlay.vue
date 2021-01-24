<template>
  <div
    v-if="open"
    class="filter-overview-container"
  >
    <div class="filter-overview">
      <h2>
        Filter
        <Icon 
          class="close-icon"
          name="close"
          @click="closeOverlay"
        />
      </h2>

      <!-- Filter Content -->
      <!-- Vendor Filter -->
      <div class="filter-area filter-area-vendor">
        <label for="filter-vendor" class="area-label">Filter by Vendor</label>
        <AutoComplete
          id="filter-vendor"
          v-model="vendor"
          :dropdown="true"
          :suggestions="suggestedVendors"
          @complete="onInput($event)"
        />
      </div>

      <!-- Price Filter -->
      <div class="filter-area filter-area-price">
        <label for="filter-price" class="area-label">Filter by Price</label>
        <div
          id="filter-price"
          class="filter-price-input"
        >
          <div class="price-input-container min-price">
            <label for="input-min-price">min Price</label>
            <input id="input-min-price" class="price-input" type="number" placeholder="0">
          </div>
          <div class="price-input-container max-price">
            <label for="input-max-price">max Price</label>
            <input id="input-max-price" class="price-input" type="number" placeholder="0">
          </div>
        </div>
      </div>

      <!-- Date Filter -->
      <div class="filter-area filter-area-date">
        <label for="datepicker-component" class="area-label">Filter by Date</label>
        <Datepicker id="datepicker-component" class="filter-datepicker" />
      </div>

      <!-- Filter Submit -->
      <div class="filter-area filter-area-submit">
        <Button>Set Filter</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon';
import Datepicker from '@/components/Datepicker';
import AutoComplete from 'primevue/autocomplete';
import Button from 'primevue/button';

export default {
  name: 'FilterOverview',
  components: {
    Icon,
    Datepicker,
    AutoComplete,
    Button,
  },
  props: {
    store: {
      type: Object,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'update:open',
  ],
  data() {
    return {
      // DATA VENODR-FILTER
      vendor: null,
      suggestedVendors: [],
      // DATA PRICE-FILTER
      minPrice: null,
      maxPrice: null,
    };
  },
  computed: {
    receipts() {
      return this.store.receipts;
    },
  },
  methods: {
    closeOverlay() {
      console.log('closeOverlay triggered');
      this.$emit('update:open', false);
    },
    onInput({ query }) {
      this.suggestedVendors = Array.from(this.store.knownVendors).filter(vendors => {
        return vendors.toLowerCase().includes(query.toLowerCase());
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-overview-container {
  display: flex;
  justify-content: center;
  align-items: center;;
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;
}

.filter-overview {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 16px;
  background: white;
  border-radius: 8px;
}

h2 {
  position: relative;
  margin: 0;
  text-align: center;

  .close-icon {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
}

.filter-area {
  margin-top: 16px;

  label {
    display: block;
    margin-bottom: 8px;

    &.area-label {
      font-weight: 700;
    }
  }

  .p-autocomplete {
    width: 100%;
  }
}

.filter-price-input {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .price-input-container {
    padding: 4px;
    width: 50%;

    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 1rem;
    }
  }
}

.filter-datepicker {
  width: 100%;
}

.filter-area-submit {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
