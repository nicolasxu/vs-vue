<template>
  <div class="request">
    <div class="header-bar">
      <h3>Requests to establish client ro vendor relationship with your company</h3>
    </div>
    
    <div class="command-bar">
      <button type="button" class="uk-button uk-button-primary uk-button-small" 
      @click="goBack">Back</button>
      <ul class="list-pagination">
        <li class="prev">
          <a href="javascript:void(0)"><i class="uk-icon-angle-double-left"></i> Prev</a>
        </li>
        <li class="next">
          <a href="javascript:void(0)">Next <i class="uk-icon-angle-double-right"></i></a>
        </li>      
      </ul>     
    </div>
    <div class="list">
      <ul class="uk-tab" >
        <li :class="{'uk-active': selectedTab == 'received'}">
          <a href="javascript:void(0)" @click.prevent="received">Received</a>
        </li>
        <li :class="{'uk-active': selectedTab == 'sent'}">
          <a href="javascript:void(0)" @click.prevent="sent">Sent</a>
        </li>
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
  import api from '../../../util/api'
  import processResErrorMixin from '../../../util/processResError.js'
  export default {
    name: 'Request',
    components: { RequestList },
    mixins: [processResErrorMixin],
    data() {
      return {
        selectedTab: 'received',
        requests: [],
        total: 0,
        offset: 0,
        limit: 50
      }
    },
    created() {
      let direction = this.$route.query.direction
      if (direction === 'received') {

        this.received()
      } else {

        this.sent()
      }
    },
    methods: {
      getRequests() {
        let direction = this.selectedTab

      },
      goBack() {
        this.$router.go(-1)
      },
      received() {
        this.selectedTab = 'received'
        this.$router.push({name: 'Dash.Request', query: {direction: 'received'}})
      },
      sent() {
        this.selectedTab = 'sent'
        this.$router.push({name: 'Dash.Request', query: {direction: 'sent'}})
      },
      fetch() {

      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .request {
    @extend %dash-component-margin-padding;
    .command-bar {
      position: relative;
      margin-bottom: 1em;
      .list-pagination {
        @extend %list-pagination;
      }      

    }
    .list {
      
    }
  }
</style>