<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont"
           @click="handleBackHomePage">&#xe609;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe794;</span>
        <input placeholder="请输入商品名称"
               class="search__content__input" />
      </div>
    </div>
    <ShopInfo v-show="item.imgUrl"
              :item="item"
              :hideBorder="true" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
import ShopInfo from '../../components/ShopInfo'
import Content from './Content'
import Cart from './Cart'
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'

const useShopInfoEffect = () => {
  const route = useRoute()
  const id = route.params.id
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const res = await get(`/api/shop/${id}`)
    if (res?.errno === 0 && res?.data) {
      data.item = res.data
    }
  }
  const { item } = toRefs(data)
  return {
    item,
    getItemData
  }
}

const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackHomePage = () => {
    router.back()
  }
  return {
    handleBackHomePage
  }
}

export default {
  name: 'Shop',
  components: {
    ShopInfo,
    Content,
    Cart
  },
  setup () {
    const {
      item,
      getItemData
    } = useShopInfoEffect()
    getItemData()
    const { handleBackHomePage } = useBackRouterEffect()
    return {
      item,
      handleBackHomePage
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriable.scss";
.wrapper {
  padding: 0 0.18rem;
}
.search {
  margin: 0.2rem 0 0.16rem 0;
  line-height: 0.32rem;
  display: flex;
  &__back {
    width: 0.3rem;
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    flex: 1;
    background-color: $search-bgColor;
    border-radius: 0.16rem;
    &__icon {
      width: 0.44rem;
      text-align: center;
      color: $search-fontColor;
    }
    &__input {
      padding-right: 0.2rem;
      display: block;
      height: 0.32rem;
      border: none;
      width: 100%;
      outline: none;
      color: $content-fontColor;
      background: none;
      font-size: 0.14rem;
      &::placeholder {
        color: $content-fontColor;
      }
    }
  }
}
</style>
