<template>
  <div class="order">
    <div class="order__price">实付金额 <b>￥{{calculations.price}}</b></div>
    <div class="order__btn"
         @click="() => handleMaskChange(true)">提交订单</div>
  </div>
  <div class="mask"
       @click="() => handleMaskChange(false)"
       v-show="showMask">
    <div class="mask__content"
         @click.stop>
      <h3 class="mask__content__title">确认要离开收银台</h3>
      <p class="mask__content__desc">请尽快支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div class="mask__content__btn mask__content__btn--first"
             @click="() =>handleConfirmOrder(true)">
          取消订单
        </div>
        <div class="mask__content__btn mask__content__btn--last"
             @click="() =>handleConfirmOrder(false)">
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCommonCartEffect } from '../../effects/cartEffects'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { post } from '../../utils/request'
export default {
  name: 'Order',
  setup () {
    const showMask = ref(false)
    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    const shopId = parseInt(route.params.id)
    const { shopName, calculations, productList } = useCommonCartEffect(shopId)
    const handleConfirmOrder = async (isCanceled) => {
      const products = []
      for (const i in productList.value) {
        const product = productList.value[i]
        products.push({
          id: parseInt(product._id),
          num: product.count
        })
      }
      try {
        const res = await post('/api/order', {
          addressId: 1,
          shopId,
          shopName: shopName.value,
          isCanceled,
          products
        })
        if (res?.errno === 0) {
          store.commit('clearCartData', { shopId })
          router.push({ name: 'Home' })
        }
      } catch (error) {
      }
    }
    const handleMaskChange = (status) => {
      showMask.value = status
    }
    return {
      calculations,
      showMask,
      handleMaskChange,
      handleConfirmOrder
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriable.scss";
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  line-height: 0.49rem;
  height: 0.49rem;
  background-color: $bgColor;
  &__price {
    flex: 1;
    text-indent: 0.24rem;
    font-size: 0.14rem;
    color: $content-fontColor;
  }
  &__btn {
    width: 0.98rem;
    color: $bgColor;
    text-align: center;
    font-size: 0.14rem;
    background-color: #4fb0f9;
  }
}
.mask {
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background-color: #fff;
    border-radius: 0.04rem;
    text-align: center;
    &__title {
      font-size: 0.18rem;
      color: #333;
      margin: 0.24rem 0 0 0;
      line-height: 0.26rem;
    }
    &__desc {
      margin: 0.08rem 0 0 0;
      font-size: 0.14rem;
      color: #666;
    }
    &__btns {
      display: flex;
      margin: 0.24rem 0.58rem;
    }
    &__btn {
      flex: 1;
      width: 0.8rem;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      &--first {
        margin-right: 0.12rem;
        color: #4fb0f9;
        border: 0.01rem solid #4fb0f9;
      }
      &--last {
        margin-left: 0.12rem;
        color: #fff;
        background-color: #4fb0f9;
      }
    }
  }
}
</style>
