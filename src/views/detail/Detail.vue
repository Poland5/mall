<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @clickTitle="clickTitle" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            @scroll="scrollContent"
            :probeType="3">
      <detail-swiper v-if="topImages!=''" :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramInfo" ref="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"/>
      <goods-list :goods="recommends" ref="goodsList"/>
    </scroll>
    <detail-bot-bar @addCart="addToCart"></detail-bot-bar>
    <back-top @click.native="clickBack" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childCompos/DetailNavBar'
import DetailSwiper from './childCompos/DetailSwiper'
import DetailBaseInfo from './childCompos/DetailBaseInfo'
import DetailShopInfo from './childCompos/DetailShopInfo'
import DetailGoodsInfo from './childCompos/DetailGoodsInfo'
import DetailParamInfo from './childCompos/DetailParamInfo'
import DetailCommentInfo from './childCompos/DetailCommentInfo'
import DetailBotBar from './childCompos/DetailBotBar.vue'

import { getDetail, GoodsInfo, Shop, GoodsParam, getRecommend } from 'network/detail'
import { debounce } from 'common/utils'
import { backTopMixin } from 'common/mixin'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: [],
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      positionY: [],
      currentIndex: 0
    };
  },
  mixins: [ backTopMixin ],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBotBar,
    Scroll,
    GoodsList
  },
  created() {
    // 1. 获取iid
    this.iid = this.$route.params.iid

    // 2. 获取信息详情
    getDetail(this.iid).then(res => {
      // 1. 获取顶部图片轮播图
      const data = res.result // 数据中转

      // 2. 获取顶部图片数据
      this.topImages = data.itemInfo.topImages

      // 3. 获取商品信息
      this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)

      // 4. 创建店铺信息对象
      this.shop = new Shop(data.shopInfo)

      // 5. 获取商品详细信息
      this.detailInfo = data.detailInfo

      // 6. 获取商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 7. 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list
      }

    })

    // 3. 获取信息详情
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    // 4. 给getThemeTopY赋值，进行防抖操作
    this.getThemeTopY = debounce(() => {
      // 联动效果：标题和内容 放在这是因为必须等待图片更新完毕整个子组件才算渲染完毕
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop)
      this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop)
      this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop)
    }, 50)
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('detailLoadImage', () => {
      refresh()
    })
  },
  methods: {
    ...mapActions(['addCart']),
    imgLoad() {
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      refresh()

      this.getThemeTopY()
    },
    clickTitle(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
    },
    scrollContent(position) {
      this.isShowBackTop = Math.abs(position.y) > this.MAX_POSITION_Y
      const positionY = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i && (i < length - 1 && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY > this.themeTopYs[i]))) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    addToCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid // 商品唯一标识，有了这个属性服务器才知道哪个用户购买
      this.addCart(product).then(res => {
        this.$toast.show(res, 2000)
      })
    }
  }
};
</script>

<style lang="less" scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
  }

</style>
