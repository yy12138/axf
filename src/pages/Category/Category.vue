<template>
  <div class="category">
      <header_-yellow/>
      <div class="main" @click="changeCidsShow">
        <div class="main-container">
          <!-- 分类显示列表 开始 -->
          <div class="categories_wrap">
            <ul>
              <li class="category-item" v-for="(item,index) in categories" :key="item.id"
              @click="changeActiveCategory(index)">
                <var :class="{active: activeCategory === index}"></var><span>{{item.name}}</span></li>
            </ul>
          </div>
          <!-- 分类显示列表 结束 -->
          <!-- 商品显示列表 开始-->
          <div class="products-wrap-right">
            <div class="products_container">
              <!-- 子分类 开始-->
              <ul class="select_cids_wrap">
                <li :class="{active: activeAll}" @click.stop="changeAllShow">全部分类</li>
                <li :class="{active: activeSort}" @click.stop="changeSortShow">综合排序</li>
              </ul>
              <!-- 子分类 结束-->
              <!-- 子分类的隐藏或显示的部分 开始-->
              <div class="select_cids" :style="{height: activeHeight}">
                <ul class="cids_wrap" v-show="activeAll">
                  <li @click="changeCidsIndex('all')" :class="{active: activeCidsCategory === 'all'}">全部分类</li>
                  <li :class="{active: activeCidsCategory === index1}" 
                  v-for="(cid,index1) in categories[activeCategory].cids" :key="index1"
                  @click="changeCidsIndex(index1)">{{cid.name}}</li>
                </ul>
                <ul class="cids_wrap" v-show="activeSort">
                  <li :class="{active: activeSortCid === '综合排序'}"
                  @click="changeSortCid('综合排序')">综合排序</li>
                  <li :class="{active: activeSortCid === '价格最高'}"
                  @click="changeSortCid('价格最高')">价格最高</li>
                  <li :class="{active: activeSortCid === '价格最低'}"
                  @click="changeSortCid('价格最低')">价格最低</li>
                </ul>
              </div>
              <!-- 子分类的隐藏或显示的部分 结束-->
              <ul class="product_items_wrap">
                <li class="products_items" v-for="product_cids in computedSort" :key="product_cids.id" @click="toDetail(product_cids.id)">
                  <dl>
                    <dt>
                      <img v-lazy="product_cids.imgs.min" :ref="'pro' + product_cids.id">
                    </dt>
                    <dd class="title">{{product_cids.name}}</dd>
                    <dd class="retail">
                      <div class="unit">{{product_cids.unit}}ml</div>
                      <div class="price red">￥{{product_cids.price}}</div>
                    </dd>
                    <div class="subNum" v-if="product_cids.num > 0">
                      <span class="subCarts red" @click.stop="subToCarts(product_cids)">-</span><span class="num">{{product_cids.num}}</span>
                    </div>
                    <dd class="addCarts red" @click.stop="addToCarts(product_cids)">+</dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品显示列表 结束-->
        </div>
      </div>
  </div>
