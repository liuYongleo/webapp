<template>
  <transition name="slide">
    <div class="container">
      <header>
        <span @click="hide" class="active left">&lt; 返回</span>
        <h1>{{item.name}}</h1>
      </header>
      <div class="content">
        <img src="static/img/shop.png" alt="">
        <h2>{{item.description}}</h2>
        <h3>{{item.name}}</h3>
        <p>评分 <star :num="item.rating"></star></p>
        <p>月售{{item.month_sales}}单  <i>售价 ￥{{item.specfoods ? item.specfoods[0].price : ''}}起</i> </p>
        <p>评论数{{item.rating_count}} 好评率{{item.satisfy_rate}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
import star from '../../../components/star'
  export default {
    props: ['item'],
    components:{
star
    },
    methods: {
      hide() {
        console.log(this.item);
        this.$emit('hide');
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../static/style/variable';
  .container {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1rem;
      line-height: 1rem;
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
    }
    .content{
      padding-top: 1rem;
      text-align: left;
      font-size: 14px;
      img{
        width: 100%;
      }
      h2,h3,p{
        padding-left: .4rem;
      }
      h2{
        line-height: 1rem;
        color: #444;
      }
      h3{
        line-height: .68rem;
        font-size: 16px;
      }
      p{
        line-height: .68rem;
        color: #666;
        i{
          color: #DA7022;
        }
      }
    }
    .slide-enter-active,
    .slide-leave-active {
      transition: all .3s linear;
    }
    .slide-enter,
    .slide-leave-active {
      transform: translate(30%, 0);
      opacity: 0;
    }
  }
</style>