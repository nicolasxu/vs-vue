<template>
  <main class="working-area">
 
      <router-view></router-view>
  </main>
</template>

<script>
  export default {
    name: 'workingArea',
    data() {
      return {
        msg: 'This is working-area component'
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../scss/reusable.scss';
  .working-area {

    background-color: white;
    min-width: 320px;
    overflow: hidden;
    border-left: 1px solid $border-color;
    height: 100vh;
  }
</style>