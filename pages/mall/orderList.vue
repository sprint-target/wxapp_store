<template>
  <view>
    <view>搜索</view>
    <view class="top_bar">
      <view
        class="tab"
        :class="{'active': item.id == tabId}"
        v-for="item in tabList"
        :key="item.id"
        @tap="changeTab(item.id)"
      >{{item.label}}</view>
    </view>
    <view class="order_page">
      <view class="good_box" v-for="item in orderList" :key="item.id" @tap="go(item.id)">
        <view class="click top_box">
          <view class="order_num">
            <view>订单号:{{item.orderNum}}</view>
            <view>{{item.status_title}}</view>
          </view>
          <view class="good_detail" v-for="itm in item.goods" :key="itm.gid">
            <view class="good_img">
              <image src="/static/logo.png" />
            </view>
            <view class="text_detail">
              <view class="good_name">{{itm.title}}</view>
              <view class="good_spec">{{itm.spec}};{{itm.num}}件</view>
              <view class="good_price">￥{{itm.price}}</view>
            </view>
          </view>
        </view>
        <view class="operates_box">
          <view class="total">
            总计:
            <span>￥7,099</span>
          </view>
          <view class="btn btn_style_cutout" v-if="item.status == 2" @tap.stop="operate(1)">查看物流</view>
          <view class="btn btn_style_fill" v-if="item.status == 1" @tap.stop="operate(2)">立即付款</view>
          <view class="btn btn_style_fill" v-if="item.status == 2" @tap.stop="operate(3)">确认收货</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { orderList } from "../../utils/data";
export default {
  components: {},
  data() {
    return {
      tabList: [
        { label: "全部", id: 0 },
        { label: "待付款", id: 1 },
        { label: "待收货", id: 2 },
        { label: "待核销", id: 3 },
        { label: "待评价", id: 4 }
      ],
      tabId: 0,
      orderList: []
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad() {
    this.init();
  },
  methods: {
    init() {
      this.getOrderList();
    },
    go(id) {
      let url = `${this.$r.orderDetail}?id=${id}`;
      this.$u.changePage(url);
    },
    getOrderList() {
      let res = orderList;
      for (let i in orderList) {
        let order = orderList[i];
        order["status_title"] = this.orderStatus(order.status);
      }
      this.orderList = res;
    },
    orderStatus(status) {
      let tabList = this.tabList,
        newList = {};
      tabList.map(function(tab) {
        let id = tab.id,
          label = tab.label;
        newList[id] = label;
      });
      return newList[status];
    },
    changeTab(id) {
      this.tabId = id;
      this.orderList = [];
      this.getOrderList();
    },
    operate(id) {
      switch (id) {
        case 1:
          console.log("查看物流");
          break;
        case 2:
          console.log("立即付款");
          break;
        case 3:
          console.log("确认收货");
          break;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.top_bar {
  display: flex;
  align-items: center;
  padding: 0 28upx;
  color: #979d9f;
  font-size: $sub-size;
  border-bottom: 1upx solid $line-color;
}
.tab {
  flex: 1;
  position: relative;
  text-align: center;
  padding: 30upx 0;
  box-sizing: border-box;
}
.active {
  color: $active-color;
  font-size: $main-size;
  border-bottom-color: $active-color;
  border-bottom-width: 4upx;
  animation: borderchange 0.6s linear forwards;
}

.top_box {
  padding: 30upx 30upx 20upx 30upx;
}
.good_box {
  border-bottom: 1upx solid $line-color;
  .order_num {
    @include between();
    padding-bottom: 20upx;
  }
  .good_detail {
    display: flex;
    margin-bottom: 20upx;
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
      .good_name {
        @include overtext(1);
        padding-bottom: 18upx;
      }
      .good_spec {
        padding-bottom: 40upx;
        font-size: 30upx;
        color: $sub-color;
      }
      .good_price {
        color: $price-color;
        font-size: $sub-size;
      }
    }
  }
}
.operates_box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 30upx 30upx 30upx;
}
.btn {
  padding: 14upx 34upx;
  font-size: 26upx;
  border-radius: 100upx;
  box-sizing: border-box;
  margin-left: 12upx;
}
.btn:active {
  transform: translateY(5upx);
}
.btn_style_fill {
  background-color: $active-color;
  color: #fff;
}
.btn_style_cutout {
  border: 1upx solid $active-color;
  color: $active-color;
}
.total {
  color: $sub-color;
  span {
    font-size: 36upx;
    color: $price-color;
    margin-left: 12upx;
  }
}
.good_box:last-child {
  border-bottom: none;
}

@keyframes borderchange {
  0% {
    border-bottom-style: dotted;
  }
  50% {
    border-bottom-style: dashed;
  }
  100% {
    border-bottom-style: solid;
  }
}
</style>