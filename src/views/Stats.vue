<template>
  Statistics view coming soon!
</template>

<script>
import store from '@/store';
import dateFormat from 'dateformat';
import Datepicker from '@/components/Datepicker';
import Button from 'primevue/button';
import Icon from '@/components/Icon';


export default {
  name: 'Stats',
  components: {
    Datepicker,
    Button,
    Icon,
  },
  data() {
    return {
      date: null,
      dateSelection: [],
      dateStrings: [],
    };
  },
  computed: {
    recentReceipts() {
      return store.getReceiptsSortedByDate().slice(-5).reverse();
    },
  },
  mounted() {
    this.dateSelection.push(new Date());
    this.convertDate();
    console.log(this.dateStrings);
  },
  methods: {
    getDateRange(selection) {
      this.dateSelection = selection;
      this.convertDate();
    },
    convertDate() {
      this.dateSelection.forEach(date => {
        this.dateStrings.push(dateFormat(date, 'dd.mm.yyyy'));
      });

      console.log(this.dateStrings);
    },
  },
};
</script>

<style lang="scss" scoped>
// General-Styles @App.vue
div {
  padding: 15px;
}

h1, p {
  margin: 0;
}

.header {
  margin: 0;
  text-align: center;

  h1 {
    color: #2196F3;
  }
}

.date-filter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .date-current {
    margin-bottom: 16px;
  }

  .filter-button p {
    margin-left: 8px;
  }
}
</style>
