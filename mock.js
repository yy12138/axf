var Mock = require("mockjs")
var fs = require("fs")

var data = Mock.mock({
    "bannar|4-6":[
        {
            "id|+1": 1,
            "bannar_imgs": "@image(320x140,@color)"
        }
    ],
    "categories|10": [
        {
            "id|+1":1,
            "name": "@cword(3,6)",
            "category_img": "@image(320x76,@color)",
            "cids|4": [
                {
                    "name": "@cword(2,5)"
                }
            ],
            "products":[],
            "color": "@color"
        }
    ],
    "products|100-200": [
        {
            "id|+1": 1,
            "categoryId|1-10": 1,
            "cidIndex|0-3": 1,
            "name": "@cword(2,6)",
            "unit|1-1000": 1,
            "price|1-500.1": 1,
            "imgs": {
                "min": "@image(80x80,@color,@cname)",
                "max": "@image(300x300,@color,@cname)"
            },
            "brand": "@cword(3,6)",
            // 保质期
            'expiration_date|1-3.1': 10,
            // 商品的产地
            'place_of_origin': '@cword(2, 4)',
            'num': 0,
            "favorited": false
        }
    ],
    /* 存储用户的id 以及相对应的购物车数据 地址数据 */
    /* 用户id 用户手机号 */
    "users": [],
    /* 
    购物车id
    用户id
    products
    */
    "carts": [],
    /* 
    地址id
    用户id
    address
    */
    "city": [
        {
            "cityName": "北京市",
            //朝阳市政府
            "siteName": "朝阳市政府",
            "centerX": 116.449703,
            "centerY": 39.927338
        },
        {
            "cityName": "深圳市",
            //桃园
            "siteName": "桃园",
            "centerX": 113.931322,
            "centerY": 22.538089
        },
        {
            "cityName": "南昌市",
            //江西农业大学
            "siteName": "江西农业大学",
            "centerX": 115.839691,
            "centerY": 28.767964,
        }
    ],
    "address": [],
    "favorites": []
})

fs.writeFile("db.json",JSON.stringify(data,null,2),function () {
    console.log("写入成功")
})