<template>
  <view>
    <view class="page">
      <view class="address_box click" v-for="item in addressList" :key="item.id" @tap="goEdit(item)">
        <view class="detail">
          <view class="line_one">
            <span>{{item.name}}</span>
            <span>{{item.phone}}</span>
          </view>
          <view class="line_two">{{item.all}}</view>
        </view>
        <span class="iconfont iconpinglun"></span>
      </view>
    </view>
    <view class="bottom_bar">
      <view class="bottom_btn" @tap="addAddress">添加地址</view>
    </view>
  </view>
</template>
<script>
import { addressList } from "../../utils/data";
export default {
  components: {},
  data() {
    return {
      addressList: []
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad() {
    this.init();
  },
  methods: {
    init() {
      this.getAddressList();
    },
    getAddressList() {
      let res = addressList;
      for (let i in res) {
        let r = res[i];
        r["all"] = `${r["prov"]}${r["city"]}${r["area"]}${r["address"]}`;
      }
      this.addressList = res;
    },
    goEdit (item) {
      let url = `${this.$r.editAddress}?id=${item.id}`
      this.$u.changePage(url)
    },
    addAddress () {
      this.$u.changePage(this.$r.editAddress)
    }
  }
};
</script>
<style lang='scss' scoped>
.page {
  padding-bottom: 120upx;
}
.address_box {
  padding: 30upx;
  @include between();
  border-bottom: 1upx solid $line-color;
  .detail {
    margin-right: 50upx;
  }
  .line_one {
    font-size: $main-size;
    font-weight: 600;
    margin-bottom: 24upx;
    span {
      margin-right: 34upx;
    }
  }
  .line_two {
    color: $sub-color;
    line-height: 34upx;
  }
}
.address_box:last-child {
  border-bottom: none;
}
.bottom_bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20upx 0;
}
.bottom_btn {
  margin: 0 30upx;
  background-color: $active-color;
  color: #fff;
  border-radius: 100upx;
  text-align: center;
  padding: 24upx 0;
}
.bottom_btn:active {
  transform: translateY(5upx);
}
</style>