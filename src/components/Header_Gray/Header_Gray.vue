<template>
    <header>
        <div class="header-gray">
            <span v-if="back=='true'" class="back_icon extend-click" @click="goBack"></span>
            {{headerTitle}}
            <slot></slot>
        </div>
    </header>
</template>
<script>
export default {
    props: ['headerTitle','back'],
    methods: {
      goBack () {
          this.$router.go(-1)
      }
  }
}
</script>
<style lang="less" scoped>
header{
    position: relative;
    height: 4.5rem;
    line-height: 4.5rem;
    background-color: #f9fafd;
    border-bottom: 1px solid #e0e0e0;
    left: 0;
    right: 0;
}
.header-gray{
    text-align: center;
    font-weight: 700;
    font-size: 1.4rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;
    left: 0;
    right: 0;
    height: 4.5rem;
}
.back_icon{
    position: absolute;
    left: .6rem;
    text-align: left;
    top: 0;
    width: 6rem;
    height: 4.4rem;
    background:url("./images/header-icon.png") left center no-repeat;
    background-size: auto 2.5rem;
}
</style>

