<template>
	<div>
		<div class="cart-list-main flex" v-for="item in cartList" :key="item.iid">
			<div class="cart-list-left flex">
        <check-btn :is-checked="item.checked" @click.native="checkClick"></check-btn>
				<img :src="item.image" class="goods-img">
			</div>
			<div class="cart-list-right">
				<div class="goods-name one-txt-cut">{{item.title}}</div>
				<div class="goods-info flex">
					<span class="price">￥{{item.price}}</span><span>x{{item.count}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CheckBtn from 'components/content/checkBtn/CheckBtn'
export default {
  components: { CheckBtn },
  name: 'CartListItem',
  props: {
    cartList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    checkClick() {
      this.cartList.checked = !this.cartList.checked
    }
  }
}
</script>

<style lang="less" scoped="scoped">
	.cart-list-main {
		padding: 10px;
		border-bottom: 1px solid #ececec;
	}
	.cart-list-left {
		width: 26%;
		align-items: center;
		.goods-img {
			width: 52px;
			height: 66px;
			overflow: hidden;
			border: 1px solid #ececec;
			margin:0 10px;
			border-radius: 6px;
			vertical-align: middle;
		}
	}
	.cart-list-right {
		width: 74%;
		position: relative;
		.goods-name {
			width: 100%;
			font-size: 13px;
		}
		.goods-info {
			justify-content: space-between;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			.price {
				color: #F9CD0B;
			}
		}
	}
</style>
