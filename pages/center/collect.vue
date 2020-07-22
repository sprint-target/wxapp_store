<template>
  <view :class="isOpenChange?'content padding_bottom':'content'">
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
    <view class="goods_list">
      <view
        :class="isOpenChange?'card openChange':isCloseChange?'card closeChange':'card'"
        v-for="(item,index) in collect_goods_arr"
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
        <view class="left">
          <view class="img">
            <image :src="item.url" mode />
          </view>
        </view>
        <view class="right">
          <view class="title">{{item.title}}</view>
          <view class="bottom">&lt;{{item.class}}&gt;</view>
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
    <!-- 遮罩层->废弃 -->
    <!--    <view
      v-if="isMask"
      class="mask"
      @touchmove.stop.prevent="moveHandle()"
      @tap.stop="isMask=false"
    >
      <view class="model" @tap.stop="isMask=true">
        <view class="model_content">
          <text>是否删除选中收藏项？</text>
        </view>
        <view class="model_btn">
          <span @tap.stop="isMask=false" style="border-right:1rpx solid #F1F2F7">以后再说</span>
          <span @tap.stop="isMask=false">是</span>
        </view>
      </view>
    </view>-->
  </view>
</template>

<script>
import tool from "../../utils/tool";
import { scrollAction } from "@/components/scrollAction";
export default {
  components: {
    scrollAction //阻止多次点击
  },
  data() {
    return {
      current: 0,
      collect_class_arr: ["要点", "产品"],
      collect_goods_arr: [
        {
          id: 0,
          url: "../../static/images/pro.jpg",
          title: "如何顺利地安装一台油烟机？看这篇就够了！看这里",
          class: "厨房百科",
          isChecked: false
        },
        {
          id: 1,
          url: "../../static/images/pro.jpg",
          title: "JQG7505抽油烟机！",
          class: "产品维养",
          isChecked: false
        },
        {
          id: 2,
          url: "../../static/images/pro.jpg",
          title: "方太邀你面对面，体验非一般感觉。",
          class: "DIY安装",
          isChecked: false
        },
        {
          id: 3,
          url: "../../static/images/pro.jpg",
          title: "如何规划理想厨房，看这一篇就够了。",
          class: "资讯",
          isChecked: false
        },
        {
          id: 4,
          url: "../../static/images/pro.jpg",
          title: "如何规划理想厨房，看这一篇就够了。",
          class: "资讯",
          isChecked: false
        },
        {
          id: 5,
          url: "../../static/images/pro.jpg",
          title: "如何规划理想厨房，看这一篇就够了。",
          class: "资讯",
          isChecked: false
        },
        {
          id: 6,
          url: "../../static/images/pro.jpg",
          title: "如何规划理想厨房，看这一篇就够了。",
          class: "资讯",
          isChecked: false
        },
        {
          id: 7,
          url: "../../static/images/pro.jpg",
          title: "如何规划理想厨房，看这一篇就够了。",
          class: "资讯",
          isChecked: false
        },
        {
          id: 8,
          url: "../../static/images/pro.jpg",
          title: "如何规划理想厨房，看这一篇就够了。",
          class: "资讯",
          isChecked: false
        },
        {
          id: 9,
          url: "../../static/images/pro.jpg",
          title: "如何规划理想厨房，看这一篇就够了。",
          class: "资讯",
          isChecked: false
        }
      ],
      isMask: false, //是否显示遮罩层
      isAllSelect: false, //是否全选
      isOpenChange: false, //打开商品选择
      isCloseChange: false, //关闭商品选择
      isNoSelect: true //是否已有商品选中
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad() {
    /*   let t = this,
      collect_goods_arr = t.collect_goods_arr;
    collect_goods_arr.map((v, i) => {
      v.isChecked = false;
    });
    t.collect_goods_arr = collect_goods_arr;
    console.log(collect_goods_arr, "最新数组"); */
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
        collect_goods_arr = t.collect_goods_arr;
      c = !c;
      console.log(c);
      collect_goods_arr.map((v, i) => {
        if (index == i) {
          v.isChecked = c;
        }
      });
      //判断是否全部选中
      t.isAllSelect = collect_goods_arr.every(v => {
        if (v.isChecked == true) {
          return true;
        } else {
          return false;
        }
      });
      //判断是否有一商品被选中
      t.isNoSelect = collect_goods_arr.every(v => {
        if (v.isChecked == false) {
          return true;
        } else {
          return false;
        }
      });
      t.collect_goods_arr = collect_goods_arr;
      console.log(t.collect_goods_arr);
    },
    toAllSelect(all) {
      let t = this,
        collect_goods_arr = t.collect_goods_arr;
      all = !all;
      t.isAllSelect = all;
      console.log(t.isAllSelect);
      collect_goods_arr.map((v, i) => {
        v.isChecked = all;
      });
      //判断是否有一商品被选中
      t.isNoSelect = collect_goods_arr.every(v => {
        if (v.isChecked == false) {
          return true;
        } else {
          return false;
        }
      });
      t.collect_goods_arr = collect_goods_arr;
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
  .goods_list {
    margin-top: 40rpx;
    margin: 0 30rpx;
    .card {
      display: flex;
      position: relative;
      margin-bottom: 30rpx;
      width: 100%;
      .radio_group {
        position: absolute;
        top: calc(50% - 25rpx);
        left: -80rpx;
      }
      .left {
        margin-right: 30rpx;
        .img {
          width: 240rpx;
          height: 160rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        width: 468rpx;
        .title {
          display: -webkit-box;
          font-size: $_main-size;
          font-weight: 500;
          line-height: 50rpx;
          color: $text-color;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .bottom {
          text-align: right;
          font-size: $sub-size;
          font-weight: 500;
          color: $sub-color;
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
    box-shadow: 0px -14rpx 34rpx 0px rgba(166, 114, 68, 0.2);
    view {
      margin: auto 0;
    }
  }
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
  /* 遮罩层 */
  .mask {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    .model {
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 500rpx;
      height: 240rpx;
      color: $text-color;
      text-align: center;
      background: #fff;
      border-radius: 8rpx;
      .model_content {
        height: 160rpx;
        line-height: 160rpx;
        font-size: $main-size;
        font-weight: 500;
      }
      .model_btn {
        display: flex;
        justify-content: space-between;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        font-size: 28rpx;
        border-top: 1rpx solid #f1f2f7;
        span {
          display: inline-block;
          flex: 1;
        }
      }
    }
  }
}
.padding_bottom {
  width: calc(100% - 60rpx);
  padding-bottom: 80rpx;
}
</style>