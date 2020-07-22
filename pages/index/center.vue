<template>
  <view>
    <view @tap="go('collect')">收藏</view>
    <view @tap="go('userInfo')">个人资料</view>
    <view @tap="go('commit')">评论</view>
    <view @tap="go('integralMall')">积分商城</view>
    <view @tap="go('lucky')">抽奖</view>
    <view @tap="go('question')">问答</view>
  </view>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad() {
    this.$u.setTitle('个人中心')
  },
  methods: {
    go (name) {
      let url = this.$r[name]
      this.$u.changePage(url)
    }
  }
};
</script>

<style lang='scss' scoped>
</style>