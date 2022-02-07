<template>
  <div class="wrapper">
    <TopArea />
    <ProductList />
    <Order />
  </div>

</template>

<script>
import TopArea from './TopArea'
import ProductList from './ProductList'
import Order from './Order'

export default {
  name: 'orderConfirmation',
  components: {
    TopArea,
    ProductList,
    Order
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  background-color: #eee;
}
</style>
