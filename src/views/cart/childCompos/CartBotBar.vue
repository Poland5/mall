<template>
	<div class="cart-bot-bar flex">
		<div class="check-all">
      <check-btn :isChecked="isSelecteAll" @click.native="checkClick"></check-btn>
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
  components: {
    CheckBtn
  },
  computed: {
    ...mapState(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count * item.price
      }, 0).toFixed(2)
    },
    checkLength() {
      return '(' + this.cartList.filter(item => item.checked).length + ')'
    },
    /**
     * 监听选中的状态
     * 1. 没有商品，全选按钮为不选中
     * 2. 有商品，只有所有商品选中，全选按钮才会打钩
     */   
    isSelecteAll() {
      if (this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked) // find方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
    }
  },
  methods: {
    /**
     * 点击全选按钮
     * 1. 如果原来选中，点击全部不选中
     * 2. 如果不选中或某些不选中，全部选中
     */
    checkClick() {
      if (this.isSelecteAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    }
  }
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
