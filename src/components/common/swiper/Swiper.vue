<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div v-for="(item, index) in slideCount" :key="index" class="indi-item" :class="{active: index === currentIndex - 1}"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    showIndicator: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    animDuration: {
      type: Number,
      default: 300
    },
    moveRatio: {
      type: Number,
      default: 0.25
    }
  },
  data() {
    return {
      slideCount: 0, // 元素个数
      totalWidth: 0, // swiper的宽度
      swiperStyle: {}, // swiper样式
      currentIndex: 1, // 当前index
      scrolling: false // 是否正在滚动
    }
  },
  mounted() {
    setTimeout(() => {
      // 控制dom
      this.handelDom();
      // 定时器
      this.startTime();
    }, 100)
  },
  methods: {
    touchStart: function(e) {
      // 1.正在滑动时不能，不可以拖动
      if (this.scrolling) return
      // 2. 停止定时器
      this.stopTime()
      // 3.保存开始滑动位置
      this.startX = e.touches[0].pageX
    },

    touchMove: function(e) {
      // 1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX
      this.distance = this.currentX - this.startX
      let currentPosition = -this.currentIndex * this.totalWidth
      let moveDistance = this.distance + currentPosition

      // 2.设置当前的位置
      this.setTransform(moveDistance)
    },

    touchEnd: function(e) {
      // 1.获取移动的距离
      let currentMove = Math.abs(this.distance)

      // 2.判断最终的距离
      if (this.distance === 0) {
        return
      } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { // 右边移动超过0.5
        this.currentIndex--
      } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) { // 向左移动超过0.5
        this.currentIndex++
      }
      // 3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth)

      // 4.移动完成后重新开启定时器
      this.startTime()
    },
    /**
     * 定时器操作
     */
    startTime: function() {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++
        this.scrollContent(-this.currentIndex * this.totalWidth)
      }, this.interval)
    },
    stopTime: function() {
      window.clearInterval(this.playTimer)
    },

    /**
     * 滑动到正确位置
     */
    scrollContent: function (currentPosition) {
      // 0.处于滑动状态
      this.scrolling = true

      // 1.开始滑动动画
      this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms'
      this.setTransform(currentPosition)

      // 2.判断滚动的位置
      this.checkPosition()

      // 3.滑动完成
      this.scrolling = false
    },

    checkPosition: function() {
      window.setTimeout(() => {
        // 1.校正正确的位置
        this.swiperStyle.transition = '0ms'
        if (this.currentIndex >= this.slideCount + 1) { // 正向滑动到最后一个元素，重新定位到第一张
          this.currentIndex = 1
          this.setTransform(-this.currentIndex * this.totalWidth)
        } else if (this.currentIndex <= 0) { // 反向滑动到一个元素，重新定位到最后一张
          this.currentIndex = this.slideCount
          this.setTransform(-this.currentIndex * this.totalWidth)
        }
      this.$emit('transitionEnd', this.currentIndex-1);
      }, this.animDuration)
    },

    /**
     * 设置滑动的位置
     */
    setTransform: function (position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
    },

    /**
     * 操作DOM, 在DOM前后添加Slide
     */
    handelDom: function(){
      // 1.获取要操作的元素
      let swiperEl = document.querySelector('.swiper')
      let slidesEls = document.getElementsByClassName('slide')

      // 2.保存个数
      this.slideCount = slidesEls.length

      // 3.如果大于1个, 那么在前后分别添加一个slide
      if (this.slideCount > 1) {
        let cloneFrist = slidesEls[0].cloneNode(true)
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true)
        swiperEl.insertBefore(cloneLast, slidesEls[0])
        swiperEl.appendChild(cloneFrist)
        this.totalWidth = swiperEl.offsetWidth // width:375px
        this.swiperStyle = swiperEl.style // .swiper
      }

      // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
      this.setTransform(-this.totalWidth)
    }
  }
}
</script>

<style scoped>
  #hy-swiper {
    position: relative;
    overflow: hidden;
  }
  .swiper {
    display: flex;
  }
  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }
  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }
  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }
</style>
