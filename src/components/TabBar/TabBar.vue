<template>
  <nav class="tab_bar">
      <router-link to="/home" class="home"><span></span>首页</router-link>
      <router-link to="/category" class="current"><span></span>闪送超市</router-link>
      <router-link to="/cart" class="cart" ref="cartEl"><span></span>购物车
        <div class="cartsLength" v-if="cartsLength > 0" :class="{'active': tabBarActive}">{{cartsLength}}</div>
      </router-link>
      <router-link to="/mine" class="mine"><span></span>我的</router-link>
  </nav>
</template>
<script>
export default {
  data () {
    return {
      tabBarActive: false
    }
  },
  mounted () {
    //获取cart标签的位置
    let cartPos = this.$refs.cartEl.$el.getBoundingClientRect()
    this.$store.commit("CART_POS",cartPos)
  },
  computed: {
    cartsLength () {
      return this.$store.getters.cartsLength
    },
    cartPos () {
      return this.$store.state.cartPos
    },
    tabBarShow () {
      return this.$store.state.tabBarShow
    }
  },
  watch: {
    cartsLength () {
      this.tabBarActive = true
      setTimeout(() => {
        this.tabBarActive = false
      }, 300)
    },
    tabBarShow () {
      // 监听tabBarShow的变化,如果为true了的话就获取位置信息
      if (!this.cartPos.width) {
        let cartPos = this.$refs.cartEl.$el.getBoundingClientRect()
        this.$store.commit('CART_POS', cartPos)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../styles/mixin.less");
@import url("../../styles/var.less");
nav{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 5rem;
  background-color: rgba(245,245,245,0.9);
  display: flex;
  a{
    flex: 1;
    height: 4rem;
    padding-top: 1rem;
    text-align: center;
    color: #777;
    position: relative;
    span{
      display: block;
      width: 100%;
      height: 2rem;
      background-size: auto 2rem;
      background-position: center 0;
      margin-bottom: .5rem;
      background-repeat: no-repeat;
    }
  }
}
nav>a.home>span{
  background-image: url("./images/home.png");
}
nav>a.current>span{
  background-image: url("./images/current.png");
}
nav>a.cart>span{
  background-image: url("./images/cart.png");
}
nav>a.mine>span{
  background-image: url("./images/mine.png");
}
@-webkit-keyframes navs{
  0%{
    -webkit-background-size: auto .6rem;
    background-size: auto .6rem;
  }
  20%{
    -webkit-background-size: auto 2.2rem;
    background-size: auto 2.2rem;
  }
  40%{
    -webkit-background-size: auto 1.8rem;
    background-size: auto 1.8rem;
  }
  60%{
    -webkit-background-size: auto 2.06rem;
    background-size: auto 2.06rem;
  }
  80%{
    -webkit-background-size: auto 1.94rem;
    background-size: auto 1.94rem;
  }
  100%{
    -webkit-background-size: auto 2rem;
    background-size: auto 2rem;
  }
}
@keyframes navs{
  0%{
    -webkit-background-size: auto .6rem;
    background-size: auto .6rem;
  }
  20%{
    -webkit-background-size: auto 2.2rem;
    background-size: auto 2.2rem;
  }
  40%{
    -webkit-background-size: auto 1.8rem;
    background-size: auto 1.8rem;
  }
  60%{
    -webkit-background-size: auto 2.06rem;
    background-size: auto 2.06rem;
  }
  80%{
    -webkit-background-size: auto 1.94rem;
    background-size: auto 1.94rem;
  }
  100%{
    -webkit-background-size: auto 2rem;
    background-size: auto 2rem;
  }
}
nav>a.home.router-link-exact-active>span{
  background-image: url("./images/home-active.png");
}
nav>a.current.router-link-exact-active>span{
  background-image: url("./images/current-active.png");
}
nav>a.cart.router-link-exact-active>span{
  background-image: url("./images/cart-active.png");
}
nav>a.mine.router-link-exact-active>span{
  background-image: url("./images/mine-active.png");
}
nav>a.router-link-exact-active>span{
  animation: navs 1s;
}
.cartsLength{
    position: absolute;
    z-index: 4;
    right: 1rem;
    top: .7rem;
    background-color: @color-text;
    text-align: center;
    color: #fff;
    width: 1.8rem;
    line-height: 1.8rem;
    border-radius: 50%;
}
nav>a.cart>div.active{
  .scale(1.5)
}
</style>

