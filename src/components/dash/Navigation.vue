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
    background-color: LightCyan;
    height: 100vh;
    width: 260px;
    float: left;
  }
</style>