<template>
  <div class="newArticle">
    <div>
      <label class="title">分类：</label>
      <ul class="sort">
        <li class="sort_li" :class="{sort_li_checked: item.selected}" v-for="(item, index) in state.sorts" :key="index" @click="choose(index)">{{ item.label }}</li>
      </ul>
    </div>
    <MultiEditor :rawContent="state.rawContent" :index='state.index' ref="sonRef" @sendmsg='getmsg'></MultiEditor>
    <button class="submit" @click="addDraft" v-if="state.model">存草稿</button>
    <button class="submit" @click="add" v-if="state.model">提交</button>
    <button class="submit" @click="modify" v-else>修改</button>
  </div>
</template>
<script>
import { ref, defineComponent, reactive, onBeforeMount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import request from '../common/api/request'
import MultiEditor from '../components/MultiEditor'
export default defineComponent({
  name: 'NewArticle',
  components: {
    MultiEditor
  },
  setup () {
    const route = useRoute()
    const sonRef = ref(null)
    const state = reactive({
      resData: {},
      rawContent: 'rawContent',
      index: route.params.index,
      content: '',
      model: '',
      sorts: [
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
          label: 'Random',
          value: 'random',
          selected: false
        },
        {
          label: '其他',
          value: 'others',
          selected: false
        }
      ]
    })
    function getmsg (value) {
      state.content = value
    }
    function callSon () {
      sonRef.value.deliver()
    }
    function getSorts () {
      const sorts = []
      for (const item of state.sorts) {
        if (item.selected) {
          sorts.push(item.value)
        }
      }
      console.log(sorts)
      return sorts
    }
    function add () {
      callSon()
      request('get', 'article/add', {
        content: state.content,
        sorts: getSorts().join('-')
      }).then((res) => {
        alert('添加成功')
      })
    }
    function addDraft () {
      callSon()
      request('get', 'draft/addDraft', {
        content: state.content,
        sorts: getSorts().join('-')
      }).then((res) => {
        alert('保存草稿成功')
      })
    }
    function modify () {
      callSon()
      request('get', 'article/modifyArticle', {
        content: state.content,
        index: state.index,
        sorts: getSorts().join('-')
      }).then((res) => {
        alert('修改成功')
      })
    }
    function choose (index) {
      state.sorts[index].selected = !state.sorts[index].selected
      getSorts()
    }
    onMounted(() => {
      state.rawContent = '富文本编辑器'
      request('get', 'article/query', {
        index: state.index
      }).then((res) => {
        state.resData = res
        // state.rawContent = '富文本编辑器'
      })
      if (state.index === '' || state.index === undefined) {
        state.model = 1
        request('get', 'article/query', {
          index: state.index
        }).then((res) => {
          state.resData = res
        })
      } else {
        state.model = 0
        if (route.params.type === 'article') {
          request('get', 'article/query', {
            index: state.index
          }).then((res) => {
            state.resData = res
            state.rawContent = res.articleList[0].content
          })
        } else {
          request('get', 'draft/query', {
            index: state.index
          }).then((res) => {
            state.resData = res
            state.rawContent = res.draftList[0].content
          })
        }
      }
    })
    return { state, getmsg, sonRef, add, addDraft, modify, choose }
  }
})
</script>
<style scoped lang="scss">
* {
  // box-sizing: border-box;
}
.newArticle {
  width: 100%;
  .title {
    margin: 0 20px;
  }
  .sort {
    list-style: none;
    display: inline-block;
    padding-left: 0;
    .sort_li {
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
    .sort_li:hover {
      background: #666;
      color: #fff;
    }
    .sort_li_checked {
      background: #000;
      color: #fff;
    }
  }
  .submit {
    margin: 20px;
    float: right;
    border: 1px solid #000;
    border-radius: 5px;
    width: 80px;
    height: 40px;
    font-size: 18px;
    line-height: 30px;
    background: none;
    cursor: pointer;
  }
}
</style>
