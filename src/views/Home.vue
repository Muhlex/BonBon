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
  <div v-if="recentReceipts.length" class="recent-receipts">
    <h3>Recent purchases</h3>
    <div v-for="receipt in recentReceipts" :key="receipt.id" class="row">
      <router-link to="/" class="p-button p-button-outlined card-button card-receipt"
                   :style="{ 'background-image': `url(${receipt.file})` }"
      >
        <div class="text">
          <h3>{{ receipt.vendor }}</h3>
          <span>
            {{ receipt.dateString }}
            <small>{{ receipt.costInCurrency }}€</small>
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import Icon from '@/components/Icon';

export default {
  name: 'Home',
  components: {
    Icon,
  },
  computed: {
    recentReceipts() {
      return store.getReceiptsSortedByDate().slice(-5);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
  margin-bottom: 2em;
  margin-top: 8px;
  padding: 1em;
  background-color: var(--surface-b);
  border-radius: 3px;

  &::v-deep(.p-card-title) { font-size: 1em;}

  h1 { margin: 0; }
  h2 { font-size: 1em }
}

.row {
  display: flex;
  + .row { margin-top: 1em; }
  > * { width: 100%; }
  > * + * { margin-left: 8px; }
  &:last-child { padding-bottom: 64px; }
}

.recent-receipts {
  margin-top: 2em;
}

.card-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}

.card-receipt {
  height: 25vh;
  padding: 0;
  align-items: flex-start;
  justify-content: flex-end;
  text-align: left;

  background-size: cover;
  background-position: center 20%;
  background-repeat: no-repeat;

  .text {
    width: 100%;
    padding: 32px 16px 8px;
    background-image: linear-gradient(
      to top,
      rgba(white, 0.9) 0%,
      rgba(white, 0.75) 50%,
      rgba(white, 0.65) 60%,
      rgba(white, 0.1) 90%,
      rgba(white, 0) 100%
    );

    h3 { margin: 0; }
  }

}
</style>
