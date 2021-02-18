<template>
  <div class="cart-wrap">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
			<div slot="center">购物车({{cartLength}})</div>
		</nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <cart-bot-bar></cart-bot-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { mapGetters } from 'vuex'
import CartList from './childCompos/CartList'
import CartBotBar from './childCompos/CartBotBar'

export default {
  data() {
    return {

    }
  },
  components: {
    NavBar,
    CartList,
    CartBotBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}

</script>

<style lang="less" scoped="scoped">
  .cart-wrap{
    height: 100vh;
  }
	.cart-nav {
		color: #fff;
		background-color: var(--color-high-text);
		position: fixed;
		top:0;
		left:0;
		right: 0;
	}
</style>
