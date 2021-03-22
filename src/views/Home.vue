<template>
  <div class="home" :style="{height: state.srceenHeight + 'px', width: state.srceenWidth + 'px'}">
    <!-- <button @click="output">123</button> -->
    <img class="city" src="../assets/city.png" alt="">
    <div class="circle" v-for="(item, index) in state.circleAnimation" :key="index" :style="{height: state.srceenWidth * 2 + 'px', top: item.top, left: item.left, animationDuration: item.duration}">
      <img src="../assets/plane.png" alt="" class="plane">
      <img src="../assets/plane2.png" alt="" class="plane2">
    </div>
    <div class="title">
      <img class="UFO" src="../assets/UFO_title.png" alt="">
      <div class="content">欢迎来到这里！</div>
    </div>
    <img src="../assets/ring.png" alt="" class="ring">
    <div class="ball">
      <img src="../assets/face.png" alt="" class="face">
      <div class="star_cover"></div>
    </div>
    <div class="road">
      <img src="../assets/car.png" alt="" class="car" v-for="(item, index) in state.carDuration" :key="index" :style="{animationDuration: item}">
    </div>
    <div class="star" v-for="(item, index) in state.starPosition" :key="index" :style="{top: item.top, left: item.left}">
      <div class="angle_big" :style="{transform: 'rotate(90deg)', animationDelay: item.delay}"></div>
      <div class="angle_big" :style="{animationDelay: item.delay}"></div>
      <div class="angle_small" :style="{transform: 'rotate(45deg)', animationDelay: item.delay}"></div>
      <div class="angle_small" :style="{transform: 'rotate(-45deg)', animationDelay: item.delay}"></div>
    </div>
    <div class="meteor" v-for="(item, index) in state.meteorAnimation" :key="index" :style="{top: item.top, left: item.left, animationDelay: item.delay}">
      <div class="tail" :style="{animationDelay: item.delay}"></div>
      <div class="angle" :style="{transform: 'rotate(45deg)', animationDelay: item.delay}"></div>
      <div class="angle" :style="{transform: 'rotate(-45deg)', animationDelay: item.delay}"></div>
    </div>
  </div>
  <div class="cover" :style="{height: state.srceenHeight * 8 / 10 + 'px', width: state.srceenWidth + 'px'}"></div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import GLOBAL from '../components/GlobalVariables'

export default defineComponent({
  name: 'Home',
  setup () {
    const state = reactive({
      degree: 1,
      srceenHeight: GLOBAL.srceenHeight,
      srceenWidth: GLOBAL.srceenWidth,
      starPosition: [{
        top: '0px',
        left: '0px',
        delay: '0s'
      }, {
        top: '50px',
        left: '200px',
        delay: '0.87s'
      }, {
        top: '30px',
        left: '500px',
        delay: '0.24s'
      }, {
        top: '-20px',
        left: '780px',
        delay: '1.21s'
      }, {
        top: '70px',
        left: '950px',
        delay: '0.66s'
      }],
      carDuration: ['10s', '12s', '15s', '18s', '20s'],
      circleAnimation: [{
        top: '45%',
        left: '-50%',
        duration: '24s'
      }, {
        top: '40%',
        left: '-53%',
        duration: '20s'
      }, {
        top: '50%',
        left: '-45%',
        duration: '30s'
      }],
      meteorAnimation: [{
        top: '50px',
        left: '700px',
        delay: '0.4s'
      }, {
        top: '200px',
        left: '1100px',
        delay: '0.2s'
      }, {
        top: '0px',
        left: '600px',
        delay: '0.9s'
      }, {
        top: '100px',
        left: '900px',
        delay: '1.3s'
      }, {
        top: '0px',
        left: '300px',
        delay: '0s'
      }, {
        top: '100px',
        left: '1300px',
        delay: '0.67s'
      }]
    })
    function change () {
      const timer = setInterval(() => {
        state.degree -= 0.1
        if (state.degree <= 0) {
          state.degree = 0
          clearInterval(timer)
        }
        console.log(state.degree)
      }, 200)
    }
    function output () {
      console.log(GLOBAL.srceenHeight, GLOBAL.srceenWidth)
    }
    return { state, change, output }
  }
})
</script>

