<template>
  <!--
    New Receip Form
    * includes selected File
    * Form with 
      * Datepicker || current Date 
      * Name of Vendor -> Has to be formatted
      * Price range
      * Kategory 
        -> Object of given Categories
        -> Possibility to add Custom Categories -> also aviable at Statistics
  -->
  <div class="form-container">
    <!-- 
      Selectetd File
        * Show Thumbnail and Name
        * EditingOption
    -->
    <div class="file-preview">
      <!-- Selected File Elements here -->
      <img :src="src" alt="">
    </div>

    <!-- 
      New Receipt Form here
    -->
    <form action="submit" method="post">
      <!-- ReceiptForm-Elements here -->
    </form>
  </div>
</template>

<script>
import Button from 'primevue/button';

export default {
  name: 'NewReceiptForm',
  components: {
    Button,
  },
  props: {
    file: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      reader: new FileReader(),
      src: undefined,
    };
  },
  mounted() {
    this.reader.onload = () => {
      this.src = this.reader.result;
    };
    this.reader.readAsDataURL(this.file);
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  
</style>
