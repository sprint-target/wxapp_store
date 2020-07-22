<template>
  <view>
    <view v-if="mid == 1">
      <view class="address_box click box_show" v-if="!hasAddress" @tap="chooseAddress">
        <view class="left">
          <span class="iconfont iconpinglun"></span>
          <view>点击添加收货地址</view>
        </view>
        <span class="iconfont iconpinglun"></span>
      </view>
      <view v-if="hasAddress">有地址</view>
    </view>
    <view class="box_show" v-if="mid == 2">
      <view class="box show_border">jhjjjj</view>
    </view>

    <view class="methods_box box" :class="{'show_border': mid == 2}">
      <view class="methods_title">配送方式</view>
      <view class="methods">
        <view
          class="method"
          :class="{'active_method': item.id == mid}"
          v-for="item in methodsList"
          :key="item.id"
          @tap="chooseMethod(item.id)"
        >{{item.title}}</view>
      </view>
    </view>

    <view class="box show_border click box_show" v-if="mid == 2" @tap="showStore">
      <view class="store_title">门店信息</view>
      <view class="store_info">
        <view>{{params.storename}}</view>
        <view class="more">选择其他门店</view>
      </view>
    </view>

    <view class="box show_border">
      <view class="good_box" v-for="item in goodList" :key="item.id">
        <view class="good_img">
          <image src="/static/logo.png" />
        </view>
        <view class="right_box">
          <view class="text_detail">
            <view class="good_name">{{item.title}}</view>
            <view class="good_spec">{{`${item.spec};${item.num}件`}}</view>
            <view class="good_price">{{`￥${item.show_price}`}}</view>
          </view>
          <view></view>
        </view>
      </view>
    </view>

    <view class="params_box">
      <view class="param" v-for="(item,index) in paramsList" :key="index">
        <view class="param_title">{{item.title}}</view>
        <view v-if="item.type == 1">{{item.value}}</view>
        <input
          :maxlength="20"
          v-model="message"
          placeholder-style="color:#979d9e"
          :placeholder="item.value"
          v-if="item.type == 2"
        />
      </view>
    </view>
    <modal :show="modalShow" @closeModal="closeModal" :showclose="showclose">
      <scroll-view class="modal_page" :scroll-y="true" :scroll-with-animation="true">
        <view class="store_box" v-for="item in storeList" :key="item.id" @tap="chooseStore(item)">
          <view>{{item.name}}</view>
          <view class="check_box" :class="{'checked': item.checked}"></view>
        </view>
      </scroll-view>
      <view class="confirm_btn" @tap="confirmStore">确认</view>
    </modal>
    <view class="bottom_bar">
      <view class="total">
        总计:
        <span>{{`￥${totalPrice}`}}</span>
      </view>
      <view class="settlement" @tap="submit">提交订单</view>
    </view>
  </view>
