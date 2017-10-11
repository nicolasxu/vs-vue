<template>
  <div class="requests">
    <h3>Requests to establish client ro vendor relationship with your company</h3>
    <div class="command-bar">
      <button type="button" class="uk-button uk-button-primary uk-button-small" @click="goBack">Back</button>      
    </div>
    <div class="list">

      <ul class="uk-tab" >
        <li :class="{'uk-active': selectedTab == 'received'}"><a href="javascript:void(0)" @click.prevent="received">Received</a></li>
        <li :class="{'uk-active': selectedTab == 'sent'}"><a href="javascript:void(0)" @click.prevent="sent">Sent</a></li>
      </ul>
      
      <ul class="uk-switcher">
        <li :class="{'uk-active': selectedTab == 'received'}"><request-list type="received"></request-list></li>
        <li :class="{'uk-active': selectedTab == 'sent'}"><request-list type="sent"></request-list></li>
      </ul>
      
    </div>    
  </div>

</template>

<script>
  import RequestList from './RequestList.vue'
  export default {
    name: 'requests',
    components: { RequestList },
    
    data() {
      return {
        selectedTab: 'received'
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      received() {
        this.selectedTab = 'received'
      },
      sent() {
        this.selectedTab = 'sent'
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .requests {
    @extend %dash-component-margin-padding;
    .command-bar {
      margin-bottom: 1em;
    }
    .list {
      
    }
  }
</style>