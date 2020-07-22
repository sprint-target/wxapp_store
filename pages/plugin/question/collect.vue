<template>
  <view :class="isOpenChange?'content padding_bottom':'content'">
    <view class="ask_answer_btn">
      <view class="btn" @tap="ask_question()">提问</view>
      <view class="btn" @tap="response()">解答</view>
    </view>
    <view class="collect_class">
      <scroll-view :scroll-x="true">
        <span
          v-for="(item,index) in collect_class_arr"
          :key="index"
          :class="current==index?'tag isActive':'tag'"
          @tap="toSwitchTag(index)"
        >{{item}}</span>
      </scroll-view>
      <view class="right">
        <span class="iconfont iconsousuo icon_btn"></span>
        <!-- <scroll-action @action="handleAction"> -->
        <span class="change_btn" @tap="toChange()" v-text="isOpenChange?'完成':'编辑'"></span>
        <!-- </scroll-action> -->
      </view>
    </view>
    <view :class="phone_model?'scroll phone_model_bottom':'scroll'">
      <!-- 问题区域 -->
      <view class="question_area">
        <view
          :class="isOpenChange?'user_question openChange':isCloseChange?'user_question closeChange':'user_question'"
          v-for="(item,index) in ques_arr"
          :key="index"
          @tap="toSelect(index,item.isChecked)"
        >
          <view class="radio_group">
            <radio-group>
              <label>
                <radio color="#BF7330" :checked="item.isChecked" />
              </label>
            </radio-group>
          </view>
          <view
            class="left_img"
            :style="isOpenChange?'width:68rpx;height:60rpx;transition:all 0.5s':'width: 60rpx;height: 60rpx;transition:all 0.5s'"
          >
            <image :src="item.avatar" />
          </view>
          <view class="right_megs">
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
    <view
      :class="isOpenChange?'select_bottom up':isCloseChange?'select_bottom down':'select_bottom'"
    >
      <view class="bottom_radio">
        <radio-group>
          <label @tap="toAllSelect(isAllSelect)">
            <radio color="#BF7330" :checked="isAllSelect" />
            <text style="font-size:28rpx;font-weight:500;color:#1A1A1A">全选</text>
          </label>
        </radio-group>
      </view>
      <view class="delect" @tap="toDelect">删除</view>
    </view>
  </view>
</template>

<script>
import tool from "../../../utils/tool";
import { scrollAction } from "@/components/scrollAction";
export default {
  components: {
    scrollAction
  },
  data() {
    return {
      phone_model: null, //手机机型
      current: 0,
      collect_class_arr: ["我的提问", "我的回答"],
      ques_arr: [
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "洗碗机和油烟机大家可以推荐下吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          readNum: "666",
          megsNum: "777",
          isChecked: false
        },
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "洗碗机和油烟机大家可以推荐下吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          readNum: "666",
          megsNum: "777",
          isChecked: false
        },
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "洗碗机和油烟机大家可以推荐下吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          readNum: "666",
          megsNum: "777",
          isChecked: false
        },
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "洗碗机和油烟机大家可以推荐下吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          readNum: "666",
          megsNum: "777",
          isChecked: false
        },
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "洗碗机和油烟机大家可以推荐下吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          readNum: "666",
          megsNum: "777",
          isChecked: false
        },
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "洗碗机和油烟机大家可以推荐下吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          readNum: "666",
          megsNum: "777",
          isChecked: false
        },
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "洗碗机和油烟机大家可以推荐下吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          readNum: "666",
          megsNum: "777",
          isChecked: false
        },
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "洗碗机和油烟机大家可以推荐下吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          readNum: "666",
          megsNum: "777",
          isChecked: false
        },
        {
          avatar: "../../../static/images/test_avatar.png",
          nickname: "方太电器",
          content: "洗碗机和油烟机大家可以推荐下吗？",
          tags: "洗碗机",
          num: "JQG7505",
          time: "2020-07-04 21:20",
          readNum: "666",
          megsNum: "999",
          isChecked: false
        }
      ],
      isAllSelect: false, //是否全选
      isOpenChange: false, //打开商品选择
      isCloseChange: false, //关闭商品选择
      isNoSelect: true //是否已有商品选中
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad() {
    let t = this;
    t.phone_model = t.$u.getPhoneModel();
    console.log(t.phone_model, "手机机型");
    /*   let t = this,
      ques_arr = t.ques_arr;
    ques_arr.map((v, i) => {
      v.isChecked = false;
    });
    t.ques_arr = ques_arr;
    console.log(ques_arr, "最新数组"); */
  },
  methods: {
    moveHandle() {},
    ask_question() {
      let t = this;
      t.$u.changePage(t.$r.ques_create);
    },
    response() {
      let t = this;
      t.$u.changePage(t.$r.ques_answer);
    },
    toSwitchTag(i) {
      let t = this,
        current = t.current;
      if (current != i) {
        t.current = i;
      }
    },
    toChange: tool.throttle(function() {
      let t = this;
      t.isOpenChange = !t.isOpenChange;
      if (!t.isOpenChange) {
        t.isCloseChange = true;
      } else {
        t.isCloseChange = false;
      }
      setTimeout(() => {
        t.isContinuous = false;
      }, 600);
    }, 600),
    toSelect(index, c) {
      if (!this.isOpenChange) return;
      let t = this,
        ques_arr = t.ques_arr;
      c = !c;
      console.log(c);
      ques_arr.map((v, i) => {
        if (index == i) {
          v.isChecked = c;
        }
      });
      //判断是否全部选中
      t.isAllSelect = ques_arr.every(v => {
        if (v.isChecked == true) {
          return true;
        } else {
          return false;
        }
      });
      //判断是否有一商品被选中
      t.isNoSelect = ques_arr.every(v => {
        if (v.isChecked == false) {
          return true;
        } else {
          return false;
        }
      });
      t.ques_arr = ques_arr;
      console.log(t.ques_arr);
    },
    toAllSelect(all) {
      let t = this,
        ques_arr = t.ques_arr;
      all = !all;
      t.isAllSelect = all;
      console.log(t.isAllSelect);
      ques_arr.map((v, i) => {
        v.isChecked = all;
      });
      //判断是否有一商品被选中
      t.isNoSelect = ques_arr.every(v => {
        if (v.isChecked == false) {
          return true;
        } else {
          return false;
        }
      });
      t.ques_arr = ques_arr;
    },
    //是否删除商品
    toDelect() {
      let t = this;
      if (t.isNoSelect) {
        uni.showToast({
          mask: true,
          icon: "none",
          title: "请先选择要操作的商品",
          duration: 2000
        });
      } else {
        t.$u.showModal(
          "是否删除选中收藏项？",
          t.confirm,
          t.cancel,
          "以后再说",
          "#293539",
          "是",
          "#293539"
        );
        // t.isMask = true;
      }
    },
    /* 确实删除商品操作 */
    confirm() {
      console.log("确定删除");
    },
    /* 取消删除商品操作 */
    cancel() {
      console.log("取消删除");
    }
  }
};
</script>

