<template>
  <div v-if="user">
    Hello {{ user.displayName }}.<br>User ID: {{ user.uid }}
    <p>Not you?</p>
    <Button @click="onChangeAccount">
      Change Account
    </Button>
    <Button @click="onSignOut">
      Sign Out
    </Button>
  </div>
</template>

<script>
import Button from 'primevue/button';
import store from '@/store';
import router from '@/router';

export default {
  name: 'Settings',
  components: {
    Button,
  },
  computed: {
    user() {
      return store.user;
    },
  },
  methods: {
    onLinkAccount() {
      store.signIn();
    },
    async onChangeAccount() {
      await store.signOut();
      store.signIn();
    },
    async onSignOut() {
      await store.signOut();
      router.push('/signin');
    },
  },
};
</script>

<style>

</style>
