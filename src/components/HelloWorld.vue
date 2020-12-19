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
  
  <img v-if="image !== null" :src="image.src" alt="">
  <canvas id="canvas" />
</template>

<script>
import Button from 'primevue/button';
import { promptImageInput, imageconvert } from '../utils';

export default {
  name: 'HelloWorld',
  components: {
    Button,
  },
  data() {
    return {
      count: 0,
      image: null,
    };
  },
  methods: {
    async takePic(cam) {
      const image = await promptImageInput(cam);
      this.image = imageconvert(image);

      console.log(this.image);
    },
  },
};
</script>
