<template>
  <view class="content">
    <view class="bgc">
      <image src="../../../static/images/record_bgc.png" mode />
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
    <view class="task_menu">
      <view class="task_record" v-for="(item,index) in task_arr" :key="index">
        <view class="task_megs">
          <view class="label">{{item.label}}</view>
          <view class="title">{{item.title}}</view>
        </view>
        <view class="task_btn">
          <view
            class="finish_btn"
            :style="item.isFinish?'background: #C9AA8F':'background: #A67244'"
            v-text="item.isFinish?'已完成':item.isAddUp?'攒积分':'未完成'"
          ></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      task_arr: [
        {
          label: "会员注册",
          title: "已获得积分10",
          isFinish: true
        },
        {
          label: "完善个人信息",
          title: "可获得积分10",
          isFinish: false
        },
        {
          label: "产品注册",
          title: "可获得积分10",
          isFinish: false
        },
        {
          label: "分享",
          title: "0/10 每日可获得最高积分10",
          isFinish: false,
          isAddUp: true
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
  .bgc {
    position: fixed;
    width: 100%;
    height: 330rpx;
    overflow: hidden;
    // border-bottom-left-radius: 40rpx;
    // border-bottom-right-radius: 40rpx;
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
  .task_menu {
    margin: 0 32rpx;
    margin-top: 60rpx;
    .task_record {
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
      .task_megs {
        .label {
          margin-top: 20rpx;
          margin-bottom: 12rpx;
          font-size: 30rpx;
          font-weight: 500;
        }
        .title {
          font-size: 20rpx;
          font-weight: 500;
          color: #6a7275;
        }
      }
      .task_btn {
        margin: auto 0;
        width: 100rpx;
        font-size: $main-title-size;
        font-weight: 500;
        color: #fff;
        .finish_btn {
          width: 100%;
          height: 44rpx;
          line-height: 44rpx;
          text-align: center;
          border-radius: 10rpx;
          font-size: 24rpx;
        }
      }
    }
  }
}
</style>