<template>
  <transition name="slide">
    <div class="container">
      <header>
        <span @click="hide" class="active left">&lt; 返回</span>
        <h1>商家详情</h1>
      </header>
      <div>
        <ul class="activity">
          <li>活动与属性</li>
          <li v-for="(i,k) in item.activities" :key="'a-'+k">
            <i>{{i.icon_name}}</i><i>{{i.description}}</i>
          </li>
          <li v-for="(i,k) in item.supports" :key="'s-'+k">
            <i>{{i.icon_name}}</i><i>{{i.description}}</i>
          </li>
        </ul>
        <ul>
          <li @click="toggleSafe" class="flex"><i>食品监督安全公示</i> <i>&gt;</i> </li>
          <li>
            <p>
              监督检查结果： <span>良好</span> <br>
              检查日期： <span>2019/03/04</span>
            </p>
          </li>
        </ul>
        <ul>
          <li>商家信息</li>
          <li>
            <p>{{item.name}}</p>
            <p>地址：{{item.address}}</p>
            <p>营业时间：{{'['+item.opening_hours+']'}}</p>
            <p class="flex"><i>营业执照</i><i>&gt;</i></p>
            <p class="flex"><i>餐饮服务许可证</i><i>&gt;</i></p>
          </li>
        </ul>
      </div>
      <router-view></router-view>
    <!-- <safe v-show="safe" @hide="toggleSafe" :item="item"></safe> -->
    </div>
  </transition>
</template>

<script>
  const shop = require('../../../../static/server/shop.json');
  export default {
    data(){
      return {
        safe: false,
        item: shop
      }
    },
    methods: {
      hide() {
        this.$router.go(-1);
        // this.$emit('hide');
      },
      toggleSafe(){
        this.$router.push({
          path: '/shop/detail/safe'
        });
        // this.safe = !this.safe;
      }
    },
    mounted() {
      console.log('detail mounted');
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../../../static/style/variable';
  .container {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #eee;
    header {
      position: absolute;
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
    &>div {
      box-sizing: border-box;
      height: 100%;
      overflow-y: scroll;
    }
    .activity{
      padding-top: 1.2rem;
      li{
        padding: 10px 12px;
      }
    }
    ul {
      background: #eee;
      border-top: 10px solid #eee;
      text-align: left;
      .flex{
        display: flex;
        justify-content: space-between;
        &:active{
          background: #eee;
        }
      }
      li {
        background: #fafafa;
        padding-left: 12px;
        font-size: 12px;
        color: #555;
        &:nth-of-type(1) {
          color: #333;
          padding: 12px;
          font-size: 16px;
          border-bottom: 1px solid #eee;
        }
        p {
          padding: 12px 12px 12px 0;
          line-height: 22px;
          border-bottom: 1px solid #eee;
          font-size: 14px;
          span{
            color: $mainBgColor;
          }
        }
      }
    }
  }
</style>