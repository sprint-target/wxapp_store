<template>
  <view
    class="content"
    :style="isHaveSelect?'min-height: calc(100vh - 200rpx)':'min-height: calc(100vh - 140rpx)'"
  >
    <!-- 顶部吸顶 -->
    <view class="top">
      <!-- 顶部搜索框 -->
      <view class="search">
        <view v-if="topic_search" class="clear">×</view>
        <view class="icon">!</view>
        <view class="input">
          <input type="text" placeholder="请在此搜索话题..." v-model="topic" />
        </view>
      </view>
      <!-- 添加数量限制 -->
      <view class="warn">还可以添加{{topic_max_number-topic_selectArr.length}}个话题</view>
      <!-- 用户标签类别 -->
      <view v-if=" topic_selectArr.length" class="topic_class">
        <view class="topic_box" v-for="(item,index) in  topic_selectArr" :key="index">
          <span>{{'#'+item.name+'#'}}</span>
          <span class="clear_class" @tap="topic_delect(item,topic_allArr,index)">×</span>
        </view>
      </view>
    </view>
    <!-- 话题标签选择 -->
    <view
      :class="phone_model?'topic_select phone_bottom':'topic_select'"
      :style="isHaveSelect?'margin-top:200rpx':'margin-top:140rpx'"
    >
      <view class="box" v-for="(item,index) in topic_allArr" :key="index">
        <view class="left">
          <view class="name">{{'#'+item.name+'#'}}</view>
          <view class="ques_num">{{item.questionsNum+'个问题'}}</view>
        </view>
        <view class="right" @tap="toAddTopic(item,topic_allArr,index)">添加</view>
      </view>
    </view>
    <view class="bottom">
      <view
        class="btn"
        v-text="'完成'"
        :style="isHaveSelect?'background:#A67244':'background:#C9AA8F'"
        @tap="confirm(topic_selectArr)"
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
      topic_max_number: 3,
      topic_search: null,
      isHaveSelect: false,
      topic_selectArr: [],
      topic_allArr: [
        { name: "抽油机", questionsNum: "262" },
        { name: "岛式抽油机", questionsNum: "26" },
        { name: "洗碗机", questionsNum: "62" },
        { name: "油烟机", questionsNum: "15" }
      ]
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad(options) {
    let t = this;
    t.phone_model = t.$u.getPhoneModel();
    console.log(t.phone_model, "手机机型");
    if (options.tags) {
      t.isHaveSelect = true;
      t.topic_selectArr = JSON.parse(options.tags);
      console.log(options);
    }
  },
  methods: {
    toAddTopic: tool.throttle(function(arr) {
      let t = this,
        topic_selectArr = t.topic_selectArr;
      let [topic_item, topic_allArr, topic_index] = arr;
      console.log(topic_allArr);
      if (topic_selectArr.length < 3) {
        t.isHaveSelect = true;
        topic_selectArr.push(topic_item);
        topic_allArr.splice(topic_index, 1);
      } else if (topic_selectArr.length == 3) {
        t.isHaveSelect = true;
        uni.showToast({
          mask: true,
          icon: "none",
          title: "标签已选满",
          duration: 2000
        });
      }
    }, 300),
    /* 删除标签 */
    topic_delect: tool.throttle(function(arr) {
      let t = this,
        topic_selectArr = t.topic_selectArr;
      let [item, topic_allArr, topic_index] = arr;
      if (topic_selectArr.length <= 3 && topic_selectArr.length != 0) {
        t.isHaveSelect = true;
        topic_selectArr.splice(topic_index, 1);
        topic_allArr.splice(0, 0, item);
        if (!topic_selectArr.length) {
          t.isHaveSelect = false;
        }
      }
    }, 300),
    confirm: tool.throttle(function(arr) {
      let t = this;
      if (!t.isHaveSelect) {
        uni.showToast({
          mask: true,
          icon: "none",
          title: "请先选择至少一个话题标签",
          duration: 2000
        });
      } else {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2]; //上一个页面
        let [obj] = arr;
        prevPage.$vm.getTopics(obj);
        uni.navigateBack({
          delta: 1
        });
      }
    }, 600)
  }
};
</script>

<style lang='scss' scoped>
.content {
  width: 100%;
  //   min-height: calc(100vh - 140rpx);
  //吸顶
  .top {
    position: fixed;
    top: 0;
    width: 100%;
    background: #fff;
    //顶部搜索框
    .search {
      position: relative;
      margin: 0 30rpx;
      display: flex;
      // border: 1rpx solid red;
      height: 60rpx;
      line-height: 60rpx;
      background: #f1f2f7;
      border-radius: 30rpx;
      overflow: hidden;
      .icon {
        flex: 1;
        text-align: center;
        //   border: 1rpx solid yellow;
      }
      .input {
        flex: 15;
        //   border: 1rpx solid blue;
        input {
          height: 100%;
        }
      }
      .clear {
        position: absolute;
        right: 20rpx;
      }
    }
    //添加数量限制
    .warn {
      margin: 20rpx 30rpx 30rpx 30rpx;
      font-size: $mini-size;
      color: $sub-color;
    }
    //用户标签类别
    .topic_class {
      margin: 0 30rpx;
      margin-bottom: 20rpx;
      display: flex;
      flex-wrap: wrap;
      .topic_box {
        position: relative;
        padding-left: 25rpx;
        padding-right: 50rpx;
        height: 44rpx;
        line-height: 44rpx;
        font-size: $mini-size;
        color: $active-color;
        background: $disabled-back;
        border-radius: 22rpx;
        &:not(:first-child) {
          margin-left: 20rpx;
        }
        .clear_class {
          position: absolute;
          right: 25rpx;
        }
      }
    }
  }
  //标签选择区域
  .topic_select {
    .box {
      margin: 0 30rpx;
      margin-bottom: 28rpx;
      display: flex;
      justify-content: space-between;
      .left {
        .name {
          margin-bottom: 15rpx;
          color: $text-color;
          font-size: 34rpx;
        }
        .ques_num {
          color: $sub-color;
          font-size: $mini-size;
          font-weight: 500;
        }
      }
      .right {
        margin: auto 0;
        width: 120rpx;
        height: 50rpx;
        line-height: 50rpx;
        text-align: center;
        color: #fff;
        font-size: $sub-size;
        background: $active-color;
        border-radius: 10rpx;
      }
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    padding: 20rpx 0;
    height: 83rpx;
    line-height: 83rpx;
    text-align: center;
    color: #fff;
    font-size: 36rpx;
    font-weight: 500;
    background: #fff;
    width: 100%;
    .btn {
      border-radius: 42rpx;
      margin: 0 30rpx;
      background: $active-color;
    }
  }
}
/* 手机机型兼容 */
.phone_bottom {
  //   margin-bottom: 120rpx;
  padding-bottom: 120rpx;
}
</style>