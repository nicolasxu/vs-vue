<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <notifications group="foo" position="top center"/>
    <router-view class="view default"></router-view>
    <router-view class="view two" name="nav"></router-view>
    <router-view class="view three" name="workingArea"></router-view>    
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">

  @import './scss/global.scss';
  #app {
    position: relative;
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
   
    color: #2c3e50;

    /*margin-top: 60px;*/
  }
</style>
