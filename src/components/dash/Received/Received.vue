<template>
  <div class="received-invoice">
    Received
  </div>
</template>

<script>
  export default {
    name: 'received', 
    data() {
      return {

      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .received-invoice {
    background-color: yellow;
    
    background-color: yellow;
    min-width: 435px;
    .header-bar {
      @extend %dash-component-margin-padding;
      .profile {
        @extend %profile;
      }
    }
  }
</style>