<template>
  <div class="detail">
    <detail-nav-bar/>
    <detail-swiper v-if="topImages!=''" :top-images="topImages"/>
  </div>
</template>

<script>
import DetailNavBar from './childCompos/DetailNavBar';
import DetailSwiper from './childCompos/DetailSwiper';

import { getDetail } from 'network/detail'
export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: []
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper
  },
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      this.topImages = res.result.itemInfo.topImages
    })
  },
  methods: {

  }
};
</script>

<style scoped></style>
