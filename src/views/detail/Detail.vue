<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content"
            ref="scroll">
      <detail-swiper v-if="topImages!=''" :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
    </scroll>

  </div>
</template>

<script>
import DetailNavBar from './childCompos/DetailNavBar'
import DetailSwiper from './childCompos/DetailSwiper'
import DetailBaseInfo from './childCompos/DetailBaseInfo'
import DetailShopInfo from './childCompos/DetailShopInfo'
import DetailGoodsInfo from './childCompos/DetailGoodsInfo'

import { getDetail, GoodsInfo, Shop } from 'network/detail'

import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {}
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll
  },
  created() {
    this.iid = this.$route.params.iid
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

    })
  },
  mounted() {
    this.$bus.$on('imageLoad', () => {
      this.$refs.scroll.refresh()
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
