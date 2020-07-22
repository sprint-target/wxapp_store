<template>
  <view class="content">
    <view class="title">
      <textarea
        maxlength="-1"
        auto-height
        placeholder="请在此输入提问内容（必填）"
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
    <view class="product_tags">
      <view style="flex:1;margin: auto 0;">
        <span @tap="toAddTopic(tags)">＋产品话题</span>
        <span v-if="!tags.length" @tap="toAddTopic(tags)">（至少添加一个）</span>
        <span v-else>{{'('+tags.length+'/3)'}}</span>
      </view>
      <view v-if="tags.length" class="topics">
        <view class="topics_box" v-for="(item,index) in tags" :key="index">
          <span>{{item.name}}</span>
          <span class="clear_class" @tap="topic_delect(index)">×</span>
        </view>
      </view>
    </view>
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
</template>

<script>
import tool from "../../../utils/tool";
export default {
  data() {
    return {
      phone_model: null, //手机机型
      ques_content: null,
      tags: []
    };
  },
  onShow() {
    if (this.tags.length) {
      this.getTopics();
      console.log(this.tags);
    }
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
          title: "请先输入提问内容",
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
    }, 600),
    toAddTopic(tags) {
      if (tags.length) {
        uni.navigateTo({
          url: "./addTopic?tags=" + JSON.stringify(tags)
        });
      } else {
        uni.navigateTo({
          url: "./addTopic"
        });
      }
    },
    /* 删除标签 */
    topic_delect: tool.throttle(function(arr) {
      let t = this,
        tags = t.tags;
      let [topic_index] = arr;
      tags.splice(topic_index, 1);
    }, 300),
    /* 接受标签页面返回值 */
    getTopics(obj) {
      if (obj) {
        console.log(obj);
        this.tags = obj;
      }
    }
  }
};
</script>

<style  lang='scss' scoped>
.content {
  width: 100%;
  padding: 30rpx 30rpx 0 30rpx;
  min-height: 100vh;
  box-sizing: border-box;
  .title {
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
    display: flex;
    margin-top: 80rpx;
    margin-bottom: 40rpx;
    font-size: $mini-size;
    color: $active-color;
    .topics {
      display: inline-block;
      flex: 3;
      .topics_box {
        margin-left: 24rpx;
        margin-top: 5rpx;
        margin-bottom: 5rpx;
        position: relative;
        display: inline-block;
        padding-left: 25rpx;
        padding-right: 50rpx;
        height: 44rpx;
        line-height: 44rpx;
        font-size: 22rpx;
        color: #a67244;
        background: #e1e5e6;
        border-radius: 22rpx;
        .clear_class {
          position: absolute;
          right: 25rpx;
        }
      }
    }
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
</style>