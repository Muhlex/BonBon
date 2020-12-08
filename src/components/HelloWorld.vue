<template>
  <p>Example component:</p>
  <Button @click="count++">
    count is: {{ count }}
  </Button>
</template>

<script>
import Button from 'primevue/button';

export default {
  name: 'HelloWorld',
  components: {
    Button,
  },
  data() {
    return {
      count: 0,
    };
  },
};
</script>