</template>
<script>
import tool from "../../utils/tool";
import modal from "../../components/modal";
import { goodList, storeList } from "../../utils/data";
export default {
  components: {
    modal
  },
  data() {
    return {
      hasAddress: false,
      totalPrice: 0,
      methodsList: [
        { id: 1, title: "快递配送" },
        { id: 2, title: "上门自提" }
      ],
      mid: 1,
      paramsList: [
        { id: "total", value: "￥0.00", title: "商品总计价格", type: 1 },
        { id: "freight", value: "￥0.00", title: "运费", type: 1 },
        {
          id: "message",
          value: "点击编辑...",
          title: "订单留言",
          color: "#979d9e",
          type: 2
        }
      ],
      storeList: [],
      storeInfo: {},
      params: {
        storename: "请选择门店"
      },
      message: "",
      goodList: [],
      modalShow: false,
      showclose: true
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad() {
    this.init();
  },
  onShow() {
    this.getDefaultAddress();
  },
  methods: {
    init() {
      this.getGoodsList();
    },
    // 获取购物的列表
    getGoodsList() {
      let res = goodList;
      for (let i in res) {
        let p = res[i]["price"];
        res[i]["show_price"] = this.$u.formatMoney(p);
      }
      this.goodList = res;
    },
    // 获取门店列表
    getStoreList() {
      let res = storeList;
      for (let i in res) {
        let s = res[i];
        if (i == "0") {
          s.checked = true;
        } else {
          s.checked = false;
        }
      }
      this.storeInfo = res[0];
      this.storeList = res;
    },
    // 获取默认地址
    getDefaultAddress() {
      console.log("获取默认地址");
    },
    // 选择拿货方式
    chooseMethod(id) {
      this.mid = id;
    },
    // 跳转地址
    chooseAddress() {
      this.$u.changePage(this.$r.addressList);
    },
    // 展示门店
    async showStore() {
      await this.getStoreList();
      this.modalShow = true;
    },
    // 选择门店
    chooseStore(item) {
      let storeList = this.storeList;
      let temp = storeList.filter(p => {
        if (item.id == p.id) {
          p.checked = true;
        } else {
          p.checked = false;
        }
        return p;
      });
      this.storeInfo = item;
      this.storeList = storeList;
    },
    // 确认门店
    confirmStore() {
      let storeInfo = this.storeInfo;
      this.params["storename"] = storeInfo["name"];
      this.closeModal();
    },
    // 关闭动作弹窗
    closeModal() {
      this.modalShow = false;
    },
    // 提交订单
    submit: tool.throttle(function() {
      let params = this.params,
        oid = "12312";
      this.$u.changePage(`${this.$r.common}?type=1&oid=${oid}`, 2);
    })
  }
};
</script>
<style lang='scss' scoped>
.address_box {
  padding: 35upx 30upx;
  border-bottom: 1upx solid $line-color;
  @include between();
  .left {
    display: flex;
    align-items: center;
    span {
      margin-right: 30upx;
    }
  }
}

.box {
  padding: 32upx 30upx;
}

.methods_box {
  @include between();
  font-size: 30upx;
}
.methods_title {
  color: #979d9f;
}
.methods {
  display: flex;
  align-items: center;
}
.method {
  font-size: $sub-size;
  color: #979d9f;
  background-color: $disabled-back;
  border-radius: 100upx;
  padding: 14upx 32upx;
}
.method:first-child {
  margin-right: 24upx;
}
.active_method {
  color: #fff;
  background-color: $active-color;
}
.show_border {
  border-bottom: 1upx solid $line-color;
}

.store_title {
  font-size: $sub-size;
  color: #979d9f;
  margin-bottom: 32upx;
}
.store_info {
  @include between();
}
.more {
  color: #979d9f;
  font-size: 30upx;
}

.good_box {
  display: flex;
  // align-items: center;
  padding-bottom: 32upx;
  .good_img {
    width: 200upx;
    height: 200upx;
    margin-right: 30upx;
    flex-shrink: 0;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .right_box {
    flex: 1;
    min-width: 0;
    display: flex;
  }
  .text_detail {
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
}
.good_box:last-child {
  padding-bottom: 0;
}

.params_box {
  padding: 50upx 30upx 150upx;
}
.param {
  @include between();
  font-size: 30upx;
  padding-bottom: 32upx;
  .param_title {
    color: #979d9f;
  }
  input {
    width: 300upx;
  }
}

.modal_page {
  height: 500upx;
  padding-left: 30upx;
  width: calc(100% - 30upx);
}
.store_box {
  @include between();
  border-bottom: 1upx solid $line-color;
  padding: 30upx 30upx 30upx 0;
}
.confirm_btn {
  margin: 50upx 30upx 20upx;
  padding: 24upx 0;
  background-color: $active-color;
  color: #fff;
  text-align: center;
  border-radius: 100upx;
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
  transform: rotate(-45deg);
  // animation: ischeck 0.5s forwards ease;
}

.bottom_bar {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  bottom: 0;
  width: calc(100% - 50upx);
  padding: 20upx 30upx 20upx 20upx;
  background-color: #fff;
  z-index: 99;
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
  padding: 24upx 100upx;
  background-color: $active-color;
  color: #fff;
  font-size: $main-size;
  border-radius: 100upx;
  // box-shadow: 0 5upx 10upx 1upx $active-color;
}
// .settlement:active {
//   transform: translateY(5upx);
// }
.box_show {
  animation: showbox linear 0.5s forwards;
}
@keyframes showbox {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>