<template>
  <div class="address">
      <header_-gray back='true' headerTitle="选择地址"/>
      <div class="main">
          <ul class="address_list" v-if="addressLength >= 1">
              <li class="address_item" v-for="item in address" :key="item.id" :class="{active: item.selectedADD}"
              @click="changeSelectedADD(item)">
                  <div class="address_details">
                      <div class="phone">{{item.name}}&nbsp;&nbsp;{{item.phone}}</div>
                      <div class="site">{{item.city}}{{item.site}}&nbsp;&nbsp;{{item.detail}}</div>
                  </div>
                  <div class="updataAddress" @click.stop="updateAddress(item)"></div>
              </li>
          </ul>
          <div class="no_address" v-if="addressLength < 1">
              <div class="address_icon"></div><br />您还没有地址哦~
          </div>
      </div>
      <div class="addAddress">
          <router-link tag="span" to="/edit-address">+&nbsp;新增地址</router-link>
      </div>
  </div>
</template>
<script>
import Header_Gray from "@/components/Header_Gray/Header_Gray.vue"
export default {
    data () {
        return {}
    },
    components: {
        Header_Gray
    },
    computed: {
        addressLength () {
            return this.$store.getters.addressLength
        },
        address () {
            return this.$store.state.address
        },
        user () {
            return this.$store.state.user
        }
    },
    created () {
        if(this.user.id){
            //获取相应地址
        }else{
            this.$msg('提示','未登录,请登录').then(action => {
                this.$router.push("/login")
            })
        }
    },
    methods: {
        updateAddress (item) {
            this.$router.push("/update-address")
            this.$store.commit("SAVE_SELECTED_ADDRESS",item)
        },
        changeSelectedADD (item) {
            this.$store.dispatch("changeSelectedADD",item).then(res => {
                this.$router.push("/cart")
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import url("../../styles/var.less");
.main{
    padding-top: 1rem;
    font-size: 1.4rem;
}
.addAddress{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
    font-size: 1.4rem;
    span{
        background-color: @color-background;
        padding:.9rem 6rem;
        border-radius: .5rem;
    }
}
.address_item {
    background-color: #fff;
    margin-bottom:.2rem;
    height: 8rem;
    position: relative;
}
.address_item.active{
    &::before{
        content: '';
        position: absolute;
        display: block;
        width: .5rem;
        top: .5rem;
        left: 0;
        bottom: .5rem;
        height: 7rem;
        background-color: @color-background;
    }
}
.address_details{
    line-height: 2.8rem;
    padding-left: 1.5rem;
    margin-right: 8rem;
    position: relative;
    top: 1.2rem;
    border-right: 1px solid @border-color;
}
.site{
    color: @color-text-gray;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.phone{
    color:@color-text-light-black;
}
.updataAddress {
    position: absolute;
    background-image: url("./images/update.png");
    width: 8rem;
    height: 5.2rem;
    top: 1.5rem;
    right: 0;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 2.2rem;
}
.no_address{
    padding-top: 18%;
    text-align: center;
    line-height: 4rem;
    color:@color-text-gray;
}
.address_icon{
    display: inline-block;
    width: 8rem;
    height: 8rem;
    background-image: url("./images/empty_addrlist.png");
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
}
</style>

