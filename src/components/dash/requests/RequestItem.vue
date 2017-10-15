<template>

  <tr class="request-item">
    <td>{{request.from_company_name}}</td>
    <td>{{request.from_user_name}}</td>
    <td>{{this.toBeYour}}</td>
    <td>{{request.createdAt}}</td>
    <td>{{request.status}}</td>
    <td>
      <button class="uk-button uk-button-mini uk-button-danger btn-delete" v-show="showDelete" @click="deleteRequest">Delete</button>
      <button class="uk-button uk-button-mini uk-button-success btn-accept" v-show="showAccept" @click="accept">Accept</button> 
      <a href="javascript:void(0)" @click.prevent="reject" class="reject-link">Reject</a> 
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
      },
      showAccept() {
        if (this.request.status === 'pending' && store.company._id === this.request.to_company_id) {
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
    .btn-accept {
      background-color: #3ca776;
      &:hover {
        background-color: #6cc39b;
      }
    }

    .btn-delete {

    }
    .reject-link {
      font-size: 12px;
    }
  }
</style>