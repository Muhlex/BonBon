<template>
  <div class="receipt-image" @touchstart="onTouchchange" @touchmove="onTouchchange" @touchend="onTouchend">
    <img
      :src="src"
      alt="Image of Receipt"
      :style="{ transform: `scale(${zoom})` }"
    >
  </div>
</template>

<script>
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

export default {
  name: 'PanZoomImage',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      lastDistance: null,
      zoom: MIN_ZOOM,
    };
  },
  methods: {
    onTouchchange(event) {
      const { touches } = event;
      if (touches.length !== 2) return;

      event.preventDefault();

      const distance = Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY);

      if (this.lastDistance) {
        const zoomFactor = (distance - this.lastDistance) / 200;
        this.zoom = Math.min(Math.max(this.zoom + zoomFactor, MIN_ZOOM), MAX_ZOOM);
      }
      this.lastDistance = distance;
    },
    onTouchend() {
      this.lastDistance = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.receipt-image {
  position: relative;
  display: block;
  width: 100%;
  overflow: scroll;

  img {
    display: block;
    width: 100%;
    transform-origin: left top;
  }
}
</style>