</template>
<script>
import Header_Yellow from "@/components/Header_Yellow/Header_Yellow.vue"
export default {
  components: {
    Header_Yellow
  },
  data () {
    return {
      activeCategory: 0,
      activeCidsCategory: 'all',
      activeAll: false,
      activeSort: false,
      activeSortCid: '综合排序',
      products: '',
      categories: this.$store.state.categories
    }
  },
  computed: {
    computedCategories () {
      let categories = this.$store.getters.computedCategories
      return categories
    },
    //蒙版
    activeHeight () {
      if (this.activeAll || this.activeSort){
        return '100%'
      }else{
        return '0'
      }
    },
    //子分类商品列表
    computedC () {
      let newComputedCategories = Object.assign([],this.computedCategories[this.activeCategory].products)
      if (this.activeCidsCategory === 'all') {
        return newComputedCategories
      } else {
        return newComputedCategories.filter(item => item.cidIndex === Number(this.activeCidsCategory))
      }
    },
    //排序
    computedSort () {
      let newComputedC = Object.assign([],this.computedC)
      if (this.activeSortCid === '综合排序') {
        return newComputedC
      } else if (this.activeSortCid === '价格最低') {
        return newComputedC.sort((a,b) => a.price - b.price)
      } else {
        return newComputedC.sort((a,b) => b.price - a.price)
      }
    },
    //用户信息
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    //购物车数量--
    subToCarts (product) {
      this.$store.dispatch("subToCarts",product).then(res => {
        this.$msg('提示',res.msg)
      })
    },
    //用户状态确认
    addToCarts (product) {
      if (this.user.id) {
        //已登录 添加数据至数据库购物车以及vuex中的购物车
         this.$store.dispatch("addToCarts",product)
        .then(res => {
          // this.$msg('提示',res.msg)
          let pos = this.$refs['pro' + product.id][0].getBoundingClientRect()
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
    changeActiveCategory (index) {
      this.activeCategory = index;
      this.activeCidsCategory = 'all'
      this.activeSortCid = '综合排序'
    },
    //分类的激活
    changeCidsIndex (name) {
      this.activeCidsCategory = name
    },
    //子分类的显示隐藏
    changeAllShow () {
      this.activeAll = !this.activeAll
      this.activeSort = false
    },
    //排序的显示隐藏
    changeSortShow () {
      this.activeSort = !this.activeSort
      this.activeAll = false
    },
    //排序方式的激活状态
    changeSortCid (text) {
      this.activeSortCid = text
    },
    //点击任何地方子分类隐藏
    changeCidsShow () {
      this.activeAll = false
      this.activeSort = false
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
.main-container {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  color: #6d6d6d;
  overflow: hidden;
}
//分类列表
.categories_wrap {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 23.75%;
  background-color: #f8f8f8;
}
//大分类项目
.category-item {
  position: relative;
  box-sizing: border-box;
  line-height: 4rem;
  color: #6d6d6d;
  border-bottom: 1px solid @border-color;
  text-align: center;
  font-size: 1.2rem;
  var{
    position: absolute;
    width: 0;
    height: 3.5rem;
    left: 0;
    top: 5%;
    border-left: .4rem solid;
    border-color: transparent;
  }
  var.active{
    border-color: @color-background;
  }
}
//商品列表
.products-wrap-right {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;
  left: 23.75%;
}
.products_container {
  position: absolute;
  left: 1.25%;
  top: 0;
  right: 0;
  bottom: 0;
}
.select_cids_wrap {
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  overflow: hidden;
  border-bottom: 1px solid @border-color;
  background-color: rgba(255,255,255,.95)
}
.select_cids_wrap li {
  float: left;
  width: 50%;
  text-align: center;
  font-size: 1.2rem;
  position: relative;
  &:after{
    content: '';
    background-image: url("./images/icon-down.png");
    display: inline-block;
    width: 1.2rem;
    height: 4rem;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 1rem;
    vertical-align: top;
    -webkit-transition: 0.5s ease;
    -o-transition: 0.5s ease;
    transition: 0.5s ease;
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  &:nth-child(2):before{
    display: block;
    content: '';
    width: 1px;
    height: 46%;
    position: absolute;
    background-color: #ddd;
    top: 27%;
  }
}
.select_cids_wrap li.active {
  &:after{
    -webkit-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
  }
}
.select_cids {
  // height: 100%;
  background-color: rgba(0, 0, 0, .18);
  position: relative;
  z-index: 10;
}
.cids_wrap {
  padding-bottom: 1rem;
  background-color: rgba(255, 255, 255, .95);
  font-size: 1.2rem;
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  > li{
    float: left;
    border: 1px solid @border-color;
    padding: .4rem .8rem;
    margin-left: .8rem;
    margin-top: .8rem;
    border-radius: .5rem;
  }
  > li.active{
    border-color: #ffd600;
    background-color: #fff9d9;
  }
}
//闪送超市的商品列表
.product_items_wrap {
  position: absolute;
  top: 4rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
}
.products_items {
  box-sizing: border-box;
  padding: .5rem;
  font-size: 1.2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid @border-color;
  dl {
    position: relative;
    overflow: hidden;
    width: 100%;
    dt {
      float: left;
      width: 8rem;
      img {
        width: 100%;
      }
    }
  }
}
dd {
  position: absolute;
  left: 9rem;
  right: 0;
}
.title {
  color: #000;
  top:0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.retail {
  top:4rem;
  color:@color-text-gray;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.red {
  color: @color-text;
}
.addCarts {
  position: absolute;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid #ffbe89;
  border-radius: 50%;
  text-align: center;
  line-height: 2.6rem;
  bottom: 10px;
  right: 0;
  left: 80%;
  font-size: 1.7rem;
  font-weight: 700;
}
.subNum{
  position: absolute;
  bottom: 8px;
  left: 60%;
}
.subCarts{
  display: inline-block;
  width: 2.6rem;
  height: 2.6rem;
  text-align: center;
  font-size: 1.7rem;
  font-weight: 700;
  border:1px solid #ffbe89;
  border-radius: 50%;
  line-height: 2.6rem;
  
}
.num{
  display: inline-block;
  width: 2rem;
  height: 2.6rem;
  line-height: 2.6rem;
  text-align: center;
}
</style>
