<template>
  <div class="request-list">
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
        requests: []
       
      }
    },
    async created() {
      if (this.type === 'received') {
      
      } 

      if (this.type === 'sent') {
   

      }
    },
    methods: {
  
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