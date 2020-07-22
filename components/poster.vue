<template>
  <view>
    <canvas
      class="poster"
      canvas-id="poster"
      :width="width * 4"
      :height="height * 4"
      :style="{'width':width + 'px','height': height + 'px'}"
    ></canvas>
    <view class="img_modal" @touchmove.stop.prevent>
      <view class="img_box" v-if="showImg">
        <view class="close" @tap="hideModal">x</view>
        <image :show-menu-by-longpress="true" :src="posterImg"  />
        <view class="save_btn" @tap="savePoster">保存图片</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: ["hide", "posterstate", "poster"],
  components: {},
  data() {
    return {
      width: 300,
      height: 480,
      options: [
        {
          id: "img",
          type: 1,
          url:
            "https://wx4.sinaimg.cn/mw690/7ffa94e3ly1gf0c3ebet7j21400u0e86.jpg",
          x: 25,
          y: 20,
          width: 250,
          height: 280
        },
        {
          id: "img",
          type: 2,
          r: 20,
          url:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2205169793,1396138009&fm=26&gp=0.jpg",
          width: 40,
          height: 40,
          x: 0,
          y: 0
        },
        {
          id: "img",
          type: 1,
          url:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2205169793,1396138009&fm=26&gp=0.jpg",
          width: 40,
          height: 40,
          x: 20,
          y: 60
        },
        {
          id: "text",
          text: "美少女",
          color: "#ff0000",
          size: 14,
          x: 60,
          y: 90
        }
      ],
      showImg: false,
      posterImg: ""
    };
  },
  onReady() {
    console.log(this.posterstate, "posterstateposterstate");
    this.showImg = this.posterstate;
    if (this.poster) {
      this.posterImg = this.poster;
      this.showImg = true;
    } else {
      this.downloadPoster();
    }
  },
  methods: {
    // 下载图片
    downPic(url) {
      return new Promise((resolve, reject) => {
        uni.downloadFile({
          url: url,
          success: res => {
            let code = res.statusCode;
            switch (code) {
              case 200:
                resolve(res);
                break;
              default:
                reject({ code: code });
            }
          },
          fail: err => {
            reject(err);
          }
        });
      });
    },
    downloadPoster() {
      console.log("loading-----------------");
      let t = this,
        options = t.options,
        bg = t.bg,
        qrcode = t.qrcode,
        head = t.head,
        name = t.name,
        promises = [];
      t.showImg = true;
      options.map(option => {
        if (option.url) {
          promises.push(t.downPic(option.url));
        }
      });
      let imgs = Promise.all(promises)
        .then(res => {
          let posterData = res.map((d, i) => {
            options[i].url = d.tempFilePath;
          });
          t.drawPoster(options);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 画圆图
    circleImg(ctx, img, x, y, r) {
      ctx.save();
      var d = 2 * r;
      var cx = x + r;
      var cy = y + r;
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(img, x, y, d, d);
      ctx.restore();
    },
    drawText(ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
      ctx.save();
      let lineWidth = 0,
        lastSubStrIndex = 0;
      for (let i = 0; i < str.length; i++) {
        lineWidth += ctx.measureText(str(i)).width;
        if (lineWidth > canvasWidth) {
          ctx.fillText(
            str.substring(lastSubStrIndex, i),
            leftWidth,
            initHeight
          );
          initHeight += 22;
          lineWidth = 0;
          lastSubStrIndex = i;
          titleHeight = 22;
        }
        if (i == str.length - 1) {
          ctx.fillText(
            str.substring(lastSubStrIndex, i + 1),
            leftWidth,
            initHeight
          );
        }
      }
      titleHeight = titleHeight + 10;
      ctx.restore();
      return titleHeight;
    },
    // 开始画图
    drawPoster(options) {
      let t = this;
      let pid = uni.createCanvasContext("poster", this);
      for (let i in options) {
        let option = options[i],
          id = option.id;
        switch (id) {
          case "img":
            if (option.type == 1) {
              // 方形图片
              pid.drawImage(
                option.url,
                option.x,
                option.y,
                option.width,
                option.height
              );
            } else if (option.type == 2) {
              // 圆形图片
              t.circleImg(pid, option.url, option.x, option.y, option.r);
            }
            break;
          case "text":
            // 文字
            pid.beginPath();
            pid.fillStyle = option.color;
            pid.setFontSize(option.size);
            pid.fillText(option.text, option.x, option.y);
            break;
        }
      }
      pid.draw(false, res => {
        t.saveCanvas();
      });
    },
    // 保存画布
    saveCanvas() {
      let t = this,
        width = this.width,
        height = this.height;
      uni.canvasToTempFilePath(
        {
          x: 0,
          y: 0,
          width: width,
          height: height,
          destWidth: width,
          destHeight: height,
          canvasId: "poster",
          success: function(res) {
            // 在H5平台下，tempFilePath 为 base64
            console.log(res.tempFilePath, "生成了图片");
            t.posterImg = res.tempFilePath;
            uni.setStorageSync("poster", res.tempFilePath);
          },
          fail(err) {
            console.log(err, "errr");
          },
          complete() {
            console.log("loading over--------------------");
          }
        },
        this
      );
    },
    savePoster () {
      console.log('保存图片')
    },
    // 隐藏modal
    hideModal() {
      console.log("hide");
      // this.showImg = false;
      this.$emit("hide");
    }
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.poster {
  position: fixed;
  top: 0;
  left: -300%;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background-color: rgba(13, 13, 13, 0.3);
  z-index: 99;
  text-align: center;
}
.modal:before,
.modal:after    /* :after 可以不需要 */
 {
  content: "";
  display: inline-block;
  vertical-align: middle;
  height: 100%;
}
.img_modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(13, 13, 13, 0.5);
  z-index: 101;
  text-align: center;
}

.img_modal:before,
.img_modal:after {
  display: inline-block;
  vertical-align: middle;
  content: "";
  height: 100%;
}
.img_box {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  width: 600upx;
  height: 960upx;
  background-color: #fff;
  border-radius: 10upx;
  box-shadow: -3px 5px 15px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  animation-timing-function: steps(4);
  animation: slide-out ease 0.8s;
  animation-fill-mode: both;
  transform: perspective(1000);
  z-index: 110;
  image {
    width: 100%;
    height: 100%;
  }
}
.save_btn {
  position: absolute;
  bottom: 20upx;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 600upx;
  padding: 14upx 85upx;
  font-size: $sub-size;
  color: $active-color;
  border: 1upx solid $active-color;
}
.save_btn:active {
  background-color: $active-color;
  color: #fff;
}
// .img_modal {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba($color: #000000, $alpha: 0.5);
//   z-index: 101;
// }
// .img_box {
//   position: fixed;
//   display: inline-block;
//   width: 600upx;
//   height: 960upx;
//   background-color: #fff;
//   border-radius: 10upx;
//   box-shadow: -3px 5px 15px 0px rgba(0, 0, 0, 0.5);
//   overflow: hidden;
//   animation-timing-function: steps(4);
//   animation: slide-out ease 0.8s;
//   animation-fill-mode: both;
//   transform: perspective(1000);
//   z-index: 110;
//   image {
//     width: 100%;
//     height: 100%;
//   }
// }
.close {
  position: absolute;
  right: 16upx;
  top: 16upx;
}
@keyframes slide-out {
  from {
    left: -600upx;
    bottom: -960upx;
    transform: scale(2, 0.1) rotate(45deg) rotateZ(45deg) rotateX(90deg)
      skewX(90deg);
  }
  to {
    vertical-align: middle;
    transform: scale(1, 1) rotate(0) rotateZ(0) rotateX(0) skewX(0);
  }
}
</style>