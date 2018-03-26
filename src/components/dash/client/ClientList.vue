<template>
  <div class="client-list">     
    <table class="uk-table uk-table-hover uk-table-striped client-list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Client Name</th>
            <th>Contact Person</th>
            <th>Amount Outstanding(#)</th>
            <th>Avg. AR Cycle (days)</th>
            <th>Live</th>
          </tr>
        </thead>
     
        <tbody>
          <ClientItem v-for="(client, index) in clients" 
          :client="client" 
          :key="index" 
          :clientIndex="index"></ClientItem>                 
        </tbody>
    </table>
  </div>  
</template>

<script>
  import api from '../../../util/api'
  import ClientItem from './ClientListItem.vue'

  export default {
    name: 'clientList',
    components: {ClientItem},
    data() {
      return {
        clients: [],
        total: 0,
        offset: 0,
        limit: 50
      }
    },
    async created() {
      let res = await api.client.getList()
      this.clients = res.data.clients.docs
      this.total = res.data.clients.total
      this.offset = res.data.clients.offset
      this.limit = res.data.clients.limit
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .client-list {
    position: relative;
    .list-pagination {

      @extend %list-pagination;
    }    
    .client-list-table th, .client-list-table td {
      padding: 8px 8px;
      border-bottom: 1px solid #E5E5E5;
    }
  }
</style>