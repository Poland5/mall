<template>
  <div class="detail">
    <detail-nav-bar/>
    <detail-swiper v-if="topImages!=''" :top-images="topImages"/>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
import DetailNavBar from './childCompos/DetailNavBar';
import DetailSwiper from './childCompos/DetailSwiper';
import DetailBaseInfo from './childCompos/DetailBaseInfo';

import { getDetail, GoodsInfo } from 'network/detail'
export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {}
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  },
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      // 1. 获取顶部图片轮播图
      const data = res.result // 数据中转
      this.topImages = data.itemInfo.topImages
      // 2. 获取商品信息
      this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
    })

  },
  methods: {

  }
};
</script>

<style scoped></style>
