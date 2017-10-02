<template>
  <div class="client">
    <div class="header-bar">
      <form class="uk-form">
        
        <input type="text" name="search" placeholder="search" class="uk-width-2-3">
        <div class="profile">
          <div class="profile-box box-1">
            Notification
          </div>
          <div class="profile-box box-2">
            Profile
          </div>
        </div>
      </form>
    </div>
    <div class="command-bar">
      <button type="button" class="uk-button uk-button-primary uk-button-small" @click="newClient">Create</button>
      <button type="button" class="uk-button uk-button-primary uk-button-small" >Connect</button>
      <ul class="uk-pagination list-pagination">
        <li class="uk-pagination-previous prev"><a href="#"><i class="uk-icon-angle-double-left"></i> Prev</a></li>
        <li class="uk-pagination-next next"><a href="#">Next<i class="uk-icon-angle-double-right"></i></a></li>      
      </ul>      
    </div>
    <div class="list">
      <!-- client list -->
      <client-list></client-list>
    </div>
  </div>
</template>

<script>
  import ClientList from './ClientList.vue'
  export default {
    name: 'client',
    components: {ClientList},
    data() {
      return {
      }
    },
    methods: {
      newClient() {
    
        this.$router.push({name: 'Dash.Client.New'})
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .client {
    min-width: 435px;
    .header-bar {
      @extend %dash-component-margin-padding;
      .profile {
        float: right;
        .profile-box {
          display: inline-block;
          min-width: 30px;
          padding: 0 20px;
          line-height: 30px;
          height: 30px;
          text-align: center;
        }
        .box-1 {
          padding: 0 20px;
          background-color: pink;
        }
        .box-2 {
          
          background-color: DimGray;
        }
      }
    }
    .command-bar {
      
      position: relative;
      @extend %dash-component-margin-padding;

      .list-pagination {
        float: right;
        @extend %list-pagination;
        margin: 0;
        margin-top: 5px;

      }
    }
    .list {
      @extend %dash-component-margin-padding;
    }
  }
</style>