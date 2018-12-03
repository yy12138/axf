<template>
  <div class="favorite">
      <header_-gray back="true" headerTitle="商品收藏">
          <span class="edit" @click="editM">{{edit}}</span>
      </header_-gray>
      <div class="empty_favorite" v-if="favoriteLength < 1">
          <div class="emptyFavorite"></div>
          还没有收藏商品哦
      </div>
      <div class="main" v-if="favoriteLength >= 1">
          <ul class="favoriteList">
              <li class="favoriteItem" v-for="item in favorites" :key="item.id" @click="toDetail(item.id)">
                  <span class="checked" v-if="hidden" :class="{active: item.checked}" 
                  @click.stop="changeCheckedIndex(item)"></span>
                  <img v-lazy="item.img">
                  <div class="detail">
                      <h3 class="name">{{item.name}}</h3>
                      <div class="unit">
                          <span>{{item.unit}}ml</span><br />
                          <span class="price">¥{{item.price}}</span>
                      </div>
                  </div>
              </li>
          </ul>
          <footer v-if="hidden">
              <span class="allSel" :class="{active: allChecked}" @click="checkedAll">全选</span>
              <div class="delFavorite" @click="subFavorite">删除</div>
          </footer>
      </div>
  </div>
</template>
<script>
import Header_Gray from "@/components/Header_Gray/Header_Gray.vue";
export default {
    data () {
        return {
            hidden: false,
            edit: '编辑'
        }
    },
    components: {
        Header_Gray
    },
    computed: {
        favoriteLength () {
            return this.$store.getters.favoriteLength
        },
        favorites () {
            return this.$store.state.favorites
        },
        allChecked () {
            let favorites = this.favorites
            for(let i = 0; i < favorites.length; i++){
                if(!favorites[i].checked){
                    return false
                    break
                }
            }
            return true
        }
    },
    methods: {
        editM () {
            this.hidden = !this.hidden
            if (this.edit === '编辑') {
                this.edit = '完成'
            } else {
                this.edit = '编辑'
            }
        },
        changeCheckedIndex (favorite) {
            this.$store.commit("CHANGE_CHECKED_INDEX",favorite)
        },
        subFavorite () {
            let favorites = this.favorites
            for (let i = 0; i < favorites.length; i++){
                if (favorites[i].checked){
                    this.$store.dispatch("subFavorite",favorites[i].id)
                }
            }
        },
        checkedAll () {
            if (this.allChecked){
                //全不选
                this.$store.commit("CHECKED_ALL_FAVORITE",false)
            } else {
                //全选
                this.$store.commit("CHECKED_ALL_FAVORITE",true)
            }
        },
        toDetail (id) {
            this.$router.push('/product-detail/' + id)
        }
    }
}
</script>
<style lang="less" scoped>
@import url("../../styles/var.less");
.main{
    bottom: 0;
}
.empty_favorite{
    position: absolute;
    top: 4.5rem;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: @background-color;
    padding-top: 20%;
    text-align: center;
    color: @color-text-gray;
    font-size: 1.4rem;
    line-height: 4rem;
}
.emptyFavorite{
    width: 8rem;
    height: 8rem;
    background-image: url("./images/empty.png");
    background-size: 8rem;
    margin: 0 auto;

}
.edit{
    position: absolute;
    right: .6rem;
    top: 0;
    width: 6rem;
    height: 4.4rem;
    display: block;
    color: #777;
    text-align: center;
}
.favoriteList{
    background-color: #fff;
    padding-left: 1.4rem;
}
.favoriteItem{
    padding: .5rem;
    line-height: 2rem;
    font-size: 1.2rem;
    border-bottom: 1px solid @border-color;
    position: relative;
    height: 6.8rem;
    img{
        position: relative;
        left: 3.5rem;
    }
}
.detail{
    position: absolute;
    text-align: left;
    top: 0;
    left: 11rem;
    right: 0;
    bottom: 0;
}
.checked{
    position: absolute;
    top: 3rem;
    width: 1.8rem;
    height: 1.8rem;
    display: inline-block;
    background-image: url("./images/checkbox.png");
    background-size: 1.8rem 1.8rem;
}
.checked.active{
    background-image: url("./images/checkbox-selectd.png")
}
.unit{
    font-size: 1.2rem;
    line-height: 2rem;
    color: @color-text-gray;
    position: absolute;
    bottom: .5rem;
    left: 0;
    right: 0;
}
.name{
    color: #232b33;
    position: absolute;
    top: .5rem;
    left: 0;
    right: 0;
}
.price{
    color: #ff3800;
}
footer{
    height: 5rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    line-height: 5rem;
    font-size: 1.4rem;
}
.delFavorite{
    position: absolute;
    right: 1.2rem;
    top: .7rem;
    width: 8rem;
    line-height: 3.7rem;
    text-align: center;
    background-color: @color-background;
    border-radius: .5rem;
}
.allSel{
    padding-left: 4.4rem;
    background-image: url("./images/checkbox.png");
    background-repeat: no-repeat;
    background-size: 1.8rem 1.8rem;
    background-position: 1.4rem center;
}
.allSel.active{
    background-image: url("./images/checkbox-selectd.png")
}
</style>


