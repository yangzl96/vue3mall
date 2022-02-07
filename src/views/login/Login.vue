<template>
  <div class="loginWrapper">
    <img class="loginWrapper__img"
         src="http://www.dell-lee.com/imgs/vue3/user.png"
         alt="">
    <div class="loginWrapper__input">
      <input v-model='username'
             class="loginWrapper__input__content"
             placeholder="请输入手机号">
    </div>
    <div class="loginWrapper__input">
      <input type="password"
             v-model="password"
             autocomplete="new-password"
             class="loginWrapper__input__content"
             placeholder="请输入密码">
    </div>
    <div class="loginWrapper__login-button"
         @click="handleLogin">登录</div>
    <div class="loginWrapper__login-link"
         @click="handleRegisterClick">立即注册</div>
  </div>
  <Toast v-if="show"
         :msg="toastMsg" />
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '' })
  const handleLogin = async () => {
    try {
      const res = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (res?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登陆失败')
      }
    } catch (error) {
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return {
    username,
    password,
    handleLogin
  }
}

const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegisterClick = () => {
    router.push({ name: 'Register' })
  }
  return {
    handleRegisterClick
  }
}

export default {
  name: 'Login',
  components: {
    Toast
  },
  // 职责就是告诉你代码执行的流程
  setup () {
    const { showToast, show, toastMsg } = useToastEffect()
    const { handleRegisterClick } = useRegisterEffect()
    const {
      username,
      password,
      handleLogin
    } = useLoginEffect(showToast)

    return {
      handleLogin,
      handleRegisterClick,
      username,
      password,
      show,
      toastMsg
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriable.scss";
.loginWrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    height: 0.48rem;
    // background-color: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    box-sizing: border-box;
    &__content {
      border: none;
      outline: none;
      line-height: 0.48rem;
      background: none;
      width: 100%;
      font-size: 0.16rem;
      color: rgba(0, 0, 0, 0.5);
      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  &__login-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    font-size: 0.16rem;
    line-height: 0.48rem;
    background: $btn-bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    color: $bgColor;
    text-align: center;
  }
  &__login-link {
    text-align: center;
    font-size: 0.14rem;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
