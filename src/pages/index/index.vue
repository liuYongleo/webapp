<template>
  <div class="container">
    <loading v-if="loading"></loading>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(item,key) in carousel" :key="'s-'+key" class="swiper-slide">
          <div v-for="(i,k) in item" :key="'i-'+k" @click="goFood(i)">
            <img :src="i.image_url" alt="">
            <p>{{i.title}}</p>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div>
      <foodlist v-for="(item,key) in restaurants" :key="'f-'+key" :item="item"></foodlist>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import foodlist from '../../components/foodList'
  const carousel = require('../../../static/server/carousel.json')
  const restaurants = require('../../../static/server/restaurants.json')
  
  import loading from '../../components/loading';
  
  export default {
    data() {
      return {
        carousel: [carousel.slice(0, 8), carousel.slice(8, 16)],
        restaurants,
        loading: true
      }
    },
    components: {
      foodlist: foodlist,
      loading
    },
    mounted() {
      this.timeout = setTimeout(() => {
        this.loading = false;
        clearTimeout(this.timeout);
        this.timeout = null;
      }, 800)
      new Swiper('.swiper-container', {
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        }
      })
    },
    computed: {
  
    },
    methods: {
      goFood(item) {
        let query = this.$route.query;
        this.$router.push({
          path: '/food',
          query: {
            headMsg: query.headMsg,
            foodId: item.id,
            title: item.title
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .swiper-container {
    width: 100%;
    height: auto;
    padding-bottom: 16px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
    .swiper-slide {
      div {
        display: inline-block;
        width: 2.5rem;
        float: left;
        padding: 6px 0;
        text-align: center;
        font-size: 13px;
        transition: all .1 linear;
        &:active {
          background: #eee;
        }
        img {
          width: 1.3rem;
        }
      }
    }
  }
  
  .container {
    &>div {
      background: white;
      box-shadow: 0 0 2px #ddd;
    }
  }
</style>