<template>
  <div id="hy-swiper">
    <div class="swiper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
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

    }, 100)
  },
  methods: {
    /**
     * 设置滚动的位置
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
        this.swiperSytle = swiperEl.style // display:flex
        console.log(this.swiperSytle)
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
</style>
