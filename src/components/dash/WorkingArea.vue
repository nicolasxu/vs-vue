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
  .working-area {
    
  }
</style>