<template>
  <main>
    <nav>
      <router-link to="/">
        Home
      </router-link>
      <router-link to="/about">
        About
      </router-link>
    </nav>
    <div>
      <router-view />
    </div>
  </main>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;

  main {
    max-width: 1280px;
    margin: 0 auto;
  }
}
</style>
