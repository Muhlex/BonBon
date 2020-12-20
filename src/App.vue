<template>
  <transition name="pop">
    <AddReceiptFAB v-if="displayFAB" />
  </transition>
  <main>
    <nav>
      <router-link to="/">
        Receipts
      </router-link>
    </nav>
    <div>
      <router-view />
    </div>
  </main>
</template>

<script>
import AddReceiptFAB from '@/components/AddReceiptFAB';

export default {
  name: 'App',
  components: {
    AddReceiptFAB,
  },
  data() {
    return {
      displayFAB: undefined,
    };
  },
  watch: {
    $route(to) {
      if (to.fullPath.startsWith('/receipt')) this.displayFAB = false;
      else this.displayFAB = true;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<style lang="scss" scoped>
main {
  max-width: 1280px;
  margin: 0 auto;
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
