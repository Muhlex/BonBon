<template>
  <main>
    <router-view />
  </main>
  <div class="bottom">
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

<script>
import AppBar from '@/components/AppBar';
import AddReceiptFAB from '@/components/AddReceiptFAB';

export default {
  name: 'App',
  components: {
    AppBar,
    AddReceiptFAB,
  },
  computed: {
    displayFAB() {
      const path = this.$route.fullPath;
      const match = '/receipts';
      return !(path.startsWith(match) && path.length > match.length);
    },
    showFABTutorial() {
      return this.$route.fullPath === '/';
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding-bottom: 96px;
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
  padding: 0 8px;
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: none;
  > * { pointer-events: all; }

  .fab-container {
    padding: 0 12px 16px 0;
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
