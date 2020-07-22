<template>
  <view>个人中心</view>
</template>
<script>
import { getexample } from "./api/api";
export default {
  components: {},
  data() {
    return {};
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad() {
    this.example()
  },
  methods: {
    async example() {
      try {
        let data = await getexample();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  }
};
</script>
<style lang='scss' scoped>
</style>