<style lang='scss' scoped>
.content {
  margin-top: 110rpx;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  transition: width 0.6s;
  .ask_answer_btn {
    position: fixed;
    bottom: 150rpx;
    right: 30rpx;
    z-index: 999;
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
  .collect_class {
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-left: 30rpx;
    height: 100rpx;
    box-sizing: border-box;
    background: #fff;
    z-index: 999;
    scroll-view {
      width: 85%;
      height: 100rpx;
      white-space: nowrap;
      .tag {
        display: inline-block;
        width: 150rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        color: #979d9f;
        font-size: $sub-size;
        font-weight: bold;
      }
      .isActive {
        color: $active-color;
        border-bottom: 4rpx solid $active-color;
      }
    }
    .right {
      display: flex;
      margin: 20rpx 25rpx 0 0;
      height: 30rpx;
      line-height: 30rpx;
      .icon_btn {
        margin-right: 20rpx;
        font-size: 28rpx;
      }
      .change_btn {
        font-size: 26rpx;
        font-weight: bold;
        color: #293539;
        width: 60rpx;
      }
    }
  }
  /* 用户提问区域 */
  .scroll {
    box-sizing: border-box;
    .question_area {
      margin: 0 30rpx;
      .user_question {
        margin-bottom: 30rpx;
        position: relative;
        display: flex;
        justify-content: space-between;
        .radio_group {
          position: absolute;
          top: calc(50% - 25rpx);
          left: -80rpx;
        }
        .left_img {
          margin-right: 27rpx;
          width: 60rpx;
          height: 60rpx;
          border-radius: 100%;
          overflow: hidden;
          image {
            will-change: transform;
            width: 100%;
            height: 100%;
          }
        }
        .right_megs {
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
      .openChange {
        animation: identifier 0.5s ease-in-out;
        animation-fill-mode: forwards;
      }
      .closeChange {
        animation: _identifier 0.5s ease-in-out;
        animation-fill-mode: forwards;
      }
      @keyframes identifier {
        from {
          transform: translateX(0rpx);
        }
        to {
          transform: translateX(70rpx);
        }
      }
      @keyframes _identifier {
        from {
          transform: translateX(70rpx);
        }
        to {
          transform: translateX(0rpx);
        }
      }
    }
  }
  /* 机型底部兼容 */
  .phone_model_bottom {
    padding-bottom: 30rpx !important;
  }
  .select_bottom {
    position: fixed;
    display: flex;
    justify-content: space-between;
    padding-left: 20rpx;
    padding-right: 40rpx;
    bottom: -100vh;
    width: 100%;
    height: 80rpx;
    background: #fff;
    box-sizing: border-box;
    view {
      margin: auto 0;
    }
  }
  /* 底部全选，删除 */
  .down {
    animation: down 1s ease-in-out;
    animation-fill-mode: forwards;
  }
  .up {
    animation: up 0.4s ease-in-out;
    animation-fill-mode: forwards;
  }
  @keyframes down {
    from {
      bottom: 0;
    }
    to {
      bottom: -100vh;
    }
  }
  @keyframes up {
    from {
      bottom: -100vh;
    }
    to {
      bottom: 0vh;
    }
  }
}
.padding_bottom {
  width: calc(100% - 60rpx);
  padding-bottom: 80rpx;
}
</style>