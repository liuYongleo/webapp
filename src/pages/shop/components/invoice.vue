<template>
  <div class="invoice">
    <shop-header :title="title"></shop-header>
    <div>
      <span>不需要开发票</span>
      <span @click="select" class="iconfont icon-checked" :class="{active:checked}"></span>
    </div>
    <p><button @click="submit" class="button-full">确定</button></p>  
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
        title: '选择发票抬头',
        checked: false
      }
    },
    methods: {
      select(key, k){
        this.checked = !this.checked;
      },
      submit(){
        setTimeout(()=>{
          this.$router.go(-1);
        },500)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../static/style/variable';
  .invoice {
    text-align: center;
    background-color: #F5F5F5;
    &>div{
      &:nth-of-type(1){
        margin-top: 45px;
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      margin: 10px 0;
    color: #666;
      background-color: white;
      .iconfont{
        font-size: 18px;
        color: #999;
        &.active{
          color: $mainBgColor;
        }
      }
    }
    &>p{
      padding: 0 12px;
    }
  }
</style>
