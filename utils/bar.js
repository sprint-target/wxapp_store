// 获取机型 顶部
import Vue from 'vue'
uni.getSystemInfo({
  success(res) {
    console.log(res, '设备信息')
    let statusBarHeight = res.statusBarHeight;
    let menu = uni.getMenuButtonBoundingClientRect(); // note 获取获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。（top表示上边框到手机顶部的距离 bottom是下边框到手机顶部的距离）
    let menuPadding = menu.top - statusBarHeight
    let barHeight = menu.height + menuPadding * 2;
    let capsuleTop = menu.top; // 胶囊距离顶部的高度
    let phoneData = {
      system: res.system,
      version: res.version,
      model: res.model
    }
    uni.setStorageSync('phoneData', phoneData);
    let phoneInfo = {
      windowWidth: res.windowWidth, // 屏幕宽度
      capsuleTop: capsuleTop, // 胶囊距离顶部的高度
      barHeight: barHeight, // 胶囊高度
      statusBarHeight: statusBarHeight // 系统栏高度
    }
    Vue.prototype.$phoneInfo = phoneInfo
  }
});
