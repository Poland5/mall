<template>
  <div class="check-btn" :class="{checked: isChecked}">
    <span class="no-check" v-if="isChecked"></span>
    <img src="~assets/img/detail/check_active.png" v-else>
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.check-btn {
  span{
    display: block;
    width: 18px;
    height: 18px;
    overflow: hidden;
    border-radius: 100%;
    vertical-align: bottom;
    border: 1px solid #ececec;
    border-radius: 50%;
  }
  img {
    width: 18px;
    height: 18px;
  }
}
</style>
