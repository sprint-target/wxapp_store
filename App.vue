<script>
export default {
  onLaunch: function() {
    console.log("App Launch");
    // 加载网络字体
    // uni.loadFontFace({
    //   family: "Bitstream Vera Serif Bold",
    //   source: 'url("wechatide://minicode/b6Zrajm67R2x")',
    //   success(res) {
    //     console.log("加载字体", res);
    //   },
    //   fail(err) {
    //     console.log(err, '字体加载失败')
    //   }
    // });
    // 更新
    const updateManager = uni.getUpdateManager();

    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate);
    });

    updateManager.onUpdateReady(function(res) {
      uni.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          } else {
            console.warn("用户取消更新");
          }
        }
      });
    });

    updateManager.onUpdateFailed(function(res) {
      console.log(res);
      // 新的版本下载失败
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  onError: function(err) {
    console.log(`小程序出错了
		${err}`);
    // var json = JSON.stringify(err);
    // var arr = json.split("\\n");
    // var log = {
    //   message: arr[1],
    //   stack: err
    // };
    // this.$throw(log)
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "/static/style/iconfont.css";
page {
  font-size: $main-size;
  color: $text-color;
}
.click:active {
  background-color: $disabled-back;
}
</style>
