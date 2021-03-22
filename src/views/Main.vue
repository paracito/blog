<template>
  <img class="bg" src="../assets/bg.jpeg" alt="">
  <div class="bgCover"></div>
  <InitSlider class="slider" :style="{opacity: state.slideOpacity}" v-if="state.deliver.max > 0" :deliver="state.deliver" @sendmsg="getmsg"/>
  <!-- <InitSlider class="slider" :style="{opacity: state.slideOpacity}" v-if="state.max > 0" :percent="state.percent" :max="state.max" @sendmsg="getmsg"/> -->
  <div class="list" :style="{height: state.srcHeight + 'px'}">
    <div class="topBar">
      <div class="left">
        <img class="white" src="../assets/logofff.png" alt="">
        <img class="blue" src="../assets/logo22EAD4.png" alt="">
        <img class="red" src="../assets/logoFB0453.png" alt="">
      </div>
      <div class="right">
        <input type="text" class="search_box" placeholder="搜索" v-model="state.searchContent" @keydown="keyDown(13)">
        <img src="../assets/search.png" alt="" class="search" @click="search">
        <img src="../assets/about.png" alt="" class="about">
      </div>
    </div>
    <div class="main">
      <div class="label" @mouseenter="long($event)" @mouseleave="short($event)">
        <ul>
          <li class="label_li" :class="{label_li_selected: label.selected}" v-for="(label, index) in state.labels" @click="selected(index)" :key="index">
            <img src="../assets/about.png" alt="">
            {{ label.label }}
          </li>
        </ul>
      </div>
      <div class="article">
        <ul>
          <router-link v-for="(item, index) in state.resData.articleList" :key="index" :to = "'/details/' + item.index">
            <li class="title_li">
              <span>{{ item.title }}</span>
              <span class="article_date">{{ item.date }}</span>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount, onMounted, onUnmounted } from 'vue'
import request from '../common/api/request'
import InitSlider from '../components/InitSlider.vue'

