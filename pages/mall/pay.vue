<template>
  <view>
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
    <view class="bottom_bar">
      <view class="left">取消订单</view>
      <view class="right">
        <view class="total">
          总计:
          <span>￥90909</span>
        </view>
        <view class="btn" @tap="toPay">立即付款</view>
      </view>
    </view>
  </view>
</template>
<script>
import { payparams,goodList } from "../../utils/data";
export default {
  components: {},
  data() {
    return {
      oid: "",
      detailList: [],
      goodList: goodList
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
    toPay () {
      this.pay()
    },
    pay () {
      this.$u.changePage(this.$r.orderList, 2)
    }
  }
};
</script>
<style lang='scss' scoped>
.content {
  padding-left: 30upx;
  padding-bottom: 120upx;
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
.box:last-child {
  border: none;
}

.bottom_bar {
  position: fixed;
  width: calc(100% - 60upx);
  bottom: 0;
  padding: 20upx 30upx;
  background-color: #fff;
  @include between();
  color: $sub-color;
  .right {
    display: flex;
    align-items: center;
    .total {
      span {
        color: $price-color;
        margin-left: 10upx;
        font-size: $main-size;
      }
    }
    .btn {
      padding: 24upx 77upx;
      background-color: $active-color;
      text-align: center;
      color: #fff;
      font-size: $main-size;
      border-radius: 100upx;
      margin-left: 12upx;
      // box-shadow: 0 5upx 10upx 1upx $active-color;
    }
    .btn:active {
      // transform: translateY(5upx);
      opacity: .5;
    }
  }
}
</style>