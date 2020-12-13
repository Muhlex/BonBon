<template>
  <Button class="add-item">
    <!--
      AddItem Template
      * includes Button to upload File
      * FileUpload via Tag:Input Type:File Accept:Camera
        -> on MobileDevices Camera will be supportet instead of FileUpload
      

      Label wraps hidden Input and Icon to fake an Button.
      Through the Label-Tag its possible to hide Input-Tag but still have Access to it
    -->
    <label for="FileUpload" class="custom-file-upload">
      <!-- Icon pi-plus of PrimeIcons: https://www.primefaces.org/primevue/showcase/#/icons -->
      <i class="pi pi-plus" />
      <!--
        Input using for FileUpload 
        Captur the Camera on mobile Device or FileUpload on DektopMachine/Laptop
      -->
      <input
        id="FileUpload"
        ref="input"
        class="pi pi-plus"
        type="file"
        accept="image/*, application/pdf"
        capture="camera"
        @change="open = true"
      >
      <!--
          TO-DO:
          * Save File-Data at Store
          * Make File-Data usable using FileReader-Object (JS)
      -->
    </label>
  </Button>

  <Overlay 
    v-model:open="open"
    @close="resetInput"
  />
</template>

<script>
import Button from 'primevue/button';
import Overlay from './Overlay';

export default {
  name: 'AddItem',
  components: {
    Button,
    Overlay,
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    resetInput() {
      // Reset Value of Input at CloseEvent of Overlay-Component
      this.$refs.input.value = '';
    },
  },
};
</script>

<style lang="scss" scoped>
  .add-item {
    padding: 0 !important;
    border-radius: 50%;
  }

  .custom-file-upload {
    cursor: pointer;
  }

  #FileUpload {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    visibility: hidden;
  }

  i {
    padding: 5px;
    font-size: 2rem;
  }
</style>
