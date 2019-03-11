<template>
  <div class="container">
    <nav>
      <ul>
        <li @click="selectNav(1)" :class="{active:navKey==1}">分类<span><i></i></span></li>
        <li @click="selectNav(2)" :class="{active:navKey==2}">排序<span><i></i></span></li>
        <li @click="selectNav(3)" :class="{active:navKey==3}">筛选<span><i></i></span></li>
      </ul>
      <div>
  
      </div>
    </nav>
    <div>
      <foodlist v-for="item in restaurants" :item="item"></foodlist>
    </div>
  </div>
</template>

<script>
  import foodlist from '../../components/foodList'
  const restaurants = require('../../../static/server/restaurants.json')
  const category = require('../../../static/server/category.json')
  
  export default {
    components: {
      foodlist
    },
    data() {
      return {
        restaurants,
        navKey: 0,
      }
    },
    methods: {
      selectNav(key) {
        this.navKey = key;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../static/style/variable';
  .container {
    background: white;
    nav {
      position: absolute;
      z-index: 2;
      width: 100%;
      background: white;
      &>ul {
        display: flex;
        padding: 10px 0;
        box-shadow: 0 0 2px #ddd;
        li {
          flex-grow: 1;
          box-sizing: border-box;
          line-height: 20px;
          border-right: 1px solid #ddd;
          font-size: 14px;
          &:nth-last-of-type(1) {
            border: none;
          }
          i {
            position: relative;
            top: 12px;
            left: 6px;
            border-top: 8px solid #333;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
          }
          span {
            transform: rotate(0);
            transition: all .5s linear;
          }
          &.active {
            color: $mainBgColor;
            i {
              border-top: 8px solid $mainBgColor;
            }
            span {
              transform: rotate(180deg);
            }
          }
        }
      }
    }
  }
</style>