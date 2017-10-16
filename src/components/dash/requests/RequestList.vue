<template>
  <div class="request-list">
    <ul class="uk-pagination list-pagination">
      <li class="uk-pagination-previous prev"><a href="#"><i class="uk-icon-angle-double-left"></i> Prev</a></li>
      <li class="uk-pagination-next next"><a href="#">Next<i class="uk-icon-angle-double-right"></i></a></li>      
    </ul>
    <table class="uk-table uk-table-hover uk-table-striped client-list-table">
        <thead>
          <tr>
            <th>From</th>
            <th>Pserson</th>
            <th>To Be Your</th>
            <th>Sent Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
     
        <tbody>
          {{type}}
          <request-item v-for="(request, index) in requests" :key="index" :request="request" @refresh="refreshItem" @delete="deleteitem"></request-item>                
        </tbody>
    </table>    
  </div>
</template>

<script>
  import api from '../../../util/api'
  import RequestItem from './RequestItem.vue'
  export default {
    name: 'requestList',
    props: ['type'],
    components: { RequestItem },
    data() {
      return {
        requests: [],
        total: 0,
        offset: 0,
        limit: 50
      }
    },
    async created() {
      if (this.type === 'received') {
        // get received
        let res = await api.request.getReceived()
        this.requests = res.data.receivedRequests.docs
        this.total = res.data.receivedRequests.total
        this.limit = res.data.receivedRequests.limit
        this.offset = res.data.receivedRequests.offset
      } 

      if (this.type === 'sent') {
        // get sent
        let res = await api.request.getSent()
        console.log('sent request')
        this.requests = res.data.sentRequests.docs
        this.total = res.data.sentRequests.total
        this.limit = res.data.sentRequests.limit
        this.offset = res.data.sentRequests.offset

      }
    },
    methods: {
      async refreshItem(requestId) {
        console.log('refreshing', requestId)
        let res
        try {
          res = await api.request.getDetail(requestId)
          if (res.data.requestDetail.err_code) {
            console.log(res.data.requestDetail.err_msg)
          }
          let updatedRequest = res.data.requestDetail

          for(let i = 0; i < this.requests.length; i++) {
            if (this.requests[i]._id === requestId) {
              this.requests[i].status = updatedRequest.status
              break
            }
          }

         } catch(e) {
          console.error(e)
        }
      },
      deleteitem(requestId) {
        for(let i = this.requests.length -1; i >= 0; i--) {
          if (this.requests[i]._id === requestId) {
            this.requests.splice(i,1)
          }
        }
      }
    }
  }  
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .request-list {
    position: relative;
    .list-pagination {
      @extend %list-pagination;
    }
  }
</style>