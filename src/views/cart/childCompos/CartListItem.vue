<template>
	<div>
		<div class="cart-list-main flex">
			<div class="cart-list-left flex">
        <check-btn :is-checked="product.checked" @click.native="checkChange"></check-btn>
				<img :src="product.image" class="goods-img">
			</div>
			<div class="cart-list-right">
				<div class="goods-title one-txt-cut">{{product.title}}</div>
        <div class="goods-desc one-txt-cut">{{product.desc}}</div>
				<div class="goods-info flex">
					<span class="price">￥{{product.price}}</span>
          <span>x{{product.count}}</span>
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
    product: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    checkChange() {
      this.product.checked = !this.product.checked
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
		.goods-title {
			width: 100%;
			font-size: 14px;
      font-weight: bold;
		}
    .goods-desc {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 12px;
      margin-top: 8px;
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
