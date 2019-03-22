<template>
  <div class="container">
    <div @click="selectNav(0)" class="mask fadeIn" v-show="navKey" :class="{animated:navKey}"></div>
    <nav>
      <ul>
        <li @click="selectNav(1)" :class="{active:navKey==1}">分类<span><i></i></span></li>
        <li @click="selectNav(2)" :class="{active:navKey==2}">排序<span><i></i></span></li>
        <li @click="selectNav(3)" :class="{active:navKey==3}">筛选<span><i></i></span></li>
      </ul>
      <transition name="sort-slide" mode="out-in">
        <div class="category slideInDowns" v-show="navKey==1" :class="{animateds:navKey==1}">
          <ul class="left">
            <li v-for="(item,key) in category" :key="'c-'+key" @click="selectCat(item.id)" :class="{active:categoryId==item.id}">
              <p>
                <img :src="item.image_url|imgSrc" alt="">
                <i>{{item.name}}</i>
              </p>
              <p class="light-color">
                <i class="left-count">{{item.count}}</i>
                <i>></i>
              </p>
            </li>
          </ul>
          <ul class="right">
            <li v-for="(item,key) in category" :key="'ra-'+key" v-if="item.id == categoryId">
              <div v-for="(i,k) in item.sub_categories" :key="'ri-'+k" @click="selectCatChild(i.id)" :class="{active:categoryRight==i.id}">
                <i>{{i.name}}</i>
                <i>{{i.count}}</i>
              </div>
            </li>
          </ul>
        </div>
      </transition>
      <transition name="sort-slide" mode="out-in">
        <div class="sort slideInDowns" v-show="navKey==2" :class="{animateds:navKey==2}">
          <ul>
            <li v-for="(item,key) in sortList" :key="'s-'+key" @click="selectSort(key)" :class="{active:sortKey==key}">{{item}}</li>
          </ul>
        </div>
      </transition>
      <transition name="sort-slide" mode="out-in">
        <div class="filter slideInDowns" v-show="navKey==3" :class="{animateds:navKey==3}">
          <h4>配送方式</h4>
          <ul class="delivery-ul">
            <li v-for="(item,key) in foodDelivery" :key="'fd-'+key" @click="selectDelivery(item.id)" :class="{active:deliveryId==item.id}">
              <i>icon</i>{{item.text}}
            </li>
          </ul>
          <h4>商家属性(可以多选)</h4>
          <ul class="activity-ul">
            <li v-for="(item,key) in foodActivity" :key="'fa-'+key" @click="selectActivity(item.id)" :class="{active:activityId[item.id]}">
              <i :style="item.icon_color|str">{{item.icon_name}}</i>{{item.name}}
            </li>
          </ul>
          <p>
            <button @click="clearRecord">清空</button>
            <button @click="sureBtn" class="sure">确定</button>
          </p>
        </div>
      </transition>
    </nav>
    <div>
      <foodlist v-for="(item,key) in restaurants" :key="'ff-'+key" :item="item"></foodlist>
    </div>
  </div>
</template>

