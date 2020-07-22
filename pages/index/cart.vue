<template>
  <view>
    <view class="top_line">
      <view>您的购物车内有2种产品</view>
      <span class="iconfont iconwodechanpin"></span>
    </view>
    <view class="goods">
      <view class="cart_box" v-for="item in cartList" :key="item.id">
        <view class="check_box" :class="{'checked': item.checked}" @tap="check(item)"></view>
        <view class="cart_detail">
          <view class="detail">
            <view class="cart_img">
              <image src="/static/logo.png" />
            </view>
            <view class="text_detail">
              <view class="good_name">{{item.title}}</view>
              <view class="good_spec">{{`${item.spec};${item.num}件`}}</view>
              <view class="good_price">{{`￥${item.show_price}`}}</view>
            </view>
          </view>
          <view class="num_box">
            <view class="common_btn add" @tap="addNum(item, 1)" @longpress="addNum(item, 10)">+</view>
            <view class="good_num">{{item.num}}</view>
            <view class="common_btn sub" @tap="subNum(item, 1)" @longpress="subNum(item, 10)">-</view>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom_bar">
      <view class="all" @tap="chooseAll">
        <view class="check_box checkall" :class="{'checked': checkedAll}"></view>
        <view>全选</view>
      </view>
      <view class="right">
        <view class="total">总计:<span>{{`￥${totalPrice}`}}</span></view>
        <view class="settlement">开始结算({{totalNum}})</view>
      </view>
    </view>
  </view>
</template>
<script>
const worker = wx.createWorker("workers/request/index.js");
import { cartList } from "../../utils/data";
export default {
  components: {},
  data() {
    return {
      cartList: [],
      checkedAll: false,
      chooseList: [],
      totalPrice: 0,
      totalNum: 0
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad() {},
  onShow() {
    this.init();
  },
  methods: {
    init() {
      let t = this;
      worker.onMessage(function(res) {
        console.log("购物车计算");
        console.log(res);
        t.chooseList = res.chooseList;
        t.totalPrice = t.$u.formatMoney(res.totalPrice);
        t.totalNum = res.totalNum
        t.judgeAll();
      });
      this.getCartList();
    },
    getCartList() {
      let res = cartList;
      for (let i in res) {
        let p = res[i]["price"];
        res[i]["show_price"] = this.$u.formatMoney(p);
        res[i]["checked"] = false;
      }
      this.cartList = res;
    },
    check(item) {
      let t = this,
        cartList = this.cartList,
        id = item.id;
      let temp = cartList.filter(p => {
        if (id == p.id) {
          p.checked = !p.checked;
        }
        return p;
      });
      this.cartList = temp;
      t.toWorker();
    },
    chooseAll() {
      let t = this,
        cartList = this.cartList;
      this.checkedAll = !this.checkedAll;
      for (let i in cartList) {
        let c = cartList[i];
        c["checked"] = this.checkedAll;
      }
      t.toWorker();
    },
    judgeAll() {
      let chooseList = this.chooseList,
        cartList = this.cartList;
      let chooseLen = chooseList.length,
        allLen = cartList.length;
      console.log(chooseLen, allLen);
      if (chooseLen == allLen) {
        this.checkedAll = true;
      } else {
        this.checkedAll = false;
      }
    },
    addNum(item, euqal) {
      let cartList = this.cartList,
        num = item.num,
        id = item.id,
        max = 99;
      if (num >= max) {
        console.log("不跑借口的+");
        return;
      }
      num += euqal;
      if (num > max) {
        num = max;
      }
      console.log("跑借口的+");
      let list = this.cycleList(cartList, num, id);
      this.cartList = list;
      this.toWorker();
    },
    subNum(item, euqal) {
      let cartList = this.cartList,
        min = 1,
        id = item.id,
        num = item.num;
      if (num <= min) {
        console.log("不跑借口的-");
        return;
      }
      num -= euqal;
      if (num < min) {
        num = min;
      }
      console.log("跑借口的-");
      let list = this.cycleList(cartList, num, id);
      this.cartList = list;
      this.toWorker();
    },
    // 计算选择的总价
    toWorker() {
      let list = this.cartList;
      worker.postMessage({
        list: list
      });
    },
    cycleList(list, num, id) {
      let temp = list.filter(p => {
        if (id == p.id) {
          p.num = num;
        }
        return p;
      });
      return temp;
    }
  }
};
</script>
<style lang='scss' scoped>
.top_line {
  padding: 30upx;
  @include between();
  color: #5e6c84;
}
.goods {
  padding-left: 20upx;
  padding-bottom: 150upx;
}
.cart_box {
  display: flex;
  align-items: center;
  padding: 32upx 30upx 32upx 0;
  border-bottom: 1upx solid $line-color;
  .cart_detail {
    flex: 1;
    min-width: 0;
    @include between();
  }
  .detail {
    display: flex;
    // align-items: center;
    .cart_img {
      width: 200upx;
      height: 200upx;
      margin-left: 20upx;
      flex-shrink: 0;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .text_detail {
    margin-left: 30upx;
    display: flex;
    flex-direction: column;
    // justify-content: space-evenly;
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
  .num_box {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left: 20upx;
  }
  .good_num {
    margin: 40upx 0;
    width: 60upx;
    height: 60upx;
    line-height: 60upx;
    background-color: $text-color;
    color: #fff;
    font-size: 30upx;
    text-align: center;
    border-radius: 50%;
  }
}
.check_box {
  position: relative;
  width: 40upx;
  height: 40upx;
  border-radius: 50%;
  border: 1upx solid $active-color;
  box-sizing: border-box;
}
.checked {
  background-color: $active-color;
  border: none;
}
.checked::after {
  content: "";
  position: absolute;
  left: 8upx;
  top: 10upx;
  width: 50%;
  height: 25%;
  border: 4upx solid #fff;
  border-radius: 2upx;
  border-top: none;
  border-right: none;
  background: transparent;
  animation: ischeck 0.5s forwards ease;
}

.bottom_bar {
  @include between();
  padding: 20upx 30upx 20upx 20upx;
  width: calc(100% - 50upx);
  position: fixed;
  bottom: 0;
  background-color: #fff;
}
.right {
  display: flex;
  align-items: center;
}
.total {
  margin-right: 12upx;
  font-size: $sub-size;
  color: #979d9f;
  span {
    color: $price-color;
    font-size: main-size;
  }
}
.settlement {
  padding: 24upx 46upx;
  background-color: $active-color;
  color: #fff;
  font-size: $main-size;
  border-radius: 100upx;
}
.all {
  display: flex;
  align-items: center;
  font-size: 26upx;
  color: #979d9f;
}
.checkall {
  margin-right: 16upx;
}

@keyframes ischeck {
  from {
    transform: scale(0, 0);
    opacity: 0;
  }
  to {
    transform: scale(1, 1) rotate(-45deg);
    opacity: 1;
  }
}
</style>