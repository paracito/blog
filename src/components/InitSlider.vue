<template>
  <div class="initSlider">
    <!-- <input class="range" type="range" min=0 :max="maxHeight" v-model="per"> -->
    <input class="range" type="range" min=0 :max="accept.max" v-model="accept.percent">
    <div class="line"></div>
    <span class="latest">2021/03/17</span>
    <span class="current" :style="{left: 276 * accept.percent / accept.max + 'px'}">{{ accept.current }}</span>
    <span class="oldest">2020/12/12</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, onMounted, provide, inject } from 'vue'
import request from '../common/api/request'
export default defineComponent({
  name: 'InitSlider',
  props: {
    // percent: {
    //   type: String
    // },
    // max: {
    //   type: Number
    // }
    deliver: {
      type: Object
    }
  },
  setup (props, context) {
    const state = reactive({
      // percent: props.percent
    })
    const accept = computed({
      get: () => {
        console.log('computed:', props.deliver)
        return props.deliver
      },
      set: (value) => {
        context.emit('sendmsg', value)
      }
    })
    const per = 123
    const maxHeight = 123
    // const per = computed({
    //   get: () => {
    //     // console.log(props.percent)
    //     return props.percent
    //   },
    //   set: (value) => {
    //     context.emit('sendmsg', value)
    //     // return value
    //   }
    // })
    // const maxHeight = computed(() => {
    //   return props.max
    // })
    onMounted(() => {
      const srcHeight = document.documentElement.clientHeight
      const bodytHeight = document.body.clientHeight
      // setInterval(() => {
      //   console.log('props:', accept.value)
      // }, 1000)
      // console.log('props:', props.deliver)
    })
    return { state, per, maxHeight, accept }
  }
})
</script>
<style scoped lang="scss">
.initSlider {
  .line {
    height: 2px;
    background: #fff;
    width: 300px;
    margin-top: 7px;
    margin-left: 2px;
  }
  input[type=range] {
    width: 300px;
    appearance: none;
  }
  input[type=range]:focus {
    outline: none;
  }
  // 滑动轨道
  input[type=range]::-webkit-slider-runnable-track {
    height: 0px;
    vertical-align: middle;
  }
  // 滑块样式
  input[type=range]::-webkit-slider-thumb {
    appearance: none;
    background: #fff;
    height: 24px;
    width: 24px;
    opacity: 1;
    border: 2px solid #fff;
    border-radius: 50%;
  }
  .latest {
    display: inline-block;
    transform: rotate(-90deg);
    color: #fff;
    position: absolute;
    font-size: 12px;
    left: -40px;
    // margin-top: 30px;
  }
  .oldest {
    display: inline-block;
    transform: rotate(-90deg);
    color: #fff;
    position: absolute;
    font-size: 12px;
    right: -40px;
    // margin-top: 30px;
  }
  .current {
    display: inline-block;
    transform: rotate(-90deg);
    color: #fff;
    position: absolute;
    // left: 275px;
    font-size: 12px;
    margin-top: 40px;
    margin-left: -20px;
    // border: 1px solid red;
  }
}
</style>
