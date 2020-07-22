<template>
  <view class="content">
    <view class="rules">
      <span class="text">规则</span>
      <span class="iconfont iconguize" style="font-size:24rpx;"></span>
    </view>
    <view class="user_head">
      <view class="avatar">
        <image src="../../../static/images/test_avatar.png" mode />
      </view>
    </view>
    <view class="user_integration" @tap="toRecord()">
      <span class="title">我的积分：</span>
      <span class="number">999999</span>
      <span class="iconfont iconxiangyou"></span>
    </view>
    <view class="user_task" @tap="toTask">我的任务</view>
    <!-- 积分商城 -->
    <view class="title">积分商城</view>
    <!-- 标签滑块 -->
    <scroll-view :scroll-x="true" style="height: 50rpx;">
      <span
        v-for="(item,index) in integration"
        :key="index"
        :class="current==index?'number isActive':'number'"
        @tap="toSwitchTag(index)"
      >{{item}}</span>
    </scroll-view>
    <!-- 商城中的兑换商品 -->
    <view class="integration_mall">
      <view class="goods" v-for="(item,index) in goods_arr" :key="index" @tap="toShowGoodsCard">
        <view class="goods_image">
          <image :src="item.imgUrl" mode />
        </view>
        <view class="goods_megs">{{item.name}}</view>
        <view class="goods_number">
          <view class="integration">
            <text>{{item.number}}</text>
            <view class="sup" style="font-size:40rpx">积分</view>
          </view>
          <view class="exchange_btn" @tap.stop="toExchange()">兑换</view>
        </view>
      </view>
    </view>
    <!-- 遮罩层 -->
    <view v-if="isMask" class="mask" @tap.stop="closeMask()" @touchmove.stop.prevent="moveHandle()">
      <view
        class="goods_mask_card"
        @tap.stop="isMask=true"
        :style="isMask&&isMaskCard?'bottom: 0vh;transition: bottom 0.5s;':'bottom: -100vh;'"
      >
        <view class="down_close iconfont iconxiangxia" @tap.stop="closeMask()"></view>
        <view class="goods_mask_megs">
          <view class="photo">
            <image src="../../../static/images/test.jpg" mode />
          </view>
          <view class="informations">
            <view class="name">JQG7522抽油烟机</view>
            <view class="integration">
              <text>999</text>
              <view class="sup" style="font-size:40rpx">积分</view>
            </view>
          </view>
        </view>
        <view class="goods_color">数量</view>
        <view class="choose_number">
          <view class="down" @tap="down">
            <image src="../../../static/images/number_down.png" mode />
          </view>
          <view style="margin:auto 0;font-weight:bolder">{{number}}</view>
          <view class="up" @tap="up">
            <image src="../../../static/images/number_up.png" mode />
          </view>
        </view>
        <view :class="phone_model?'integration_btn phone_model_bottom':'integration_btn'">立即兑换</view>
        <view></view>
      </view>
    </view>
  </view>
