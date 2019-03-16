<template>
  <div class="container">
    <div class="flex flex-between">
      <div class="flex">
        <img src="" alt="">
        <div>
          <p>
            <router-link to="/login">登录 / 注册</router-link>
          </p>
          <p><span></span>暂无绑定手机号</p>
        </div>
      </div>
      <div class="arrow">&gt;</div>
    </div>
    <ul class="flex flex-between">
      <li class="flex flex-column"><span><i class="orange">{{num|fixedTwo}}</i>元</span><span>我的余额</span></li>
      <li class="flex flex-column"><span><i class="red">{{num}}</i>个</span><span>我的优惠</span></li>
      <li class="flex flex-column"><span><i class="green">{{num}}</i>分</span><span>我的积分</span></li>
    </ul>
    <ul class="flex-parent flex-between">
      <li><span><i class="iconfont icon-order_fill"></i>我的订单</span><span class="arrow">&gt;</span></li>
      <li><span><i class="iconfont icon-shop1"></i>积分商城</span><span class="arrow">&gt;</span></li>
      <li><span><i class="iconfont icon-VIP"></i>xx会员卡</span><span class="arrow">&gt;</span></li>
    </ul>
    <ul class="flex-parent flex-between">
      <li><span><i class="iconfont icon-service"></i>服务中心</span><span class="arrow">&gt;</span></li>
      <li><span><i class="iconfont icon-clouddownload-fill"></i>下载app</span><span class="arrow">&gt;</span></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: 0
      }
    },
    filters: {
      fixedTwo(num) {
        return num.toFixed(2);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../static/style/variable';
  .container {
    text-align: left;
    .arrow {
      text-align: right;
      width: .6rem;
      height: 100%;
      font-size: 18px;
      transform: scaleY(1.5);
    }
    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 8px;
      border: 1px solid red;
      border-radius: 50%;
    }
    &>div {
      margin-top: -2px;
      padding: 14px 12px;
      background-color: $mainBgColor;
      color: white;
      a {
        font-size: 18px;
      }
    }
    &>ul {
      background-color: white;
      margin-bottom: 10px;
    }
    &>ul.flex-parent {
      padding-left: 40px;
      li{
        font-size: 14px;
        line-height: 40px;
        padding: 2px 12px 2px 0;
        border-bottom: 1px solid #eee;
        &:nth-last-of-type(1){
          border: none;
        }
        span:nth-of-type(1){
          position: relative;
          left: -20px;
          vertical-align: middle;
          i{
            font-size: 18px;
            padding-right: 4px;
          }
          .icon-order_fill{
            color: #666666;
          }
          .icon-shop1{
            color: #ED6936;
          }
          .icon-VIP{
            color: #EFBE3C;
          }
          .icon-service, .icon-clouddownload-fill{
            color: #247DCF;
          }
        }
        .arrow{
          color: #999;
        }
      }
    }
    .flex,
    .flex-parent>li {
      display: flex;
      align-items: center;
    }
    .flex-between,
    .flex-parent.flex-between>li {
      justify-content: space-between;
    }
    .flex-column {
      flex-flow: column;
      flex-grow: 1;
      padding: 12px 0;
      span:nth-of-type(1) {
        line-height: 30px;
        vertical-align: baseline;
        font-size: 12px;
        i {
          font-size: 20px;
          font-weight: bold;
        }
        .orange{
          color: #E37900;
        }
        .red{
          color: #E34114;
        }
        .green{
          color: #3F8600;
        }
      }
    }
  }
</style>