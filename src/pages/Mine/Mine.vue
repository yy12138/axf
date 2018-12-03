<template>
  <div class="mine">
      <div class="main">
        <!-- 用户信息 -->
        <div class="userInfo_wrap">
          <div class="userInfo">
            <p class="user_phone">{{user.phone}}&nbsp;</p>
            <p class="level">V0</p>
            <span class="toUserInfo"></span>
          </div>
        </div>
        <div class="favorite">
          <router-link class="favoriterP" tag="div" to="favorite">商品收藏</router-link>
          <div class="favoriterS">店铺收藏</div>
        </div>
        <div class="order_wrap">
          <!-- 我的订单 -->
          <div class="my_order">
            <h2>我的订单<span>查看全部订单<span class="hidden">a</span>></span></h2>
            <div class="order_type">
              <div class="order_pay">待付款</div>
              <div class="order_get">待收货</div>
              <div class="order_comment">待评价</div>
              <div class="order_afterSaleService">退款/售后</div>
            </div>
          </div>
          <!-- 积分商城 -->
          <div class="others">
            <div class="redemption">积分商城</div>
            <div class="voucher">优惠券</div>
            <div class="getAddress">收货地址</div>
            <div class="service">客服/反馈</div>
          </div>
          <div class="about_wrap">
            <div class="about">关于我们</div>
          </div>
          <div class="secede" @click="exitUser">退出当前账号</div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: this.$store.state.user
    }
  },
  created () {
    if(this.user.id){

    }else{
      this.$router.push("/login")
    }
  },
  methods: {
    exitUser () {
      this.$store.commit("EXIT_USER")
      this.$router.push("./home")
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../styles/var.less");
.main{
  top: 0;
  bottom: 4.5rem;
}
.userInfo_wrap{
  position: relative;
  left: 0;
  right: 0;
  height: 10rem;
  padding-left: 9rem;
  background-image: url("./images/head_portrait.png");
  background-color: @color-background;
  background-position: 1.5rem 2rem;
  background-repeat: no-repeat;
  background-size: auto 6rem;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  position: relative;
}
.userInfo{
  padding-top: 2rem;
}
.user_phone{
  font-size: 1.5rem;
  line-height: 1rem;
  margin: .7rem 0;
}
.level{
  font-size: 1rem;
  padding-left: 2.9rem;
  background-image: url("./images/user_level_bg.png");
  background-position: left center;
  background-repeat: no-repeat;
  line-height: 2.8rem;
  background-size: auto 100%;
  color: #e64f1a;
}
.toUserInfo{
  position: absolute;
  right: 2rem;
  display: block;
  width: 1.1rem;
  height: 1.9rem;
  top: 40%;
  background-image: url("./images/user_info_bg.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.favorite{
  position: relative;
  left: 0;
  right: 0;
  height: 3.5rem;
  background-color: #f3c800;
  display: flex; 
  color: #fff;
  font-size: 1.2rem;
  padding: .6rem 0;
  box-sizing: border-box;
  >div{
    flex: 1;
    line-height: 2.3rem;
    padding-left: 7rem;
    background-size: auto 1.8rem;
    background-position: 4rem .2rem;
    background-repeat: no-repeat;
  }
}
.favoriterP{
  border-right: 1px solid #fff;
  background-image: url("./images/favorite.png");
}
.favoriterS{
  background-image: url("./images/shop_favorite.png")
}
//我的订单
.order_wrap{
  position: absolute;
  top: 13.5rem;
  bottom: 0;
  right: 0;
  left: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  font-size: 1.4rem;
  color: @color-text-light-black;
}
.my_order{
  background-color: #fff;
  width: 100%;
  margin: 1rem 0;
  >h2{
    padding-left: 1.5rem;
    padding-top: 1.4rem;
    padding-bottom: 1.4rem;
    border-bottom:1px solid @border-color;
    overflow: hidden;
    >span{
      float: right;
      color: @color-text-gray;
      padding-right: 2.5rem;
    }
  }
}
.order_type{
  display: flex;
  >div{
    flex: 1;
    padding-top: 13%;
    text-align: center;
    font-size: 1.2rem;
    line-height: 3rem;
    background-position: center 40%;
    background-repeat: no-repeat;
    background-size: auto 25%;
  }
}
.order_pay{
  background-image: url("./images/order-type-11.png");
}
.order_get{
  background-image: url("./images/order-type-12.png");
}
.order_comment{
  background-image: url("./images/order-type-13.png");
}
.order_afterSaleService{
  background-image: url("./images/order-type-14.png");
}
.others{
  display: flex;
  background-color: #fff;
  font-size: 1.2rem;
  >div{
    flex: 1;
    text-align: center;
    padding-top: 6rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #efefef;
    background-position: center 3rem;
    background-repeat: no-repeat;
    background-size: 3rem;
  }
}
.about_wrap{
  background-color: #fff;
  font-size: 1.2rem;
  >div{
    width: 25%;
    text-align: center;
    padding-top: 6rem;
    padding-bottom: 2rem;
    background-position: center 3rem;
    background-repeat: no-repeat;
    background-size: 3rem;
  }
}
.redemption{
  background-image: url("./images/mine-item-pointsShop.png");
}
.voucher{
  background-image: url("./images/mine-item-coupon.png");
}
.getAddress{
  background-image: url("./images/mine-item-addrlist.png");
}
.service{
  background-image: url("./images/mine-item-aftersale.png");
}
.about{
  background-image: url("./images/mine-item-about.png");
}
//退出当前账号
.secede{
  height: 4.5rem;
  line-height: 4.5rem;
  margin: 1rem 0;
  margin-top: 3rem;
  background-color: #fff;
  text-align: center;
}
</style>


