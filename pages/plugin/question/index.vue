<template>
  <view>
    <view class="content">
      <view class="ask_answer_btn" :style="!isAnswerFrame?'opacity:1':'opacity:0'">
        <view class="btn" @tap="ask_question()">提问</view>
        <view class="btn" @tap="response()">解答</view>
      </view>
      <!-- 吸顶部分 -->
      <view class="question_search">
        <view class="search">
          <view class="left">
            <text class="iconfont iconsousuo" style="margin-right:15rpx;"></text>
            <text>搜索内容</text>
          </view>
          <view class="right">
            <view class="iconfont iconwenda"></view>
            <view>我的</view>
          </view>
        </view>
        <view class="switchTag">
          <scroll-view scroll-x="true" class="scroll_switch">
            <span
              class="box"
              v-for="(item,index) in goods_arr"
              :key="index"
              @tap="toSwitchGoodsTag(index)"
            >
              <view class="img">
                <image :src="item.url" mode />
              </view>
              <view :class="index==goods_current?'name isBoxActive':'name'">{{item.name}}</view>
            </span>
          </scroll-view>
          <view class="size">
            <view
              :class="index==size_current?'out isActiveOutBoder':'out'"
              v-for="(item,index) in arr"
              :key="index"
              @tap="toSwitchTag(index)"
            >
              <view :class="index==size_current?'in isActiveIn':'in'">{{item}}</view>
            </view>
          </view>
        </view>
      </view>
      <!--页面主体 -->
      <view :class="phone_model?'scroll phone_model_bottom':'scroll'">
        <!-- 问题区域 -->
        <view class="question_area">
          <view class="user_question" v-for="(item,index) in ques_arr" :key="index">
            <view class="left_img">
              <image :src="item.avatar" mode />
            </view>
            <view class="right_megs" @tap.stop="toDetails()">
              <view class="user_name">{{item.nickname}}</view>
              <view class="user_content">
                <text class="megs">{{item.content}}</text>
                <text class="tags">{{'#'+item.tags+'#'}}{{'#'+item.num+'#'}}</text>
              </view>
              <view class="question_time">
                <view class="time">{{item.time+'更新'}}</view>
                <view class="number">
                  <view class="box">
                    <view class="iconfont iconliulanliang"></view>
                    <view class="readNum" style="padding-right:10rpx">{{item.readNum}}</view>
                  </view>
                  <view class="box">
                    <view class="iconfont iconpinglun"></view>
                    <view class="megsNum" style="padding-right:10rpx">{{item.megsNum}}</view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import tool from "../../../utils/tool";
import modal from "@/components/modal";
export default {
  components: {
    modal
  },
  data() {
    return {
      phone_model: null,
      text: "66666;999",
      goods_current: 0,
      size_current: 0,
      goods_arr: [
        { url: "../../../static/images/pro.jpg", name: "油烟机" },
        { url: "../../../static/images/pro.jpg", name: "炉具" },
        { url: "../../../static/images/pro.jpg", name: "洗碗机" },
        { url: "../../../static/images/pro.jpg", name: "蒸机" },
        { url: "../../../static/images/pro.jpg", name: "烤箱" },
        { url: "../../../static/images/pro.jpg", name: "微波炉" }
      ],
      arr: ["V", "W", "X", "岛式机"],
      ques_arr: [
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "可以推荐吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          readNum: "666",
          megsNum: "777"
        },
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "洗碗机和油烟机大家可以推荐下吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          readNum: "666",
          megsNum: "777"
        }
      ]
    };
  },
  onPullDownRefresh() {
    console.log("下拉刷新");
  },
  onReachBottom() {},
  onLoad() {
    let t = this;
    t.phone_model = t.$u.getPhoneModel();
    console.log(t.phone_model, "手机机型");
  },
  methods: {
    ask_question() {
      let t = this;
      t.$u.changePage(t.$r.ques_create);
    },
    response() {
      let t = this;
      t.$u.changePage(t.$r.ques_answer);
    },
    closeModal() {
      this.modalShow = false;
      this.isAnswerFrame = false;
    },
    //顶部商品scroll
    toSwitchGoodsTag(i) {
      let t = this,
        goods_current = t.goods_current;
      if (goods_current != i) {
        t.goods_current = i;
      }
    },
    //顶部商品尺寸scroll
    toSwitchTag(i) {
      let t = this,
        size_current = t.size_current;
      if (size_current != i) {
        t.size_current = i;
      }
    },
    toDetails() {
      let t = this;
      t.$u.changePage(t.$r.ques_details);
    }
  }
};
</script>

