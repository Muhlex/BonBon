<template>
  <nav class="app-bar">
    <router-link
      v-for="({ to, text, iconName, disabled }, index) in items"
      :key="to"
      :to="to"
      :class="{
        'router-link-active': to !== '/' && $route.fullPath.startsWith(to),
        'disabled': disabled,
      }"
      :tabindex="!disabled ? index + 1 : -1"
      :accesskey="!disabled && index + 1"
    >
      <Icon :name="iconName" />
      <span>{{ text }}</span>
    </router-link>
  </nav>
</template>

<script>
import Icon from '@/components/Icon';

export default {
  name: 'AppBar',
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          to: '/',
          text: 'Home',
          iconName: 'home',
        },
        {
          to: '/receipts',
          text: 'Receipts',
          iconName: 'receipt',
        },
        {
          to: '/stats',
          text: 'Statistics',
          iconName: 'stats',
          disabled: true,
        },
        {
          to: '/settings',
          text: 'Settings',
          iconName: 'user-settings',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.app-bar {
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: var(--surface-b);

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: var(--text-color);
    padding: 8px 4px;
    width: 100%;

    &:hover {
      color: var(--text-color-secondary);
    }

    &.router-link-active {
      color: var(--primary-color);
      span { font-weight: bold; }
    }

    &.disabled {
      opacity: 0.33;
      pointer-events: none;
    }

    span {
      font-size: 11px;
    }
  }
}
</style>
