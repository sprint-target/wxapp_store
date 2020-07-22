<template>
  <view v-if="modalshow" class="modal" @tap="close" @touchmove.stop.prevent>
    <view class="window" :class="show ? 'mshow': 'mhide'" @tap.stop>
      <view class="close" @tap.stop="close" v-if="showclose">
        <span>关闭</span>
      </view>
      <slot></slot>
    </view>
  </view>
</template>
<script>
export default {
  props: ["show", "closeModal", "showclose"],
  components: {},
  data() {
    return {
      modalshow: false
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad() {},
  watch: {
    show(newValue, oldValue) {
      if (newValue) {
        this.modalshow = true;
      } else {
        setTimeout(() => {
          this.modalshow = false;
        }, 500);
      }
    }
  },
  methods: {
    close() {
      this.$emit("closeModal");
    }
  }
};
</script>
<style lang='scss' scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba($color: #000000, $alpha: 0.2);
  z-index: 199;
}
.window {
  position: fixed;
  border-radius: 30upx 30upx 0 0;
  bottom: -100%;
  width: 100%;
  background-color: #fff;
  min-height: 150upx;
}
.mshow {
  animation: show ease 0.5s forwards;
}
.mhide {
  animation: hide ease 0.5s forwards;
}
.close {
  padding-top: 20upx;
  text-align: center;
}
@keyframes show {
  from {
    opacity: 0;
    bottom: -100%;
  }
  to {
    opacity: 1;
    bottom: 0;
  }
}
@keyframes hide {
  from {
    bottom: 0;
  }
  to {
    bottom: -100%;
    opacity: 0;
  }
}
</style>