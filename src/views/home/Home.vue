<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>mnb
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            @scroll="scrollContent"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banner="banner"></home-swiper>
      <home-recommends :recommend="recommend"/>
      <home-feature/>
      <tab-control :titles="['流行','新款','精选']" @click="clickTab"/>
      <goods-list :goods="showGoods"></goods-list>
      <!-- <ul>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
        <li>lb</li>
      </ul> -->
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
      isShowBackTop: false
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
    const refresh = this.debounce(this.$refs.scroll.refresh, 500)
    this.$bus.$on('loadImageItem', () => {
      refresh()
    })
  },
  computed: {
    showGoods(){
      return this.goods[this.currentTypes].list
    }
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    clickTab(index){
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
    },
    clickBack() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    scrollContent(position) {
      this.isShowBackTop = Math.abs(position.y) > 1000
    },
    loadMore() {
      this.getHomeGoods(this.currentTypes)
    },
    debounce(func, delay) {
      let timer = null
      return function(...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
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
      const page = this.goods[type].page + 1 //
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .tab-control {
		position: relative;
		// top: 44px;
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
