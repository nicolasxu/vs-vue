<template>
  <div class="vs-vendor">

    <div class="header-bar">
      <div class="title-search-positioner">
        <div class="page-title">&lt;vendor/&gt;:</div>
        <form class="uk-form search-form">
          <input type="text" name="search" placeholder="search" class="uk-width-2-3">
        </form>
      </div>

      <div class="profile">
        <div class="profile-box box-1">

          <Notification></Notification>

        </div>
      </div>      
 
    </div>
    <div class="command-bar">
      <button type="button" class="uk-button uk-button-primary uk-button-small" @click="goToConnect">Add</button>

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
      <vendor-list :vendors="vendors"></vendor-list>
    </div>
  </div>
</template>

<script>
  import api from '../../../util/api'
  import Notification from '../Notification.vue'
  import VendorList from './VendorList.vue'
  import processResErrMixin from '../../../util/processResError.js'
  export default {
    name: 'Vendor',
    components: {Notification, VendorList},
    mixins: [processResErrMixin],
    props: [],
    data() {
      return {
        vendors:[],
        total: 0,
        offset: 0,
        limit: 50
      }
    },
    async created() {
      let res
      try {
        res = await api.vendor.getList(this.offset, this.limit)
      } catch (e) {
        res = {}
        console.log('Get vendor list error', e)
        return
      }
      let isSuccess = this.processResError(res, 'vendors')
      if (!isSuccess) {
        return
      }

      this.vendors = res.data.vendors.docs
      this.total = res.data.vendors.total
      this.offset = res.data.vendors.offset
      this.limit = res.data.vendors.limit
      
    },
    methods: {
      goToConnect() {
        // todo: connect can be used for both client and vendor, need refactor here
        this.$router.push({name: 'Dash.Client.Connect', query:{q1: 'q1'}, params: {email: 'abc'} })

      }
    }
  }

</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .vs-vendor {
    min-width: 435px;
    @extend %dash-component-margin-padding;
    .header-bar {
      margin-bottom: 1em;
      @extend %header-bar;
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
      margin-bottom: 1em;
    }    

  }
</style>







