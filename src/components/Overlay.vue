<template>
  <!-- 
    Overlay-Compoenent
    * Open/Close Overlay
    * Adding Class to Body-Tag to prevent scrolling on Overlay: open == true

    Overlay-Div as Wrapper-Element
  -->
  <div
    v-if="open"
    class="overlay"
  >
    <!-- 
      Content-Wrapper contains Content-Elemets.
      * ContentElements added via Slot
      * Seperatet Closing-Element
    -->
    <div class="overlay-content">
      <div 
        class="overlay-close"
        @click="close"
      >
        <i class="pi pi-times" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Overlay',
  components: {
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  //Registration of Emits – new Vue3 Syntax
  emits: [
    'update:open',
    'close',
  ],
  data() {
    return {
    };
  },
  computed: {
    getOpen() {
      return this.open;
    },
  },
  beforeUpdate() {
    // LifecycleHook tracked on Updating Data inside Component
    this.open == false ?
      document.body.classList.remove('overlay-open'):
      document.body.classList.add('overlay-open');
  },
  beforeUnmount() {
    // LifecycleHook same as beforeDestroyed
    document.body.classList.remove('overlay-open');
  },
  methods: {
    close() {
      // Updating Open-State to avoid PropMutation
      this.$emit('update:open', false);
      // Emitting CloseEvent
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
  .overlay-open {
    overflow: hidden;
  }
</style>

<style lang="scss" scoped>
  .overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background: lime
  }

  .overlay-content {
    // Just for Testing
    width: 90%;
    height: 90%;

    background: pink;

    /*
      TO-DO:
      * Overlay-Content on Mobile full Width/Height
      * Overlay-Content on Desktop 80 to 90% of Width/Height ?! 
    */
  }

  .pi-times {
    font-size: 2rem;
  }
</style>
