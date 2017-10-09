<template>
  <div class="client">
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
    <div class="command-bar">
      <button type="button" class="uk-button uk-button-primary uk-button-small" @click="newClient">Create</button>
      <button type="button" class="uk-button uk-button-primary uk-button-small" @click="goToConnect">Connect</button>
    
    </div>
    <div class="list">
      <!-- client list -->
      <client-list></client-list>
    </div>
  </div>
</template>

<script>
  import ClientList from './ClientList.vue'
  import Notification from '../Notification.vue'
  export default {
    name: 'client',
    components: {ClientList, Notification},
    data() {
      return {
     
      }
    },
    methods: {
      newClient() {
    
        this.$router.push({name: 'Dash.Client.New'})
      },
      goToConnect() {
        this.$router.push({name: 'Dash.Client.Connect', query:{q1: 'q1'}, params: {email: 'abc'} })
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
          // padding: 0 20px;
          line-height: 30px;
          height: 30px;
          text-align: center;
        }
        .box-1 {
          
          
        }
        .box-2 {
          
          background-color: DimGray;
        }
      }
    }
    .command-bar {
      
      position: relative;
      @extend %dash-component-margin-padding;


    }
    .list {
      @extend %dash-component-margin-padding;
    }
  }
</style>