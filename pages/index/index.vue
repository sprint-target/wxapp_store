<template>
  <view>
    <!-- 主首页 -->
    首页
    <view style="padding:20px" class="ac" v-for="(item, index) in list" :key="index" @tap="go">这是一项</view>
    <loading></loading>
  </view>
</template>
<script>
import tool from "../../utils/tool";
export default {
  components: {},
  data() {
    return {
      list: []
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {
    this.$showLoading({text: "loading哈哈哈哈哈"});
    this.get();
  },
  onLoad() {
    this.getList();
    uni.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"]
    });
  },
  methods: {
    get: tool.debounce(async function() {
      await this.getList();
      this.$hideLoading();
    }, 300),
    async getList() {
      let list = this.list;
      let res = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      list = [...list, ...res];
      console.log(list);
      this.list = list;
    },
    go() {
      let url = this.$r.goodDetail
      this.$u.changePage(url)
    },
  }
};
</script>
<style lang='scss' scoped>
.ac:active {
  background-color: $disabled-back;
}
</style>