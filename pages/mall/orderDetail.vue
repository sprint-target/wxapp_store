<template>
  <view>
    <view class="modal" v-if="showModal" @tap="closeModal">
      <view class="window">
        <view class="img_box">
          <image src="/static/logo.png" />
          <view class="tip">向商家出示券码即可消费</view>
        </view>
      </view>
    </view>
    <view class="content">
      <view class="goods_page">
        <view class="good_box" v-for="item in goodList" :key="item.id">
          <view class="good_img">
            <image src="/static/logo.png" />
          </view>
          <view class="text_detail">
            <view class="good_name">{{item.title}}</view>
            <view class="good_spec">{{item.spec}};{{item.num}}件</view>
            <view class="good_price">￥{{item.price}}</view>
          </view>
        </view>
      </view>
      <view class="box" v-for="(item, index) in detailList" :key="index">
        <block v-for="(itm, idx) in item.list" :key="idx">
          <view class="line" v-if="itm.value">
            <view class="title">{{itm.title}}</view>
            <view class="value">{{itm.value}}</view>
          </view>
        </block>
      </view>
    </view>
    <view class="real_pay_box">
      <view>商品实付款</view>
      <view class="real_number">￥9890</view>
    </view>
    <view class="bottom_bar">
      <view class="top">
        <view>取消订单</view>
        <view class="btn" @tap="use">使用券码</view>
      </view>
      <view class="bottom">向商家出示券码即可消费</view>
    </view>
  </view>
</template>
<script>
import { payparams, goodList } from "../../utils/data";
export default {
  components: {},
  data() {
    return {
      oid: "",
      detailList: [],
      goodList: goodList,
      showModal: false
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad(op) {
    this.oid = op.oid;
    this.init();
  },
  methods: {
    init() {
      this.getOrderDetail();
    },
    getOrderDetail() {
      let oid = this.oid;
      let res = {
        methods: "快递配送",
        name: "测试姓名",
        phone: "17858805011",
        address: "浙江省宁波市鄞州区爱空间大咔经典款教大家是的2444号",
        store: "",
        orderNum: "1294739274234",
        time: `2020-07-08  08:00:00`,
        status: "待付款",
        totalPrice: "￥7,099",
        freight: "0",
        message: "无"
      };
      for (let i in payparams) {
        let param = payparams[i],
          list = param.list;
        console.log(list);
        for (let j in list) {
          let l = list[j];
          l.value = res[l.name];
        }
      }
      this.detailList = payparams;
      console.log(payparams, "payparams");
    },
    use() {
      this.showModal = true;
      console.log("使用");
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>
<style lang='scss' scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(13, 13, 13, 0.8);
  z-index: 109;
  text-align: center;
  .window {
    position: fixed;
    width: 380upx;
    height: 380upx;
    background-color: #fff;
    z-index: 150;
    animation: showpic 0.8s ease forwards;
    .img_box {
      position: relative;
      width: 100%;
      height: 100%;
      .tip {
        position: absolute;
        color: #fff;
        margin-top: 10upx;
        left: 50%;
        transform: translate(-50%, 0);
        width: 100%;
        overflow: hidden;
        height: 42upx;
      }
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.modal:before,
.modal:after    /* :after 可以不需要 */
 {
  content: "";
  display: inline-block;
  vertical-align: middle;
  height: 100%;
}

.content {
  padding-left: 30upx;
  width: calc(100% - 30upx);
}

.goods_page {
  border-bottom: 1upx solid $line-color;
  .good_box {
    display: flex;
    padding-bottom: 32upx;
    padding-right: 32upx;
  }
  .good_img {
    width: 200upx;
    height: 200upx;
    margin-right: 30upx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .text_detail {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    .good_price {
      align-items: flex-end;
      color: $price-color;
      font-size: 36upx;
    }
    .good_spec {
      flex: 1;
      color: $sub-color;
      font-size: 30upx;
      margin-top: 15upx;
    }
    .good_name {
      font-weight: 500;
      @include overtext(2);
    }
  }
}

.box {
  padding-top: 32upx;
  padding-right: 30upx;
  font-size: 30upx;
  border-bottom: 1upx solid $line-color;
  .line {
    display: flex;
    justify-content: space-between;
    padding-bottom: 32upx;
    .title {
      color: #979d9f;
    }
    .value {
      text-align: right;
      max-width: 460upx;
    }
  }
}

.real_pay_box {
  @include between();
  padding: 65upx 30upx 250upx;
  font-size: $topic-size;
  .real_number {
    font-size: $big-size;
  }
}

.bottom_bar {
  position: fixed;
  width: calc(100% - 60upx);
  bottom: 0;
  padding: 20upx 30upx;
  background-color: #fff;
  color: $sub-color;
  z-index: 99;
  .top {
    @include between();
    .btn {
      padding: 24upx 77upx;
      background-color: $active-color;
      text-align: center;
      color: #fff;
      font-size: $main-size;
      border-radius: 100upx;
      margin-left: 12upx;
      box-shadow: 0 5upx 10upx 1upx $active-color;
    }
    .btn:active {
      transform: translateY(5upx);
    }
  }
  .bottom {
    padding-right: 25upx;
    font-size: $mini-size;
    text-align: right;
    margin-top: 16upx;
  }
}

@keyframes showpic {
  from {
    bottom: 50upx;
    right: 90upx;
    width: 0;
    height: 0;
  }
  to {
    right: calc(50% - 190upx);
    bottom: calc(60% - 190upx);
  }
}
</style>