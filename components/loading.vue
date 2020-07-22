<template>
  <view>
    <view v-if="show">{{text || '正在加载中'}}</view>
  </view>
</template>
<script>
export default {
  components: {},
  data () {
    return {
    }
  },
  onPullDownRefresh(){},
  onReachBottom(){},
  computed: {
    show() {
      return this.$store.state.loading
    },
    text () {
      return this.$store.state.text
    }
  },
  onLoad (){},
  methods: {},
};
</script>
<style lang='scss' scoped>
</style>