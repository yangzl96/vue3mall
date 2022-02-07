<template>
  <div class="content">
    <div class="category">
      <!-- category__item--active -->
      <div :class="{category__item: true, 'category__item--active':currentTab === item.tab}"
           v-for="item in categories"
           :key="item.name"
           @click="() => handleTabClick(item.tab)">{{item.name}}</div>
    </div>
    <div class="product">
      <div class="product__item"
           v-for="item in list"
           :key="item._id">
        <img class="product__item__img"
             :src="item.imgUrl"
             alt="">
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售 {{item.sales}} 件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>
            <span>{{item.price}}<span class="product__item__origin">&yen;{{item.oldPrice}}</span></span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus"
                @click="() => changeCartItem(shopId, item._id, item, -1, shopName)">-</span>
          <!-- 这里的count 不能用item.count 会影响清空购物车逻辑 -->
          <!-- cartList?.[shopId]?.productList?.[item._id]?.count || 0 -->
          <!-- <span>{{ cartList?.[shopId]?.productList?.[item._id]?.count || 0 }}</span> -->
          <span>{{ getProductCartCount(shopId, item._id)}}</span>
          <span class="product__number__plus"
                @click="() => changeCartItem(shopId, item._id, item, 1, shopName)">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { get } from '../../utils/request'
import { useCommonCartEffect } from '../../effects/cartEffects'
const categories = [
  {
    name: '全部商品',
    tab: 'all'
  },
  {
    name: '秒杀',
    tab: 'seckill'
  },
  {
    name: '鲜鲜水果',
    tab: 'fruit'
  }
]
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return {
    currentTab,
    handleTabClick
  }
}

const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({
    list: []
  })
  const getContentData = async () => {
    const res = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    if (res?.errno === 0 && res?.data?.length) {
      content.list = res.data
    }
  }
  watchEffect(() => {
    getContentData()
  })
  const { list } = toRefs(content)
  return {
    list
  }
}

// 商品列表点击逻辑
const useCartEffect = () => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', {
      shopId, shopName
    })
  }
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return {
    cartList,
    changeCartItem,
    getProductCartCount
  }
}
export default {
  name: 'Content',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const {
      currentTab,
      handleTabClick
    } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const {
      cartList,
      changeCartItem,
      getProductCartCount
    } = useCartEffect()
    return {
      currentTab,
      list,
      categories,
      shopId,
      changeCartItem,
      handleTabClick,
      getProductCartCount,
      cartList
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriable.scss";
@import "../../style/mixins.scss";
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.6rem;
  bottom: 0.5rem;
}
.category {
  width: 0.76rem;
  background-color: $search-bgColor;
  height: 100%;
  overflow-y: scroll;
  &__item {
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.14rem;
    color: $content-fontColor;
    &--active {
      background: $bgColor;
    }
  }
}
.product {
  flex: 1;
  overflow-y: scroll;
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid #f1f1f1;
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      color: $content-fontColor;
      font-size: 0.14rem;
      @include ellipsis;
    }
    &__sales {
      margin: 0.06rem 0;
      line-height: 0.16rem;
      color: $content-fontColor;
      font-size: 0.12rem;
    }
    &__price {
      margin: 0;
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
      bottom: 0.12rem;
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
