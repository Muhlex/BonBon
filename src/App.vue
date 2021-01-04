<template>
  <main>
    <router-view />
  </main>
  <div class="bottom">
    <div class="fab-container">
      <transition name="pop">
        <AddReceiptFAB v-if="displayFAB" />
      </transition>
    </div>
    <AppBar />
  </div>
</template>

<script>
import AppBar from '@/components/AppBar';
import AddReceiptFAB from '@/components/AddReceiptFAB';

export default {
  name: 'App',
  components: {
    AppBar,
    AddReceiptFAB,
  },
  data() {
    return {
      displayFAB: undefined,
    };
  },
  watch: {
    $route(to) {
      const path = to.fullPath;
      if (path.startsWith('/receipts') && path.length > 10) this.displayFAB = false;
      else this.displayFAB = true;
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding-bottom: 64px;
}

#app {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);

  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  margin-top: 1em;
  margin-bottom: 0.5em;
}
</style>

<style lang="scss" scoped>
main {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 8px;
}

.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: none;
  > * { pointer-events: all; }

  .fab-container {
    padding: 0 12px 12px 0;
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

</style>
