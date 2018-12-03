<template>
  <div class="cart">
      <header_-gray headerTitle='购物车'/>
      <div class="main" v-if="cartsLength >= 1 && addressLength >= 1">
        <table width='100%' class="addr_table">
          <tr>
            <th width="28%">收<span class="hidden">a</span>货<span class="hidden">a</span> 人</th>
            <td>{{selectedADD.name}} {{sex}}</td>
            <router-link rowspan="3" class="updateAddr" width="17%" tag="td" to="/address">修改</router-link>
          </tr>
          <tr>
            <th width="28%">电<span class="hidden">电话</span>话</th>
            <td>{{selectedADD.phone}}</td>
          </tr>
          <tr>
            <th width="28%">收货地址</th>
            <td class="addressC" width="55%">{{selectedADD.city}}{{selectedADD.site}}<span class="hidden">a</span>{{selectedADD.detail}}</td>
          </tr>
        </table>
        <div class="cart_body">
          <div class="add_item">
            <span>闪送超市</span>
            <div class="btn_add">凑单专区</div>
            <p>¥0起送，22:00前满¥30免运费，22:00后满¥50免运费</p>
          </div>
          <div class="get_time">
            收货时间<span class="hidden">收</span><span class="sooner">30分钟送达</span><span class="updateAddr book">可预定</span>
          </div>
          <div class="remark">
            收货备注
            <div class="remark_detail">
              <input type="text" placeholder="可输入100字以内特殊要求内容">
            </div>
          </div>
          <table class="carts_list">
            <tr v-for="item in carts" :key="item.id" @click="toDetail(item.product_id)">
              <td class="select wid" :class="{active: item.cartSelected}" 
              @click.stop="selectedCart(item)"></td>
              <td class="wid">
                <img v-lazy="item.img">
              </td>
              <td class="cart_del">
                <div>{{item.name}}</div>
                <div class="cart_unit">¥{{item.price}}
                  <div class="numChange">
                    <span class="change" @click.stop="subCart(item)">-</span><span class="num">{{item.num}}</span><span class="change" @click.stop="addCart(item)">+</span>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="selected" v-if="cartsLength >= 1 && addressLength >= 1">
        <span class="allSelected" :class="{active: allSelected}" 
        @click="selectedAll">全选</span><span class="hidden">全选</span>共 : <span class="total">¥ {{total.toFixed(2)}}</span>
        <div class="count">选好了</div>
      </div>
      <!-- 购物车为空 -->
      <div class="emptyCarts" v-if="cartsLength < 1 && addressLength >= 1">
        <div class="empty_notice">
          <div class="empty_icon">
            亲&nbsp;,&nbsp;购物车空空的耶~
          </div>
        </div>
        <div class="goShopping">
          <router-link to="/home" tag="span">去逛逛</router-link>
        </div>
      </div>
      <!-- 地址为空 -->
      <div class="emptyAddress" v-if="addressLength < 1">
        <div class="empty_notice">
          <div class="empty_icon">
            定位失败&nbsp;,&nbsp;请手动选择地址
          </div>
        </div>
        <div class="goShopping">
          <router-link to="/address" tag="span">换个地址试试</router-link>
        </div>
      </div>
  </div>
