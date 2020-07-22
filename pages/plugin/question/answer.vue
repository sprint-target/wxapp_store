<template>
  <view class="content">
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
    </view>
    <!-- 主题部分 -->
    <view :class="phone_model?'scroll phone_model_bottom':'scroll'">
      <!-- 问题区域 -->
      <view class="question_area">
        <view class="user_question" v-for="(item,index) in ques_arr" :key="index">
          <view class="left_img">
            <image :src="item.avatar" mode />
          </view>
          <view class="right_megs">
            <view class="user_name">{{item.nickname}}</view>
            <view class="user_content">
              <text class="megs">{{item.content}}</text>
              <text class="tags">{{'#'+item.tags+'#'}}{{'#'+item.num+'#'}}</text>
            </view>
            <view class="question_time">
              <view class="time">{{item.time+'的提问'}}</view>
              <view class="answer_btn" @tap="toResponse()">我来回答</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      phone_model: null,
      ques_arr: [
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "推荐下吗？",
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
        },
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "洗碗机和油烟机大家可以推荐下吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          readNum: "666",
          megsNum: "999"
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
    toResponse() {
      let t = this;
      t.$u.changePage(t.$r.ques_response);
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
  }
  /* 用户提问区域 */
  .scroll {
    margin-top: 100rpx;
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
              line-height: 50rpx;
            }
            .answer_btn {
              width: 156rpx;
              height: 50rpx;
              line-height: 50rpx;
              color: #ffffff;
              font-size: 24rpx;
              font-weight: 500;
              text-align: center;
              background: $active-color;
              border-radius: 25rpx;
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