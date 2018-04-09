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
      list
    </div>
  </div>
</template>

<script>
  import api from '../../../util/api'
  import Notification from '../Notification.vue'

  export default {
    name: 'received', 
    components: {Notification},
    data() {
      return {
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