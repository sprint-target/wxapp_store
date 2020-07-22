<template>
  <view class="lucky" :style="{'background-image':'url('+bg+')'}">
    <view class="lucky_bg">
      <view class="describe">
        <view>方太邀您</view>
        <view>喜迎国庆惊喜大抽奖</view>
      </view>
      <view class="active_time">活动时间：8.1-8.31</view>
      <view class="rules" @tap="rulesPopup(1,true)">
        <text style="padding-right:7upx">活动规则</text>
        <text class="iconfont iconxiaoxi-wenda iconSize"></text>
      </view>
      <view class="bottom_btn">
        <view class="btn_left same_btn" @tap="integralCenter">
          <text class="iconfont iconjifenzhongxin btnIocn"></text>
          <view>积分中心</view>
        </view>
        <view class="btn_center" @tap="attend(state)" :class="state==2?'noneActive':''">{{drawtext}}</view>
        <view class="btn_right same_btn" @tap="rulesPopup(2,false)">
          <text class="iconfont iconfenxiang btnIocn"></text>
          <view>分享</view>
        </view>
      </view>
    </view>
    <modal style="z-index:11" :show="modalShow" @closeModal="closeModal" :showclose="showclose">
      <view class="rule_content" v-if="modalId==1">
        <view class="rule_title">活动规则</view>
        <text class="rule_detail">
          {{details}}
        </text>
        <view class="complete" @tap="closeModal">完成</view>
      </view>
      <view v-if="modalId == 2">
        <view class="share_menu">
          <button
            v-for="item in shareList"
            :key="item.id"
            class="icon_btn"
            @tap="share(item.id)"
            :open-type="item.open"
          >
            <span class="iconfont share_icon" :class="item.icon" :style="{color: item.color}"></span>
            <view>{{item.title}}</view>
          </button>
        </view>
        <view class="cancel_btn" @tap.stop="closeModal">取消</view>
      </view>
    </modal>
    <poster-modal
      v-if="posterstate"
      :posterstate="posterstate"
      :poster="poster"
      @hide="hideposter"
    ></poster-modal>
  </view>
</template>

<script>
import modal from '../../../components/modal'
import posterModal from "../../../components/poster";
import { shareList } from "../../../utils/data";
export default {
  data() {
    return {
      bg:'https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/forum/pic/item/d833c895d143ad4b27c1ac9195025aafa50f06f0.jpg',
      drawtext:'参与抽奖',
      modalId:1,
      modalShow: false,
      showclose: true,
      details:'1.活动时间：2020.08.01-2020.08.31\n2.每轮抽奖活动同一用户最多可获得一份中奖奖品，设备、收货信息、支付方式等相同的，均视为同一用户。\n3.抽奖规则疑问可联系客服电话2333-333333。\n4.活动时间：2020.08.01-2020.08.315.每轮抽奖活动同一用户最多可获得一份中奖奖品，设备、收货信息、支付方式等相同的，均视为同一用户。\n6.抽奖规则疑问可联系客服电话2333-333333。',
      shareList: shareList,
      state:1, //1参与抽奖  2暂无抽奖 3马上开奖 4参与中
      posterstate:false
    }
  },
  components:{
    modal,
    posterModal
  },
  methods: {
    async rulesPopup(modalId,showclose) {
      this.modalShow = true
      this.showclose = showclose
      this.modalId = modalId
    },
    async closeModal() {
      this.modalShow = false
    },
    integralCenter() {
      this.$u.changePage('/pages/plugin/integralMall/index')
    },
    share(id) {
      switch (id) {
        case 1:
          console.log("发送");
          break;
        case 2:
          this.createPoster();
          break;
      }
    },
    createPoster() {
      console.log("生成海报");
      this.posterstate = true;
      this.closeModal()
    },
    hideposter() {
      let poster = uni.getStorageSync("poster");
      if (poster) {
        this.poster = poster;
        uni.removeStorageSync("poster");
      }
      this.posterstate = false;
    },
    // 参与抽奖 
    async attend(state) {
      let t = this,integral = 999
      let content, cancle, comfirm
      if(integral >= 999) {
        content = '参与此次抽奖将消费999积分是否继续？'
        cancle = '以后再说',
        comfirm = '继续抽奖'
      }else {
        content = '您的积分余额不足'
        cancle = '以后再说',
        comfirm = '去攒积分'
      }
      switch(state) {
        case 1: 
          t.$u.showModal(content, async res => {
            console.log('抽奖')
          },cancle => {
            console.log('取消')
          },cancle,'#293539',comfirm,'#A67244',)
          break;
      }
    }
  }
}
</script>

<style lang="scss">
button {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.01);
  line-height: normal;
  margin: 0;
}
button::after {
  border: none;
}
.lucky {
  width: 100%;
  height: 100vh;
  background-repeat:no-repeat;
  background-size:cover;
  position:fixed;
  top: 0;
  left: 0;
  z-index:-10;
  zoom: 1;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  .lucky_bg {
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    z-index: 5;
  }
  .describe {
    z-index: 10;
    font-size: $big-size;
    padding: 280upx 111upx 18upx 111upx;
    color: #fff;
    font-weight:500;
    view{
      display: flex;
      justify-content: center;
    }
  }
  .active_time {
    text-align: center;
    color: #fff;
    font-size: $sub-size;
    font-weight:400;
  }
  .rules {
    color: #BF7330;
    font-size: $sub-size;
    margin: 19upx 280upx 0;
    width: 190upx;
    height: 50upx;
    border: 1upx solid #BF7330;
    width: 190upx;
    height: 50upx;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconSize {
      font-size: 26upx;
    }
  }
  .bottom_btn {
    @include between;
    position: absolute;
    width: calc(100% - 78upx);
    padding: 0 39upx;
    bottom: 30upx;
    align-items: flex-end;
    .same_btn {
      color: #C5C9CA;
      font-size: 24upx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-weight:500;
      .btnIocn {
        font-size: 50upx;
        padding-bottom: 20upx;
      }
    }
    .btn_center {
      width:200upx;
      height:200upx;
      background:linear-gradient(0deg,rgba(191,115,48,1),rgba(238,169,107,1));
      box-shadow:0px 10upx 18upx 2upx rgba(191, 115, 48, 0.35);
      border-radius:50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 36upx;
      font-weight:500;
      color: #fff;
    }
    .noneActive {
      width:200upx;
      height:200upx;
      background:linear-gradient(0deg,rgba(153,153,153,1),rgba(237,237,237,1));
      box-shadow:0upx 10upx 18upx 2upx rgba(153, 153, 153, 0.35);
      border-radius:50%;
    }
  }
  .rule_content {
    margin: 0 40upx;
    .rule_title {
      color:$back-color;
      font-size: $sub-size;
      font-weight: 500;
    }
    .rule_detail {
      padding-top: 39upx;
      font-size: 26upx;
      color:$sub-color;
      font-weight:500;
    }
    .complete {
      @include normalbtn(690upx,78upx);
      background-color: $active-color;
      color:#fff;
      margin-top: 277upx;
      margin-bottom: 20upx;
    }
  }
}

.share_menu {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 40upx;
  padding-bottom: 30upx;
}
.cancel_btn {
  margin: 26upx 30upx 30upx;
  border-radius: 100upx;
  padding: 17upx 0;
  background-color: $line-color;
  text-align: center;
}
.share_icon_color {
  color: #979d9f;
}
.share_icon {
  font-size: 70upx;
}
</style>