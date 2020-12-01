<template>
  <p>Example component:</p>
  <button @click="count++">
    count is: {{ count }}
  </button>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      count: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
$redIfSassWorks: red;
h1 { color: $redIfSassWorks; }
</style>
