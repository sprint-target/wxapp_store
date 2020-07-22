<template>
  <view>
    <view @touchstart="handleTouchStart" @touchend="handleTouchEnd">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      touchStartTime: 0 //按下的初始时间
    };
  },
  methods: {
    //手机按下屏幕
    handleTouchStart(e) {
      let t = this;
      t.touchStartTime = Date.now();
    },
    //手指离开屏幕
    handleTouchEnd(e) {
      let t = this;
      const touchEndTime = Date.now();
      let active = "";
      //判断用户按下时长
      if (touchEndTime - t.touchStartTime < 500) {
        active = false;
      } else {
        active = true;
      }
      // console.log(direction, "用户滑动方向");
      t.$emit("action", { active });
    }
  }
};
</script>

<style>
</style>