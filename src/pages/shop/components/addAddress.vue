<template>
  <div class="addAddress">
    <div class="full-screen">
      <shop-header :title="title"></shop-header>
      <ul>
        <li class="border-special">
          <label for="username">联系人</label>
          <input type="text" id="username" placeholder="您的名字">
        </li>
        <li>
          <label></label>
          <div>
            <span @click="select(0)"><i class="iconfont icon-checked" :class="{active:sex===0}"></i>先生</span>
            <span @click="select(1)"><i class="iconfont icon-checked" :class="{active:sex===1}"></i>女士</span>
          </div>
        </li>
        <li>
          <label for="tel">联系电话</label>
          <input type="text" id="tel" placeholder="您的手机号">
        </li>
        <li class="border-special">
          <label for="addr">送餐地址</label>
          <input type="text" id="addr" placeholder="小区/写字楼/学校等">
        </li>
        <li>
          <label for="addrDetail"></label>
          <input type="text" id="addrDetail" placeholder="详细地址(如门牌号等)">
        </li>
        <li>
          <label for="tag">标签</label>
          <input type="text" id="tag" placeholder="无/家/学校/公司">
        </li>
      </ul>
      <p><button @click="submit" class="button-full">确定</button></p>
    </div>
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
        title: '添加地址',
        sex:0
      }
    },
    methods: {
      select(val){
        this.sex = val;
      },
      submit() {
        setTimeout(() => {
          this.$router.go(-1);
        }, 500)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../static/style/variable';
  .addAddress {
    z-index: 10;
    text-align: center;
    background-color: #F5F5F5;
    .full-screen {
      position: absolute;
      width: 100%;
      height: 100%;
      padding-top: 45px;
      ul {
        background-color: white;
        text-align: left;
        margin-bottom: 16px;
        li {
          display: flex;
          padding: 0 12px;
          line-height: 1.2rem;
          border-bottom: 1px solid #f5f5f5;
          div {
            span {
              padding-right: 12px;
              .iconfont {
                color: #aaa;
                margin-right: 4px;
                &.active{
                  color: $mainBgColor;
                }
              }
            }
          }
          &.border-special {
            border: none;
            input {
              border-bottom: 1px solid #f5f5f5;
            }
          }
          label {
            width: 80px;
            font-size: 14px;
          }
          input {
            flex-grow: 1;
            line-height: 1.2rem;
          }
        }
      }
      &>p {
        padding: 0 12px;
      }
    }
  }
</style>
