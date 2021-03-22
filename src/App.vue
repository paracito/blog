<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
/* 滚动条整体样式 */
*::-webkit-scrollbar {
  width: 10px;
}
/* 滚动条小方块样式 */
*::-webkit-scrollbar-thumb {
  width: 6px;
  background: #666;
  border-radius: 5px;
}
/* 滚动条轨道样式 */
*::-webkit-scrollbar-track {
  width: 8px;
}
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  /* scrollbar-arrow-color: red; */
}
</style>
