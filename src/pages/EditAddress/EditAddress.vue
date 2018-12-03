<template>
  <div class="edit_site">
      <header_-gray back='true' headerTitle="添加地址">
        <span class="extend-click saveAddress" @click="addAddress">保存</span>
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
          </tr>
          <tr>
            <th>手机号码</th>
            <td><input type="tel" v-model="phone" class="phone" placeholder="鲜蜂侠联系您的电话"></td>
          </tr>
          <tr>
            <th>所在城市</th>
            <td>
              <select @change="bindChange" :value="selectedCity">
                <option value="">请选择城市</option>
                <option v-for="item in city" :key="item.cityName" :value="item.cityName">{{item.cityName}}</option>
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
      </div>
  </div>
</template>
<script>
import Header_Gray from "@/components/Header_Gray/Header_Gray.vue"
export default {
  components: {
      Header_Gray
  },
  /* created () {
    this.$store.state.selectedCity = ''
    this.$store.state.selectedSite = ''
  }, */
  computed: {
    selectedCity () {
      return this.$store.state.selectedCity
    },
    selectedSite () {
      return this.$store.state.selectedSite
    },
    centerX () {
      return this.$store.state.centerX
    },
    centerY () {
      return this.$store.state.centerY
    }
  },
  data () {
    return {
      phone: '',
      city: this.$store.state.city,
      sex: '',
      name: '',
      detail: '',
      user: this.$store.state.user
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
    addAddress () {
      if(this.user.id){
        if(!(this.name === '' || this.sex === '' 
        || this.phone === '' || this.selectedCity === '' 
        || this.selectedSite === '' || this.detail === '')){
          let addObj = {
            userId: this.user.id,
            name: this.name,
            sex: this.sex,
            phone: this.phone,
            city: this.selectedCity,
            site: this.selectedSite,
            detail: this.detail,
            selectedADD: true,
            x: this.centerX,
            y: this.centerY
          }
          this.$store.dispatch("addAddress",addObj).then(res => {
            this.$msg('提示',res.msg).then(action => {
              this.$router.push('/address')
            })
          })
        }else {
          this.$msg('提示','未完成资料的填写')
        }
      }else{
        this.$msg('提示','未登录,请登录').then(action => {
          this.$router.push("/login")
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../styles/var.less");
@import url("../../styles/base.less");
@import url("../../styles/mixin.less");
.edit_site{
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
  width: 100%;
}
select{
  width: 70%;
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

