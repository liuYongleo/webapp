<template>
  <div class="swiper-container" :style="'height:'+height">
    <div class="swiper-wrapper">
      <div v-for="item in list" class="swiper-slide">{{item.text}}</div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from "swiper"
import "swiper/dist/css/swiper.min.css"

export default {
  props: ['list', 'height'],
  mounted: function(){
    this.$nextTick(()=>{
      let swiper = new Swiper('.swiper-container', {
        autoplay: {
          delay: 20000,
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
        },
        slidesPerView: 4,
        slidesPerColumn: 2,
        slidesPerGroup: 1,
      })
    })
  }
};
</script>

<style lang="scss" scoped>
  .swiper-container{
    width: 100%;
    height: 200px;
    .swiper-slide{
      background: #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>