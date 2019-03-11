<template>
  <div @click="goShop" class="list-item">
    <img :src="item.image_path" alt="">
    <div>
      <div class="high-height">
        <p class="big-font"><i class="bg-brand">品牌</i><i>{{item.name}}</i></p>
        <p class="supports">
          <i v-for="(i,k) in item.supports" :key="'s-'+k" :style="i.icon_color|str">
            {{i.icon_name}}
            </i>
        </p>
      </div>
      <div>
        <p class="light-color">
          <star :num="item.rating"></star><i>月售{{item.recent_order_num}}单</i></p>
        <p class="delivery"><i>{{item.delivery_mode.text}}</i></p>
      </div>
      <div>
        <p class="light-color"><i>￥{{item.float_minimum_order_amount}}起送</i> / <i>配送费约￥{{item.float_delivery_fee}}</i></p>
        <p class="distance"><i>{{item.distance}}</i> / <i class="lead-time">{{item.order_lead_time}}</i></p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import star from './star'
  
  export default {
    props: ['item'],
    components: {
      star
    },
    methods: {
      goShop() {
        let id = this.item.id
        // this.$emit('goShop');
        this.$router.push({
          path: '/shop',
          query: {
            id
          }
        });
      }
    },
    filters: {
      str(color){
        return 'color:#'+color+';border:1px solid #'+color;
      }
    }
  }
</script>

<style lang="scss">
@import '../../static/style/variable';

  .list-item {
    display: flex;
    padding: 20px 15px;
    border-bottom: 1px solid #eee;
    &>div {
      flex-grow: 1;
      overflow: hidden;
      &>div {
        display: flex;
        justify-content: space-between;
        align-items: top;
          height: .7rem;
        &:nth-last-of-type(1){
          height: auto;
        }
        p {
          font-size: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &.big-font {
            font-size: 14px;
            font-weight: bold;
          }
          .bg-brand {
            display: inline-block;
            margin-right: 6px;
            background-color: #ffd930;
            padding: 0px 4px;
            border-radius: 2px;
            font-size: 14px;
          }
          &.supports i{
            display: inline-block;
            margin-left: 4px;
            padding: 1px;
            border: 1px solid #999;
            color: #999;
            transform: scale(.88);
          }
          &.delivery i{
            padding: 2px 4px;
            color: #fff;
            background: $mainBgColor;
          }
          &.distance{
            color: #999;
            .lead-time{
              color: $mainBgColor;
            }
          }
          &.light-color {
            color: #666;
            font-size: 12px;
          }
        }
      }
    }
    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: .3rem;
      border: 1px solid red;
    }
  }
</style>
