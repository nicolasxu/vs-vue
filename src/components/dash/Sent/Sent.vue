<template>
  <div class="sent-invoice">
    <div class="header-bar">
      <div class="title-search-positioner">
        <div class="page-title">
          &lt;sent/&gt;:
        </div>
        <form class="uk-form search-form">
          <input type="text" name="search" placeholder="search" class="uk-width-2-3">        
        </form>            
      </div>
      <div class="profile">
        <div class="profile-box box-1">
          <Notification></Notification>
        </div>
      </div>       
    </div>
    <div class="command-bar">
      command bar
    </div>
    <div class="list">
      list goes here
    </div>
  </div>
</template>

<script>
  import Notification from '../Notification.vue'
  import api from '../../../util/api'

  export default {
    name: 'sent',
    components: {Notification},
    data() {
      return {

      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .sent-invoice {
    min-width: 435px;
    @extend %dash-component-margin-padding;
    .header-bar {
      @extend %header-bar;
      .profile {
        @extend %profile;
      }
    }

  }
</style>