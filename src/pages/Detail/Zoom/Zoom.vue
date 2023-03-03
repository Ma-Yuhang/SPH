<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handle"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ['skuImageList'],
  data() {
    return {
      index: 0
    }
  },
  computed: {
    imgObj() {
      return this.skuImageList[this.index] || {}
    }
  },
  mounted() {
    // 接收到兄弟组件传过来的index
    this.$bus.$on('getIndex', (index) => {
      this.index = index
    })
  },
  methods: {
    handle(event) {
      let mask = this.$refs.mask
      let big = this.$refs.big
      let left = event.offsetX - mask.offsetWidth / 2
      let top = event.offsetY - mask.offsetHeight / 2
      // 限制遮罩层的左右移动
      if (left <= 0) left = 0
      if (left >= mask.offsetWidth) left = mask.offsetWidth
      // 限制遮罩层的上下移动
      if (top <= 0) top = 0
      if (top >= mask.offsetHeight) top = mask.offsetHeight
      // 调整遮罩层的 top值和left值
      mask.style.top = top + 'px'
      mask.style.left = left + 'px'
      // 调整大图片的 top值和left值 
      big.style.top = -2 * top + 'px'
      big.style.left = -2 * left + 'px'
    }
  },

}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>