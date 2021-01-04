<template>
  <div class="goods-list">
    <goods-list-item v-for="(item, index) in goods" :key="index" :goodsItem="item" ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  data() {
    return {

    }
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style lang="less" scoped>
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		padding: 0 6px;
	}
</style>
