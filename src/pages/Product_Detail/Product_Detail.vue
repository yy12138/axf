<template>
  <div class="product_detail">
      <header_-gray back="true" :headerTitle="product.name+product.unit"/>
      <div class="main">
          <div class="bannarImg">
              <div class="Img">
                  <img v-lazy="product.imgs.max" ref="bigImg">
              </div>
              <p>{{product.name}}{{product.unit}}ml</p>
              <div class="price">
                <span>￥{{product.price}}</span>
              </div>
          </div>
          <table width="100%" class="detail">
              <caption>---- 商品详情 ----</caption>
              <tr>
                  <th>品牌</th>
                  <td>{{product.brand}}</td>
              </tr>
              <tr>
                  <th>产品规格</th>
                  <td>{{product.unit}}ml</td>
              </tr>
          </table>
          <div class="axf"></div>
      </div>
      <div class="carts" ref="cartBtn">
          <div class="cartsLength" v-if="cartsLength > 0">{{cartsLength}}</div>
      </div>
      <footer>
          <span class="favorite" :class="{active: product.favorited}" @click="favorite">收藏</span>
          <span class="addProduct">添加商品:</span>
          <span class="changeNum" @click="subToCarts">-</span>
          <span>{{product.num}}</span>
          <span class="changeNum" @click="addToCarts">+</span>
      </footer>
  </div>
</template>
<script>
import Header_Gray from "@/components/Header_Gray/Header_Gray.vue";
export default {
  components: {
      Header_Gray
  },
  data () {
      return {
          product: {}
      }
  },
  computed: {
      user () {
          return this.$store.state.user
      },
      cartsLength () {
          return this.$store.getters.cartsLength
      },
      computedCategories () {
          return this.$store.getters.computedCategories
      },
      favorites () {
          return this.$store.state.favorites
      }
  },
  created () {
      let id = this.$route.params.id;
      label:
      for(let i = 0;i < this.computedCategories.length;i++){
          let products = this.computedCategories[i].products
          for(let j = 0; j < products.length;j++){
              if(Number(id) === products[j].id){
                  this.product = products[j]
                  break label
              }
          }
      }
  },
  methods: {
    //商品收藏
    favorite () {
        if(this.user.id){
            //已登录 添加商品收藏
            if(this.product.favorited){
                //已收藏 取消收藏
                let id
                this.product.favorited = false
                for(let i = 0;i < this.favorites.length;i++){
                    if(this.favorites[i].product_id === this.product.id){
                        id = this.favorites[i].id
                        break
                    }
                }
                this.$store.dispatch("favorite",id).then(res => {
                    this.$msg('提示',res.msg)
                })
            }else{
                //未收藏 添加收藏
                let productObj = {
                    name: this.product.name,
                    unit: this.product.unit,
                    price: this.product.price,
                    img: this.product.imgs.min,
                    userId: this.user.id,
                    product_id: this.product.id,
                    favorited: true,
                    checked: false
                }
                this.$store.dispatch("favorited",productObj).then(res => {
                    this.$msg('提示',res.msg)
                })
            }
        }else{
            this.$msg('提示','未登录,请登录').then(action => {
                this.$router.push("/login")
            })
        }
    },
    subToCarts () {
        if (this.user.id) {
            //已登录 添加数据至数据库购物车以及vuex中的购物车
            this.$store.dispatch("subToCarts",this.product)
            .then(res => {
            this.$msg('提示',res.msg)
            })
        }else{
            //未登录
            this.$msg("提示","未登录,请登录")
            .then(action => {
            this.$router.push("/login")
            })
        }
    },
    addToCarts () {
        if (this.user.id) {
            //已登录 添加数据至数据库购物车以及vuex中的购物车
            let product = this.product
            this.$store.dispatch("addToCarts",product)
            .then(res => {
            // this.$msg('提示',res.msg)
                let pos = this.$refs.bigImg.getBoundingClientRect()
                let cartPos = this.$refs.cartBtn.getBoundingClientRect()
                let obj = {
                    src: product.imgs.max,
                    width: pos.width,
                    height: pos.height,
                    start: {
                        left: pos.left,
                        top: pos.top
                    },
                    end: {
                        left: cartPos.left,
                        top: cartPos.top
                    }
                }
                this.$addCart(obj)
            })
        }else{
            //未登录
            this.$msg("提示","未登录,请登录")
            .then(action => {
            this.$router.push("/login")
            })
        }
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../styles/var.less");
.product_detail{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}
.main{
    bottom: 5rem;
    font-size: 1.4rem;
}
footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5rem; 
    line-height: 5rem;
    border-top: 1px solid @border-color;
    font-size: 1.4rem;
    color: @color-text-light-black;
}
.changeNum {
    width: 2.6rem;
    height: 2.6rem;
    display: inline-block;
    border-radius: 50%;
    color: @color-text;
    border: 1px solid @border-color;
    text-align: center;
    line-height: 2.6rem;
    font-weight: 700;
    margin: 0 .3rem;
    font-size: 1.8rem;
}
.favorite{
    padding-top: 1.8rem;
    width: 4rem;
    font-size: 1rem;
    background-image: url("./images/favor.png");
    background-position: center top;
    background-size: 1.8rem auto;
    text-align: center;
    display: inline-block;
    background-repeat: no-repeat;
    line-height: 1.8rem;
    position: relative;
    top: .6rem;
}
.favorite.active{
    background-image: url("./images/favor-select.png")
}
.addProduct{
    margin-right: 1rem;
}
.carts{
    width: 5.4rem;
    height: 5.4rem;
    position: absolute;
    right: .6rem;
    bottom: .7rem;
    border-radius: 50%;
    background-color: @color-background;
    z-index: 3;
    background-image: url("./images/cart-btn.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 80%;
}
.cartsLength{
    position: absolute;
    z-index: 4;
    right: 0;
    top: 0;
    background-color: @color-text;
    text-align: center;
    color: #fff;
    width: 1.8rem;
    line-height: 1.8rem;
    border-radius: 50%;
}
.bannarImg{
    margin-bottom: .5rem;
    background-color: #fff;
    text-align: center;
    font-size: 2.3rem;
    >p{
        color: #292d33;
    }
    
}
.price{
    padding: 1rem 0 3rem 0;
    >span{
        color: @color-text;
        line-height: 2.9rem;
        font-weight: 700;
    }
}
.Img{
    padding: 1rem;
    img{
        padding: 2rem;
        border: 1px solid @border-color;
    }
}
caption{
    background-color: #fff;
    text-align: center;
    line-height: 6rem;
}
.detail{
    background-color: #fff;
    margin-bottom: .5rem;
    th{
        width: 30%;
        padding-left: 1.7rem;
        color: @color-text-gray;
    }
    th,td{
        height: 3rem;
        line-height: 3rem;
    }
}
.axf{
    width: 100%;
    height: 28rem;
    background-image: url("./images/productDetailDefault.jpg");
    background-size: 100% auto;
    margin-bottom: .5rem;
    background-color: #fff;
}
</style>


