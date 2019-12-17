<template>
  <div class="chess-app">
    <_chessboard></_chessboard>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  Vue.component('chessboard', require('./common/_chessboard.vue').default);
  export default Vue.extend({});
</script>

<style scoped lang="scss">
  .greeting-form {
    display: block;
    text-align: center;
    padding: 25px 0px;
  }
</style>