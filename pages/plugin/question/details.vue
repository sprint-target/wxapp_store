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
            <!-- 用户评论详情区域 -->
            <view
              class="user_content"
              :style="ques_arr.files?'margin-bottom: 20rpx;':'margin-bottom: 50rpx;'"
            >
              <text class="megs">{{ques_arr.content}}</text>
              <text class="tags">{{'#'+ques_arr.tags+'#'}}{{'#'+ques_arr.num+'#'}}</text>
            </view>
            <!-- 用户上传文件区域 -->
            <view class="user_upLoad_file">
              <scroll-view scroll-x="true" style="white-space: nowrap;">
                <view class="file_box" v-for="(item,index) in ques_arr.files" :key="index">
                  <img :src="item" alt />
                </view>
              </scroll-view>
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
    <view
      class="answer_content"
      :style="ques_arr.files?'margin-top: 410rpx;':'margin-top: 300rpx;'"
    >
      <scroll-view
        class="scroll"
        scroll-y="true"
        :style="ques_arr.files?'max-height: calc(100vh - 440rpx);':'max-height: calc(100vh - 305rpx);'"
      >
        <view class="answer_area">
          <view class="user_answer" v-for="(item,index) in answer_arr" :key="index">
            <view class="left_img">
              <image :src="item.avatar" mode />
            </view>
            <view class="right_megs">
              <view class="user_name">{{item.nickname}}</view>
              <view class="user_content">
                <text class="megs">{{item.content}}</text>
              </view>
              <view class="answer_time">
                <view class="time">{{item.time}}</view>
                <view class="number">
                  <span class="starsNum">
                    <text
                      :class="item.isStars?'iconfont iconzan-tianchong':'iconfont  iconhuifangshipin-zan'"
                    ></text>
                    <text>{{item.stars}}</text>
                  </span>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      ques_arr: {
        avatar: "../../../static/images/test_avatar.png",
        nickname: "方太电器",
        content: "洗",
        tags: "洗碗机",
        num: "JQG7505",
        time: "2020-07-04 21:20",
        readNum: "666",
        megsNum: "777",
        files: [
          "../../../static/images/pro.jpg",
          "../../../static/images/pro.jpg",
          "../../../static/images/pro.jpg",
          "../../../static/images/pro.jpg",
          "../../../static/images/pro.jpg",
          "../../../static/images/pro.jpg",
          "../../../static/images/pro.jpg",
          "../../../static/images/pro.jpg",
          "../../../static/images/pro.jpg"
        ]
      },
      answer_arr: [
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "洗碗机和油烟机大家可以推荐下吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          stars: 10,
          isStars: true
        },
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "洗碗机和油烟机大家可以推荐下吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          stars: 10,
          isStars: false
        },
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "洗碗机和油烟机大家可以推荐下吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          stars: 10,
          isStars: false
        },
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "洗碗机和油烟机大家可以推荐下吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          stars: 10,
          isStars: false
        },
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "洗碗机和油烟机大家可以推荐下吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          stars: 10,
          isStars: false
        }
      ]
    };
  },
  methods: {}
};
</script>

<style  lang='scss' scoped>
.content {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  //问题详情区域
  .ques_content {
    position: fixed;
    top: 0;
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
          .user_upLoad_file {
            margin-bottom: 32rpx;
            scroll-view {
              display: flex;
              .file_box {
                display: inline-block;
                width: 150rpx;
                height: 150rpx;
                overflow: hidden;
                image {
                  width: 100%;
                  height: 100%;
                }
                &:not(:first-child) {
                  margin-left: 16rpx;
                }
              }
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
    margin-top: 300rpx;
    border-top-left-radius: 50rpx;
    border-top-right-radius: 50rpx;
    box-shadow: 0px -5rpx 10rpx 0rpx rgba(166, 114, 68, 0.15);
    .scroll {
      .answer_area {
        margin: 0 30rpx;
        margin-top: 30rpx;
        .user_answer {
          margin: 0 30rpx;
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
            }
            .answer_time {
              margin-bottom: 30rpx;
              display: flex;
              justify-content: space-between;
              font-size: $mini-size;
              font-weight: 400;
              color: $sub-color;
              .time {
              }
              .number {
                .starsNum {
                  margin-right: 30rpx;
                  .iconfont {
                    padding-right: 10rpx;
                  }
                  .iconzan-tianchong {
                    color: $active-color;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>