<template>
  <nav class="navigation">
    <h2>{{msg}}</h2>
  </nav>
</template>

<script>
  export default {
    name: 'navigation',
    data() {
      return {
        msg: 'This is Navigation component'
      }
    }
  }
</script>

<style lang="sass" scoped>
  .navigation {

  }
</style>