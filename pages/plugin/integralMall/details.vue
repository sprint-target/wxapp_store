<template>
  <view class="content">
    <!-- 商品轮播图 -->
    <view class="top_swiper">
      <swiper
        class="swiper"
        indicator-dots
        autoplay
        circular
        indicator-active-color="#fff"
        :interval="3000"
        :duration="2000"
      >
        <swiper-item>
          <image src="../../../static/images/test_avatar.png" mode />
        </swiper-item>
        <swiper-item>
          <image src="../../../static/images/test.jpg" mode />
        </swiper-item>
        <swiper-item>
          <image src="../../../static/images/test.jpg" mode />
        </swiper-item>
        <swiper-item>
          <image src="../../../static/images/test.jpg" mode />
        </swiper-item>
      </swiper>
    </view>
    <!-- 商品积分兑换、分享 -->
    <view class="goods_integration">
      <view class="integration_number">
        <text>999</text>
        <view class="sup" style="font-size:40rpx">积分</view>
      </view>
      <view class="share_btn">
        <view class="iconfont iconfenxiang1"></view>
        <view class="icon_title">分享</view>
      </view>
    </view>
    <!-- 商品简介 -->
    <view class="goods_details">
      <view class="goods_title">FOTILE EMS9018</view>
      <view
        class="goods_about"
      >36英寸壁挂式管道罩，550 CFM，超低噪音：49dB/1.87 sones。MS901836英寸壁挂式管道罩，550 CFM，超低噪音：49dB/1.87 sones。MS901</view>
    </view>
    <!-- 使用规则 -->
    <view class="rules_title">使用规则</view>
    <view class="rules_details">
      <view>1.积分一经使用不支持退还，产品数量有限，先到先得。兑完为止。</view>
      <view>2.产品不做物流信息跟踪，可联系客服电话2333-333333。</view>
      <view>3.确认信息。</view>
    </view>
    <!-- 底部兑换按钮 -->
    <view :class="phone_model?'toExchange phone_model_bottom':'toExchange'">
      <view class="exchange_btn">立即兑换</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      phone_model: null
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad() {
    let t = this;
    t.phone_model = t.$u.getPhoneModel();
    console.log(t.phone_model, "手机机型");
  },
  methods: {}
};
</script>

<style lang='scss' scoped>
.content {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: calc(100rpx + 60rpx);
  //顶部轮播图
  .top_swiper {
    .swiper {
      height: 610rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
  //积分兑换、分享设置
  .goods_integration {
    margin: 30rpx 30rpx 0 30rpx;
    display: flex;
    justify-content: space-between;
    .integration_number {
      position: relative;
      font-size: $num-size;
      font-weight: bold;
      color: #a67244;
      .sup {
        position: absolute;
        top: 8rpx;
        right: -55rpx;
        font-size: 24rpx !important;
      }
    }
    .share_btn {
      .iconfont {
        font-size: 36rpx;
        color: #979d9f;
      }
      .icon_title {
        margin-top: 5rpx;
        font-size: 16rpx;
        font-weight: 500;
        color: #979d9f;
      }
    }
  }
  //商品简介
  .goods_details {
    margin-top: 40rpx;
    margin-bottom: 90rpx;
    padding: 0 30rpx;
    .goods_title {
      font-size: $main-title-size;
      font-weight: 500;
      color: $text-color;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .goods_about {
      display: -webkit-box;
      font-size: $sub-size;
      font-weight: 400;
      color: $sub-color;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  //使用规则
  .rules_title {
    margin: 0 0 40rpx 30rpx;
    height: 28rpx;
    line-height: 28rpx;
    font-size: $sub-size;
    font-weight: bold;
    color: $text-color;
  }
  .rules_details {
    padding: 0 48rpx 0 30rpx;
    font-size: 26rpx;
    font-weight: 500;
    line-height: 45rpx;
    color: $sub-color;
  }
  //底部确认兑换按钮
  .toExchange {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100rpx;
    background: #fff;
    box-shadow: 0 -14rpx 34rpx 0 rgba(166, 114, 68, 0.2);
    box-sizing: border-box;
    .exchange_btn {
      margin: 10rpx auto;
      width: 690rpx;
      height: 80rpx;
      line-height: 80rpx;
      color: #fff;
      font-size: 36rpx;
      text-align: center;
      background: #a67244;
      border-radius: 42rpx;
    }
  }
  .phone_model_bottom {
    margin-bottom: 30rpx;
  }
}
</style>