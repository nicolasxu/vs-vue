<template>

  <tr class="request-item">
    <td>{{request.from_company_name}}</td>
    <td>{{request.from_user_name}}</td>
    <td>{{this.toBeYour}}</td>
    <td>{{request.createdAt}}</td>
    <td>{{request.status}}</td>
    <td>
      <div v-show="request.status=='pending'">
        <button class="uk-button uk-button-mini uk-button-danger btn-delete" v-show="showDelete" @click="deleteRequest">Widthdraw</button>
        <button class="uk-button uk-button-mini uk-button-success btn-accept" v-show="showAcceptReject" @click="accept">Accept</button> 
        <a href="javascript:void(0)" @click.prevent="reject" class="reject-link" v-show="showAcceptReject">Reject</a>         
      </div>
      <div v-show="request.status!='pending'">{{request.status}}</div>
    </td>

  </tr>

</template>

<script>
  import api from '../../../util/api'
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
      showAcceptReject() {
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
      async accept() {
        console.log('accept')
        let res
        try {
          res = await api.request.approve(this.request._id)
          if (!res.data.approveRequest.err_code) {
            
            this.$emit('refresh', this.request._id)
          } else {
            console.log(res.data.approveRequest.err_msg)
          }
        } catch (e) {
          console.error(e)
        }
        

        console.log('accept res', res)
      },
      async reject() {
        console.log('reject')
        let res
        try {
          res = await api.request.reject(this.request._id)
          if (!res.data.rejectRequest.err_code) {
            this.$emit('refresh', this.request._id)
          } else {
            console.log(res.data.rejectRequest.err_msg)
          }
        } catch (e) {
          console.error(e)
        }
       
        console.log('reject res', res)
      },
      async deleteRequest() {
        console.log('delete')
        let res
        try {
          res = await api.request.deleteRequest(this.request._id)
          if (!res.data.deleteRequest.err_code) {
            this.$emit('delete', this.request._id)
          } else {
            console.log(res.data.deleteRequest.err_msg)
          }
        } catch(e) {
          console.error(e)
        }
        console.log('delete request', res)
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