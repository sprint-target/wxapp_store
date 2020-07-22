<template>
  <view>
    <detail-swiper :swiperData="swiperImgs"></detail-swiper>

    <view class="content">
      <view class="price_box">
        <view class="price">{{detail.money}}</view>
        <view class="icon_btn" @tap="goSelect(3, false)">
          <span class="iconfont iconfenxiang share_icon_color"></span>
          <view>分享</view>
        </view>
      </view>
      <view class="detail_box">
        <view class="main_title">{{detail.title}}</view>
        <view class="explain_title">{{detail.explain}}</view>
      </view>
      <view class="select_box box">
        <view class="select_common click" @tap="goSelect(1, true)">
          <view class="select">
            <view class="select_title">选择</view>
            <view class="select_btn">请选择产品规格</view>
          </view>
          <span class="iconfont iconshoucang-tianchong"></span>
        </view>
        <view class="select_common click" @tap="goSelect(2, true)">
          <view class="select">
            <view class="select_title">服务</view>
            <view class="select_btn">方太安心购买</view>
          </view>
          <span class="iconfont iconshoucang-tianchong"></span>
        </view>
      </view>
      <view class="box comment_box">
        <view class="box_title">评价</view>
        <view class="comment">
          <view class="user_Avatar">
            <image src="/static/logo.png" />
          </view>
          <view class="user_detail">
            <view class="first_line">
              <view class="user_nickname">
                <view>昵称</view>
                <view class="vip">
                  <view class="vip_title">vip会员</view>
                </view>
              </view>
              <view class="comment_time">2020-04-05</view>
            </view>
            <view>星级</view>
            <view class="comment_content">这是评价啊啊啊</view>
          </view>
        </view>
        <view class="more">
          <view class="more_btn" @tap="goMore('commit')">查看更多(162)</view>
        </view>
      </view>
      <view class="ask_box">
        <view class="title_line">
          <view class="box_title">问大家</view>
          <view class="ask_more" @tap="goMore('question')">查看全部</view>
        </view>
        <view class="ask_title click" v-for="(item, index) in askList" :key="index">{{item.title}}</view>
      </view>
    </view>
    <view class="more_detail">这是详细</view>

    <view class="bottom_bar">
      <view class="icon_btn" @tap="collect">
        <span
          class="iconfont"
          :class="detail.is_collect ? 'iconshoucang-tianchong active_collect' : 'iconshoucang-xianxing'"
        ></span>
        <view>收藏</view>
      </view>
      <view class="icon_btn">
        <span class="iconfont iconwodechanpin"></span>
        <view>客服</view>
      </view>
      <view class="icon_btn click" @tap="goCart">
        <span class="iconfont iconwodechanpin"></span>
        <view>购物车</view>
      </view>
      <view class="shop_btns">
        <view class="common_btn add" @tap="goSelect(1, true)">加购物车</view>
        <view class="common_btn buy" @tap="goSelect(1, true)">立即购买</view>
      </view>
    </view>
    <modal :show="modalShow" @closeModal="closeModal" :showclose="showclose">
      <view v-if="modalId == 1">
        <spec-modal></spec-modal>
        <view class="modal_btn">
          <view class="modal_common_btn add" @tap="addToCart">加购物车</view>
          <view class="modal_common_btn buy" @tap="toBuy">立即购买</view>
        </view>
      </view>
      <view v-if="modalId == 2">阿巴阿巴阿巴</view>
      <view v-if="modalId == 3">
        <view class="share_menu">
          <button
            v-for="item in shareList"
            :key="item.id"
            class="icon_btn"
            @tap="share(item.id)"
            :open-type="item.open"
          >
            <span class="iconfont share_icon" :class="item.icon" :style="{color: item.color}"></span>
            <view>{{item.title}}</view>
          </button>
        </view>
        <view class="cancel_btn" @tap.stop="closeModal">取消</view>
      </view>
    </modal>
    <poster-modal v-if="posterstate" :posterstate="posterstate" :poster="poster" @hide="hideposter"></poster-modal>
  </view>
