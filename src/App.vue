<template>
  <teleport to="head">
    <title>BonBon &ndash; Receipt Manager</title>
  </teleport>

  <main v-if="!store || !store.authInitialized || store.user && !store.dataInitialized" class="loading">
    <ProgressSpinner />
  </main>
  <template v-else>
    <main>
      <router-view />
    </main>
    <div v-if="store.user" class="bottom">
      <div class="fab-container" :class="{ 'fab-show-tutorial': showFABTutorial }">
        <transition name="slide-in-right">
          <div v-if="showFABTutorial" class="tutorial">
            Add a purchase from anywhere with this button
          </div>
        </transition>
        <transition name="pop">
          <AddReceiptFAB v-if="displayFAB" />
        </transition>
      </div>
      <AppBar />
    </div>
  </template>
</template>

<script>
import store from '@/store';
import ProgressSpinner from 'primevue/progressspinner';
import AppBar from '@/components/AppBar';
import AddReceiptFAB from '@/components/AddReceiptFAB';

export default {
  name: 'App',
  components: {
    ProgressSpinner,
    AppBar,
    AddReceiptFAB,
  },
  computed: {
    store() {
      return store;
    },
    displayFAB() {
      return !['ReceiptNew', 'ReceiptEdit', 'Receipt'].includes(this.$route.name);
    },
    showFABTutorial() {
      return this.$route.name === 'Home';
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  overflow-y: scroll;
}

#app {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

@keyframes p-progress-spinner-color {
  0%, 100% { stroke: var(--primary-color); }
}
</style>

<style lang="scss" scoped>
main {
  width: 100%;
  min-height: 100vh;
  max-width: 680px;
  margin: 0 auto;
  padding: 8px 8px 0;
  padding-bottom: 96px;

  &.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 0;
  }
}

.bottom {
  max-width: 680px;
  margin: 0 auto;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: none;
  > * { pointer-events: all; }

  .fab-container {
    padding: 0 12px 16px 0;
  }

  .tutorial {
    display: none; // Fix for showFABTutorial updating a frame after route change
  }

  .fab-show-tutorial {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    background-color: var(--surface-c);
    border-radius: 99999px;
    margin: 0 4px 8px;
    width: calc(100% - 4px * 2);

    .tutorial {
      display: block;
      padding: 0.25em 1em;
    }
  }
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 300ms ease;
}

.pop-enter-from,
.pop-leave-to {
  transform: scale(0);
}

.slide-in-right-enter-active {
  transition: 300ms ease;
  transition-property: opacity, transform;
}

.slide-in-right-enter-from {
  opacity: 0;
  transform: translateX(64px);
}

</style>
