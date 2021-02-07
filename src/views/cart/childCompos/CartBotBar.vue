<template>
	<div class="cart-bot-bar flex">
		<div class="check-all">
      <check-btn :is-check="isSelecteAll"></check-btn>
      <label for="check">全部</label>
    </div>
		<div>合计：{{totalPrice}}</div>
		<div>去结算{{checkLength}}</div>
	</div>
</template>

<script>
import CheckBtn from 'components/content/checkBtn/CheckBtn'
import { mapState } from 'vuex'
export default {
  name: 'CartBotBar',
  computed: {
    ...mapState(['cartList']),
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count * item.price
      }, 0).toFixed(2)
    },
    checkLength() {
      return '(' + this.$store.state.cartList.filter(item => item.checked).length + ')'
    },
    // 监听选中的状态
    isSelecteAll() {
      if (this.cartList.length === 0) return false
      return this.cartList.find(item => item.checked)
    }
  },
  components: { CheckBtn }
}
</script>

<style lang="less" scoped="scoped">
	.cart-bot-bar {
		position: fixed;
		bottom: 49px;
		left:0;
		right: 0;
		height: 40px;
		padding: 0 10px;
		font-size: 13px;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		border-bottom: 1px solid #ececec;
		border-top: 1px solid #ececec;
		.check-all {
      display: flex;
      line-height: 20px;
      label {
        text-indent: 5px;
      }
		}
	}
</style>