</template>
<script>
import tool from "../../../utils/tool";
export default {
  components: {},
  data() {
    return {
      phone_model: null, //手机机型
      number: 1,
      current: 0, //积分标签区间选择
      color_current: 0, //颜色标签选择
      integration: [
        "全部",
        "0-100",
        "101-500",
        "501-1000",
        "501-1000",
        "501-1000",
        "501-1000",
        "501-1000",
        "501-1000",
        "501-1000",
        "501-1000",
        "501-1000",
        "501-1000",
        "501-1000",
        "501-1000",
        "501-1000"
      ],
      goods_arr: [
        {
          imgUrl: "../../../static/images/test.jpg",
          name: "HW25800K-03G6666666666",
          number: "999"
        },
        {
          imgUrl: "../../../static/images/test.jpg",
          name: "HW25800K-03G",
          number: "999"
        },
        {
          imgUrl: "../../../static/images/test.jpg",
          name: "HW25800K-03G",
          number: "999"
        }
      ],
      color: [
        "#000000",
        "#C0C0C0",
        "#C0C0C0",
        "#C0C0C0",
        "#C0C0C0",
        "#C0C0C0",
        "#C0C0C0",
        "#C0C0C0",
        "#C0C0C0",
        "#C0C0C0",
        "#C0C0C0"
      ],
      maskTime: false,
      isMask: false,
      isMaskCard: false
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad() {
    let t = this;
    t.phone_model = t.$u.getPhoneModel();
    console.log(t.phone_model, "手机机型");
  },
  methods: {
    moveHandle() {},
    toSwitchTag(i) {
      let t = this,
        current = t.current;
      if (current != i) {
        t.current = i;
      }
    },
    toChooseColor(i) {
      let t = this,
        color_current = t.color_current;
      if (color_current != i) {
        t.color_current = i;
      }
    },
    toShowGoodsCard: tool.throttle(function() {
      let t = this;
      setTimeout(() => {
        this.maskTime = true;
      }, 600);
      console.log("阻止多次点击");
      this.isMask = true;
      if (this.isMask) {
        setTimeout(() => {
          this.isMaskCard = true;
        }, 100);
      }
    }, 600),
    toExchange: tool.throttle(function() {
      let t = this;
      t.$u.changePage(t.$r.integralMall_details);
    }, 600),
    closeMask() {
      console.log("11111");
      if (!this.maskTime) return;
      this.isMask = false;
      this.isMaskCard = false;
      this.maskTime = false;
    },
    toRecord() {
      let t = this;
      t.$u.changePage(t.$r.integralMall_record);
    },
    //减少数量
    down() {
      let t = this;
      let number = t.number;
      if (number == 0) {
        number = 0;
      } else {
        number--;
      }
      t.number = number;
    },
    //增加数量
    up() {
      let t = this;
      let number = t.number;
      number++;
      t.number = number;
    },
    //前往个人任务页
    toTask() {
      let t = this;
      t.$u.changePage(t.$r.integralMall_task);
    }
  }
};
</script>
<style lang='scss' scoped>
.content {
  position: relative;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  .rules {
    margin-right: 10rpx;
    position: fixed;
    right: 30rpx;
    font-size: 24rpx;
    color: $sub-color;
    .text {
      margin-right: 10rpx;
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
      color: $text-color;
    }
    .number {
      font-size: 36rpx;
      font-weight: bolder;
      color: $active-color;
    }
    .iconfont {
      margin-left: 10rpx;
      font-size: 32rpx;
      font-weight: bolder;
      color: $active-color;
    }
  }
  //我的任务
  .user_task {
    margin: 0 auto;
    margin-top: 20rpx;
    font-size: 24rpx;
    width: 160rpx;
    height: 50rpx;
    line-height: 50rpx;
    color: #fff;
    font-weight: bold;
    background-color: $text-color;
    text-align: center;
    box-shadow: 0 7rpx 5rpx 0 rgba(41, 53, 57, 0.1);
    border-radius: 25rpx;
  }
  //积分商城
  .title {
    margin: 60rpx 0 30rpx 30rpx;
    font-size: $main-title-size;
    font-weight: bold;
    color: #c99465;
  }
  scroll-view {
    margin-bottom: 30rpx;
    white-space: nowrap;
    padding-bottom: 20rpx;
    span {
      display: inline-block;
    }
    .number {
      padding: 0 25rpx;
      color: #979d9f;
      font-size: 26rpx;
      height: 45rpx;
      line-height: 45rpx;
      border: 2rpx solid #c5c9ca;
      border-radius: 10rpx;
      margin-left: 20rpx;
      &:first-child {
        margin-left: 30rpx;
      }
      &:last-child {
        margin-right: 30rpx;
      }
    }
    .isActive {
      background: $active-color;
      color: #fff;
    }
  }
  //商品兑换区域
  .integration_mall {
    margin: 0 30rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .goods {
      margin-bottom: 30rpx;
      width: 330rpx;
      height: 486rpx;
      box-shadow: 0px 4px 7px 0px rgba(41, 53, 57, 0.2);
      border-radius: 10rpx;
      overflow: hidden;
      .goods_image {
        width: 330rpx;
        height: 330rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
    .goods_megs {
      margin: 20rpx 0 0 20rpx;
      font-size: $main-size;
      color: $text-color;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .goods_number {
      display: flex;
      justify-content: space-between;
      margin: 36rpx 20rpx 0 20rpx;
      line-height: 46rpx;
      .integration {
        position: relative;
        color: #bf7330;
        font-size: 36rpx;
        font-weight: bold;
        .sup {
          position: absolute;
          top: -2rpx;
          right: -50rpx;
          font-size: 24rpx !important;
        }
      }
      .exchange_btn {
        width: 110rpx;
        height: 46rpx;
        line-height: 46rpx;
        font-size: 26rpx;
        color: #fff;
        text-align: center;
        background-color: $active-color;
        border-radius: 23rpx;
      }
    }
  }
  /* 遮罩层 */
  .mask {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    .goods_mask_card {
      position: absolute;
      bottom: -100vh;
      padding: 0 40rpx;
      width: 100%;
      background: #fff;
      border-top-left-radius: 50rpx;
      border-top-right-radius: 50rpx;
      box-sizing: border-box;
      overflow: hidden;
      .down_close {
        margin-bottom: 20rpx;
        text-align: center;
        font-size: 60rpx;
        color: #a67244;
      }
      .goods_mask_megs {
        display: flex;
        margin-bottom: 47rpx;
        .photo {
          margin-right: 47rpx;
          width: 220rpx;
          height: 220rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .informations {
          .name {
            margin-bottom: 30rpx;
            font-size: $main-title-size;
            color: $text-color;
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .integration {
            position: relative;
            font-size: $num-size;
            color: $active-color;
            font-weight: bold;
            .sup {
              position: absolute;
              top: 8rpx;
              left: 85rpx;
              font-size: 24rpx !important;
            }
          }
        }
      }
      .goods_color {
        margin-bottom: 40rpx;
        width: 100rpx;
        height: 40rpx;
        line-height: 40rpx;
        font-size: 26rpx;
        color: #fff;
        text-align: center;
        background: rgba(166, 114, 68, 1);
        border-radius: 2rpx;
      }
      .choose_number {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40rpx;
        width: 200rpx;
        .down {
          width: 46rpx;
          height: 46rpx;
          border-radius: 100%;
          overflow: hidden;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .up {
          width: 46rpx;
          height: 46rpx;
          border-radius: 100%;
          overflow: hidden;
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
      .integration_btn {
        margin-bottom: 20rpx;
        width: 100%;
        height: 78rpx;
        line-height: 78rpx;
        text-align: center;
        font-size: 32rpx;
        font-weight: 500;
        color: #fff;
        background: $active-color;
        border-radius: 40rpx;
      }
    }
    /* 机型底部兼容 */
    .phone_model_bottom {
      margin-bottom: 50rpx !important;
    }
  }
}
</style>