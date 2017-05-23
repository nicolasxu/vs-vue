<template>
  <div class="setting">
    Setting
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'setting', 
    data() {
      return {

      }
    }
  }
</script>

<style lang="sass" scoped>
  .setting {
    background-color: yellow;
  }
</style>