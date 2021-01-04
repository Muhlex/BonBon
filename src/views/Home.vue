<template>
  <div class="header">
    <h1>BonBon</h1>
    <h2>Digital Receipt Management</h2>
  </div>
  <div class="row">
    <router-link to="/receipts" class="p-button p-button-outlined card-button">
      <Icon name="receipt" />
      <div>Receipts</div>
      <small>A list of your most recent purchases</small>
    </router-link>
    <router-link to="/stats" class="p-button p-button-outlined card-button">
      <Icon name="stats" />
      <div>Statistics</div>
      <small>Check out your housekeeping records</small>
    </router-link>
  </div>
  <div class="row">
    <router-link to="/" class="p-button p-button-outlined card-button card-receipt"
                 :style="{ 'background-color': 'indigo' }"
    >
      <h3>ReceiptTitle</h3>
      Date
    </router-link>
  </div>
</template>

<script>
import Icon from '@/components/Icon';

export default {
  name: 'Home',
  components: {
    Icon,
  },
};
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
}

.row {
  display: flex;
  margin-top: 2em;
  > * { width: 100%; }
  > * + * { margin-left: 8px; }
}

.card-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}

.card-receipt {

}
</style>
