export default {
    GET_PRODUCTS (state,data) {
        state.products = data
    },
    GET_CATEGORIES (state,data) { 
        state.categories = data
    },
    GET_CITY (state,data) {
        state.city = data
    },
    //注册用户
    ADD_USER (state,data) {
        state.user = data
    },
    //登录并加载购物车至本地购物车
    ADD_CARTS (state,data) {
        state.carts = data
    },
    //加载地址
    ADD_ADDRESS (state,data) {
        state.address = data
    },
    //添加商品对象至本地购物车
    ADD_TO_CARTS (state,data) {
        state.carts.push(data)
    },
    //更新商品数量
    UPDATE_CARTS (state,data) {
        for(let i = 0; i < state.carts.length;i++){
            if(state.carts[i].id === data.id){
                state.carts[i].num = data.num
                break
            }
        }
    },
    //selectedALL 全选 全不选
    SELECTED_ALL(state, obj) {
        state.carts[obj.index].cartSelected = obj.allSelected
    },
    //商品的单选状态
    SELECTED_CART (state,cartObj) {
        for(let i = 0; i < state.carts.length;i++){
            if(cartObj.cartId === state.carts[i].id){
                state.carts[i].cartSelected = cartObj.cartSelected
                break
            }
        }
    },
    //删除购物车商品
    DELETE_CART (state,id) {
        for (let i = 0; i < state.carts.length;i++){
            if (id === state.carts[i].id){
                state.carts.splice(i,1)
                break
            }
        }
    },
    //所选城市
    CHANGE_SELECTED_CITY (state,value) {
        state.selectedCity = value
    },
    SAVE_SELECTED_SITE (state,siteName) {
        state.selectedSite = siteName
    },
    CHANGE_SELECTED_SITE (state,item) {
        state.selectedSite = item.name
        state.centerX = item.location.lng
        state.centerY = item.location.lat
    },
    //添加地址
    ADD_ADDRESS (state,addObj) {
        state.address.push(addObj)
        state.selectedCity = ''
        state.selectedSite = ''
        state.centerX = 0
        state.centerY = 0
    },
    //
    SAVE_ADDRESS (state,data) {
        state.address = data
    },
    //change selectedADD false
    CHANGE_SELECTEDADD (state,id) {
        for(let i = 0;i < state.address.length;i++){
            if(id === state.address[i].id){
                state.address[i].selectedADD = false
                break
            }
        }
    },
    CHANGE_SELECTEDADD_TRUE (state,id) {
        for (let i = 0; i < state.address.length; i++) {
            if (id === state.address[i].id) {
                state.address[i].selectedADD = true
                break
            }
        }
    },
    SAVE_SELECTED_ADDRESS (state,address) {
        state.selectedAddress = address
        state.selectedCity = address.city
        state.selectedSite = address.site
        state.centerX = address.x
        state.centerY = address.y
    },
    //修改地址
    UPDATE_ADDRESS (state,data) {
        for(let i = 0; i < state.address.length;i++){
            if(data.id === state.address[i].id){
                state.address[i] = data
                break
            }
        }
        state.selectedCity = ''
        state.selectedSite = ''
        state.centerX = 0
        state.centerY = 0
    },
    //删除地址
    SUBADDRESS (state,id) {
        for(let i = 0; i< state.address.length;i++){
            if(id === state.address[i].id){
                state.address.splice(i,1)
                break
            }
        }
        state.selectedCity = ''
        state.selectedSite = ''
        state.centerX = 0
        state.centerY = 0
    },
    //退出当前账户
    EXIT_USER (state) {
        state.user = {}
        state.carts = []
        state.address = []
        state.selectedAddress = {}
    },
    //收藏商品
    SAVE_FAVORITES (state,data) {
        state.favorites = data
    },
    //添加收藏
    FAVORITED (state,data) {
        state.favorites.push(data)
    },
    //取消收藏
    FAVORITE (state,id) {
        for(let i = 0; i < state.favorites.length; i++){
            if(id === state.favorites[i].id){
                state.favorites.splice(i,1)
                break
            }
        }
    },
    //收藏列表
    CHANGE_CHECKED_INDEX (state,favorite) {
        for(let i = 0; i < state.favorites.length; i++){
            if (favorite.id === state.favorites[i].id){
                state.favorites[i].checked = !favorite.checked
                break
            }
        }
    },
    //全选中 和 全不选
    CHECKED_ALL_FAVORITE (state,bol) {
        for(let i = 0; i < state.favorites.length; i++){
            state.favorites[i].checked = bol
        }
    },
    CART_POS (state,cartPos) {
        state.cartPos = cartPos
    }
}