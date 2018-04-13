<template>
  <div class="received-invoice">
    <div class="header-bar">
      <div class="title-search-positioner">
        <div class="page-title">
          &lt;received/&gt;:
        </div>      
        <form class="uk-form search-form">
          <input type="text" name="search" placeholder="search" class="uk-width-2-3 search-input">
        </form>
      </div>
      <div class="profile box-1">
        <Notification></Notification>
      </div>
    </div>
    <div class="command-bar">
      <ul class="list-pagination">
        <li class="prev">
          <a href="#"><i class="uk-icon-angle-double-left"></i> Prev</a>
        </li>
        <li class="next">
          <a href="#">Next <i class="uk-icon-angle-double-right"></i></a>
        </li>      
      </ul>      
    </div>    
    <div class="list">
      <ReceivedList :receivedInvoices="receivedInvoices"></ReceivedList>
    </div>
  </div>
</template>

<script>
  import api from '../../../util/api'
  import Notification from '../Notification.vue'
  import ReceivedList from './ReceivedList.vue'

  export default {
    name: 'received', 
    components: {Notification, ReceivedList},
    data() {
      return {
        receivedInvoices: [{}, {}],
        offset: 0,
        limit: 50,
        total: 0
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        let res
        try {
          res = await api.invoice.getList('received', this.offset, this.limit)
        } catch(e) {
          console.log('Get received invoice list error', e)
            this.$notify({
              timeout: 3000,
              group: 'foo',
              type: 'error',
              title: '&#10005; Error',
              text: e.message          
            })        
          return          
        }
        if (res.err_code === 4002) {
          this.$router.push({name: 'Login'})
          return
        }
        if (res.errors) {
          this.$notify({
            timeout: 3000,
            group: 'foo',
            type: 'error',
            title: '&#10005; Error',
            text: res.errors[0].message          
          })
          return
        }
        if (res.data.invoices.err_code) {
          this.$notify({
            timeout: 3000,
            group: 'foo',
            type: 'error',
            title: '&#10005; Error',
            text: ''             
          })
          return
        }
        this.receivedInvoices = res.data.invoices.docs
        this.offset = res.data.invoices.offset
        this.total = res.data.invoices.total
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .received-invoice {
    min-width: 435px;
    @extend %dash-component-margin-padding;
    .header-bar {
      @extend %header-bar;
      .title-search-positioner {
        .search-form {
          .search-input {
            padding-left: 8em;
          }          
        }
      }
      .profile {
        @extend %profile;
      }
    }
    .command-bar {
      position: relative;
      margin-bottom: 1em;
      .list-pagination {
        @extend %list-pagination;
      }
    }
    .list {
      clear: both;
    }    
  }
</style>