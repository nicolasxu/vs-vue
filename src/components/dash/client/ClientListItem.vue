<template>
  <tr class="client-item">
    <td>{{clientIndex}}</td>
    <td><router-link :to="{name: 'Dash.Client.Detail', params: {id: client._id}}">{{client.name}}</router-link>  </td>
    <td>static data</td>
    <td>static data</td>
    <td>static data</td>
    <td>{{client.public}}</td>

  </tr>  
</template>

<script>
  import api from '../../../util/api'
  export default {
    name: 'clientItem',
    data() {
      return {} 
    },
    props: ['client', 'clientIndex'],
    created() {
      console.log(this.client) 
    }
  }
</script>

<style lang="sass" scoped>
  .client {
    background-color: yellow;
  }
</style>
