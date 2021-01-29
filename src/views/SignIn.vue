<template>
  <p style="margin-top: 0;">
    Welcome to BonBon.
  </p>
  <p>
    To allow for synchronization of your data between devices,
    please sign in.
  </p>
  <Button @click="onSignInClick">
    Sign in with Google
  </Button>
  <!-- <p>
    If you wish to sign in later, check out the settings tab.
    Your locally saved data will be synchronized with your account once you sign in.
  </p>
  <Button @click="onSignInClick(true)">
    Continue anonymously
  </Button> -->
</template>

<script>
import Button from 'primevue/button';
import store from '@/store';

export default {
  name: 'SignIn',
  components: {
    Button,
  },
  methods: {
    async onSignInClick() {
      store.signIn();
    },
  },
};
</script>

<style>

</style>
