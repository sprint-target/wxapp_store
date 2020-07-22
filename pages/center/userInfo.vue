<template>
  <view class="content">
    <view class="row">
      <view class="head">
        <view class="box">
          <view class="text">头像</view>
          <view class="img">
            <image src="../../static/images/test_avatar.png" mode />
          </view>
          <view v-if="isToedit" class="change_img">更换头像</view>
        </view>
      </view>
      <!-- 昵称 -->
      <view class="title">
        <view class="left">昵称</view>
        <view class="right_input">
          <view v-if="!isToedit" v-text="'待完善'" style="font-size:32rpx;color:#999999"></view>
          <input
            v-if="isToedit"
            type="text"
            placeholder="点击编辑"
            placeholder-style="font-size:30rpx;height:100rpx;line-height:100rpx;"
            :style="item.class==1?'padding-right:26rpx;color:#979D9F':''"
          />
        </view>
      </view>
      <!-- 姓名 -->
      <view class="title">
        <view class="left">姓名</view>
        <view class="right_input">
          <view v-if="!isToedit" v-text="'待完善'" style="font-size:32rpx;color:#999999"></view>
          <input
            v-if="isToedit"
            type="text"
            placeholder="点击编辑"
            placeholder-style="font-size:30rpx;height:100rpx;line-height:100rpx;"
            :style="item.class==1?'padding-right:26rpx;color:#979D9F':''"
          />
        </view>
      </view>
      <!-- 性别 -->
      <view class="title">
        <view class="left">性别</view>
        <view class="right_input">
          <view v-if="!isToedit" v-text="'待完善'" style="font-size:32rpx;color:#999999"></view>
          <picker
            v-if="isToedit"
            mode="selector"
            @change="sexChange"
            :value="sexValue"
            :range="sexArray"
          >
            <view v-if="!sexValue" style="padding-right:26rpx;color:#979D9F">请选择></view>
            <view v-else>{{sexArray[sexValue]}}</view>
          </picker>
        </view>
      </view>
      <!-- 联系电话 -->
      <view class="title">
        <view class="left">联系电话</view>
        <view class="right_input">
          <view v-if="!isToedit" v-text="'待完善'" style="font-size:32rpx;color:#999999"></view>
          <input
            v-if="isToedit"
            type="text"
            placeholder="点击编辑"
            placeholder-style="font-size:30rpx;height:100rpx;line-height:100rpx;"
            :style="item.class==1?'padding-right:26rpx;color:#979D9F':''"
          />
        </view>
      </view>
      <!-- 邮箱 -->
      <view class="title">
        <view class="left">邮箱</view>
        <view class="right_input">
          <view v-if="!isToedit" v-text="'待完善'" style="font-size:32rpx;color:#999999"></view>
          <input
            v-if="isToedit"
            type="text"
            placeholder="点击编辑"
            placeholder-style="font-size:30rpx;height:100rpx;line-height:100rpx;"
            :style="item.class==1?'padding-right:26rpx;color:#979D9F':''"
          />
        </view>
      </view>
      <!-- 所在区域（待修改）-->
      <view class="title">
        <view class="left">所在区域</view>
        <view class="right_input">
          <view v-if="!isToedit" v-text="'待完善'" style="font-size:32rpx;color:#999999"></view>
          <input
            v-if="isToedit"
            type="text"
            placeholder="请选择>"
            placeholder-style="font-size:30rpx;height:100rpx;line-height:100rpx;"
            style="padding-right:26rpx;color:#979D9F"
          />
        </view>
      </view>
      <!-- 详细地址  -->
      <view class="title">
        <view class="left">详细地址</view>
        <view class="right_input" style="min-height:100rpx">
          <view v-if="!isToedit" v-text="'待完善'" style="font-size:32rpx;color:#999999"></view>
          <input
            v-if="isToedit"
            type="text"
            placeholder="点击编辑"
            placeholder-style="font-size:30rpx;height:100rpx;line-height:100rpx;"
            :style="item.class==1?'padding-right:26rpx;color:#979D9F':''"
          />
        </view>
      </view>
    </view>
    <view
      class="bottom_btn"
      @tap="isToedit?saveUserInfo():isToedit=true"
      v-text="isToedit?'保存信息':'编辑信息'"
    ></view>
  </view>
</template>

<script>
import tool from "../../utils/tool";

export default {
  data() {
    return {
      isToedit: false,
      sexValue: null,
      sexArray: ["女", "男"]
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad() {},
  methods: {
    sexChange(e) {
      console.log(e);
      this.sexValue = e.detail.value;
    },
    /* 保存信息 */
    saveUserInfo: tool.throttle(function() {
      let t = this;
      console.log("保存信息");
    }, 800)
  }
};
</script>

<style lang='scss' scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  .row {
    margin-left: 30rpx;
    font-size: $text-color;
    color: $text-color;
    font-weight: 500;
    .title {
      display: flex;
      justify-content: space-between;
      height: 100rpx;
      line-height: 100rpx;
      border-bottom: 2rpx solid #f1f2f7;
      .left {
        width: 30%;
      }
      .right_input {
        width: 70%;
        height: inherit;
        input {
          height: inherit;
        }
      }
      .right_choose {
      }
    }
    .head {
      height: 160rpx;
      line-height: 160rpx;
      border-bottom: 2rpx solid #f1f2f7;
      .box {
        display: flex;
        .img {
          margin: auto 0;
          margin-left: 100rpx;
          width: 114rpx;
          height: 114rpx;
          overflow: hidden;
          border-radius: 100%;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .change_img {
          margin-left: 44rpx;
          line-height: 130rpx;
          font-size: $main-size;
          font-weight: 400;
          color: #999999;
        }
      }
    }
  }
  .bottom_btn {
    margin: 0 30rpx 40rpx 30rpx;
    height: 83rpx;
    line-height: 83rpx;
    text-align: center;
    color: #fff;
    font-size: 36rpx;
    font-weight: 500;
    background: $active-color;
    border-radius: 42rpx;
  }
}
</style>