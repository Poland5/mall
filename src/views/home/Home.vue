<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>mnb
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControlFixed"
      class="tab-control"
      v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            @scroll="scrollContent"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommends :recommend="recommend"/>
      <home-feature/>
      <tab-control
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="clickBack" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childCompons/HomeSwiper'
import HomeRecommends from './childCompons/HomeRecommends'
import HomeFeature from './childCompons/HomeFeature'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'

export default {
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentTypes: 'pop',
      isShowBackTop: false,
      controlOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  components: {
    HomeSwiper,
    HomeRecommends,
    HomeFeature,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    // 1. 请求多个数据
    this.getMultidata()

    // 2. 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 3. 监听图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('loadImageItem', () => {
      refresh()
    })
  },
  computed: {
    showGoods(){
      return this.goods[this.currentTypes].list
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getPosY()
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index){
      switch (index) {
        case 0:
          this.currentTypes = 'pop'
          break
        case 1:
          this.currentTypes = 'new'
          break
        case 2:
          this.currentTypes = 'sell'
      }
      this.$refs.tabControlFixed.currentIndex = index
      this.$refs.tabControl.currentIndex = index
    },
    clickBack() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    scrollContent(position) {
      this.isShowBackTop = Math.abs(position.y) > 1000

      // 判断是否吸顶
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentTypes)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },

    /**
     * 网络请求相关方法
     */
    getMultidata(){
      getMultidata().then(res => {
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      // 通过获取页码和类型、向服务器取值
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page + 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  #home {
    position: relative;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-text);
    color: #fff;
  }
  .tab-control {
    position: relative;
    background-color: var(--color-background);
		z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
