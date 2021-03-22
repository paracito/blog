<template>
  <div class="multiEditor"></div>
</template>
<script>
import { defineComponent, reactive, onBeforeUpdate, onUpdated, onMounted } from 'vue'
import request from '../common/api/request'
import Editor from 'wangeditor'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
export default defineComponent({
  name: 'MultiEditor',
  props: {
    rawContent: {
      type: String
    },
    index: {
      type: String
    }
  },
  setup (props, context) {
    const state = reactive({
      resData: {}
    })
    let editor = ''
    onBeforeUpdate(() => {
      editor = new Editor('.multiEditor')
      editor.config.height = 450
      editor.highlight = hljs
      editor.create()
      if (props.index !== '' && props.index !== undefined) {
        editor.txt.html(props.rawContent)
      }
    })
    function deliver () {
      context.emit('sendmsg', editor.txt.html())
      console.log('son:', editor.txt.html())
    }
    return { state, deliver }
  }
})
</script>
<style scoped lang="scss">
.multiEditor {
  width: 100%;
}
</style>
