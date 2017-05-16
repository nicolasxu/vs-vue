<template>
  <main class="working-area">
    <h2>{{msg}}</h2>
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

    background-color: Wheat;
    min-width: 320px;
    overflow: hidden;
    border-left: 1px solid $border-color;
    height: 100vh;
  }
</style>