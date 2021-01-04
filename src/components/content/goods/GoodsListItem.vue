<template>
  <div class="goods-list-item">
		<img :src="goodsItem.show.img" class="goods-list-img" @load="loadImageItem">
		<div class="goods-list-text">
			<div class="goods-list-name one-txt-cut">{{goodsItem.title}}</div>
			<div class="goods-list-price">
				<div class="text-pink">{{goodsItem.price}}</div>
				<div><i class="collect-icon"></i><span>{{goodsItem.cfav}}</span></div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    loadImageItem() {
      this.$bus.$emit('loadImageItem')
    }
  }
}
</script>

<style lang="less" scoped>
	.goods-list-item {
		width: 49%;
		height: auto;
		padding-top: 6px;
		font-size: 14px;
		.goods-list-img{
			width: 100%;
			height: auto;
			border-radius: 4px;
		}
		.goods-list-price {
			display: flex;
			justify-content: space-between;
			margin: 6px 0;
			.collect-icon {
				display: inline-block;
				width: 20px;
				height: 20px;
				background: url(~assets/img/home/collect_icon.png) no-repeat;
				background-size: cover;
				vertical-align: bottom;
			}
		}
	}
</style>
