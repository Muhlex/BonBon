<template>
  <Button class="add-item">
    <!--
      AddItem Template
      * includes Button to upload File
      * FileUpload via Tag:Input Type:File Accept:Camera
        -> on MobileDevices Camera will be supportet instead of FileUpload
    -->

    <!-- Input using for FileUpload -->
    <label for="FileUpload" class="custom-file-upload">
      <!-- Icon pi-plus of PrimeIcons: https://www.primefaces.org/primevue/showcase/#/icons -->
      <i class="pi pi-plus" />
      
      <input
        id="FileUpload"
        ref="input"
        class="pi pi-plus"
        type="file"
        accept="image/*, application/pdf"
        capture="camera"
      >
    </label>
  </Button>
</template>

<script>
import Button from 'primevue/button';

export default {
  name: 'AddItem',
  components: {
    Button,
  },
  data() {
    return {
    };
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
