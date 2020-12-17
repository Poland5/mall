<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>mnb
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { getMultidata } from 'network/home'
import HomeSwiper from './childCompons/homeSwiper.vue'
export default {
  data() {
    return {
      banner: [],
      recommend: []
    }
  },
  components: {
    NavBar,
    HomeSwiper
  },
  created() {
    getMultidata().then(res => {
      this.banner = res.data.banner.list
      this.recommend = res.data.recommend.list
    })
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-text);
    color: #fff;
  }
</style>
