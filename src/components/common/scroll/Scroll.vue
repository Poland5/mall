<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data(){
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })
      // 3. 监听上拉加载
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    })
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time) // this.scroll是为了确定已创建scroll实例
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refresh() {
      console.log('------')
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>
</style>
