export default {
    /* computedCategories(state) {
        for (let i = 0; i < state.categories.length; i++) {
            for (let j = 0; j < state.products.length; j++) {
                if (state.products[j].categoryId === state.categories[i].id) {
                    state.categories[i].products.push(state.products[j])
                }
            }
        }
        return state.categories
    }, */
    //计算属性在依赖的数据发生变动是会再次触发一遍
    computedCategories(state){
        let newCategories = state.categories
        let products = state.products
        if(state.userBol){
            state.userBol = false
            for (let i = 0; i < newCategories.length; i++) {
                for (let j = 0; j < products.length; j++) {
                    if (products[j].categoryId === newCategories[i].id) {
                        newCategories[i].products.push(products[j])
                    }
                }
            }
        }
        if (state.user.id) {
            let carts = state.carts
            let favorites = state.favorites
            for (let i = 0; i < carts.length; i++) {
                label:
                for (let j = 0; j < newCategories.length; j++) {
                    let products = newCategories[j].products
                    for(let z = 0; z < products.length;z++){
                        if (carts[i].product_id === products[z].id) {
                            products[z].num = carts[i].num
                            break label
                        }
                    } 
                }
            }
            for(let i = 0; i < favorites.length; i++){
                label:
                for (let j = 0; j < newCategories.length; j++) {
                    let products = newCategories[j].products
                    for (let z = 0; z < products.length; z++) {
                        if (favorites[i].product_id === products[z].id) {
                            products[z].favorited = favorites[i].favorited
                            break label
                        }
                    }
                }
            }
        }else{
            for(let i = 0; i< newCategories.length;i++){
                let products = newCategories[i].products
                for(let j = 0; j< products.length;j++){
                    products[j].num = 0
                    products[j].favorited = false
                }
            }
        }
        return newCategories
    },
    //购物车长度
    cartsLength (state) {
        let result = 0
        let carts = state.carts
        for(let i = 0;i < carts.length;i++){
            result += carts[i].num
        }
        return result
    },
    //总价
    total (state) {
        let result = 0
        let carts = state.carts
        for (let i = 0; i < carts.length; i++) {
            if(carts[i].cartSelected){
                result += carts[i].num * carts[i].price
            }
        }
        return result
    },
    //地址长度
    addressLength (state) {
        return state.address.length
    },
    //选中的地址
    selectedADD (state) {
        for(let i = 0;i < state.address.length;i++){
            if(state.address[i].selectedADD){
                return state.address[i]
                break
            }
        }
    },
    favoriteLength (state) {
        return state.favorites.length
    }
}