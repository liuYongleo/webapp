<template>
  <transition name="fade-act">
    <div class="container">
      <div>
        <h1>{{item.name}}</h1>
        <h3><span>优惠信息</span></h3>
        <ul>
          <li v-for="i in item.activities">
            <i>{{i.icon_name}}</i><span>{{i.description}}</span>
          </li>
        </ul>
        <h3><span>商家公告</span></h3>
        <p>{{item.promotion_info}}</p>
      </div>
      <h6><span class="close" @click="hide">X</span></h6>
    </div>
  </transition>
</template>

<script>
  export default {
    props: ['item'],
    methods: {
      hide() {
        this.$emit('hide');
      }
    },
    mounted() {
  
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #222;
    color: #eee;
    &>div {
      box-sizing: border-box;
      height: 100%;
      overflow-y: scroll;
    }
    h1 {
      padding-top: 1rem;
      padding-bottom: 1.6rem;
      font-size: 20px;
    }
    h3 span {
      // line-height: 16px;
      padding: 6px 10px;
      line-height: 12px;
      border: 1px solid #666;
      border-radius: 14px;
    }
    ul,
    p {
      margin: 30px 0;
    }
    li,
    p {
      text-align: left;
      padding: 0 30px;
      line-height: 22px;
    }
    h6 {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 10px 0 20px 0;
      background: #222;
      .close {
        margin-left: -14px;
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        color: #999999;
        font-size: 22px;
        border-radius: 50%;
        border: 1px solid #666;
      }
    }
    .fade-act-enter-active,
    .fade-act-leave-active {
      transition: all .3s linear;
      display: block;
    }
    .fade-act-enter,
    .fade-act-leave-active {
      display: block;
      opacity: 0;
    }
  }
</style>