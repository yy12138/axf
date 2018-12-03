<template>
  <div class="login">
      <header_-gray headerTitle="验证手机" back="true"/>
      <div class="main">
          <div class="message" :class="{active:messageBol}">
              <p>为了方便您及时查询订单信息，鲜蜂侠需要验证您的手机号为查询帐号</p>
          </div>
          <div class="phoneNumber">
              <input type="tel" placeholder="手机号码" @focus="messageHidden" @blur="messageShow"
              v-model="tel">
          </div>
          <div class="sure" @click="login">确定</div>
      </div>
  </div>
</template>
<script>
import Header_Gray from "@/components/Header_Gray/Header_Gray.vue";
export default {
    data () {
        return {
            messageBol: false,
            tel: ''
        }
    },
    components: {
        Header_Gray
    },
    methods: {
        messageHidden () {
            this.messageBol = true
        },
        messageShow () {
            this.messageBol = false
        },
        login () {
            let tel = this.tel
            let reg = /^1[34578]\d{9}$/g
            if(reg.test(tel)){
                let that = this
                async function vertify() {
                    let res = await that.$store.dispatch("vertifyUser",{
                        "phone": tel
                    })
                    let action = await that.$msg("提示", res.msg)
                    that.$router.push("/home")
                }
                vertify()
            } else {
                this.$msg('提示','输入的手机号码格式错误,请重新输入')
            }
            this.tel = ''
        }
    }
}
</script>
<style lang="less" scoped>
@import url("../../styles/var.less");
.main{
    bottom: 0;
    font-size: 1.4rem;
}
.message{
    height: 6.9rem;
    background-color: @color-background;
    background-image: url("./images/pic.png");
    background-position: 1rem bottom;
    background-repeat: no-repeat;
    background-size: auto 85%;
    position: relative;
    overflow: hidden;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    p{
        position: absolute;
        right: 0;
        width: 62%;
        font-size: 1.2rem;
        line-height: 1.5rem;
        color: #000;
        top: 1.7rem;
    }
}
.message.active{
    height: 0;
}
.phoneNumber{
    border-bottom: 1px solid #e0e0e0;
    background-color: #fff;
    padding-left: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    input{
        border: none;
        background-color: transparent;
        vertical-align: middle;
        font-size: 100%;
    }
}
.sure{
    margin: 2rem .6rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    font-size: 1.6rem;
    background-color: @color-background;
    border-radius: .5rem;
    color: #000;
}
</style>


