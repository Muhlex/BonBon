<template>
  <div class="fab" :class="{ 'open': open }">
    <Button class="p-button-rounded p-button-lg button-icon" @click="open = !open">
      <Icon name="add" />
    </Button>
    <transition name="shift-bottom">
      <div v-if="open" class="menu">
        <Button class="p-button-rounded button-icon p-button-outlined" @click="onCameraClick">
          <Icon name="camera" />
        </Button>
        <Button class="p-button-rounded button-icon p-button-outlined" @click="onUploadClick">
          <Icon name="image-add" />
        </Button>
        <Button class="p-button-rounded button-icon p-button-outlined" @click="onEmptyClick">
          <Icon name="draft" />
        </Button>
      </div>
    </transition>
  </div>
</template>

<script>
import Button from 'primevue/button';
import Icon from '@/components/Icon';
import { promptImageInput, convertImage } from '@/utils';

export default {
  name: 'AddReceiptFAB',
  components: {
    Button,
    Icon,
  },
  data() {
    return {
      open: false,
    };
  },
  watch: {
    open(isOpen) {
      // Listen for clicks outside to close the FAB when clicking anywhere else (on next tick).
      if (isOpen) window.setTimeout(() => document.addEventListener('click', this.onDocumentClick), 0);
      else document.removeEventListener('click', this.onDocumentClick);
    },
  },
  unmounted() {
    document.removeEventListener('click', this.onDocumentClick);
  },
  methods: {
    onDocumentClick() {
      // Don't do anything if the inside of the button was clicked.
      if (event.target === this.$el || this.$el.contains(event.target)) return;
      this.open = !this.open;
      document.removeEventListener('click', this.onDocumentClick);
    },
    onCameraClick() {
      this.requestFile(true);
    },
    onUploadClick() {
      this.requestFile(false);
    },
    onEmptyClick() {
      this.$router.push({ name: 'ReceiptNew' });
    },
    async requestFile(camera) {
      let dataURL = await promptImageInput(camera);
      dataURL = await convertImage(dataURL);
      this.$router.push({ name: 'ReceiptNew', params: { dataURL } });
    },
  },
};
</script>

<style lang="scss" scoped>
.fab {
  position: fixed;
  bottom: 16px;
  right: 16px;

  // Due to using our own icons we need to override the padding a text button would receive
  ::v-deep(.button-icon) {
    padding: 0.625rem;
  }
  ::v-deep(.p-button-outlined) {
    background-color: white;
  }

  > button i { transition: transform 300ms ease }
  &.open > button i { transform: rotate(45 * 3deg); }
}

.menu {
  position: absolute;
  z-index: -1;
  bottom: calc(100% + 0.5em);
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  > button + button {
    margin-bottom: 0.5em;
  }
}

.shift-bottom-enter-active,
.shift-bottom-leave-active {
  transition: opacity 300ms ease;
}
.shift-bottom-enter-active {
  > button { transition: transform ease-out; }
}
.shift-bottom-leave-active {
  > button { transition: transform ease-in; }
}
.shift-bottom-enter-active {
  @for $i from 0 through 2 {
    > button:nth-child(#{3 - $i}) {
      transition-duration: 100ms * ($i + 1);
    }
  }
}
.shift-bottom-leave-active {
  @for $i from 0 through 2 {
    > button:nth-child(#{$i + 1}) {
      transition-delay: 25ms * $i;
      transition-duration: 100ms * ($i + 1);
    }
  }
}
.shift-bottom-enter-from,
.shift-bottom-leave-to {
  opacity: 0;
  > button { transform: translateY(100%); }
}
</style>