<style lang='scss' scoped>
.content {
  padding-left: 30rpx;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  .ask_answer_btn {
    position: fixed;
    bottom: 150rpx;
    right: 30rpx;
    z-index: 999;
    transition: opacity 0.5s;
    .btn {
      width: 90rpx;
      height: 90rpx;
      line-height: 90rpx;
      font-size: 26rpx;
      font-weight: bold;
      color: #fff;
      text-align: center;
      background-color: $active-color;
      border-radius: 50%;
      &:first-child {
        margin-bottom: 40rpx;
      }
    }
  }
  /* 吸顶区域 */
  .question_search {
    position: fixed;
    top: 0;
    padding-bottom: 20rpx;
    width: 100%;
    background: #fff;
    .search {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .left {
        padding-left: 30rpx;
        width: 80%;
        height: 72rpx;
        line-height: 72rpx;
        font-size: 28rpx;
        font-weight: 500;
        color: #c1c1c1;
        background: #f5f7f9;
        border-radius: 36rpx;
        .iconfont {
          font-size: 28rpx;
        }
      }
      .right {
        margin-right: 50rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 20rpx;
        font-weight: bold;
        text-align: center;
        color: $text-color;
        .iconfont {
          font-size: 40rpx;
        }
      }
    }
    .switchTag {
      margin-top: 30rpx;
      .scroll_switch {
        width: 100%;
        white-space: nowrap;
        height: 120rpx;
        .box {
          margin-right: 50rpx;
          display: inline-block;
          .img {
            width: 98rpx;
            height: 72rpx;
            image {
              width: 100%;
              height: 100%;
            }
          }
          .name {
            margin-top: 10rpx;
            font-size: 20rpx;
            font-weight: bold;
            color: $sub-color;
            text-align: center;
          }
        }
        .isBoxActive {
          color: $active-color !important;
        }
      }
      .size {
        margin-top: 25rpx;
        display: flex;
        justify-content: center;
        padding-right: 30rpx;
        .out {
          position: relative;
          width: 96rpx;
          height: 40rpx;
          font-size: 20rpx;
          color: #c5c9ca;
          text-align: center;
          border: 2rpx solid #5d6466;
          &:not(:first-child) {
            margin-left: 20rpx;
          }
          .in {
            position: absolute;
            left: -6%;
            top: -6rpx;
            width: 100rpx;
            height: 45rpx;
            line-height: 40rpx;
            background: #5d6466;
          }
        }
      }
      .isActiveIn {
        color: #fff !important;
        background: $active-color !important;
      }
      .isActiveOutBoder {
        border: 2rpx solid $active-color !important;
      }
    }
  }
  /* 用户提问区域 */
  .scroll {
    margin-top: 350rpx;
    box-sizing: border-box;
    .question_area {
      margin-right: 30rpx;
      .user_question {
        margin-bottom: 30rpx;
        display: flex;
        justify-content: space-between;
        .left_img {
          margin-right: 27rpx;
          width: 60rpx;
          height: 60rpx;
          border-radius: 100%;
          overflow: hidden;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .right_megs {
          width: calc(100% - 87rpx);
          font-size: $sub-size;
          font-weight: 500;
          color: $text-color;
          font-weight: bold;
          border-bottom: 2rpx solid $back-color;
          .user_name {
            margin-bottom: 34rpx;
          }
          .user_content {
            margin-bottom: 50rpx;
            width: 100%;
            line-height: 46rpx;
            .megs {
            }
            .tags {
              color: $sub-color;
            }
          }
          .question_time {
            margin-bottom: 30rpx;
            display: flex;
            justify-content: space-between;
            font-size: $mini-size;
            font-weight: 400;
            color: $sub-color;
            .time {
            }
            .number {
              display: flex;
              .box {
                display: flex;
                font-size: 24rpx;
                .iconfont {
                  margin: auto 0;
                  font-size: 24rpx;
                }
                .readNum {
                  margin: 2rpx 30rpx 0 10rpx;
                }
                .megsNum {
                  margin: 2rpx 0 0 10rpx;
                }
              }
            }
          }
        }
      }
    }
  }
  /* 机型底部兼容 */
  .phone_model_bottom {
    padding-bottom: 30rpx;
  }
}
</style>