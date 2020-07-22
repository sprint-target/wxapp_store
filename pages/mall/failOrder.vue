<template>
  <view>
    <view class="content"></view>
    <view class="bottom_bar">
      <view></view>
      <view>向商家出示券码即可消费</view>
    </view>
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
  onLoad (op){
    console.log('op',op)
    this.checkStatus(op.status)
  },
  methods: {
    checkStatus(status) {
      status = Number(status)
      switch(status) {}
    }
  },
};
</script>
<style lang='scss' scoped>
.bottom_bar {
  position: fixed;
  bottom: 0;
  padding: 20upx 30upx;
  background-color: #fff;
}
</style>