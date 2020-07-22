<template>
  <view>
    <wxparser :rich-text="richText" />
    <!-- 评论盒子 -->
    <view class="box">
      <view class="box_line" v-for="(item,index) in comments" :key="index">
        <view class="box_left">
          <image :src="item.header"/>
        </view>
        <view class="box_right">
          <view class="right_top">
            <text>{{item.name}}</text>
            <text>{{item.time}}</text>
          </view>
          <view class="right_center">
            {{item.describe}}
          </view>
          <view class="like_line" @tap="changeLike(index)">
            <text class="iconfont iconshoucang-xianxing" v-if="item.is_like"></text>
            <text class="iconfont iconshoucang-tianchong active_like" v-else></text>
            <text>{{item.like}}</text>
          </view>
        </view>
      </view>
    </view>

    <msgBar :is_collection="is_collection"
            @handleShare="handleShare"
            @collection="collection"/>
    <modal :show="modalShow" @closeModal="closeModal" :showclose="showclose">
      <view>
        <view class="share_menu">
          <button v-for="item in shareList" :key="item.id" class="icon_btn" @tap="share(item.id)" :open-type="item.open">
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
import msgBar from '../components/messagebar';
import modal from "../../../components/modal";
import posterModal from "../../../components/poster";
import { shareList } from "../../../utils/data";
export default {
  data() {
    return {
      richText:'<h1>Hello world!</h1>',
      is_collection:true,
      modalShow: false,
      showclose: true,
      shareList: shareList,
      posterstate: false,
      poster:'',
      comments:[
        {
          header:'/static/logo.png',
          name:'猪猪女孩',
          time:'2020-06-06',
          describe:'看一万遍看一万遍看一万遍看一万遍看一万遍看 一万遍',
          like:6,
          is_like:true
        },
        {
          header:'/static/logo.png',
          name:'猪猪女孩',
          time:'2020-06-06',
          describe:'看一万遍看一万遍看一万遍看一万遍看一万遍看 一万遍',
          like:6,
          is_like:false
        }
      ]
    }
  },
  components:{
    msgBar,
    modal,
    posterModal
  },
  onLoad() {

  },
  methods: {
    collection() {
      let is_collection = this.is_collection
      if(is_collection) {

      }else {

      }
      this.is_collection = !this.is_collection
    },
    async handleShare() {
      this.showclose = await false;
      this.modalShow = true;
    },
    closeModal() {
      this.modalShow = false;
    },
    hideposter() {
      let poster = uni.getStorageSync("poster");
      if (poster) {
        this.poster = poster;
        uni.removeStorageSync("poster");
      }
      this.posterstate = false;
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
    changeLike(index) {
      let t = this,
          list = t.comments
      list[index].is_like = !list[index].is_like
      if(!list[index].is_like) {
        list[index].like++
      }else {
        list[index].like--
      }
      t.comments = list
    }
  },
}
</script>

<style lang="scss">
.share_menu {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 40upx;
  padding-bottom: 30upx;
}
.icon_btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: $mini-size;
  span {
    padding-bottom: 7upx;
  }
}
.share_icon_color {
  color: #979d9f;
}
.share_icon {
  font-size: 70upx;
}
.cancel_btn {
  margin: 26upx 30upx 30upx;
  border-radius: 100upx;
  padding: 17upx 0;
  background-color: $line-color;
  text-align: center;
}
button{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.01);
  line-height: normal;
  margin:0;
}
button::after{
  border:none;
}

// 评论
.box {
  border-top: 1upx solid $line-color;
  width: 100%;
  .box_line {
    margin: 30upx 39upx 30upx 26upx;
    display: flex;
    flex-direction: row;
    .box_left {
      image {
        border-radius: 50%;
        width: 60upx;
        height: 60upx;
      }
    }
    .box_right {
      padding-left: 26upx;
      .right_top text:nth-child(1) {
        color:$sub-color;
        font-size: 26upx;
      }
      .right_top text:nth-child(2) {
        padding-left: 20upx;
        color: #979D9F;
        font-size: 20upx;
      }
      .right_center {
        margin-top: 19upx;
        font-size: $sub-size;
        color: $back-color;
      }
      .like_line {
        text-align: right;
        color: $light-active-color;
        font-size: $main-size;
      }
      .like_line text:nth-child(2) {
        padding-left: 9upx;
        font-size: 20upx;
      }
      .active_like {
        color: $active-color !important;
      }
    }
  }
}
</style>