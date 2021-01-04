<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
      :key="index"
      :class="{active: index === currentIndex}"
      @click="clickItem(index)"
      class="tab-control-item">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    clickItem(index) {
      this.currentIndex = index
      this.$emit('clickItem', index)
    }
  }
}
</script>

<style scoped lang="less">
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 44px;
  line-height: 44px;
}
.tab-control-item {
  flex: 1;
  &.active{
    color: var(--color-text);
    span {
      border-bottom: 2px solid var(--color-text);
      padding: 5px;
    }
  }
}
</style>
