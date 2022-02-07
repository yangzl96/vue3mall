<template>
  <div class="mask"
       v-if="showCart && calculations.total > 0"
       @click="handleCartShowChange"></div>
  <div class="cart">
    <div class="product"
         v-show="showCart && calculations.total > 0">
      <div class="product__header">
        <div class="product__header__all"
             @click="() => setCartItemsChecked(shopId)">
          <span class="product__header__icon iconfont"
                v-html="calculations.allChecked ? '&#xe69b;' : '&#xe667;'"></span>
          全选
        </div>
        <div class="product__header__clear">
          <span class="product__header__clear__btn"
                @click="() => cleanCartProducts(shopId)">清空购物车</span>
        </div>
      </div>
      <div v-for="item in productList"
           :key="item._id"
           class="product__item">
        <div class="product__item__checked iconfont"
             v-html="item.check ? '&#xe69b;' : '&#xe667;'"
             @click="() => changeCartItemChecked(shopId, item._id)">
        </div>
        <img class="product__item__img"
             :src="item.imgUrl"
             alt="">
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>
            <span>{{item.price}}<span class="product__item__origin">&yen;{{item.oldPrice}}</span></span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus"
                @click="() => changeCartItemInfo(shopId, item._id, item, -1)">-</span>
          <span>{{item.count || 0 }}</span>
          <span class="product__number__plus"
                @click="() => changeCartItemInfo(shopId, item._id, item, 1)">+</span>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png"
             class="check__icon__img"
             @click="handleCartShowChange" />
        <div class="check__icon__tag">{{calculations.total}}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{calculations.price}}</span>
      </div>
      <div class="check__btn"
           v-if="calculations.total > 0">
        <router-link :to="{path: `/orderConfirmation/${shopId}`}">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

// 获取购物车信息逻辑
const useCartEffect = (shopId) => {
  const store = useStore()
  const { productList, changeCartItemInfo, calculations } = useCommonCartEffect(shopId)
  // 切换选中
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', {
      shopId, productId
    })
  }
  // 清空购物车
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', {
      shopId
    })
  }
  // 全选点击
  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', {
      shopId
    })
  }

  return {
    productList,
    calculations,
    changeCartItemInfo,
    changeCartItemChecked,
    cleanCartProducts,
    setCartItemsChecked
  }
}

// 切换购物车显影
const useToggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return {
    handleCartShowChange,
    showCart
  }
}

export default {
  name: 'Cart ',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const {
      handleCartShowChange,
      showCart
    } = useToggleCartEffect()
    const {
      productList,
      calculations,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked
    } = useCartEffect(shopId)
    return {
      productList,
      calculations,
      showCart,
      shopId,
      changeCartItemInfo,
      setCartItemsChecked,
      changeCartItemChecked,
      cleanCartProducts,
      handleCartShowChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriable.scss";
@import "../../style/mixins.scss";
.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: $bgColor;
}
.check {
  display: flex;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  line-height: 0.49rem;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      left: 0.46rem;
      top: 0.04rem;
      padding: 0 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: $highlight-fontColor;
      border-radius: 0.1rem;
      font-size: 0.12rem;
      text-align: center;
      color: $bgColor;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: $content-fontColor;
    font-size: 0.12rem;
    &__price {
      line-height: 0.49rem;
      color: $highlight-fontColor;
      font-size: 0.18rem;
    }
  }
  &__btn {
    width: 0.98rem;
    background-color: #4fb0f9;
    text-align: center;
    color: $bgColor;
    font-size: 0.14rem;
    a {
      color: $bgColor;
      text-decoration: none;
    }
  }
}
.product {
  flex: 1;
  overflow-y: scroll;
  background: $bgColor;
  &__header {
    display: flex;
    height: 0.52rem;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    font-size: 0.14rem;
    color: $content-fontColor;
    &__icon {
      color: #0091ff;
      font-size: 0.2rem;
      vertical-align: middle;
      margin-right: 0.1rem;
    }
    &__all {
      width: 0.64rem;
      margin-left: 0.18rem;
    }
    &__clear {
      flex: 1;
      margin-right: 0.16rem;
      text-align: right;
      &__btn {
        display: inline-block;
      }
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid #f1f1f1;
    &__checked {
      line-height: 0.5rem;
      margin-right: 0.2rem;
      color: #0091ff;
      font-size: 0.2rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      color: $content-fontColor;
      font-size: 0.14rem;
      @include ellipsis;
    }
    &__price {
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      color: $highlight-fontColor;
      font-size: 0.14rem;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.26rem;
      &__minus,
      &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 50%;
        font-size: 0.2rem;
        text-align: center;
        line-height: 0.16rem;
      }
      &__minus {
        border: 0.01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: 0.05rem;
      }
      &__plus {
        background: $btn-bgColor;
        color: $bgColor;
        margin-left: 0.05rem;
      }
    }
  }
}
</style>
