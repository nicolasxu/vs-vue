<template>
  <div class="notification">
    <div class="uk-button-dropdown"  data-uk-dropdown="{mode:'click', pos:'bottom-right'}">
      <div class="uk-button">
        Requests <i class="fa fa-handshake-o" aria-hidden="true"></i>
      </div>
      <div class="uk-dropdown">

        <ul class="uk-nav uk-nav-dropdown">
          <div><a href="#">Client Request 1</a> </div>
          <div><a href="#">Vendor Request 2</a></div>

          <div><a href="#">Client Request 3</a></div>
          <div><a href="#">Client Request 4</a></div>
          <li class="uk-nav-divider"></li>
          <li> <router-link :to="{name: 'Dash.Requests'}">See All</router-link> </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'notification',
    data() {
      return {
        dropdownOpen: false
      }
    },
    methods: {
      toggle() {
        this.dropdownOpen = !this.dropdownOpen
      }
    }
  }

</script>

<style lang="sass" scoped>
  .notification {

  }

</style>