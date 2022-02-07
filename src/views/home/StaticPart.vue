<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe610;</span>
    云南理工大学科技园2号楼10层
    <span class="iconfont position__notice">&#xe61d;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe794;</span>
    优惠商品
  </div>
  <div class="banner">
    <img src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
         alt="" />
  </div>
  <div class="icons">
    <div class="icons__item"
         v-for="(item, index) in inconList"
         :key="index">
      <img :src="'http://www.dell-lee.com/imgs/vue3/' + item.imgName + '.png'"
           alt=""
           class="icons__item__img" />
      <p class="icons__item__desc">{{item.desc}}</p>
    </div>
  </div>
  <div class="gap"></div>
  <div>{{msg}}</div>
</template>

<script>
const data = {
  msg: 8888
}
console.log(data)
export default {
  name: 'StaticPart',
  data () {
    return {
      msg: 11111
    }
  },
  created () {
    console.log(this)
  },
  setup () {
    const inconList = [
      {
        imgName: '超市',
        desc: '超市便利'
      },
      {
        imgName: '超市',
        desc: '超市便利'
      },
      {
        imgName: '超市',
        desc: '超市便利'
      },
      {
        imgName: '超市',
        desc: '超市便利'
      },
      {
        imgName: '超市',
        desc: '超市便利'
      },
      {
        imgName: '超市',
        desc: '超市便利'
      },
      {
        imgName: '超市',
        desc: '超市便利'
      },
      {
        imgName: '超市',
        desc: '超市便利'
      },
      {
        imgName: '超市',
        desc: '超市便利'
      },
      {
        imgName: '超市',
        desc: '超市便利'
      }
    ]
    return {
      inconList
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriable.scss";
@import "../../style/mixins.scss";
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  color: $content-fontColor;
  .position__icon {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  .position__notice {
    position: absolute;
    right: 0;
    top: 0.17rem;
  }
}
.search {
  display: flex;
  align-items: center;
  line-height: 0.32rem;
  background-color: $search-bgColor;
  color: $search-fontColor;
  border-radius: 0.16rem;
  font-size: 0.14rem;
  margin-bottom: 0.12rem;
  .iconfont {
    font-size: 0.2rem;
    padding: 0 0.08rem 0 0.16rem;
  }
}
// 防止图片抖动
// 25.4% 是图片的高宽比
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  background-color: #f5f5f5;
  img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: $content-fontColor;
    }
  }
}
.gap {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background-color: $content-bgColor;
}
</style>
