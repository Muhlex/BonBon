<template>
  Statistics view coming soon!
</template>

<script>
import store from '@/store';
import Datepicker from '@/components/Datepicker';
import Button from 'primevue/button';


export default {
  name: 'Stats',
  components: {
    Button,
    Datepicker,
  },
  data() {
    return {
      date: null,
    };
  },
  computed: {
    recentReceipts() {
      return store.getReceiptsSortedByDate().slice(-5).reverse();
    },
  },
  mounted() {
    console.log(this.recentReceipts);
  },
};
</script>

<style lang="scss" scoped>
// General-Styles @App.vue
div {
  padding: 15px;
}

.header {
  margin: 0;
  text-align: center;

  h1 {
    color: #2196F3;
  }

  h1, p {
    margin: 0;
  }
}
</style>
