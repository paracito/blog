<template>
  <div class="details">
    <div class="navigation" :style="{height: state.srcHeight + 'px'}">
      <p class="navi">目录</p>
      <ul>
        <li v-for="(item, index) in state.titleList" :key="index" :class="{highlight: state.currentTitle == index}" @click="scorllToTitle(item)">
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="sort">
        <ul>
          <li v-for="(item, index) in state.sorts" :key="index">{{ item }}</li>
        </ul>
      </div>
      <div class="article" v-html="state.content"></div>
      <div>阅读：{{ state.reading }}</div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, onBeforeMount, onMounted, onUnmounted, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import request from '../common/api/request'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import GlobalVariables from '@/components/GlobalVariables'
export default defineComponent({
  name: 'Details',
  setup () {
    let timer
    const route = useRoute()
    const state = reactive({
      resData: {},
      content: '',
      index: route.params.index,
      titleList: [],
      currentTitle: 0,
      sorts: [],
      reading: 0,
      srcHeight: GlobalVariables.srceenHeight
    })
    function scorllToTitle (title) {
      const headers = document.getElementsByTagName('h3')
      for (const item of headers) {
        if (title === item.innerHTML) {
          console.log(item.offsetTop)
          window.scrollTo(0, item.offsetTop - 200)
        }
      }
    }
    onBeforeMount(() => {
      timer = setTimeout(() => {
        request('get', 'article/addReading', {
          index: state.index
        }).then((res) => {
          // console.log(res)
          state.reading = res.reading
        })
      }, 15000)
      request('get', 'article/query', {
        index: state.index
      }).then((res) => {
        // console.log('res:', res)
        state.resData = res
        state.content = res.articleList[0].content
        state.sorts = res.articleList[0].sorts.split('-')
        state.reading = res.articleList[0].reading
      }).then(() => {
        const header1 = document.getElementsByTagName('h1')
        header1[0].style.color = 'rgb(66, 185, 178)'
        const header3s = document.getElementsByTagName('h3')
        for (const header3 of header3s) {
          header3.style.color = 'rgb(66, 185, 178)'
        }
      })
      request('get', 'article/quertTitle', {
        index: state.index
      }).then((res) => {
        state.titleList = res.titleList
      })
    })
    onMounted(() => {
      window.addEventListener('scroll', () => {
        const headers = document.getElementsByTagName('h3')
        for (let i = 0; i <= headers.length - 1; i++) {
          const top = headers[i].offsetTop - document.documentElement.scrollTop
          if (top > 0 && top < 300) {
            state.currentTitle = i
          }
        }
      })
    })
    onUpdated(() => {
      const code = document.getElementsByTagName('pre')
      for (const item of code) {
        item.classList.add('hljs')
      }
    })
    onUnmounted(() => {
      clearTimeout(timer)
    })
    return { state, scorllToTitle }
  }
})
</script>
<style scoped lang="scss">
.details {
  width: 100%;
  display: flex;
  .navigation {
    width: 20%;
    background: #f6f6f6;
    // background: url('../assets/sidebg.png');
    position: fixed;
    border-right: 1px solid #ccc;
    .navi {
      text-align: center;
      font-size: 20px;
      margin-bottom: 0;
    }
    ul {
      list-style: none;
      padding: 30px;
      margin: 0;
      li {
        // margin-left: 20px;
        line-height: 36px;
        font-size: 16px;
        color: #333;
        cursor: pointer;
      }
      .highlight {
        font-weight: bold;
        color: rgb(66, 185, 178);
      }
    }
  }
  .content {
    width: 80%;
    box-sizing: border-box;
    padding: 0 80px;
    margin-left: 20%;
    margin-bottom: 100px;
    list-style: none;
    display: inline-block;
    // padding-left: 100px;
    ul {
      padding-left: 0;
      li {
        display: inline-block;
        border: 1px solid #000;
        width: 70px;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        text-align: center;
        margin: 0 5px;
        cursor: pointer;
      }
    }
    .article h1{
      color: rgb(66, 185, 178);
    }
  }
}
</style>