export default defineComponent({
  name: 'Main',
  components: {
    InitSlider
  },
  setup () {
    let timer: any
    const state = reactive({
      resData: {}, // 接收返回的数据
      deliver: {
        max: 0,
        percent: '',
        current: ''
      },
      changeFlag: 0,
      srcHeight: 0,
      searchContent: '',
      slideOpacity: 2,
      labels: [
        {
          label: 'Vue',
          value: 'vue',
          selected: false
        },
        {
          label: 'Python',
          value: 'python',
          selected: false
        },
        {
          label: 'Linux',
          value: 'linux',
          selected: false
        },
        {
          label: 'Rand',
          value: 'random',
          selected: false
        },
        {
          label: 'Others',
          value: 'others',
          selected: false
        }
      ]
    })
    let articleList: any
    function getmsg (value: any) {
      state.deliver = value
      document.documentElement.scrollTo({
        top: value.percent
      })
    }
    function long (event: any) {
      let wide = 50
      state.changeFlag = 1
      const longer = setInterval(() => {
        wide += 2
        event.target.style.width = wide + 'px'
        if (wide >= 100 || state.changeFlag === 0) {
          clearInterval(longer)
        }
      }, 10)
    }
    function short (event: any) {
      let wide = 100
      state.changeFlag = 0
      const shorter = setInterval(() => {
        wide -= 2
        event.target.style.width = wide + 'px'
        if (wide <= 50 || state.changeFlag === 1) {
          clearInterval(shorter)
        }
      }, 10)
    }
    function selected (index: any) {
      for (const item of state.labels) {
        item.selected = false
      }
      state.labels[index].selected = true
      request('get', 'article/queryByLabel', {
        label: state.labels[index].value
      }).then((res) => {
        state.resData = res as any
      })
    }
    function search () {
      request('get', 'article/querySearch', {
        content: state.searchContent
      }).then((res) => {
        state.resData = res as any
      })
    }
    function keyDown (value: any) {
      if (value === 13) {
        search()
      }
    }
    onBeforeMount(() => {
      state.srcHeight = document.documentElement.clientHeight
      // 获取文章列表
      request('get', 'article/query', {
        index: ''
      }).then((res: any) => {
        state.resData = res
        articleList = res.articleList
      })
    })
    onMounted(() => {
      timer = setInterval(() => {
        if (state.slideOpacity > 0) {
          state.slideOpacity -= 0.05
        }
      }, 50)
      window.addEventListener('scroll', () => {
        state.slideOpacity = 2
        const scrollHeight = document.documentElement.scrollTop
        const srcHeight = document.documentElement.clientHeight
        const bodyHeight = document.body.scrollHeight
        const index = Math.floor(articleList.length * scrollHeight / bodyHeight) + 4
        state.deliver.max = bodyHeight - srcHeight
        state.deliver.percent = scrollHeight.toString()
        state.deliver.current = articleList[index].date
      })
    })
    onUnmounted(() => {
      clearInterval(timer)
    })
    return { state, getmsg, long, short, selected, search, keyDown }
  }
})
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.bg {
  width: 100%;
  z-index: -10;
  position: fixed;
  top: 0;
  left: 0;
}
.bgCover {
  width: 100%;
  height: 100%;
  z-index: -9;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
}
.slider {
  position: fixed;
  top: 50%;
  right: 0px;
  transform: rotate(90deg);
}
.list::-webkit-scrollbar {
  width: 0;
}
.list {
  width: 100%;
  // overflow-y: scroll;
  .topBar {
    width: 100%;
    height: 80px;
    padding: 10px;
    position: fixed;
    top: 0;
    // background: #111;
    color: #fff;
    background: #444;
    // border-bottom: 1px solid #333;
    .left {
      img {
        position: absolute;
      }
      .white {
        z-index: 100;
        left: 30px;
        top: -20px;
      }
      .blue {
        left: 27px;
        top: -23px;
      }
      .red {
        left: 33px;
        top: -19px;
      }
    }
    .right {
      position: absolute;
      right: 30px;
      top: 36px;
      .search_box {
        height: 28px;
        width: 120px;
        vertical-align: middle;
        // margin-right: 0px;
        border-radius: 14px;
        background: none;
        border: 1px solid #aaa;
        padding: 0 36px 0 14px;
        color: #fff;
      }
      .search_box:focus, .search_box:hover {
        border: 1px solid #fff;
        outline: none;
      }
      .search {
        vertical-align: middle;
        height: 20px;
        margin-left: -27px;
        cursor: pointer;
      }
      .about {
        vertical-align: middle;
        margin-left: 30px;
      }
    }
  }
  .main {
    // background: #111;
    // margin-top: 80px;
    padding: 100px 0 40px;
    .article {
      width: 60%;
      margin-left: 10%;
      display: inline-block;
      a {
        text-decoration: none;
      }
      .title_li {
        list-style: none;
        margin: 0 0 10px;
        height: 60px;
        font-size: 20px;
        line-height: 60px;
        padding: 0 20px;
        color: #fff;
        .article_date {
          float: right;
        }
      }
      .title_li:hover {
        background: rgba(183, 183, 184, 0.5);
      }
    }
    .label {
      width: 50px;
      position: fixed;
      top: 25%;
      overflow: hidden;
      background: rgba(217, 217 ,217, 0.5);
      color: #ffffff;
      .label_li {
        list-style: none;
        cursor: pointer;
        width: 100%;
        text-align: left;
        overflow: hidden;
        height: 60px;
        line-height: 60px;
        font-size: 14px;
        vertical-align: middle;
        img {
          line-height: 60px;
          vertical-align: middle;
          margin-left: 8px;
        }
      }
      .label_li:hover {
        background: rgba(83, 83, 84, 0.5);
      }
      .label_li_selected {
        background: rgba(83, 83, 84, 0.5);
      }
    }
  }
}
</style>
