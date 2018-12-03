import http from "axios"
import api from "@/Api/api.js"
import { comment } from "postcss";
export default {
    //获取所有商品数据
    getProducts ({commit}) {
        http.get(api.host + "/products").then(res => {
            commit("GET_PRODUCTS",res.data)
        })
    },
    //获取分类列表
    getCategories ({commit}) {
        http.get(api.host + "/categories").then(res => {
            commit("GET_CATEGORIES",res.data)
        })
    },
    //获取城市
    getCity ({commit}) {
        http.get(api.host + "/city").then(res => {
            commit("GET_CITY",res.data)
        })
    },
    //验证用户
    vertifyUser ({commit},userObj) {
        return http.get(api.host + "/users?phone=" + userObj.phone)
        .then(res => {
            if (res.data.length > 0) {
                //登录
                //把用户数据加载出来,取出用户购物车数据和地址数据
                commit("ADD_USER",res.data[0])
                http.get(api.host + "/users/" + res.data[0].id + "/carts")
                .then(res => {
                    commit("ADD_CARTS",res.data)
                })
                http.get(api.host + "/users/" + res.data[0].id + "/address")
                .then(res => {
                    commit("SAVE_ADDRESS",res.data)
                })
                http.get(api.host + "/users/" + res.data[0].id +"/favorites").then(res => {
                    commit("SAVE_FAVORITES",res.data)
                })
                return {"msg": "登录成功"}
            } else {
                //注册
                return http.post(api.host + "/users",{
                    "phone": userObj.phone
                }).then(res => {
                    commit("ADD_USER",res.data)
                    return {"msg": "注册成功"}
                })
            }
        })
    },
    //添加至数据库购物车
    addToCarts (store,product) {
        //先判断购物车是否有该商品,如果有则是数量++,没有则添加商品
        //数量为1
        //true表示存在该商品 false表示不存在
        let exitBol = false
        let carts = store.state.carts
        for(let i = 0;i < carts.length;i++){
            if(product.id === carts[i].product_id){
                //存在商品 数量++
                exitBol = true
                let cartId = carts[i].id
                let newCart = Object.assign({},carts[i])
                let num = ++newCart.num
                return http.patch(api.host + "/carts/" + cartId,{
                    num: num
                }).then(res => {
                    if(res.data.id > 0){
                        store.commit("UPDATE_CARTS",res.data)
                        return {"msg": "数量更新成功"}
                    }else{
                        return {"msg": "数量更新失败"}
                    }
                })
            }
        }
        if (!exitBol) {
            //创建一个对象
            let cartObj = {
                userId: store.state.user.id,
                product_id: product.id,
                name: product.name,
                img: product.imgs.min,
                unit: product.unit,
                price: product.price,
                num: 1,
                cartSelected: false
            }
            return http.post(api.host + "/carts", cartObj)
                .then(res => {
                    if (res.data.id > 0) {
                        store.commit("ADD_TO_CARTS", res.data)
                        return { "msg": "添加商品成功" }
                    } else {
                        return { "msg": "添加商品失败" }
                    }
                })
        }
    },
    //购物车商品数量--
    subToCarts (store,product) {
        let carts = store.state.carts
        let cartId,cartIndex
        for (let i = 0; i < carts.length; i++) {
            if (product.id === carts[i].product_id) {
                cartId = carts[i].id
                cartIndex = i
            }
        }
        if(Number(product.num) === 1){
            //从购物车内删除该商品
            product.num--
            return http.delete(api.host + "/carts/" + cartId)
                .then(res => {
                    store.commit("DELETE_CART", cartId)
                    return { "msg": "删除商品成功" }
                })
        }else{
            //购物车商品数量--
            let num = product.num
            num--
            return http.patch(api.host + "/carts/" + cartId,{
                num: num
            }).then(res => {
                store.commit("UPDATE_CARTS",res.data)
                return {"msg": '数量--成功'}
            })
        }
    },
    //全选
    selectedAll (store,allSelected) {
        let carts = store.state.carts
        for(let i = 0;i < carts.length;i++){
            let index = i
            http.patch(api.host + "/carts/" + carts[i].id,{
                cartSelected: allSelected
            }).then(res => {
                store.commit("SELECTED_ALL",{
                    index: index,
                    allSelected: allSelected
                })
            })
        }
    },
    //单选的状态
    selectedCart ({commit},cartObj) {
        http.patch(api.host + "/carts/" + cartObj.cartId,{
            cartSelected: cartObj.cartSelected
        }).then(res => {
            commit("SELECTED_CART",cartObj)
        })
    },
    //删除购物车商品
    cutCart ({commit},cart) {
        cart.num--
        http.delete(api.host + "/carts/" + cart.id).then(res => {
            commit("DELETE_CART",cart.id)
        })
    },
    //更新购物车商品数据
    updateCart ({commit},cartObj) {
        http.patch(api.host + "/carts/" + cartObj.id,{
            num: cartObj.num
        }).then(res => {
            commit("UPDATE_CARTS",cartObj)
        })
    },
    //添加地址
    addAddress (store,addObj) {
        let address = store.state.address
        for(let i = 0; i< address.length;i++){
            http.patch(api.host + '/address/' + address[i].id,{
                selectedADD: false
            }).then(res => {
                store.commit("CHANGE_SELECTEDADD",address[i].id)
            })
        }
        return http.post(api.host + '/address',addObj).then(res => {
            store.commit('ADD_ADDRESS',res.data)
            return {'msg':'添加地址成功'}
        })
    },
    //修改地址
    updateAddress (store,addObj) {
        return http.put(api.host + "/address/" + addObj.id,addObj).then(res => {
            store.commit("UPDATE_ADDRESS",res.data)
            return {'msg': '修改地址成功'}
        })
    },
    //删除地址
    subAddress ({commit},id) {
        return http.delete(api.host + "/address/" + id).then(res => {
            commit('SUBADDRESS',id)
            return {'msg': '删除地址成功'}
        })
    },
    changeSelectedADD (store,item) {
        let address = store.state.address
        for(let i = 0; i< address.length;i++){
            if(item.id !== address[i].id){
                http.patch(api.host + "/address/" + address[i].id,{
                    selectedADD: false
                }).then(res => {
                    store.commit("CHANGE_SELECTEDADD",address[i].id)
                })
            }
        }
        http.patch(api.host + "/address/" + item.id,{
            selectedADD: true
        }).then(res => {
            store.commit("CHANGE_SELECTEDADD_TRUE",item.id)
        })
    },
    //添加商品收藏
    favorited ({commit},Obj) {
        return http.post(api.host + "/favorites",Obj).then(res => {
            commit("FAVORITED",res.data)
            return {'msg': '添加收藏成功'}
        })
    },
    //取消收藏
    favorite ({commit},id) {
        return http.delete(api.host + "/favorites/" + id).then(res => {
            commit("FAVORITE",id)
            return {'msg':'取消收藏'}
        })
    },
    //商品列表操作
    subFavorite ({commit},id) {
        http.delete(api.host + "/favorites/" + id).then(res => {
            commit("FAVORITE",id)
        })
    }
}