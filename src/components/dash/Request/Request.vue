<template>
  <div class="request">
    <div class="header-bar">
      <h3>Requests to establish client ro vendor relationship with your company</h3>
    </div>
    
    <div class="command-bar">
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
        <li :class="{'uk-active': selectedTab == 'received'}">
          <request-list type="received" :requests="requests"></request-list>
        </li>
        <li :class="{'uk-active': selectedTab == 'sent'}">
          <request-list type="sent" :requests="requests"></request-list>
        </li>
      </ul>
      
    </div>    
  </div>

</template>

<script>
  import RequestList from './RequestList.vue'
  import api from '../../../util/api'
  import processResErrorMixin from '../../../util/processResError.js'
  import requestBus from './requestBus.js'

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
      window.testThis = this
      requestBus.$on('status', this.updateStatus)

    },
    methods: {
      updateStatus(payload) {
        for(let i = 0; i < this.requests.length; i++) {
          if (this.requests[i]._id === payload._id) {
            this.requests[i].status = payload.status
            return
          }
        }
      },
      getRequests() {
        let direction = this.selectedTab

      },
      goBack() {
        this.$router.go(-1)
      },
      received() {
        
        this.selectedTab = 'received'
        this.total = 0
        this.offset = 0
        // If same route, no new route request is made,
        // so we don't have to detect duplicated routing
        // request here. 
        this.$router.push({name: 'Dash.Request', query: {direction: 'received'}})
        this.fetch(this.selectedTab)
      },
      sent() {
        
        this.selectedTab = 'sent'
        this.total = 0
        this.offset = 0
        this.$router.push({name: 'Dash.Request', query: {direction: 'sent'}})
        this.fetch(this.selectedTab)
      },
      async fetch(direction) {
        let getListRes
        
        try {

          if (direction === 'sent') {
            getListRes = await api.request.getSentList(this.offset, this.limit)
          } else {
            getListRes = await api.request.getReceivedList(this.offset, this.limit)
          }

        } catch (e) {
          console.log('Making request error')
          return
        }
        let isSuccess = false
        if (direction === 'sent') {
          isSuccess = this.processResError(getListRes, 'sentRequests')
          if (isSuccess) {
            this.requests = getListRes.data.sentRequests.docs
          }
        } else {
          isSuccess = this.processResError(getListRes, 'receivedRequests')
          if (isSuccess) {
            this.requests = getListRes.data.receivedRequests.docs
          }
        }

        console.log('getListRes', getListRes)

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