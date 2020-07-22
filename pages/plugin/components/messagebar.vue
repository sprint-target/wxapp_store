<template>
  <view class="bottom">
    <view class="left">
      <view class="iconBtn" @tap="collection">
        <text class="iconfont iconshoucang-xianxing iconSize" v-if="is_collection"></text>
        <text class="iconfont iconshoucang-tianchong iconSize collectionColor" v-else></text>
        <text>收藏</text>
      </view>
      <view class="iconBtn" @tap="comments">
        <text class="iconfont iconpinglun1 iconSize"></text>
        <text>评论 (2)</text>
      </view>
      <view class="iconBtn" @tap='handleShare'>
        <text class="iconfont iconfenxiang iconSize"></text>
        <text>分享</text>
      </view>
    </view>
    <view class="rightBtn">{{btnType}}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      btnType:'购买详情'
    }
  },
  props:['is_collection'],
  onReady() {},
  methods: {
    handleShare() {
      this.$emit('handleShare')
    },
    collection() {
      this.$emit('collection')
    },
    comments() {
      console.log('点击评论')
    }
  }
}
</script>

<style lang="scss">
.bottom {
  @include between;
  position: absolute;
  bottom: 0;
  padding: 10upx 30upx;
  width: calc(100% - 60upx);
  box-shadow:0px -14px 34px 0px rgba(166,114,68,0.2);
  .left {
    display: flex;
    flex-direction: row;
    font-size: 20upx;
    width: 240upx;
    justify-content: space-between;
    .iconBtn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .iconSize {
        font-size: 40upx;
        padding-bottom: 8upx;
      }
    }
  }
  .rightBtn {
    @include normalbtn(324upx,78upx);
    background-color: $price-color;
    color: #fff;
    font-size: $main-size;
  }
  .collectionColor {
    color: $price-color;
  }
}
</style>