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
        </tbody>
    </table>    
  </div>
</template>

<script>
  import api from '../../../util/api'
  export default {
    name: 'requestList',
    props: ['type'],
    data() {
      return {

      }
    },
    created() {
      if (this.type === 'received') {
        // get received
      } 

      if (this.type === 'sent') {
        // get sent
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