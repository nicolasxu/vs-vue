<template>
  <div class="setting">
    <h3>Setting</h3>
    
    <!-- a tab goes here -->
  </div>
</template>

<script>
  export default {
    name: 'setting', 
    data() {
      return {

      }
    },
    watch: {
      '$route': function (to, from) {
        console.log('to', to)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .setting {
    // background-color: yellow;
  }
</style>