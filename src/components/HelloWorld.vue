<template>
  <p>Example component:</p>
  <Button @click="count++">
    count is: {{ count }}
  </Button>
  <button @click="takePic(false)">
    upload auch pdf lol
  </button>
  <button @click="takePic(true)">
    take pic with caaaam
  </button>
  <img :src="src">
  <input type="file">
</template>

<script>
import Button from 'primevue/button';
import { promptImageInput } from '../utils';

export default {
  name: 'HelloWorld',
  components: {
    Button,
  },
  data() {
    return {
      count: 0,
      src: null,
    };
  },
  methods: {
    async takePic(cam) {
      const image = await promptImageInput(cam);
      this.src = image;
    },
  },
};
</script>
