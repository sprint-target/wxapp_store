<template>
  <view class="content">
    <view class="bgc">
      <image src="../../../static/images/bgc.png" mode />
    </view>
    <view class="user_head">
      <view class="avatar">
        <image src="../../../static/images/test_avatar.png" mode />
      </view>
    </view>
    <view class="user_integration">
      <span class="title">我的积分：</span>
      <span class="number">999999</span>
    </view>
    <view class="exchange_menu">
      <view class="exchange_record" v-for="(item,index) in exchange_arr" :key="index">
        <view class="exchange_megs">
          <view class="label">{{item.label}}</view>
          <view class="time">{{item.time}}</view>
        </view>
        <view class="exchange_number">{{item.number}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      exchange_arr: [
        {
          label: "产品评价积分奖励",
          time: "2020-02-02 07:07:07",
          number: "+10"
        },
        {
          label: "产品评价积分奖励",
          time: "2020-02-02 07:07:07",
          number: "+10"
        },
        {
          label: "产品评价积分奖励",
          time: "2020-02-02 07:07:07",
          number: "+10"
        },
        {
          label: "商品兑换",
          time: "2020-02-02 07:07:07",
          number: "-1000"
        }
      ]
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad() {},
  methods: {}
};
</script>

<style lang='scss' scoped>
.content {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  //背景图
  .bgc {
    position: fixed;
    width: 100%;
    height: 330rpx;
    overflow: hidden;
    border-bottom-left-radius: 40rpx;
    border-bottom-right-radius: 40rpx;
    z-index: -1;
    image {
      width: 100%;
      height: 100%;
    }
  }
  //用户头像
  .user_head {
    margin: 0 auto;
    width: 130rpx;
    height: 130rpx;
    box-sizing: border-box;
    .avatar {
      width: 100%;
      height: 100%;
      border: 8rpx solid #fff;
      box-shadow: 0 20rpx 30rpx 0 rgba(166, 114, 68, 0.16);
      border-radius: 50%;
      overflow: hidden;
      box-sizing: border-box;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
  //用户积分
  .user_integration {
    margin-top: 30rpx;
    text-align: center;
    .title {
      font-size: $main-size;
      font-weight: bolder;
      color: #fff;
    }
    .number {
      font-size: 36rpx;
      font-weight: bolder;
      color: #fff;
    }
  }
  //积分兑换列表
  .exchange_menu {
    margin: 0 32rpx;
    margin-top: 60rpx;
    .exchange_record {
      margin-bottom: 20rpx;
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 110rpx;
      box-shadow: 0 4rpx 28rpx 0 rgba(39, 52, 125, 0.05);
      border-radius: 16rpx;
      background: #fff;
      padding: 0 30rpx;
      box-sizing: border-box;
      .exchange_megs {
        .label {
          margin-top: 20rpx;
          margin-bottom: 12rpx;
          font-size: 30rpx;
          font-weight: 500;
        }
        .time {
          font-size: 20rpx;
          font-weight: 500;
          color: #6a7275;
        }
      }
      .exchange_number {
        font-size: $main-title-size;
        font-weight: 500;
        line-height: 110rpx;
        color: $active-color;
      }
    }
  }
}
</style>