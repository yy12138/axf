<template>
  <div class="select_site">
      <header_-gray back='true'>
        <div class="inputAdd_wrap"> 
          <input type="text" placeholder="请输入地址" class="inputAdd" v-model="searchKey" @input="search">
        </div>
      </header_-gray>
      <div class="main">
        <div style="width:100%;height:21rem;border:#ccc solid 1px;font-size:12px" id="map"></div>
        <ul>
          <li class="address_item" v-for="item in sites" :key="item.uid" @click="changeSelectedSite(item)">
            <div class="site" :class="{active: selectedSite === item.name}">{{item.name}}</div>
            <p>{{item.address}}</p>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import _ from "underscore"
let ak = 'VM1vQhGjq8KwvOPgI5WSM3NWPCaLNksa'//密钥
/* 
http://api.map.baidu.com/place/v2/search?query=ATM机&region=北京&output=json&ak=您的ak //GET请求
*/
import Header_Gray from "@/components/Header_Gray/Header_Gray.vue"
export default {
  components: {
      Header_Gray
  },
  computed: {
    seletedCity () {
      return this.$store.state.selectedCity
    },
    centerX () {
      for(let i = 0;i < this.city.length;i++){
        if(this.seletedCity === this.city[i].cityName){
          return this.city[i].centerX
        }
      }
    },
    centerY () {
      for(let i = 0;i < this.city.length;i++){
        if(this.seletedCity === this.city[i].cityName){
          return this.city[i].centerY
        }
      }
    },
    selectedSite () {
      let selectedSite = this.$store.state.selectedSite
      if(selectedSite === '') {
        for(let i = 0; i< this.city.length;i++){
          if(this.seletedCity === this.city[i].cityName){
            let siteName = this.city[i].siteName
            this.$store.commit("SAVE_SELECTED_SITE",siteName)
            return siteName
            break
          }
        }
      }else {
        return selectedSite
      }
      return this.$store.state.selectedSite
    }
  },
  data () {
    return {
      city: this.$store.state.city,
      sites: [],
      searchKey: ''
    }
  },
  mounted () {
    //获取列表
    let that = this
    this.$http.get('/baidu-api//place/v2/search?query='+ this.selectedSite + '&region='+ this.seletedCity +'&output=json&ak=' + ak)
    .then(res => {
      this.sites = []
      this.sites = res.data.results
      console.log(this.sites)
    })
    //创建和初始化地图函数：
    function initMap(){
      createMap();//创建地图
      setMapEvent();//设置地图事件
      addMapControl();//向地图添加控件
      addMapOverlay();//向地图添加覆盖物
    }
    function createMap(){ 
      map = new BMap.Map("map"); 
      map.centerAndZoom(new BMap.Point(that.centerX,that.centerY),15);
    }
    function setMapEvent(){
      map.enableScrollWheelZoom();
      map.enableKeyboard();
      map.enableDragging();
      map.enableDoubleClickZoom()
    }
    function addClickHandler(target,window){
      target.addEventListener("click",function(){
        target.openInfoWindow(window);
      });
    }
    function addMapOverlay(){
      var markers = [
        {content:"我的备注",title:that.selectedSite,imageOffset: {width:-46,height:-21},position:{lat:that.centerY,lng:that.centerX}}
      ];
      for(var index = 0; index < markers.length; index++ ){
        var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
        var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
          imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
        })});
        var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
        var opts = {
          width: 200,
          title: markers[index].title,
          enableMessage: false
        };
        var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
        marker.setLabel(label);
        addClickHandler(marker,infoWindow);
        map.addOverlay(marker);
      };
    }
    //向地图添加控件
    function addMapControl(){
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
      map.addControl(navControl);
    }
    var map;
    initMap();
  },
  methods: {
    changeSelectedSite (item) {
      this.$store.commit('CHANGE_SELECTED_SITE',item)
      this.$msg('提示','选择地址成功').then(action => {
        this.$router.go(-1)
      })
    },
    search: _.debounce(function (e) {
      var input = e.target.value
      this.$http.get(`/baidu-api/place/v2/search?query=${input}&region=${this.seletedCity}&output=json&ak=${ak}`)
      .then(res => {
        this.sites = res.data.results
      })
    },300)
  }
}
</script>
<style lang="less" scoped>
@import url("../../styles/var.less");
.main{
  bottom: 0;
  overflow-y: scroll;
}
ul{
  overflow-y: scroll;
}
.inputAdd_wrap{
  position: absolute;
  left: 6rem;
  right: 6rem;
  top: .9rem;
  border:1px solid @border-color;
  padding-left: 2.4rem;
  height: 2.6rem;
  line-height: 2.6rem;
  border-radius: .3rem;
  background-image: url("./images/search.png");
  background-position: .6rem center;
  background-repeat: no-repeat;
  background-size: 1.3rem;
}
.inputAdd{
  border: none;
  font-size: 1.4rem;
  background-color: transparent;
}
.address_item{
  padding: .5rem 0 .5rem 1.5rem;
  background-color: #fff;
  border-bottom: 1px solid @border-color;
  font-size: 1.4rem;
  color:@color-text-gray;
  line-height: 3rem;
}
.site{
  color: @color-text-light-black;
}
.site.active{
  color: @color-text;
  padding-left: 1.6rem;
  background-image: url("./images/pois.png");
  background-position: left center;
  background-size: auto 60%;
  background-repeat: no-repeat;
}
</style>

