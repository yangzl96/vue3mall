<template>
  <div class="products">
    <div class="products__title">
      {{shopName}}
    </div>
    <div class="products__wrapper">
      <div class="products__list">
        <div v-for="item in productList"
             :key="item._id"
             class="products__item">
          <img class="products__item__img"
               :src="item.imgUrl"
               alt="">
          <div class="products__item__detail">
            <h4 class="products__item__title">{{item.name}}</h4>
            <p class="products__item__price">
              <span class="products__item__single">
                <span class="products__item__yen">&yen; {{item.price}} x {{item.count}}</span>
              </span>
              <span class="products__item__total">
                <span class="products__item__yen">&yen; {{(item.price * item.count).toFixed(2)}}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'
export default {
  name: 'productList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { shopName, productList } = useCommonCartEffect(shopId)
    return {
      productList,
      shopName
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriable.scss";
@import "../../style/mixins.scss";
.products {
  margin: 0.16rem 0.18rem 0.1rem 0.18rem;
  background-color: $bgColor;
  &__title {
    font-size: 0.16rem;
    color: $content-fontColor;
    padding: 0.16rem;
  }
  &__wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 2.6rem;
    bottom: 0.6rem;
    overflow-y: scroll;
    margin: 0 0.18rem;
  }
  &__list {
    background-color: $bgColor;
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0 0.16rem 0.16rem 0.16rem;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__detail {
      flex: 1;
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
      display: flex;
      line-height: 0.2rem;
      color: $highlight-fontColor;
      font-size: 0.14rem;
    }
    &__total {
      flex: 1;
      text-align: right;
      color: #000;
    }
    &__yen {
      font-size: 0.12rem;
    }
  }
}
</style>
