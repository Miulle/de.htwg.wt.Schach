<template>
  <div class="chess-app">
    <chessboard></chessboard>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  Vue.component('chessboard', require('./common/_chessboard.vue').default);
  export default Vue.extend({});
</script>

<style scoped lang="scss">
</style>