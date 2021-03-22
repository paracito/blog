<template>
  <table border="1">
      <tr v-for="(item, index) in state.resData.draftList" :key="index">
          <th>{{ item.index }}</th>
          <th>{{ item.date }}</th>
          <th>{{ item.title }}</th>
          <th style="cursor: pointer;">
            <router-link :to = "'/manage/modify/draft/' + item.index">修改</router-link>
          </th>
          <th style="cursor: pointer;" @click="del(item.index)">删除</th>
          <th style="cursor: pointer;" @click="release(item.index)">发布</th>
      </tr>
  </table>
  <div class="paginate">
    <ul>
      <li v-if="state.currentPage == 1" class="disable">上一页</li>
      <li v-else @click="pre" class="active">上一页</li>
      <li class="pageIndex">{{state.currentPage}}</li>
      <li v-if="state.currentPage == state.maxPage" class="disable">下一页</li>
      <li v-else @click="next" class="active">下一页</li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, reactive, onBeforeMount, onMounted } from 'vue'
import request from '../common/api/request'
export default defineComponent({
  name: 'Draft',
  setup () {
    const state = reactive({
      resData: {},
      currentPage: 1,
      maxPage: 1,
      content: ''
    })
    function queryByPage (index) {
      request('get', 'draft/queryByPage', {
        index: index
      }).then((res) => {
        state.resData = res
        state.maxPage = res.maxPage
      })
    }
    onBeforeMount(() => {
      // 获取文章列表
      queryByPage(1)
      state.maxPage = state.resData.maxPage
    })
    function pre () {
      state.currentPage -= 1
      queryByPage(state.currentPage)
    }
    function next () {
      state.currentPage += 1
      queryByPage(state.currentPage)
    }
    function del (index) {
      request('get', 'draft/deleteDraft', {
        index: index
      }).then((res) => {
        console.log('删除成功：' + index)
      })
    }
    function release (index) {
      let content = ''
      let sorts = ''
      request('get', 'draft/query', {
        index: index
      }).then((res) => {
        console.log('查询:', res)
        content = res.draftList[0].content
        sorts = res.draftList[0].sorts
        request('get', 'article/add', {
          content: content,
          sorts: sorts
        }).then((res) => {
          del(index)
          alert('发布成功')
        })
      })
      // console.log('111111', content, sorts)
      // request('get', 'article/add', {
      //   content: content,
      //   sorts: sorts
      // }).then((res) => {
      //   alert('发布成功')
      // })
    }
    return { state, del, release, pre, next }
  }
})
</script>

<style scoped lang="scss">
table {
  width: 100%;
  a {
    text-decoration: none;
    color: #000
  }
}
.paginate {
  ul {
    width: 220px;
    list-style: none;
    padding: 0;
    margin: 20px auto 0;
    li {
      display: inline-block;
      border: 1px solid #000;
      margin: 0 8px;
      padding: 2px 10px;
    }
    .active {
      color: #000;
      background: none;
      cursor: pointer;
    }
    .active:hover {
      color: #fff;
      background: #000;
    }
    .disable {
      border: 1px solid #ccc;
      color: #ccc;
    }
    .disable:hover {
      color: #ccc;
      background: none;
      cursor: not-allowed;
    }
    .pageIndex {
      color: #fff;
      background: #000;
      cursor: auto;
    }
  }
}
</style>
