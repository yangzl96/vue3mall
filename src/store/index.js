import { createStore } from 'vuex'
// 本地存储
const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList)
  } catch (error) {
    return {}
  }
}
export default createStore({
  state: {
    // { shopId: { shopName: '', productList: { productId: {} } } }
    cartList: getLocalCartList()
    // 第一层级是商铺的id
    // shopId: {
    // shopName: '沃尔玛',
    // productList: {
    //  商品id
    //   productId: {
    //  商品内容以及购物数量
    //     _id: '1',
    //     name: '番茄250g/份',
    //     imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    //     sales: 10,
    //     price: 33.6,
    //     oldPrice: 39.6,
    //     count: 2
    //   },
    //  productId: {
    //     _id: '2',
    //     name: '苹果250g/份',
    //     imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    //     sales: 10,
    //     price: 33.6,
    //     oldPrice: 39.6,
    //     count: 2
    //   },
    //  }
    // },
  },
  mutations: {
    // 购物车
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo, num } = payload
      // 获取对应店铺
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      // 获取对应店铺里的对应商品
      let product = shopInfo.productList[productId]
      // 不存在的时候则等于当前点击的物品信息
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count = product.count + num
      if (num > 0) { product.check = true }
      if (product.count < 0) { product.count = 0 }
      // 重新给state.cartList赋值
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    // 勾选切换
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    // 清空购物车
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    // 点击选中
    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      // 找到对应店铺的所有商品
      const products = state.cartList[shopId].productList
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.check = true
        }
      }
      setLocalCartList(state)
    },

    // 改变商铺的名字
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    // 清空购物车
    clearCartData (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
