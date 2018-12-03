<template>
  <div class="update">
      <header_-gray back='true' headerTitle="修改地址">
        <span class="saveAddress extend-click" @click="updateAddress">保存</span>
      </header_-gray>
      <div class="main">
        <table width="100%">
          <tr>
            <th>联系人</th>
            <td><input type="text" placeholder="收货人姓名" v-model="name"></td>
          </tr>
          <tr>
            <th>&nbsp;&nbsp;</th>
            <td class="sex">
              <span @click="sex=0" :class="{checked: sex===0}">先生</span>
              <span @click="sex=1" :class="{checked: sex===1}">女士</span>
            </td>
            <!--  -->
          </tr>
          <tr>
            <th>手机号码</th>
            <td><input type="tel" v-model="phone" class="phone" placeholder="鲜蜂侠联系您的电话"></td>
          </tr>
          <tr>
            <th>所在城市</th>
            <td>
              <select @change="bindChange" :value="selectedCity">
                <option value="请选择城市">请选择城市</option>
                <option v-for="item in city" :key="item.cityName">{{item.cityName}}</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>所在地区</th>
            <td>
              <input type="text" placeholder="请选择您的住宅小区,大厦或学校" 
              @click.prevent="selectSite" :value="selectedSite">
            </td>
          </tr>
          <tr>
            <th>详细地址</th>
            <td><input type="text" placeholder="请输入楼号门牌号等详细信息" v-model="detail"></td>
          </tr>
        </table>
        <div class="subAddress" @click="subAddress">删除地址</div>
      </div>
  </div>
</template>
<script>
import Header_Gray from "@/components/Header_Gray/Header_Gray.vue"
export default {
  components: {
      Header_Gray
  },
  data () {
    return {
      city: this.$store.state.city,
      sex: this.$store.state.selectedAddress.sex,
      detail: this.$store.state.selectedAddress.detail,
      phone: this.$store.state.selectedAddress.phone,
      name: this.$store.state.selectedAddress.name
    }
  },
  computed: {
    selectedAddress () {
      return this.$store.state.selectedAddress
    },
    selectedCity () {
      return this.$store.state.selectedCity
    },
    selectedSite () {
      return this.$store.state.selectedSite
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    bindChange () {
      this.$store.commit("CHANGE_SELECTED_CITY",event.target.value)
    },
    selectSite () {
      if(this.selectedCity === '') {
        this.$msg('提示','请选择城市')
      }else{
        this.$router.push("/select-site")
      }
    },
    updateAddress () {
      if (!(this.selectedAddress.name === '' || this.sex === '' 
      || this.selectedAddress.phone === '' || this.selectedCity === '' 
      || this.selectedSite === '' || this.selectedAddress.detail === '')) {
        let addObj = {
          id: this.selectedAddress.id,
          userId: this.user.id,
          name: this.name,
          sex: this.sex,
          phone: this.phone,
          city: this.selectedCity,
          site: this.selectedSite,
          detail: this.detail,
          x: this.selectedAddress.x,
          y: this.selectedAddress.y,
          selectedADD: this.selectedAddress.selectedADD
        }
        this.$store.dispatch("updateAddress",addObj).then(res => {
          this.$msg('提示',res.msg).then(action => {
            this.$router.push("/address")
          })
        })
      }
    },
    subAddress () {
      let id = this.selectedAddress.id
      this.$store.dispatch("subAddress",id).then(res => {
        this.$msg('提示',res.msg).then(action => {
          this.$router.push("/address")
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../styles/var.less");
@import url("../../styles/base.less");
@import url("../../styles/mixin.less");
.update{
  font-size: 1.4rem;
}
.saveAddress{
  position: absolute;
  display: inline-block;
  right: .6rem;
  text-align: center;
  color: #777;
  top: 0;
  height: 4.4rem;
  line-height: 4.5rem;
  width: 6rem;
  font-size: 1.4rem;
}
.main{
  bottom: 0;
}
table{
  background-color: #ffffff;
  tr{
    border-top: 1px solid @border-color;
    th{
      width: 7rem;
      font-weight: 400;
      text-align: left;
      padding: 1rem 0 1rem 1.5rem;
    }
  }
}
input,select{
  border: none;
  font-size: 1.4rem;
}
select{
  width: 70%;
}
.subAddress{
  margin-top: 1rem;
  width: 100%;
  height: 4.5rem;
  line-height: 4.5rem;
  text-align: center;
  background-color: #fff;
}
.sex{
  span:before{
    content: '';
    padding: .6rem;
    display: inline-block;
    border:1px solid #bdbdbdbd;
    border-radius: 50%;
    margin-right: .5rem;
    vertical-align: middle;
    text-align: center;
    background: center center no-repeat #fff;
    background-size: .7rem;
  }
  span{
    padding-right: 1rem;
  }
}
</style>

