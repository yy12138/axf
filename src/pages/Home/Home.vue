<template>
  <div class="home">
      <header_-yellow/>
      <div class="main">
        <div class="bannar">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in bannars" :key="item.id">
              <img v-lazy="item.bannar_imgs">
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <ul>
          <li class="categoryProducts-wrap" v-for="(item,index) in computedCategories" :key="item.id">
            <div class="category-title-wrap">
              <h2 class="category-title" :style="{color: item.color,'border-color': item.color}">{{item.name}}</h2>
              <a href="javascript:void(0)">更多&nbsp;&gt;</a>
            </div>
            <div class="category-img">
              <img v-lazy="item.category_img">
            </div>
            <ul class="products-cids">
              <li class="product-cids-item"
               v-for="(product,ind) in computedCategories[index].products" :key="product.id"
               v-if="ind < 3" @click="toDetail(product.id)">
                <div class="category-padding">
                  <img v-lazy="product.imgs.min" :ref="'home' + product.id">
                  <p class="product-title">{{product.name}}</p>
                  <div class="product-retails-wrap">
                    <div class="product-retails">
                      <p>{{product.unit}}ml</p>
                      <p class="red">￥{{product.price}}</p>
                    </div>
                    <div class="red btn" @click.stop="addToCarts(product)">+</div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import Header_Yellow from "@/components/Header_Yellow/Header_Yellow.vue"
import api from "@/Api/api.js"
export default {
  created() {
    this.$http.get(api.host + "/bannar").then(res => (this.bannars = res.data))
  },
  data() {
    return {
      bannars: [],
      products: this.$store.state.products,
      categories: this.$store.state.categories
    }
  },
  components: {
    Header_Yellow
  },
  computed: {
    computedCategories () {
      return this.$store.getters.computedCategories
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    //添加商品至购物车
    addToCarts (product) {
      if (this.user.id) {
        //已登录 添加数据至数据库购物车以及vuex中的购物车
        this.$store.dispatch("addToCarts",product)
        .then(res => {
          // this.$msg('提示',res.msg)
          //获取点击对象所对应图片的位置信息
          let pos = this.$refs['home' + product.id][0].getBoundingClientRect()
          let cartPos = this.$store.state.cartPos
          let obj = {
            src: product.imgs.min,
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
@import url("../../styles/base.less");
.bannar {
  height: 14rem;
  img {
    width: 100%;
  }
}
.categoryProducts-wrap {
  background-color: #fff;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
.category-title-wrap {
    height: 4rem;
    overflow: hidden;
    .category-title {
      float: left;
      color: #e80013;
      border-color: #e80013;
      border-left: 0.8rem solid;
      font-weight: 700;
      padding: 0.2rem 0 0 0.6rem;
      margin: 1.3rem 0 0 3%;
      font-size: 1.4rem;
      line-height: 1;
    }
    a {
      float: right;
      color: @color-text-gray;
      line-height: 4rem;
      padding-right: 1.5rem;
    }
  }
.product-retails-wrap {
  position: relative;
  height: 5rem;
  .product-retails {
    float: left;
    color: @color-text-gray;
  }
}
.category-img {
    text-align: center;
    img {
      width: 94%;
      margin-bottom: 0.5rem;
      border-radius: 20rem;
    }
  }
.products-cids {
  overflow: hidden;
}
.product-cids-item {
    width: 33.33%;
    padding-top: .5rem;
    margin-bottom: .5rem;
    border-right: 1px solid @border-color;
    overflow: hidden;
    float: left;
    box-sizing: border-box;
    &:nth-child(3n+3){
      border-right: none;
    }
    .category-padding {
      padding: 0 0.5rem;
      box-sizing: border-box;
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
.product-title {
  color: #232b33;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 1.6rem;
}
.btn {
  position: absolute;
  top: 5%;
  left: 65%;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid #ffbe89;
  border-radius: 50%;
  text-align: center;
  line-height: 2.6rem;
  font-weight: 700;
  font-size: 1.6rem;
}
.red {
  color: @color-text;
}
</style>


