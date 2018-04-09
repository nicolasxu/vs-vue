<template>
  <div class="sent-invoice">
    <div class="header-bar">
      <form class="uk-form">
        <input type="text" name="search" placeholder="search" class="uk-width-2-3">
        <div class="profile">
          <div class="profile-box box-1">

            <Notification></Notification>

          </div>
        </div>         
      </form>
      
     
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