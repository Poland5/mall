<template>
  <div class="recommends">
    <div v-for="(item,index) in recommend" :key="index" class="re-item">
      <a :href="item.link">
        <img :src="item.image" alt="" class="img">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    recommend: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommends{
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 15px 0 30px;
  border-bottom: 8px solid #eee;
}
.re-item{
  flex: 1;
}
.img {
  width: 75px;
  height: 75px;
  margin-bottom: 5px;
}

</style>
