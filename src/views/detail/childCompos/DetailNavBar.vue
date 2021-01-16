<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="clickBack">
        <img src="~assets/img/back.png" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
            :key="index"
            @click="clickItem(index)"
            :class="{active: currentIndex === index}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    clickItem(index) {
      this.currentIndex = index
      this.$emit('clickTitle', index)
    },
    clickBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.back img{
  margin-top: 7px;
  width: 28px;
  height: 28px;
}
.title {
  display: flex;
  div {
    flex: 1;
    font-size: 13px;
  }
}
.active {
  color: var(--color-text);
}
</style>
