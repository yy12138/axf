<template>
  <div id="app">
    <tab-bar v-show="tabBarShow"/>
    <keep-alive>
      <router-view v-if="!$route.meta.notKeepAlive"/>
    </keep-alive>
    <router-view v-if="$route.meta.notKeepAlive"></router-view>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar/TabBar.vue"
import api from "@/Api/api.js"
export default {
  name: 'app',
  data () {
    return {}
  },
  computed: {
    tabBarShow () {
      return this.$store.state.tabBarShow
    }
  },
  components: {
    TabBar
  },
  created () {
    //获取所有商品数据
    this.$store.dispatch("getProducts")
    //获取所有大分类数据
    this.$store.dispatch("getCategories")
    //获取城市数据
    this.$store.dispatch("getCity")
  }
}
</script>