<style lang="scss" scoped>
@keyframes spin{
from {
    transform:rotate(-45deg);
  }
to {
    transform:rotate(315deg);
  }
}
@keyframes rotate {
from {
      left: -200%;
  }
to {
      left: 0;
  }
}
@keyframes move {
0% {
      top: 40px;
  }
50% {
      top: 50px;
  }
100% {
      top: 40px;
  }
}
@keyframes drive {
from {
      left: -10%;
  }
to {
      left: 100%;
  }
}
@keyframes shine {
0% {
      width: 2px;
  }
50% {
      width: 0;
  }
100% {
      width: 2px;
  }
}
@keyframes tail {
0% {
      width: 0;
  }
90% {
      width: 100px;
  }
100% {
      width: 0;
}
}
@keyframes drop {
0% {
      transform: translate(0, 0) rotate(-45deg);
  }
100% {
      transform: translate(-700px, 500px) rotate(-45deg);
  }
}
@keyframes meteor {
0% {
      width: 0;
  }
20% {
      width: 2px;
  }
80% {
      width: 2px;
  }
100% {
      width: 0;
  }
}
* {
  box-sizing: border-box;
}
.cover {
  position: absolute;
  left: 0;
  top: 20%;
  background: linear-gradient(rgba(0, 32, 96, 0), rgba(0, 32, 96, 0.8), rgba(0, 32, 96, 1), rgba(0, 32, 96, 1));
  z-index: 100;
}
.home {
  overflow: hidden;
  position: absolute;
  background: url("../assets/space.jpg");
  .city {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1000;
  }
  .title {
    height: 100px;
    // border: 1px solid #fff;
    position: relative;
    top: 40px;
    left: 150px;
    animation: move 3s infinite;
    .content {
      height: 70px;
      line-height: 70px;
      position: absolute;
      top: 0;
      left: 60px;
    }
    .UFO {
      height: 80px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .ring {
    width: 300px;
    position: absolute;
    right: 0px;
    top: 20px;
    z-index: 500;
  }
  .ball {
    width: 120px;
    height: 120px;
    position: absolute;
    // border: 1px solid #ccc;
    border-radius: 50%;
    top: 30px;
    right: 85px;
    z-index: 400;
    overflow: hidden;
    box-shadow: -1px 1px 5px 0px #000;
    transform: rotate(-20deg);
    .face {
      width: 300%;
      height: 100%;
      position: relative;
      left: -200%;
      z-index: 300;
      animation: rotate 4s linear infinite;
    }
    .star_cover {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 50%;
      z-index: 350;
      background: linear-gradient(45deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
    }
  }
  .circle {
    z-index: 300;
    border-radius: 50%;
    width: 200%;
    position: absolute;
    transform: rotate(-45deg);
    animation: spin infinite linear;
    .plane {
      width: 60px;
      left: 50%;
      position: absolute;
      margin-left: -30px;
    }
    .plane2 {
      width: 60px;
      left: 50%;
      bottom: 0;
      position: absolute;
      margin-left: -30px;
    }
  }
  .road {
    width: 100%;
    height: 80px;
    // border: 1px solid red;
    border-bottom: 2px dashed #cecece;
    position: absolute;
    bottom: 20px;
    z-index: 1600;
    .car {
      position: absolute;
      top: 25px;
      left: -10%;
      width: 70px;
      // z-index: 600;
      animation: drive linear infinite;
    }
  }
  .star {
    position: absolute;
    width: 200px;
    height: 200px;
    // border: 1px solid #fff;
    // overflow: hidden;
    .angle_big {
      width: 2px;
      height: 100px;
      background: linear-gradient(to bottom, rgba(255, 255, 255 ,0), rgba(255, 255, 255 ,1), rgba(255, 255, 255 ,0));
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -50px;
      margin-left: -1px;
      animation: shine 2s infinite;
    }
    .angle_small {
      width: 2px;
      height: 30px;
      background: linear-gradient(to bottom, rgba(255, 255, 255 ,0), rgba(255, 255, 255 ,1), rgba(255, 255, 255 ,0));
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -15px;
      margin-left: -1px;
      animation: shine 2s infinite;
    }
  }
  .meteor {
    width: 100px;
    height: 100px;
    // border: 1px solid #fff;
    position: absolute;
    top: 0px;
    left: 800px;
    z-index: 700;
    transform: rotate(-45deg);
    animation: drop 2s linear infinite;
    .angle {
      width: 0px;
      height: 40px;
      background: linear-gradient(to bottom, rgba(255, 255, 255 ,0), rgba(255, 255, 255 ,1), rgba(255, 255, 255 ,0));
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -20px;
      margin-left: -1px;
      animation: meteor 2s infinite;
    }
    .tail {
      width: 0;
      height: 4px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -2px;
      border-radius: 2px;
      background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
      animation: tail 2s infinite;
    }
  }
}

</style>
