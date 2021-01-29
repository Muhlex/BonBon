<template>
  <transition name="slide-bottom">
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
            ref="vendorInput"
            v-model="vendor"
            :dropdown="true"
            :suggestions="suggestedVendors"
            @complete="onVendorInput($event)"
          />
        </div>

        <!-- Price Filter -->
        <div class="filter-area filter-area-price">
          <label for="filter-price" class="area-label">Filter by Price Range</label>
          <div
            id="filter-price"
            class="filter-price-input"
          >
            <div class="price-input-container min-price">
              <label for="input-min-price">minimum (in €)</label>
              <input
                id="input-min-price"
                ref="minPrice"
                class="price-input"
                type="number"
                @change="setPriceRange($event, 'minPrice')"
              >
            </div>
            <div class="price-input-container max-price">
              <label for="input-max-price">maximum (in €)</label>
              <input
                id="input-max-price"
                ref="maxPrice"
                class="price-input"
                type="number"
                @change="setPriceRange($event, 'maxPrice')"
              >
            </div>
          </div>
        </div>

        <!-- Date Filter -->
        <div class="filter-area filter-area-date">
          <label for="datepicker-component" class="area-label">Filter by Date</label>
          <Datepicker
            id="datepicker-component"
            ref="datepicker"
            class="filter-datepicker"
            @submit="getDateSelection"
          />
        </div>

        <!-- Filter Submit -->
        <div class="filter-area filter-area-submit">
          <Button class="filter-btn p-button-outlined" @click="reset($event, true)">
            Reset Filter
          </Button>
          <Button class="filter-btn" @click="setFilter($event)">
            Set Filter
          </Button>
        </div>
      </div>
    </div>
  </transition>
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
    'submitFilter',
  ],
  data() {
    return {
      vendor: null,
      suggestedVendors: [],
      priceRange: [],
      dateSelection: null,
    };
  },
  computed: {
    receipts() {
      return this.store.receipts;
    },
  },
  methods: {
    closeOverlay() {
      this.$emit('update:open', false);
    },
    onVendorInput({ query }) {
      this.suggestedVendors = Array.from(this.store.knownVendors).filter(vendors => {
        return vendors.toLowerCase().includes(query.toLowerCase());
      });
    },
    setPriceRange(e, value) {
      value === 'minPrice' ?
        this.priceRange[0] = parseFloat(e.target.value):
        this.priceRange[1] = parseFloat(e.target.value);

      if(!this.priceRange[0]) this.priceRange[0] = 0;
    },
    getDateSelection(selection) {
      this.dateSelection = selection;
    },
    setFilter(e) {
      this.$emit('update:open', false);
      this.$emit('submitFilter',{
        vendor: this.vendor,
        cost: this.priceRange,
        timestamp: this.dateSelection,
      });

      this.reset(e);
    },
    reset(e, clear = false) {
      this.$refs.datepicker.reset(e);
      this.vendor = null;
      this.priceRange = [];

      if (clear) {
        this.$emit('submitFilter',{});
      }

      this.$emit('update:open', false);
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
  max-width: 480px;
  padding: 16px;
  margin: 0.5em;
  margin-top: 1em;
  background: white;
  border-radius: 3px;
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
    cursor: pointer;
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

.filter-btn + .filter-btn {
  margin-left: 10px;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: opacity 300ms ease;

  .filter-overview {
    transition: transform 300ms ease;
  }
}

.slide-bottom-enter-from,
.slide-bottom-leave-to {
  opacity: 0;

  .filter-overview {
    transform: translateY(64px);
  }
}
</style>
