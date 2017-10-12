<template>

  <tr class="request-item">
    <td>{{request.from_company_name}}</td>
    <td>{{request.from_user_name}}</td>
    <td>{{this.toBeYour}}</td>
    <td>{{request.createdAt}}</td>
    <td>{{request.status}}</td>
    <td>
      <button class="uk-button uk-button-small uk-button-danger" v-show="showDelete" @click="deleteRequest">Delete</button>
      <button class="uk-button uk-button-small uk-button-success" @click="accept">Accept</button> 
      <a href="javascript:void(0)" @click.prevent="reject">Reject</a> 
    </td>

  </tr>

</template>

<script>
  import store from '../../store.js'
  export default {
    name: 'requestItem',
    props: ['request'],
    data() {
      return {

      }
    },
    computed: {
      toBeYour() {
        if (this.to_company_id === this.client_company_id) {
          return 'vendor'
        } else {
          return 'client'
        }
      },
      showDelete() {
        if (this.request.status === 'pending' && this.request.from_company_id === store.company._id) {
          return true
        } else {
          return false
        }
      }
    },
    created() {
      console.log('store', store)
    },
    methods: {
      accept() {
        console.log('accept')
      },
      reject() {
        console.log('reject')
      },
      deleteRequest() {
        console.log('delete')
      }
    }

  }
</script>

<style lang="sass" scoped>
  .request-item {

  }
</style>