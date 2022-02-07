<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link v-for="item in nearbyList"
                 :key="item._id"
                 :to="`/shop/${item._id}`">
      <ShopInfo :item="item" />
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
const useNearByListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    try {
      const res = await get('/api/shop/hot-list')
      if (res?.errno === 0 && res?.data?.length) {
        nearbyList.value = res.data
      }
    } catch (error) {
      // showToast('请求失败')
    }
  }
  return {
    nearbyList,
    getNearbyList
  }
}

export default {
  name: 'Nearby',
  components: {
    ShopInfo
  },
  setup () {
    const { nearbyList, getNearbyList } = useNearByListEffect()
    getNearbyList()
    return {
      nearbyList
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriable.scss";
@import "../../style/mixins.scss";
.nearby {
  &__title {
    margin: 0.14rem 0 0.04rem 0;
    font-size: 0.18rem;
    color: $content-fontColor;
    font-weight: normal;
  }
  a {
    text-decoration: none;
  }
}
</style>