</template>
<script>
import tool from "../../utils/tool";
import detailSwiper from "../../components/detailSwiper";
import modal from "../../components/modal";
import specModal from "../../components/specModal";
import posterModal from "../../components/poster";
import { swiperImgs, askList, shareList } from "../../utils/data";
export default {
  components: {
    detailSwiper,
    modal,
    specModal,
    posterModal
  },
  data() {
    return {
      swiperImgs: swiperImgs,
      detail: "",
      modalId: 1,
      askList: askList,
      shareList: shareList,
      modalShow: false,
      showclose: true,
      posterstate: false,
      poster: ""
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onShow() {
    this.listen();
  },
  onLoad() {
    this.init();
  },
  shareTimeline() {
    return {
      title: "啊啊啊啊"
    };
  },
  methods: {
    // 初始加载
    init() {
      uni.showShareMenu({
        withShareTicket: true,
        menus: ["shareAppMessage", "shareTimeline"]
      });
      this.getDetail();
    },
    // 监听截图
    listen() {
      let t = this;
      uni.onUserCaptureScreen(function() {
        console.log("截图");
        t.createPoster();
      });
    },
    // 获取详情
    async getDetail() {
      let res = {
        money: `￥${this.$u.formatMoney(1099)}`,
        title: "FOTILE EMS9018",
        explain:
          "36英寸壁挂式贯通找,550cfm,超低噪音48dB/128,哈哈都是骗你的超低噪音48dB/128哈哈都是骗你的超低噪音48dB/128哈哈都是骗你的",
        is_collect: false
      };
      this.$u.setTitle(res.title);
      this.detail = res;
    },
    // 收藏
    collect() {
      this.detail["is_collect"] = !this.detail["is_collect"];
    },
    // 选择规格或者查看说明
    async goSelect(id, showclose) {
      this.modalId = await id;
      this.showclose = await showclose;
      this.modalShow = true;
    },
    // 跳转购物车
    goCart() {
      this.$u.changePage(this.$r.cart);
    },
    goMore (route) {
      let url = this.$r[route]
      this.$u.changePage(url)
    },
    // 添加到购物车
    addToCart: tool.throttle(function() {
      console.log("添加");
    }),
    // 跳转购买页
    toBuy: tool.throttle(function() {
      this.closeModal();
      this.$u.changePage(this.$r.buy);
    }),
    share(id) {
      switch (id) {
        case 1:
          console.log("发送");
          break;
        case 2:
          this.createPoster();
          break;
      }
    },
    // 生成海报
    createPoster() {
      console.log("生成海报");
      this.posterstate = true;
      this.closeModal();
    },
    // 隐藏海报
    hideposter() {
      let poster = uni.getStorageSync("poster");
      if (poster) {
        this.poster = poster;
        uni.removeStorageSync("poster");
      }
      this.posterstate = false;
    },
    // 关闭动作弹窗
    closeModal() {
      this.modalShow = false;
    }
  }
};
</script>
<style lang='scss' scoped>
button {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.01);
  line-height: normal;
  margin: 0;
}
button::after {
  border: none;
}
.content {
  padding: 0 30upx;
}
.price_box {
  @include between();
  padding-top: 34upx;
  .price {
    color: $price-color;
    font-size: $num-size;
  }
}

.detail_box {
  padding-top: 39upx;
  padding-bottom: 29upx;
  border-bottom: 1upx solid $line-color;
  .main_title {
    font-size: $main-title-size;
  }
  .explain_title {
    padding-top: 20upx;
    font-size: $sub-size;
    color: $sub-color;
  }
}

.box {
  padding: 15upx 0;
  border-bottom: 1upx solid $line-color;
}
.box_title {
  font-size: $sub-size;
  color: #000;
  font-weight: bold;
}
.select_common {
  @include between();
  padding: 15upx 0;
}

.select {
  display: flex;
  align-items: center;
  font-size: 26upx;
  .select_title {
    color: #979d9f;
    margin-right: 50upx;
  }
}

.comment {
  padding-top: 20upx;
  display: flex;
  font-size: $sub-size;
  // align-items: center;
  .user_Avatar {
    width: 60upx;
    height: 60upx;
    border-radius: 50%;
    overflow: hidden;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .user_detail {
    flex: 1;
    min-width: 0;
    margin-left: 19upx;
  }
  .first_line {
    @include between();
    padding-bottom: 10upx;
  }
  .user_nickname {
    display: flex;
    align-items: center;
  }
  .comment_time {
    color: #979d9f;
  }
  .comment_content {
    padding-top: 20upx;
  }
  .vip {
    border: 2upx solid $active-color;
    box-sizing: border-box;
    margin-left: 36upx;
    font-size: 18upx;
    .vip_title {
      display: inline-block;
      background-color: $active-color;
      margin: 2upx;
      color: #fff;
      text-align: center;
      padding: 2upx 5upx;
    }
  }
}
.more {
  text-align: center;
  margin-top: 40upx;
  .more_btn {
    display: inline-block;
    padding: 11upx 36upx;
    border: 1upx solid $active-color;
    border-radius: 1000upx;
    font-size: 20upx;
    color: $active-color;
  }
  .more_btn:active {
    background-color: $active-color;
    color: #fff;
  }
}

.title_line {
  @include between();
  padding-bottom: 20upx;
}
.ask_more {
  color: $active-color;
  font-size: 20upx;
}
.ask_box {
  padding: 30upx 0;
  .ask_title {
    margin-bottom: 15upx;
    font-size: $sub-size;
    @include overtext(1);
  }
}
.more_detail {
  padding-bottom: 160upx;
}

.share_menu {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 40upx;
  padding-bottom: 30upx;
}
.cancel_btn {
  margin: 26upx 30upx 30upx;
  border-radius: 100upx;
  padding: 17upx 0;
  background-color: $line-color;
  text-align: center;
}

.bottom_bar {
  position: fixed;
  bottom: 0;
  padding: 8upx 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  box-shadow: 0 1upx 25upx 3upx rgba($color: $active-color, $alpha: 0.5);
  z-index: 99;
  background-color: #fff;
}
.common_btn {
  width: 212upx;
  height: 78upx;
  line-height: 78upx;
  color: #fff;
  font-size: $main-size;
  text-align: center;
}
.shop_btns {
  display: flex;
  align-items: center;
}
.icon_btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: $mini-size;
  span {
    padding-bottom: 7upx;
  }
}
.active_collect {
  color: $active-color;
  animation: heartBeat ease 0.5s forwards;
}
.share_icon_color {
  color: #979d9f;
}
.share_icon {
  font-size: 70upx;
}
.add {
  position: relative;
  border-radius: 500upx 0 0 500upx;
  background-color: #a67244;
  overflow: hidden;
  // box-shadow: -1upx 3upx 10upx 1upx #a67244;
}
.buy {
  position: relative;
  border-radius: 0 500upx 500upx 0;
  background-color: $price-color;
  overflow: hidden;
  // box-shadow: 1upx 3upx 10upx 1upx $price-color;
}
// .add:active, buy:active {
//   opacity: .8;
// }
.add:active {
  background-color: #7a5433;
}
.buy:active {
  background-color: #69191f;
}
// .add::after, .buy::after {
//   content: "";
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   pointer-events: none;
//   background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
//   background-repeat: no-repeat;
//   background-position: 50%;
//   transform: scale(10, 10);
//   opacity: 0;
//   transition: transform 0.3s, opacity 0.5s;
// }
// .add:active::after,
// .buy:active::after {
//   transform: scale(0.3, 0.3);
//   opacity: 0.3;
//   transition: 0s;
// }

.modal_btn {
  margin: 56upx 30upx 20upx;
  display: flex;
  align-items: center;
}
.modal_common_btn {
  flex: 1;
  color: #fff;
  font-size: $main-size;
  text-align: center;
  padding: 24upx 0;
}

@keyframes heartBeat {
  0%,
  100% {
    transform: scale(1, 1);
  }
  40% {
    transform: scale(1.3, 1.3);
  }
  80% {
    transform: scale(0.8, 0.8);
  }
}
@keyframes wave {
  from {
    transform: scale(0, 0);
  }
  to {
    transform: scale(10, 10);
  }
}
</style>