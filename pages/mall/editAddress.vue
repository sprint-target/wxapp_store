<template>
  <view>
    <view class="content">
      <view class="box" v-for="item in list" :key="item.id">
        <view class="title">{{item.title}}</view>
        <view v-if="item.type == 1" class="value_box" @input="write">
          <input v-model="params[item.name]" :placeholder="item.placeholder" />
        </view>
        <view v-if="item.type == 2" class="value_box picker">
          <picker mode="region" @change="choose">
            <view class="placeholder">{{region}}</view>
          </picker>
          <view>箭头</view>
        </view>
      </view>
      <view class="wxget_box">
        <view class="wxget" @tap="wxget">微信自动获取</view>
      </view>
    </view>
    <view class="save_btn" @tap="submit">保存地址</view>
  </view>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      list: [
        {
          id: 1,
          title: "收货人",
          name: "name",
          placeholder: "请输入收货人姓名",
          type: 1
        },
        {
          id: 2,
          title: "联系电话",
          name: "phone",
          placeholder: "请输入真实手机号",
          type: 1
        },
        {
          id: 3,
          title: "选择区域",
          name: "region",
          placeholder: "请选择省市区",
          type: 2
        },
        {
          id: 4,
          title: "详细地址",
          name: "address",
          placeholder: "请填写详细地址",
          type: 1
        }
      ],
      params: {
        name: "",
        phone: "",
        address: "",
        code: ""
      },
      region: "请选择省市区"
    };
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onLoad(op) {
    console.log(op);
    if (op.id) {
      this.init(op.id);
    }
  },
  onShow() {
  },
  methods: {
    init(id) {
      this.getAddressDetail(id);
    },
    getAddressDetail(id) {
      let params = this.params,
        keys = Object.keys(params);
      let res = {
        name: "这是已经有的",
        phone: "17858805011",
        prov: "浙江省",
        city: "宁波市",
        area: "鄞州区",
        address: "啊啊啊啊啊啊啊",
        code: "122,222,344"
      };
      for (let i in keys) {
        let key = keys[i];
        params[key] = res[key];
      }
      this.region = `${res.prov},${res.city},${res.area}`
      this.params = params;
    },
    choose(e) {
      console.log(e);
      let value = e.detail.value,
        code = e.detail.code;
      this.region = value.join(",");
      this.params.code = code.join(",");
    },
    wxget() {
      let t = this;
      uni.chooseAddress({
        success(res) {
          console.log(res);
          t.region = `${res.provinceName},${res.cityName},${res.countyName}`;
          t.params["name"] = res["userName"];
          t.params["phone"] = res["telNumber"];
          t.params["address"] = res["detailInfo"];
        },
        fail(err) {
          console.log(err, "去授权");
          // t.getAuthorize();
        }
      });
    },
    getAuthorize() {
      let t = this;
      uni.openSetting({
        success(res) {
          console.log(res.authSetting);
        },
        fail(err) {
          console.log("调用起", err);
        }
      });
      // uni.authorize({
      //   scope: "scope.address",
      //   success(res) {
      //     console.log(res, 'xxx')
      //     t.wxget();
      //   },
      //   fail (err) {
      //     console.log(err)
      //   }
      // });
    },
    submit() {
      let params = this.params;
      if (!params.name) {
        console.log("请填写姓名");
        return;
      }
      let phoneRes = this.$u.isStrict(params.phone, "phone");
      if (phoneRes.code != 1) {
        console.log(phoneRes.msg);
        return;
      }
      if (!params.code) {
        console.log("请选择省市区");
        return;
      }
      if (!params.address) {
        console.log("请填写地址");
        return;
      }
      console.log(params);
    }
  }
};
</script>
<style lang='scss' scoped>
.content {
  padding-left: 30upx;
}
.box {
  display: flex;
  align-items: center;
  border-bottom: 1upx solid $line-color;
  padding: 30upx 26upx 30upx 0;
  font-size: $main-size;
  .title {
    width: 130upx;
    margin-right: 101upx;
  }
  .value_box {
    flex: 1;
    min-width: 0;
  }
  .picker {
    @include between();
  }
  .placeholder {
    color: #999999;
  }
}
.wxget_box {
  margin-top: 80upx;
  text-align: center;
}
.wxget {
  display: inline-block;
  padding: 18upx 42upx;
  border-radius: 90upx;
  border: 1upx solid $back-color;
  box-sizing: border-box;
}
.wxget:active {
  background-color: $back-color;
  color: #fff;
}
.save_btn {
  position: fixed;
  left: 30upx;
  bottom: 20upx;
  padding: 24upx 0;
  width: calc(100% - 60upx);
  background-color: $active-color;
  color: #fff;
  font-size: $main-size;
  border-radius: 100upx;
  text-align: center;
  // box-shadow: 0 5upx 10upx 1upx $active-color;
}
.save_btn:active {
  transform: translateY(5upx);
}
</style>