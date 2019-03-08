<template>
  <div class="container">
    <header>
      <img class="bg-img" :src="shop.image_path" alt="">
      <div class="back" @click="$router.go(-1)">&lt;</div>
      <div>
        <div class="flex">
          <div class="flex-left">
            <img :src="shop.image_path" alt="">
            <div @click="toggleDetail">
              <h2>{{shop.name}}</h2>
              <p>商家配送 / 分钟送达 / {{shop.piecewise_agent_fee.tips}}</p>
              <p>公告：{{shop.promotion_info}}</p>
            </div>
          </div>
          <div>></div>
        </div>
        <div class="flex" @click="toggleActivity">
          <div class="flex">
            <span><i>{{shop.activities[0].icon_name}}</i>{{shop.activities[0].description}}</span>
            <span>{{shop.activities.length}}个活动</span>
          </div>
          <div>></div>
        </div>
      </div>
    </header>
    <nav>
      <span @click="selectNav(1)" :class="{active:navKey==1}">商品</span>
      <span @click="selectNav(2)" :class="{active:navKey==2}">评价</span>
    </nav>
    <transition name="fade">
      <section v-show="navKey==1" class="shop-section">
        <div class="wrapper-left">
          <ul class="menu-left" ref="menuLeft">
            <li v-for="(item,k) in menu" :key="'ml-'+k" @click="selectLeft(k)" :class="{active:leftKey==k}">
              <span><img :src="item.icon_url|imgSrc" alt="">{{item.name}}</span>
              <!-- <i v-show="shopRecord[shopId] && shopRecord[shopId][item.id]">{{shopRecord[shopId][item.id]}}</i> -->
              <i v-show="menuFilter(item.id)">{{menuFilter(item.id)}}</i>
            </li>
          </ul>
        </div>
        <div class="wrapper-right">
          <ul class="menu-right" ref="menuRight">
            <li v-for="(item,k) in menu" :key="'mr-'+k">
              <h2><i class="big-font">{{item.name}}</i><i>{{item.description}}</i></h2>
              <div v-for="(i,f) in item.foods" :key="'f'+f">
                <img src="../../../static/img/shop.png" alt="">
                <div>
                  <h3>{{i.name}}</h3>
                  <p>{{i.description}}</p>
                  <h4><i>月售{{i.month_sales}}份</i><i>好评率{{i.satisfy_rate}}</i></h4>
                  <h5 v-if="i.activity"><i>{{i.activity.image_text}}</i></h5>
                  <h6>
                    <i>￥{{i.specfoods[0].price}}</i>
                    <count :num="shopRecord[shopId] ? shopRecord[shopId][item.id] ? shopRecord[shopId][item.id][i.item_id] ? shopRecord[shopId][item.id][i.item_id] : 0 : 0 : 0" @minuse="minuse" @plus="plus" @operateplus="operteShop(item, i, 1)" @operateminuse="operteShop(item, i, -1)"></count>
                  </h6>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <transition name="fade">
          <footer :class="{active:count}" v-show="navKey==1">
            <div class="footer-left">
              <div ref="buy-cart">
                <i class="iconfont icon-gouwuche-tianchong"><em v-if="count">{{count}}</em></i>
              </div>
              <p>
                <i>￥{{shopMoney|fixedTwo}}</i>
                <i>配送费￥5</i>
              </p>
            </div>
            <div class="footer-right">
              <span v-if="!count">还差￥{{shop.float_minimum_order_amount-count}}起送</span>
              <span v-else>去结算</span>
            </div>
          </footer>
        </transition>
        <transition appear @before-appear="beforeEnter" @after-appear="afterEnter" v-for="(item,key) in dots" :key="'ak-'+key">
          <span class="move-dot"><i></i></span>
        </transition>
      </section>
    </transition>
    <transition name="fade">
      <section v-show="navKey==2" class="rate-section">
        <div class="self-rate">
          <div class="self-left">
            <h1>{{shop.rating}}</h1>
            <h4>综合评价</h4>
            <h5>高于周边商家{{scores.compare_rating|toPercent}}</h5>
          </div>
          <div class="self-right">
            <p>服务态度
              <star :num="scores.food_score|toScore"></star>
            </p>
            <p>菜品评价
              <star :num="scores.service_score|toScore"></star>
            </p>
            <p>送达时间 <i>{{scores.deliver_time}}</i>分钟</p>
          </div>
        </div>
        <div class="ratings">
          <ul class="rate-menu">
            <li v-for="(item,key) in tags" :class="{active:key==0}">{{item.name}}({{item.count}})</li>
          </ul>
          <ul class="rate-list">
            <li v-for="item in ratings">
              <img :src="'../static/img/shop.png'" alt="">
              <div>
                <p><span class="username">{{item.username}}</span><span class="light-color right">{{item.rated_at}}</span></p>
                <p>
                  <star :num="item.rating_star" :show="true"></star>{{item.time_spent_desc}}</p>
                <p><img v-for="i in item.item_ratings" v-if="i.image_hash" :src="i.image_hash|imgSrc" alt=""></p>
                <p><i class="light-color border-1" v-for="i in item.item_ratings">{{i.food_name}}</i></p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </transition>
    <router-view class="children"></router-view>
    <detail v-show="detail" @hide="toggleDetail" :item="shop"></detail>
    <activity v-show="activity" @hide="toggleActivity" :item="shop"></activity>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  
  import BetterScroll from 'better-scroll';
  import count from './components/count';
  import detail from './components/detail';
  import activity from './components/activity';
  import star from '../../components/star';
  
  const shop = require('../../../static/server/shop.json');
  const ratings = require('../../../static/server/shop.ratings.json');
  const scores = require('../../../static/server/shop.scores.json');
  const tags = require('../../../static/server/shop.tags.json');
  const menu = require('../../../static/server/shop.menu.json');
  
  export default {
    components: {
      count,
      activity,
      detail,
      star
    },
    data() {
      return {
        ratings,
        scores,
        tags,
        menu,
        shop,
        navKey: 1,
        leftKey: 0,
        scrollWatch: true,
        count: 0,
        activity: false,
        detail: false,
        dots: [],
        shopMoney: 0
      }
    },
    computed: {
      ...mapState(['shopRecord']),
  
    },
    watch: {
      'count' () {
        let menu = this.menu,
          shopRecord = this.shopRecord[this.shopId],
          total = 0;
        for (let rkey in shopRecord) {
          for (let mkey in menu) {
            if (rkey == menu[mkey]['id']) {
              for (let ikey in shopRecord[rkey]) {
                for (let fkey in menu[mkey]['foods']) {
                  if (ikey == menu[mkey]['foods'][fkey]['item_id']) {
                    total += shopRecord[rkey][ikey] * menu[mkey]['foods'][fkey]['specfoods'][0]['price'];
                  }
                }
              }
            }
          }
        }
        this.shopMoney = total;
      }
    },
    methods: {
      ...mapMutations(['setShop']),
      selectNav(key) {
        if (this.navKey != key) {
          this.navKey = key;
        }
      },
      selectLeft(key) {
        let arr = this.offsetArr;
        if (this.leftKey != key) {
          this.scrollWatch = false;
          this.leftKey = key;
          this.menuRight.scrollTo(0, key == 0 ? 0 : -arr[key - 1], 500);
          setTimeout(() => {
            this.scrollWatch = true;
          }, 500)
        }
      },
      minuse() {
        this.count > 0 ? this.count-- : '';
      },
      plus(pos, event) {
        this.count++;
        this.eventX = pos.x;
        this.eventY = pos.y;
        this.dots.push(true);
      },
      operteShop(item, i, num) {
        let shopId = this.shopId, // shopId 商铺id
          itemId = item.id, // item.id 商铺内商品类别id
          iItemId = i.item_id, // i.item_id 商铺内商品类别下商品id
          shop = this.shopRecord,
          goodsNum = 0;
        if (shop[shopId] && shop[shopId][itemId]) {
          goodsNum = shop[shopId][itemId][iItemId];
          shop[shopId][itemId][iItemId] = parseInt(goodsNum ? goodsNum : 0) + num;
        } else if (shop[shopId]) {
          shop[shopId][itemId] = {};
          shop[shopId][itemId][iItemId] = 1;
        } else {
          shop[shopId] = {};
          shop[shopId][itemId] = {};
          shop[shopId][itemId][iItemId] = 1;
        }
        this.setShop(shop);
        // console.log(item, JSON.stringify(shop));
      },
      toggleDetail() {
        this.$router.push({
          path: '/shop/detail'
        })
        // this.detail = !this.detail;
      },
      toggleActivity() {
        this.activity = !this.activity;
      },
      afterEnter(el) {
        var obj = this.$refs['buy-cart'].getBoundingClientRect(),
          x = obj.x + 15,
          y = obj.y + 8;
        el.style.transition = 'all .4s linear';
        el.childNodes[0].style.transition = 'all .4s cubic-bezier(.67,-0.23,.95,.52)';
        el.style.transform = 'translate3d(' + (x - this.eventX) + 'px, 0, 0)';
        el.childNodes[0].style.transform = 'translate3d(0, ' + (y - this.eventY) + 'px, 0)';
        el.addEventListener('transitionend', function() {
          this.style.opacity = 0;
        })
      },
      beforeEnter(el) {
        el.style.transform = 'translate3d(0, 0, 0)';
        el.style.left = this.eventX + 'px';
        el.style.top = this.eventY + 'px';
      },
      menuFilter(id) {
        let shopRecord = this.shopRecord,
          shopId = this.shopId,
          obj = shopRecord[shopId] ? shopRecord[shopId][id] ? shopRecord[shopId][id] : {} : {},
          num = 0;
        for (let item in obj) {
          num += obj[item];
        }
        this['menu'+id] = num;
        return num;
      }
    },
    filters: {
      imgSrc(src) {
        return 'https://fuss10.elemecdn.com/' + src.slice(0, 1) + '/' + src.slice(1, 3) + '/' + src.slice(3, 100) + '.jpeg';
      },
      fixedTwo(num) {
        return num.toFixed(2);
      },
      toPercent(num) {
        return (num * 100).toFixed(1) + '%';
      },
      toScore(num) {
        return (Math.ceil(num * 10) / 10).toFixed(1);
      },
      menuFilter(num, item) {
        console.log(num, item);
      }
    },
    created() {
      this.shopId = this.$route.query.id;
    },
    mounted() {
      this.$nextTick(() => {
        this.count = 0;
        let shopRecord = this.shopRecord[this.shopId];
        for (let item in shopRecord) {
          for (let i in shopRecord[item]) {
            this.count += shopRecord[item][i];
          }
        }
        let offsetArr = this.offsetArr = [],
          refMenuRight = this.$refs.menuRight,
          childNodes = refMenuRight.childNodes;
        setTimeout(() => {
          for (let i = 0; i < childNodes.length; i++) {
            let height = childNodes[i].offsetHeight;
            offsetArr.push(i == 0 ? height : height + offsetArr[i - 1]);
          }
        });
        this.menuLeft = new BetterScroll('.wrapper-left', {
          scrollY: true,
          click: true
        });
        this.menuRight = new BetterScroll('.wrapper-right', {
          scrollY: true,
          click: true,
          probeType: 3
        });
        this.menuRight.on('scroll', (e) => {
          if (!this.scrollWatch) return;
          let offsetY = -1 * e.y,
            i = 0,
            len = offsetArr.length;
          while (i < len) {
            if (offsetY < offsetArr[i]) {
              this.leftKey = i;
              i = len;
            }
            i++;
          }
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../static/style/variable';
  .container {
    // height: 100% !important;
    display: flex;
    flex-flow: column;
    header {
      flex: 0 0 auto;
      position: relative;
      box-sizing: border-box;
      height: 3.2rem;
      padding: 10px;
      overflow: hidden;
      .back {
        position: absolute;
        left: 0;
        top: 0;
        width: 30px;
        height: 30px;
        line-height: 30px;
        font-size: 30px;
        color: white;
        font-weight: bold;
        z-index: 10;
      }
      &>img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        filter: blur(18px);
        z-index: 1;
      }
      &>div {
        position: relative;
        z-index: 2;
        .flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          &>div:nth-of-type(1) {
            flex-grow: 1;
          }
          &>div:nth-of-type(2) {
            padding-left: 10px;
          }
          .flex-left {
            display: flex;
            img {
              width: 1.8rem;
              height: 1.8rem;
              margin-right: 6px;
            }
          }
          div {
            text-align: left;
            color: white;
            h2,
            p,
            span {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              text-align: left;
            }
            h2 {
              font-size: .5rem;
              font-weight: bold;
              line-height: .8rem;
            }
            p {
              line-height: .66rem;
            }
            span {
              line-height: .7rem;
            }
          }
        }
      }
    }
    nav {
      flex: 0 0 auto;
      box-sizing: border-box;
      padding: 10px 0 8px;
      display: flex;
      justify-content: space-around;
      font-size: 14px;
      background: white;
      span {
        line-height: 20px;
        padding: 2px;
        border-bottom: 3px solid white;
        &.active {
          color: $mainBgColor;
          border-color: $mainBgColor;
        }
      }
    }
    section {
      flex-grow: 1;
      overflow-y: scroll;
    }
    .shop-section {
      text-align: left;
      display: flex;
      padding-bottom: 40px;
      background: 3px solid #eee;
      .wrapper-left,
      .wrapper-right {
        overflow-y: scroll;
      }
      .wrapper-right {
        flex-grow: 1;
      }
      .menu-left {
        box-sizing: border-box;
        width: 90px;
        font-size: 14px;
        color: #666;
        li {
          position: relative;
          padding: 20px 10px;
          border-left: 3px solid #eee;
          border-bottom: 1px solid #ddd;
          &.active {
            background: white;
            font-weight: bold;
            border-left: 3px solid $mainBgColor;
          }
          img {
            width: .3rem;
            height: .36rem;
            margin-right: 6px;
          }
          i {
            position: absolute;
            right: 0;
            top: 0;
            display: inline-block;
            min-width: 20px;
            height: 20px;
            line-height: 20px;
            transform: scale(.9);
            text-align: center;
            border-radius: 50%;
            background: red;
            color: white;
          }
        }
      }
      .menu-right {
        li {
          h2 {
            line-height: 46px;
            padding-left: 10px;
            color: #999;
            .big-font {
              color: #666;
              padding-right: 10px;
              font-size: 16px;
              font-weight: bold;
            }
          }
          &>div {
            display: flex;
            padding: 14px 10px 6px;
            background: white;
            border-bottom: 1px solid #f6f6f6;
            img {
              width: 1.4rem;
              height: 1.4rem;
              margin-right: 10px;
            }
            div {
              flex-grow: 1;
              h3 {
                font-size: 16px;
                font-weight: bold;
                line-height: 28px;
              }
              p {
                color: #999;
                line-height: 18px;
              }
              h4 {
                padding: 5px 0;
                i:nth-of-type(1) {
                  padding-right: 6px;
                }
              }
              h5 {
                padding: 4px 0;
                i {
                  padding: 0 2px;
                  color: #f60;
                  border: 1px solid #f60;
                  border-radius: 10px;
                }
              }
              h6 {
                position: relative;
                padding: 6px 0;
                &>i {
                  color: #f60;
                  font-weight: bold;
                  font-size: 16px;
                }
                &>div {
                  display: inline;
                }
              }
            }
          }
        }
      }
    }
    footer {
      position: absolute;
      z-index: 1;
      display: flex;
      align-items: stretch;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 46px;
      font-size: 14px;
      background: #333;
      color: white;
      &.active {
        .footer-right {
          background: #3190E8;
        }
        .footer-left>div {
          background: $mainBgColor;
        }
      }
      .footer-left {
        flex-grow: 1;
        .iconfont {
          position: relative;
          em {
            position: absolute;
            right: -10px;
            top: -10px;
            display: inline-block;
            min-width: 16px;
            min-height: 16px;
            line-height: 16px;
            text-align: center;
            font-size: 12px;
            padding: 2px;
            color: white;
            font-size: 12px;
            border-radius: 50%;
            background-color: red;
          }
        }
        &>div {
          position: absolute;
          padding: 5px;
          border-radius: 50%;
          background: #333;
          border: 4px solid #444;
          left: 10px;
          bottom: 10px;
          i {
            font-size: 34px;
          }
        }
        p {
          height: 100%;
          padding-left: 78px;
          display: flex;
          flex-flow: column;
          text-align: left;
          justify-content: center;
          i:nth-of-type(1) {
            font-size: 18px;
            font-weight: bold;
          }
          i:nth-of-type(2) {
            font-size: 12px;
          }
        }
      }
      .footer-right {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 112px;
        font-size: 16px;
        font-weight: bold;
        background: #555;
      }
    }
    .self-rate {
      display: flex;
      padding: 15px 0;
      background: white;
      border-top: 1px solid #ddd;
      .self-left {
        width: 140px;
        padding: 0 12px;
        h1 {
          font-size: 28px;
          color: #FF6600;
        }
        h4 {
          font-size: 14px;
          line-height: 22px;
          color: #666;
        }
        h5 {
          font-size: 12px;
          line-height: 20px;
          color: #999;
        }
      }
      .self-right {
        flex-grow: 1;
        text-align: left;
        p {
          padding: 2px 0;
          font-size: 14px;
          color: #666;
          line-height: 20px;
          .score {
            color: #FF6600;
          }
        }
      }
    }
    .ratings {
      border-top: 1px solid #ddd;
      background: white;
      .rate-menu {
        padding: 10px 12px;
        overflow: hidden;
        li {
          float: left;
          padding: 6px 8px;
          margin-right: 8px;
          margin-bottom: 8px;
          font-size: 14px;
          border-radius: 4px;
          background: #EBF5FF;
          color: #666;
          &.active {
            color: white;
            background: #3190E8;
          }
        }
      }
      .rate-list {
        li {
          display: flex;
          padding: 12px;
          border-top: 1px solid #ddd;
          font-size: 13px;
          text-align: left;
          color: #666;
          img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
          }
          div {
            flex-grow: 1;
            padding-right: 12px;
            p {
              line-height: 22px;
              .username {
                font-size: 14px;
              }
              .right {
                float: right;
                color: #999;
              }
              img {
                width: 68px;
                height: 68px;
              }
              .border-1 {
                display: inline-block;
                box-sizing: border-box;
                width: 50px;
                height: 22px;
                line-height: 22px;
                margin-top: 4px;
                padding: 0 4px;
                border: 1px solid #aaa;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                border-radius: 4px;
                margin-right: 6px;
                color: #aaa;
              }
            }
          }
        }
      }
    }
    .move-dot {
      position: fixed;
      // z-index: 200;
      i {
        position: relative;
        top: 0;
        left: 0;
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: $mainBgColor;
      }
    }
    .fade-enter-active,
    .fade-leave {
      transition: opacity .5s;
    }
    .fade-enter,
    .fade-leave-active {
      opacity: 0;
    }
    .fade-leave,
    .fade-leave-active {
      display: none;
    }
  }
</style>