<template>
  <div class="client">
    Client111
    <div class="search-bar">
      search bar
    </div>
    <div class="command-bar">
      command bar
    </div>
    <div class="list">
      <!-- client list -->
      <client-list></client-list>
    </div>
  </div>
</template>

<script>
  import ClientList from './ClientList.vue'
  export default {
    name: 'client',
    components: {ClientList},
    data() {
      return {
      }
    }
  }
</script>

<style lang="sass" scoped>
  .client {
    background-color: yellow;
  }
</style>