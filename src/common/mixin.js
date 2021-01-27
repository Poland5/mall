import BackTop from 'components/content/backTop/BackTop.vue'

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
      MAX_POSITION_Y: 1000
    }
  },
  components: {
    BackTop
  },
  methods: {
    clickBack() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}
