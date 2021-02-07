<template>
	<div class="cart-list-wrap">
    <scroll class="content">
		  <!-- <cart-list-item v-for="(item, index) in cartList" :key="index" :product="item"></cart-list-item> -->
      <ul>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
      </ul>
    </scroll>
	</div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
export default {
  name: 'CartList',
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    cartList() {
      return this.$store.state.cartList
    }
  }
}
</script>

<style lang="less" scoped="scoped">
	.cart-list-wrap {
    height: 100%;
    background-color: #fff;
    .content{
      overflow: hidden;
      position: absolute;
      bottom: 91px;
      top: 44px;
      left: 0;
      right: 0;
    }
	}
</style>
