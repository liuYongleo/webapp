<template>
  <!-- <transition name="slide"> -->
  <div class="shopOrder">
    <header>
      <span @click="hide" class="active left">&lt; 返回</span>
      <h1>订单</h1>
    </header>
    <div class="content">
      <div class="address flex flex-between" @click="goAddress">
        <span>请添加一个收货地址</span>
        <span class="arrow">&gt;</span>
      </div>
      <div class="arrive-time flex flex-between">
        <span>送达时间</span>
        <div>
          <p>尽快送达 | 预计 21:23</p>
          <p><span>蜂鸟专送</span></p>
        </div>
      </div>
      <div class="pay-type">
        <p @click="togglePayPop" class="flex flex-between"><span class="big-font">支付方式</span><span>{{payText[payType]}} <i class="arrow">&gt;</i></span></p>
        <p class="flex flex-between"><span>红包</span><span>暂时只在APP中支持</span></p>
      </div>
      <ul>
        <li><img src="static/img/shop.png" alt="">{{shopName}}</li>
        <li>
          <p v-for="(item,key) in orderList" :key="key" class="flex flex-between">
            <span>{{item.name}}</span><span><i class="orange-color">x {{item.num}}</i><i>￥{{item.price}}</i></span>
          </p>
          <p class="flex flex-between"><span>餐盒费</span><span><i class="orange-color">x {{packageNum}}</i><i>￥{{packagePrice}}</i></span></p>
          <p class="flex flex-between"><span>配送费</span><span>￥{{sendFee}}</span></p>
        </li>
        <li class="order-total">
          <div class="flex flex-between"><span>订单 ￥{{total}}</span><span class="orange-color">待支付</span></div>
          <div class="text-right orange-color">￥{{total}}</div>
        </li>
      </ul>
      <div class="pay-type">
        <p class="flex flex-between" @click="goRemark"><span class="big-font">订单备注</span><span>口味、偏好等 <i class="arrow">&gt;</i></span></p>
        <p class="flex flex-between" @click="goInvoice"><span class="big-font">发票抬头</span><span>不需要开发票 <i class="arrow">&gt;</i></span></p>
      </div>
    </div>
  
    <transition name="slide">
      <router-view class="router-full"></router-view>
    </transition>
    <footer>
      <span>待支付 ￥{{total}}</span>
      <span>确认下单</span>
    </footer>
    <transition name="fade">
      <div v-show="popToggle" class="pop-window">
        <div @click="togglePayPop" class="mask"></div>
        <transition name="slide-up">
          <div v-show="popToggle" class="pop-content">
            <h3>支付方式</h3>
            <p v-for="(item,key) in payText" :key="key" @click="selectPay(key)" :class="{active:payType==key}">
              <span>{{item}}</span>
              <span class="iconfont icon-checked"></span>
            </p>
          </div>
        </transition>
      </div>
    </transition>
  </div>
  <!-- </transition> -->
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  const shopMenu = require('../../../../static/server/shop.menu.json');
  
  export default {
    data() {
      return {
        orderList: [],
        packageNum: 0,
        packagePrice: 5,
        sendFee: 8,
        orderTotal: 0,
        payType: 1,
        popToggle: false,
        payText: ['在线支付', '货到付款']
      }
    },
    computed: {
      ...mapState(['shopRecord']),
      packageTotal() {
        return this.packageNum * this.packagePrice;
      },
      total() {
        return this.packageTotal + this.sendFee + this.orderTotal;
      }
    },
    methods: {
      ...mapMutations(['setShop']),
      hide() {
        this.$router.go(-1);
        // this.$emit('hide');
      },
      goAddress() {
        this.$router.push({
          path: '/shop/shopOrder/address'
        })
      },
      goRemark() {
        this.$router.push({
          path: '/shop/shopOrder/remark'
        })
      },
      goInvoice() {
        this.$router.push({
          path: '/shop/shopOrder/invoice'
        })
      },
      selectPay(type) {
        this.payType = type;
      },
      togglePayPop(){
        this.popToggle = !this.popToggle;
      }
    },
    created() {
      this.shopId = this.$route.query.shopId;
      this.shopName = this.$route.query.shopName;
      let shopIdList = this.shopRecord[this.shopId];
      // console.log(shopIdList);
      // console.log(this.shopRecord);
      // console.log(this.shopId);
      let list = this.shopRecord[this.shopId];

      for (const key in list) {
        if (list.hasOwnProperty(key)) {
          const element = list[key];
          for (const k in element) {
            if (element.hasOwnProperty(k)) {
              const ele = element[k];
              this.packageNum += ele.num;
              this.orderTotal += ele.num * ele.price;
              this.orderList.push(ele);
            }
          }
        }
      }
      // for (let key in shopIdList) {
      //   for (let index = 0; index < shopMenu.length; index++) {
      //     const element = shopMenu[index];
      //     if (key == element['id']) {
      //       // console.log(key, element);
      //       for (let foodKey in shopIdList[key]) {
      //         for (let i = 0; i < element['foods'].length; i++) {
      //           // console.log(foodKey, ele.item_id);
      //           const ele = element['foods'][i];
      //           if (foodKey == ele.item_id) {
      //             // console.log(1);
      //             let obj = {
      //               name: ele.name,
      //               price: ele.specfoods[0]['price'],
      //               num: shopIdList[key][foodKey]
      //             }
      //             this.packageNum += obj.num;
      //             this.orderTotal += obj.num * obj.price;
      //             this.orderList.push(obj);
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
      console.log(this.orderList);
    },
    mounted() {
  
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../../../static/style/variable';
  .shopOrder {
    .router-full {
      position: absolute;
      z-index: 3;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      padding: 0;
    }
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #eee;
    header {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height: 1.2rem;
      line-height: 1.2rem;
      background-color: $mainBgColor;
      color: $mainColor;
      span {
        position: absolute;
        top: 0;
        padding: 0 12px;
        font-size: 14px;
        font-weight: bold;
        transition: all .5s linear;
        &.left {
          left: 0;
        }
      }
      h1 {
        flex-grow: 1;
        font-size: 22px;
      }
    }
    .content {
      box-sizing: border-box;
      height: 100%;
      padding-top: 45px;
      padding-bottom: 45px;
      overflow-y: scroll;
      text-align: left;
      .arrow {
        display: inline-block;
        transform: scaleY(2);
      }
      &>div {
        background: white;
        margin-bottom: 10px;
        padding: 12px;
      }
      .flex {
        display: flex;
        &.flex-between {
          justify-content: space-between;
          align-items: center;
        }
      }
      .address {
        position: relative;
        height: 1.1rem;
        line-height: 1rem;
        font-size: 14px;
        &:after {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 3px;
          content: '';
          background-image: url("address_bottom.png");
        }
      }
      .arrive-time {
        border-left: 3px solid $mainBgColor;
        &>span {
          font-size: 18px;
          font-weight: bold;
        }
        &>div {
          line-height: 22px;
          text-align: right;
          color: $mainBgColor;
          font-size: 14px;
          span {
            padding: 2px 4px;
            font-size: 12px;
            border-radius: 2px;
            color: white;
            background-color: $mainBgColor;
          }
        }
      }
      .pay-type {
        padding: 0 12px;
        p {
          border-bottom: 1px solid #eee;
          line-height: 1rem;
          color: #999;
          .big-font {
            font-size: 14px;
            color: #333;
          }
        }
      }
      ul {
        margin-bottom: 10px;
        background-color: white;
        li {
          &.order-total {
            padding: 5px 12px;
            line-height: .8rem
          }
          .orange-color {
            color: #E57525;
          }
          .text-right {
            text-align: right;
          }
          padding: 12px;
          border-bottom: 1px solid #eee;
          img {
            width: .5rem;
            height: .5rem;
            vertical-align: middle;
            margin-right: 4px;
          }
          p {
            line-height: .68rem;
            color: #666;
            i {
              display: inline-block;
              width: 50px;
              text-align: right;
            }
          }
        }
      }
    }
    footer {
      position: absolute;
      z-index: 2;
      display: flex;
      align-items: stretch;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 45px;
      line-height: 45px;
      font-size: 14px;
      background: #333;
      color: white;
      span:nth-of-type(1) {
        padding-left: 12px;
        text-align: left;
        flex-grow: 1;
      }
      span:nth-of-type(2) {
        width: 90px;
        background: #3190E8;
      }
    }
    .pop-window {
      position: absolute;
      z-index: 100;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
        padding: 0;
        margin: 0;
      .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .2);
      }
      .pop-content {
        position: absolute;
        width: 100%;
        bottom: 0;
        background-color: white;
        padding: 0 0 50px 0;
        margin: 0;
        h3 {
          line-height: 1rem;
          text-align: center;
          background-color: #f5f5f5;
        }
        p {
          display: flex;
          justify-content: space-between;
          line-height: 1rem;
          padding: 0 12px;
          .iconfont {
            color: #aaa;
          }
          &.active .iconfont {
            color: $mainBgColor;
          }
        }
      }
    }
    .slide-up-enter-active, .slide-up-leave-active{
      transition: all .4s linear;
    }
    .slide-up-enter, .slide-up-leave-active{
      transform: translateY(100%);
    }
  }
</style>