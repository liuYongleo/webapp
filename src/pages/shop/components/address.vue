<template>
  <div class="address">
    <div class="full-screen">
      <shop-header :title="title"></shop-header>
      <ul>
        <li v-for="(item,key) in address" :key="key"></li>
      </ul>
      <p class="fixed-bottom">
        <router-link to="/shop/shopOrder/address/add"><i class="add">+</i>新增收货地址</router-link>
      </p>
    </div>
    <transition name="slide">
      <router-view class="router-full"></router-view>
    </transition>
  </div>
</template>

<script>
  import shopHeader from './shopHeader'
  
  export default {
    components: {
      shopHeader
    },
    data() {
      return {
        title: '选择地址',
        address: []
      }
    },
    methods: {
      select(key, k) {
  
      },
      add() {
  
      },
      submit() {
        setTimeout(() => {
          this.$router.go(-1);
        }, 500)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../static/style/variable';
  .address {
    text-align: center;
    background-color: white;
    .full-screen {
      position: absolute;
      width: 100%;
      height: 100%;
      &>p {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 10px 0;
        text-align: center;
        background-color: white;
        a {
          padding: 8px 0;
          font-size: 13px;
          color: $mainBgColor;
        }
        i {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 6px;
          line-height: 16px;
          border: 1px solid $mainBgColor;
          border-radius: 100%;
        }
      }
    }
    .router-full {
      position: absolute;
      z-index: 4;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      padding: 0;
    }
  }
</style>
