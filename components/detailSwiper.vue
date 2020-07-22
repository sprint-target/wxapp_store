<template>
  <view class="swiper_box">
    <swiper class="swiper" :indicator-dots="true" :circular="true" :autoplay="true" indicator-active-color="#ffffff">
      <swiper-item v-for="(item,index) in swiperData" :key="index">
        <view class="img_box" v-if="item.type == 1">
          <image :src="item.img" />
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
export default {
  props: ["swiperData"],
  components: {},
  data() {
    return {};
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad() {},
  methods: {}
};
</script>
<style lang='scss' scoped>
.swiper_box {
  width: 100%;
  height: 610upx;
  background-color: $light-back-color;
}
.swiper {
  width: 100%;
  height: 100%;
}
.img_box {
  width: 100%;
  height: 610upx;
  image {
    width: 100%;
    height: 100%;
  }
}
</style>