<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content"
            ref="scroll">
      <detail-swiper v-if="topImages!=''" :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>

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

import { getDetail, GoodsInfo, Shop, GoodsParam, getRecommend } from 'network/detail'
import { debounce } from 'common/utils'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList.vue'

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
      recommends: []
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
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
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('detailLoadImage', () => {
      refresh()
    })
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
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