</template>
<script>
import Header_Gray from "@/components/Header_Gray/Header_Gray.vue"
export default {
  components: {
    Header_Gray
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    carts () {
      return this.$store.state.carts
    },
    cartsLength () {
      return this.$store.getters.cartsLength
    },
    total () {
      return this.$store.getters.total
    },
    allSelected () {
      let selected = true
      for(let i = 0; i< this.carts.length;i++){
        if(!this.carts[i].cartSelected) {
          selected = false
        }
      }
      return selected
    },
    addressLength () {
      return this.$store.getters.addressLength
    },
    selectedADD () {
      return this.$store.getters.selectedADD
    },
    sex () {
      let selectedADD = this.$store.getters.selectedADD
      if(selectedADD.sex === 0){
        return '先生'
      }else {
        return '女士'
      }
    }
  },
  created () {
    if (this.user.id) {
        //已登录 添加数据至数据库购物车以及vuex中的购物车
    }else {
      //未登录
      this.$msg("提示","未登录,请登录")
      .then(action => {
        this.$router.push("/login")
      })
    }
  },
  methods: {
    //全选或全不选
    selectedAll () {
      // 同样需要操作本地vuex和数据库的购物车商品选中状态
      if(this.allSelected){
        this.$store.dispatch("selectedAll",false)
      }else{
        this.$store.dispatch("selectedAll",true)
      }
      
    },
    selectedCart (cart) {
      //对数据库以及本地的购物车商品选中状态做出相应的改变
      let cartSelected = cart.cartSelected
      if(cartSelected){
        this.$store.dispatch("selectedCart",{
          cartSelected:false,
          cartId: cart.id
        })
      }else{
        this.$store.dispatch("selectedCart",{
          cartSelected:true,
          cartId: cart.id
        })
      }
    },
    subCart (cart) {
      let num = cart.num
      if(num === 1){
        this.$store.dispatch("cutCart",cart)
      }else{
        num--
        this.$store.dispatch("updateCart",{
          num:num,
          id:cart.id
        })
      }
    },
    addCart (cart) {
      let num = cart.num
      num++
      this.$store.dispatch("updateCart",{
        num: num,
        id:cart.id
      })
    },
    //去商品详情页
    toDetail (id) {
      this.$router.push("/product-detail/" + id)
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../styles/var.less");
.main{
  font-size: 1.4rem;
  position: absolute;
  bottom: 10rem;
  overflow-y: scroll;
}
//地址栏 开始
table{
  border-collapse: collapse;
  border-spacing: 0;
  background-color: #ffffff;
}
.addr_table{
  line-height: 1.4rem;
  background-image: url("./images/cart-bg.png");
  background-position: left bottom,left top;
  background-size: auto .3rem;
  background-repeat: repeat-x;
  margin-bottom: 1rem;
  th{
    padding: .7rem 1rem .7rem 1.5rem;
    font-weight: 400;
    text-align: left;
    vertical-align: baseline;
  }
}
.hidden{
  visibility: hidden;
}
.updateAddr{
  padding: .7rem 0;
  background-image: url("./images/cart-more.png");
  background-repeat: no-repeat;
  background-position: right center;
  background-size: auto 1rem;
}
//地址栏结束
/* 闪送超市凑单专区 开始 */
.cart_body{
  background-color: #ffffff;
  width: 100%;
}
.add_item{
  padding:.2rem 1.4rem;
  color: @color-text-gray;
  height: 4.8rem;
  font-size: 1.2rem;
  line-height: 2rem;
  position: relative;
  border-bottom: 1px solid @border-color;
  >span:before{
    display: inline-block;
    content: '';
    height: 1.2rem;
    width: .4rem;
    background-color: @color-background;
    margin-right: .5rem;
    vertical-align: -.1rem;
    border-radius: .2rem;
  }
  >p{
    line-height: 1.2rem;
    position: absolute;
    bottom: .2rem;
  }
}
.btn_add{
  position: absolute;
  right: 1.4rem;
  top: .5rem;
  width: 7rem;
  height: 2.4rem;
  line-height: 2.4rem;
  border: 1px solid #ff3800;
  text-align: center;
  border-radius: 1.2rem;
  color:#e64f1a;
}
/* 闪送超市凑单专区 结束 */
/* 收货时间 开始 */
.get_time{
  padding-left: 1.4rem;
  line-height: 5rem;
  position: relative;
  border-bottom: 1px solid @border-color;
}
.sooner{
  color: #e64f1a;
}
.book{
  position: absolute;
  right: .4rem;
  top: .2rem;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 2.3rem;
}
/* 收货时间 结束 */
/* 收货备注 开始 */
.remark{
  line-height: 5rem;
  border-bottom: 1px solid @border-color;
  padding-left: 1.4rem;
  position: relative;
}
.remark_detail{
  position: absolute;
  left: 8rem;
  right: 2.2rem;
  top: 0;
  bottom: 0;
  line-height: 5rem;
  input{
    width: 100%;
    height: 3.2rem;
    border:1px solid #cecece;
    text-indent: .5rem;
    border-radius: .5rem;
    font: 400 13.3333px Arial;
  }
}
/* 收货备注 结束 */
/* 购物车列表 开始 */
.carts_list{
  width: 100%;
  color: #333;
  tr{
    line-height: 4rem;
    border-bottom: 1px solid #e0e0e0;
  }
}
.select{
  background-image: url("./images/checkbox.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 1.8rem 1.8rem;
}
.select.active{
  background-image: url("./images/checkbox-selectd.png")
}
.wid{
  width: 5rem;
  img{
    width: 100%;
  }
}
.cart_del{
  padding-left: 1.4rem;
}
.cart_unit{
  position: relative;
  height: 5rem;
  line-height: 5rem;
}
.numChange{
  width: 10rem;
  position: absolute;
  right: 0;
  top: 0;
}
.change{
  display: inline-block;
  width: 2.6rem;
  height: 2.6rem;
  border:1px solid #ffbe89;
  border-radius: 50%;
  text-align: center;
  color: @color-text;
  line-height: 2.6rem;
  font-weight: 700;
  font-size: 1.7rem;
}
.num{
  margin:auto .7rem;
}
/* 购物车列表 结束 */
/* 计价 开始 */
.selected {
  padding-left: 1.4rem;
  line-height: 5rem;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  position: fixed;
  bottom: 4.9rem;
  right: 0;
  left: 0;
  overflow: hidden;
  font-size: 1.4rem;
}
.allSelected{
  display: inline-block;
  min-width: 5rem;
  padding-left: 2.5rem;
  background-image: url("./images/checkbox.png");
  background-position: left center;
  background-repeat: no-repeat;
  background-size: 1.8rem 1.8rem;
}
.allSelected.active{
  background-image: url("./images/checkbox-selectd.png")
}
.count{
  width: 10rem;
  background-color: @color-background;
  float: right;
  text-align: center;
}
.total{
  color: #e64f1a;
}
/* 计价 结束 */
//购物车为空
.emptyCarts,.emptyAddress {
  position: absolute;
  top: 4.5rem;
  bottom: 4.9rem;
  left: 0;
  right: 0;
  background-color: #efefef;
  font-size: 1.4rem;
  text-align: center;
}
.empty_notice{
  color: @color-text-gray;
  padding-top: 20%;
  text-align: center;
  line-height: 4rem;
}
.empty_icon{
  padding-top: 8rem;
  background-image: url("./images/empty_address.png");
  background-position: center top;
  background-size: 8rem 8rem;
  background-repeat: no-repeat;
}
.goShopping{
  color:@color-text-gray;
  line-height: 4rem;
  span{
    padding: .4rem 3rem;
    border:1px solid @border-color;
  }
}
.addressC{
  overflow: hidden;
  white-space: inherit;
  text-overflow: ellipsis;
}
</style>


