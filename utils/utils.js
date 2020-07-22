const utils = {
  //获取机型
  getPhoneModel() {
    var bottom_phone_line = null;
    let model = uni.getStorageSync('phoneData').model
    if (model.indexOf('iPhone X') != -1 || model.indexOf('iPhone 11') != -1) {
      bottom_phone_line = true;
    } else {
      bottom_phone_line = false
    }
    return bottom_phone_line
  },
  // 去除所有空格
  trim(str) {
    return str.replace(/\s/g, "");
  },
  // 设置头部标题
  setTitle(str) {
    uni.setNavigationBarTitle({
      title: str
    })
  },
  // 生成随机整数
  randomNumInteger(min, max) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * min + 1, 10);
      case 2:
        return parseInt(Math.random() * (max - min + 1) + min, 10);
      default:
        return 0
    }
  },
  // 金钱3位数逗号
  formatMoney(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  },
  // 页面切换
  changePage(url, type = 1) {
    switch (type) {
      case 1:
        console.log(url)
        uni.navigateTo({ url: url })
        break;
      case 2:
        uni.redirectTo({ url: url })
        break;
      case 3:
        uni.switchTab({ url: url })
    }

  },
  // 浮点计算
  formatFloat(f, digit) {
    let m = Math.pow(10, digit);
    let num = Math.round(f * m) / m;
    return num;
  },
  // 二维码格式化 
  getURLComponent(object) {
    let r = decodeURIComponent(object).split('&')
    var newArr = {}
    for (let i = 0; i < r.length; i++) {
      let key = r[i].split('=')[0]
      let value = r[i].split('=')[1]
      newArr[key] = value
    }
    return newArr
  },
  // 表单验证
  isStrict(value, type, msg = '') {
    let reg, type_name, code = 1;
    value = utils.trim(value)
    console.log(value)
    switch (type) {
      case 'phone':
        type_name = '手机号码'
        reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g
        break;
      case 'id':
        type_name = '身份证号'
        reg = /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}[\dXx]$/g
        break;
      case 'Email':
        type_name = '邮箱'
        reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g
        break;
    }
    if (!value) {
      msg = `请填写${type_name}`
      code = 0
    } else if (!reg.test(value)) {
      msg = `${type_name}格式不正确`
      code = 0
    }
    return {
      code: code,
      msg: msg
    }
  },
  // 富文本框
  formatRichText: function (html) {
    let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
      match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
      match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
      match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
      return match;
    });
    newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
      match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
      return match;
    });
    newContent = newContent.replace(/<br[^>]*\/>/gi, '');
    newContent = newContent.replace(/\<img/gi, `<img style='max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;'`);
    return newContent;
  },
  filter(str) { // 特殊字符转义
    str += ''; // 隐式转换
    str = str.replace(/%/g, '%25');
    str = str.replace(/\+/g, '%2B');
    str = str.replace(/ /g, '%20');
    str = str.replace(/\//g, '%2F');
    str = str.replace(/\?/g, '%3F');
    str = str.replace(/&/g, '%26');
    str = str.replace(/\=/g, '%3D');
    str = str.replace(/#/g, '%23');
    return str;
  },
  formateObjToParamStr(paramObj) {
    const sdata = [];
    for (let attr in paramObj) {
      sdata.push(`${attr}=${utils.filter(paramObj[attr])}`)
    }
    return sdata.join('&')
  },
  // modal弹窗
  showModal(str, fn, cancel, cancelText = "取消", cancelColor = "#000", confirmText = "确定", confirmColor = "#3c76ff") {
    cancel = cancel ? cancel : ''
    uni.showModal({
      content: str,
      cancelText: cancelText,
      cancelColor: cancelColor,
      confirmText: confirmText,
      confirmColor: confirmColor,
      success: function (res) {
        if (res.confirm) {
          fn()
        } else if (res.cancel) {
          if (cancel) {
            cancel()
          }
        }
      }
    });
  }
}
export default utils;