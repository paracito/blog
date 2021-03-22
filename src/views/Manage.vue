<template>
  <div class="wrap" :style="{height: state.srcHeight + 'px'}">
    <div class="header" :style="{lineHeight: state.srcHeight * 0.1 + 'px'}">
      <h1 class="title">管理系统</h1>
      <router-link to="/main"><button class="client">客户端</button></router-link>
    </div>
    <div class="navi">
      <ul>
        <router-link  v-for="(label, index) in state.labels" :key="index" :to="'/manage' + label.path">
          <li class="label_li" :class="{label_li_checked: label.selected}" @click="selected(index)">{{ label.title }}</li>
        </router-link>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onBeforeMount, onMounted } from 'vue'
import request from '../common/api/request'
export default defineComponent({
  name: 'Manage',
  setup () {
    const state = reactive({
      resData: {},
      srcHeight: '',
      selected: '',
      labels: [{
        title: '文章列表',
        path: '/list',
        selected: false
      }, {
        title: '文章列表',
        path: '/infomation',
        selected: false
      }, {
        title: '添加文章',
        path: '/add',
        selected: false
      }, {
        title: '草稿箱',
        path: '/draft',
        selected: false
      }]
    })
    function selected (index) {
      for (const item of state.labels) {
        item.selected = false
      }
      state.labels[index].selected = true
    }
    onBeforeMount(() => {
      state.srcHeight = document.documentElement.clientHeight
    })
    return { state, selected }
  }
})
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.header {
  width: 100%;
  height: 10%;
  background: #1e1e1e;
  // background: #1F4E79;
  z-index: 100;
  display: flex;
  .title {
    align-items: center;
    color: #fff;
    margin-left: 30px;
  }
  .client {
    height: 36px;
    line-height: 36px;
    background: none;
    border: 1px solid #ccc;
    color: #fff;
    width: 100px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  .client:hover {
    background: #3c3c3c;
  }
  a {
    position: absolute;
    right: 10px;
  }
}
.navi {
  width: 15%;
  height: 90%;
  background: #1e1e1e;
  float: left;
  border-top: 1px solid #ccc;
  ul {
    margin-top: 30px;
    a {
      text-decoration: none;
      color: #fff;
      .label_li {
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        list-style: none;
        text-align: center;
      }
      .label_li:hover {
        background: #3c3c3c;
      }
      .label_li_checked {
        background: #3c3c3c;
      }
    }
  }
}
.content {
  width: 85%;
  height: 90%;
  float: left;
  border: 1px solid #ccc;
  overflow: auto;
}
</style>
