<template>
  <view class="content">
    <!-- 问题详情吸顶区域 -->
    <view class="ques_content">
      <view class="question_area">
        <view class="user_question">
          <view class="left_img">
            <image :src="ques_arr.avatar" mode />
          </view>
          <view class="right_megs">
            <view class="user_name">{{ques_arr.nickname}}</view>
            <view class="user_content">
              <text class="megs">{{ques_arr.content}}</text>
              <text class="tags">{{'#'+ques_arr.tags+'#'}}{{'#'+ques_arr.num+'#'}}</text>
            </view>
            <view class="question_time">
              <view class="time">{{ques_arr.time+'更新'}}</view>
              <view class="number">
                <view class="box">
                  <view class="iconfont iconliulanliang"></view>
                  <view class="readNum" style="padding-right:10rpx">{{ques_arr.readNum}}</view>
                </view>
                <view class="box">
                  <view class="iconfont iconpinglun"></view>
                  <view class="megsNum" style="padding-right:10rpx">{{ques_arr.megsNum}}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 问题回答区域 -->
    <view class="answer_content">
      <view class="title">
        <textarea
          maxlength="-1"
          auto-height
          placeholder="请在此输入您的回答（必填）"
          placeholder-style="font-size: $main-size;color: #979d9f;"
          v-model="ques_content"
        ></textarea>
      </view>
      <view class="warn" v-if="!ques_content">
        <p>如何获得更多的解答？</p>
        <p>·保持文字简练，表述清晰</p>
        <p>·添加适合的产品话题，方便问题交流</p>
        <p>·提问内容经审核后发表</p>
      </view>
      <view class="product_tags">＋产品话题（至少添加一个）</view>

      <view class="imgs_video">
        <view class="top_number">0/9</view>
        <view class="upLoad">
          <view class="box">
            <view class="icon_text">
              <view style="font-size:60rpx">＋</view>
              <view>上传图片</view>
            </view>
          </view>
          <view class="box">
            <view class="icon_text">
              <view style="font-size:60rpx">＋</view>
              <view>上传视频</view>
            </view>
          </view>
        </view>
      </view>
      <view
        :class="phone_model?'bottom_btn phone_bottom':'bottom_btn'"
        v-text="'发布'"
        :style="ques_content?'background:#A67244':'background:#C9AA8F'"
        @tap="confirm(ques_content,tags)"
      ></view>
    </view>
  </view>
</template>

<script>
import tool from "../../../utils/tool";
export default {
  data() {
    return {
      phone_model: null, //手机机型
      ques_content: null,
      tags: [],
      ques_arr: {
        avatar: "../../../static/images/test_avatar.png",
        nickname: "方太电器",
        content: "洗",
        tags: "洗碗机",
        num: "JQG7505",
        time: "2020-07-04 21:20",
        readNum: "666",
        megsNum: "777"
      }
    };
  },
  onLoad() {
    let t = this;
    t.phone_model = t.$u.getPhoneModel();
    console.log(t.phone_model, "手机机型");
  },
  methods: {
    confirm: tool.throttle(function(arr) {
      let [content, tags] = arr;
      console.log(content);
      console.log(tags);
      console.log(arr);
      if (!content) {
        uni.showToast({
          mask: true,
          icon: "none",
          title: "请先输入回答内容",
          duration: 2000
        });
        return;
      }
      if (content && tags.length == 0) {
        uni.showToast({
          mask: true,
          icon: "none",
          title: "至少选择一个产品话题标签",
          duration: 2000
        });
        return;
      }
    }, 600)
  }
};
</script>

<style  lang='scss' scoped>
.content {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  //问题详情区域
  .ques_content {
    width: 100%;
    box-sizing: border-box;
    .question_area {
      margin: 0 30rpx;
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
  //问题回答区域
  .answer_content {
    padding: 0 30rpx;
    border-top-left-radius: 50rpx;
    border-top-right-radius: 50rpx;
    box-shadow: 0px -5rpx 10rpx 0rpx rgba(166, 114, 68, 0.15);
    overflow: hidden;
    .title {
      margin-top: 30rpx;
      width: 100%;
      textarea {
        width: 100%;
        max-height: 275rpx;
      }
    }
    .warn {
      margin-top: 40rpx;
      font-size: $sub-size;
      color: #979d9f;
      line-height: 50rpx;
    }
    .product_tags {
      margin-top: 80rpx;
      margin-bottom: 40rpx;
      font-size: $mini-size;
      color: $active-color;
    }
    .imgs_video {
      .top_number {
        margin-bottom: 20rpx;
        font-size: 24rpx;
        color: #979d9f;
      }
      .upLoad {
        display: flex;
        .box {
          position: relative;
          width: 150rpx;
          height: 150rpx;
          font-size: $mini-size;
          color: #b5b2c4;
          text-align: center;
          background: #f6f5fb;
          box-sizing: border-box;
          &:not(:first-child) {
            margin-left: 20rpx;
          }
          .icon_text {
            position: absolute;
            top: 10rpx;
            left: 0;
            right: 0;
          }
        }
      }
    }
    .bottom_btn {
      position: absolute;
      bottom: 20rpx;
      height: 83rpx;
      line-height: 83rpx;
      text-align: center;
      color: #fff;
      font-size: 36rpx;
      font-weight: 500;
      background: $active-color;
      border-radius: 42rpx;
      width: calc(100% - 60rpx);
    }
    /* 手机机型兼容 */
    .phone_bottom {
      bottom: 50rpx !important;
    }
  }
}
</style>