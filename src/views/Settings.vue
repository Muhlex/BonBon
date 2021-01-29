<template>
  <div class="head">
    <h1>Settings</h1>
  </div>
  <div v-if="user">
    <h3>Your Profile</h3>
    <p style="margin-top: 0;">
      Hello <strong>{{ user.displayName }}</strong> (logged in with Google).
      <br>Not you?
    </p>
    <Button @click="onChangeAccount">
      Change Account
    </Button>
    <Button @click="onSignOut">
      Sign Out
    </Button>
    <h3>Dummy Data</h3>
    <p>Use this button to add dummy receipts for prototype demonstration purposes:</p>
    <Button class="p-button-secondary" :disabled="tempDisableDummyButton" @click="onAddDummyData">
      Add Dummy Receipts
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
  data() {
    return {
      tempDisableDummyButton: false,
    };
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
    onAddDummyData() {
      store.addDummyReceipts();
      this.tempDisableDummyButton = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  margin: -0.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: var(--surface-b);
  text-align: center;

  h1 { margin: 0; }
}

button + button {
  margin-left: 0.5em;
}
</style>
