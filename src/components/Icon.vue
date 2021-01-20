<template>
  <!-- eslint-disable vue/no-v-html -->
  <i
    :style="{ width: size, height: size, color: fill }"
    :aria-label="alt"
    v-html="require(`!!svg-inline-loader!@/assets/icons/${name}.svg`)"
  />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: '1.5em',
    },
    fill: {
      type: String,
      default: undefined,
    },
    alt: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
i {
  display: inline-block;
  line-height: 1;

  ::v-deep(svg) {
    display: block;
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
}
</style>
