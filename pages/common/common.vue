<template>
  <view class="content">
    <view>
      <view v-for="(item, index) in title" :key="index">{{item}}</view>
    </view>
  </view>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      title: [],
      type: ""
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad(op) {
    this.init(op);
  },
  methods: {
    init(op) {
      let title = [],
        url = "",
        code = Number(op.type),
        time = 1000;
      let str = this.$u.formateObjToParamStr(op);
      switch (code) {
        case 1:
          time = this.$u.randomNumInteger(1000, 2000);
          title = ["您的订单正在安排中", "请耐心等待"];
          url = this.$r.pay;
          break;
        case 2:
          title = ["订单支付失败"];
          url = this.$r.orderDetail;
          break;
        default:
          title = ["出错啦"];
          break;
      }
      console.log(url, "uuu");
      this.type = code;
      this.title = title;
      this.go(`${url}?${str}`, time);
    },
    go(url, time) {
      console.log(time);
      setTimeout(() => {
        console.log("time动", time, url);
        this.$u.changePage(url, 2);
      }, time);
    }
  }
};
</script>
<style lang='scss' scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>