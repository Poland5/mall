<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content">
      <detail-swiper v-if="topImages!=''" :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
    </scroll>

  </div>
</template>

<script>
import DetailNavBar from './childCompos/DetailNavBar'
import DetailSwiper from './childCompos/DetailSwiper'
import DetailBaseInfo from './childCompos/DetailBaseInfo'
import DetailShopInfo from './childCompos/DetailShopInfo'

import { getDetail, GoodsInfo, Shop } from 'network/detail'

import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {}
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll
  },
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      // 1. 获取顶部图片轮播图
      const data = res.result // 数据中转
      this.topImages = data.itemInfo.topImages
      // 2. 获取商品信息
      this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // 3. 创建店铺信息对象
      this.shop = new Shop(data.shopInfo)
    })

  },
  methods: {

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
    height: 300px;
  }

</style>
