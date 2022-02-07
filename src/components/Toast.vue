<template>
  <div class="toast">
    {{msg}}
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  props: ['msg']
}
export const useToastEffect = () => {
  const toastData = reactive({
    show: false,
    toastMsg: ''
  })
  const showToast = (msg) => {
    toastData.show = true
    toastData.toastMsg = msg
    setTimeout(() => {
      toastData.show = false
      toastData.toastMsg = ''
    }, 1500)
  }
  const { show, toastMsg } = toRefs(toastData)
  return { showToast, show, toastMsg }
}
</script>

<style lang="scss" scoped>
@import "../style/viriable.scss";
.toast {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 0.05rem;
  color: $bgColor;
}
</style>
