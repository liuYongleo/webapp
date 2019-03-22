<template>
  <div class="remark">
    <shop-header :title="title"></shop-header>
    <div>
      <h3>快速备注</h3>
      <div class="remark-list">
        <p v-for="(item,key) in remarkJson.remarks" :key="key">
          <span @click="select(key,k)" v-for="(i,k) in item" :key="k" :class="{active:list[key]&&list[key][0] === k}">{{i}}</span>
        </p>
      </div>
    </div>
    <div>
      <h3>其他备注</h3>
      <textarea name="" id="" cols="30" rows="3" placeholder="请输入备注内容(可不填)"></textarea>
    </div>
    <p><button @click="submit" class="button-full">确定</button></p>  
  </div>
</template>

<script>
  import shopHeader from './shopHeader'
  import remarkJson from '../../../../static/server/remark.json'
  const remark = remarkJson.remarks;
  console.log(remarkJson);
  export default {
    components: {
      shopHeader
    },
    data() {
      return {
        remarkJson,
        title: '订单备注',
        list: {}
      }
    },
    methods: {
      select(key, k){
        if(this.list[key]){
          if(this.list[key]['0'] === k){
            return this.$set(this.list[key], '0', undefined);
          }
          this.$set(this.list[key], '0', k);
        }else{
          this.$set(this.list, key, {});
          this.$set(this.list[key], '0', k);
        }
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
  .remark {
    text-align: center;
    background-color: #F5F5F5;
    &>div{
      &:nth-of-type(1){
        margin-top: 45px;
      }
      padding: 12px;
      margin: 10px 0;
      background-color: white;
      h3{
        text-align: left;
        font-size: 14px;
        line-height: .9rem;
      }
      .remark-list{
        overflow: hidden;
        p{
          float: left;
          margin-right: 12px;
          margin-bottom: 10px;
          border: 1px solid $mainBgColor;
          border-radius: 4px;
          span{
            float: left;
            padding: 4px 8px;
            border-right: 1px solid $mainBgColor;
            &:nth-last-of-type(1){
              border: none;
            }
            &.active{
              color: white;
              background-color: $mainBgColor;
            }
          }
        }
      }
      textarea{
        width: 100%;
        padding: 6px 10px;
        font-size: 12px;
        line-height: 20px;
        background-color: #f9f9f9;
        border: 2px solid #f6f6f6;
        border-radius: 4px;
      }
    }
    &>p{
      padding: 0 12px;
    }
  }
</style>