<script>
  import foodlist from '../../components/foodList'
  import '../../../static/style/animate.css'
  const restaurants = require('../../../static/server/restaurants.json')
  const category = require('../../../static/server/category.json')
  const foodDelivery = require('../../../static/server/food.delivery.json')
  const foodActivity = require('../../../static/server/food.activity.json')
  
  export default {
    components: {
      foodlist: foodlist
    },
    data() {
      return {
        restaurants,
        category,
        foodDelivery,
        foodActivity,
        navKey: 0,
        categoryId: 0,
        categoryRight: 0,
        sortKey: 0,
        sortList: ['智能排序', '距离最近', '销量最高', '起送价最低', '配送速度最快', '评分最高'],
        deliveryId: 0,
        activityId: {},
      }
    },
    methods: {
      selectNav(key) {
        if (key == this.navKey) {
          return this.navKey = 0;
        }
        this.navKey = key;
      },
      selectCat(id) {
        this.categoryId = id;
      },
      selectCatChild(id) {
        // TODO 添加筛选逻辑
  
        this.categoryRight = id;
        setTimeout(() => {
          this.selectNav(0);
        }, 100)
      },
      selectSort(key) { // TODO 添加筛选逻辑
  
        this.sortKey = key;
        setTimeout(() => {
          this.selectNav(0);
        }, 100)
      },
      selectDelivery(id) {
        if (this.deliveryId != id) {
          this.deliveryId = id;
        } else {
          this.deliveryId = 0;
        }
      },
      selectActivity(id) { // TODO 添加筛选逻辑
        if (this.activityId[id]) {
          this.$set(this.activityId, id, 0);
        } else {
          this.$set(this.activityId, id, 1);
        }
      },
      clearRecord() {
        console.log(22);
        this.deliveryId = 0;
        for (var i in this.activityId) {
          this.$set(this.activityId, i, 0);
        }
      },
      sureBtn() { // TODO 添加筛选逻辑
        console.log(111);
        setTimeout(() => {
          this.selectNav(0);
        }, 100)
      }
    },
    computed: {},
    mounted() {
      this.categoryId = category[0]['id'];
    },
    filters: {
      imgSrc(src) {
        return 'https://fuss10.elemecdn.com/' + src.slice(0, 1) + '/' + src.slice(1, 3) + '/' + src.slice(3, 100) + '.png';
      },
      str(color) {
        return 'color:#' + color + ';border:1px solid #' + color;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../static/style/variable';
  .container {
    .animated {
      animation-duration: .4s;
    }
    background: white;
    height: 100%;
    .mask {
      position: absolute;
      height: 100%;
      width: 100%;
      background: rgba($color: #000000, $alpha: .4);
    }
    nav {
      position: absolute;
      z-index: 2;
      width: 100%;
      &>ul {
        position: relative;
        z-index: 100;
        display: flex;
        padding: 10px 0;
        background: white;
        box-shadow: 0 0 4px #ccc;
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
            border-top: 8px solid #333;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
          }
          span {
            display: inline-block;
            position: relative;
            top: 12px;
            left: 6px;
            transform: rotate(0);
            transform-origin: 6px -2px;
            transition: all .2s linear;
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
      &>div {
        background: white;
        position: absolute;
        z-index: 3;
        width: 100%;
      }
      .category {
        display: flex;
        line-height: 12px;
        font-size: 12px;
        overflow: hidden;
        &.hide {
          height: 0px;
        }
        .left {
          li.active {
            background: white;
          }
          width: 160px;
          background: #f1f1f1;
          img {
            width: 12px;
            height: 12px;
            float: left;
            margin-right: 6px;
          }
          .light-color {
            color: #bbb;
            .left-count {
              display: inline-block;
              margin-right: 4px;
              color: white;
              background: #bbb;
              padding: 2px;
              border-radius: 7px;
            }
          }
        }
        .right {
          flex-grow: 1;
          li {
            padding-left: 10px;
            color: #666;
            div {
              border-bottom: 1px solid #ddd;
              padding-left: 0;
              transition: all .2s linear;
              &.active {
                color: $mainBgColor;
              }
            }
          }
        }
        .right div,
        .left li {
          display: flex;
          box-sizing: border-box;
          height: 40px;
          padding: 14px;
          justify-content: space-between;
        }
      }
      .sort {
        text-align: left;
        color: #666;
        padding-left: 40px;
        li {
          line-height: 40px;
          border-bottom: 1px solid #ddd;
          padding-left: 4px;
          &.active {
            color: $mainBgColor;
            &::after {
              display: inline-block;
              position: absolute;
              right: 15px;
              content: 'ok';
              color: $mainBgColor;
            }
          }
        }
      }
      .filter {
        h4 {
          padding: 0 12px;
          line-height: 30px;
          text-align: left;
        }
        ul {
          padding: 0 12px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          li {
            width: 2.8rem;
            line-height: 28px;
            border: 1px solid #ddd;
            border-radius: 3px;
            text-align: left;
            margin-bottom: 8px;
            &.active {
              color: $mainBgColor;
              border-color: $mainBgColor;
              box-shadow: 0 0 2px inset $mainBgColor*1.2;
            }
            i {
              display: inline-block;
              height: 16px;
              width: 16px;
              line-height: 16px;
              text-align: center;
              margin: 0 6px 0 8px;
              border-radius: 4px;
            }
          }
        }
        p {
          padding: 10px 12px;
          height: 40px;
          background: #eee;
          display: flex;
          justify-content: space-between;
          button {
            width: 4.3rem;
            border: none;
            outline: none;
            border-radius: 5px;
            background: white;
            font-size: 18px;
            color: #666;
            transition: .2s all linear;
            &:active {
              background: #f3f3f3;
            }
            &.sure {
              background: $mainBgColor*1.12;
              color: white;
              &:active {
                background: $mainBgColor*1.2;
              }
            }
          }
        }
      }
    }
    &>div {
      padding-top: 40px;
    }
    .sort-slide-enter-active,
    .sort-slide-leave-active {
      transition: all .5s linear;
    }
    .sort-slide-enter,
    .sort-slide-leave-active {
      transform: translateY(-100%);
    }
    .sort-slide-leave {
      transition-duration: .28s;
    }
  }
</style>