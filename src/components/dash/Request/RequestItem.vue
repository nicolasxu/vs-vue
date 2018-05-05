<template>

  <tr class="request-item">
    <td>{{request.from_company_name}}</td>
    <td>{{request.from_user_name}}</td>
    <td>{{this.toBeYour}}</td>
    <td>{{request.createdAt}}</td>
    <td>{{request.status}}</td>
    <td>
      <div v-show="request.status=='pending'">
        <button class="uk-button uk-button-mini uk-button-danger btn-delete" v-show="showDelete" @click="widthdraw">Widthdraw</button>
        <button class="uk-button uk-button-mini uk-button-success btn-accept" v-show="showAcceptReject" @click="accept">Accept</button> 
        <a href="javascript:void(0)" @click.prevent="reject" class="reject-link" v-show="showAcceptReject">Decline</a>         
      </div>
    </td>

  </tr>

</template>

<script>
  import api from '../../../util/api'
  import store from '../../store.js'
  import processResErrorMixin from '../../../util/processResError.js'
  import bus from './requestBus.js'
  export default {
    name: 'requestItem',
    props: ['request'],
    mixins: [processResErrorMixin],
    data() {
      return {

      }
    },
    computed: {
      toBeYour() {
        if (store.company._id === this.request.client_company_id) {
          return 'Vendor'
        } else {
          return 'Client'
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
      
    },
    methods: {
      async accept() {
        
        let confirmed = confirm('Are you sure you want to confirm this request?') 
        if (!confirmed) {
          return
        }

        let res
        try {
          res = await api.request.approve(this.request._id)
          if (!res.data.approveRequest.err_code) {
            
          
          } else {
            console.log(res.data.approveRequest.err_msg)
          }
        } catch (e) {
          console.error(e)
        }
        
      },
      async reject() {

        let confirmed = confirm('Are you sure you want to reject this request?') 
        if (!confirmed) {
          return
        }       

        let res
        try {
          res = await api.request.reject(this.request._id)
          if (!res.data.rejectRequest.err_code) {
            
          } else {

          }
        } catch (e) {
          console.error(e)
        }
       
        console.log('reject res', res)
      },
      async widthdraw() {
        console.log('widthdraw...')
        let confirmed = confirm('Do you want to widthdraw this request?') 
        if (!confirmed) {
          return
        }
        let widthdrawRes
        try {
          widthdrawRes = await api.request.widthdraw(this.request._id)
        } catch (e) {
          console.log('widthdraw request error: ', e)
          return
        }
        let isSuccess = this.processResError(widthdrawRes, 'withdrawRequest')

        if (isSuccess) {
          this.$notify({
            group: 'foo',
            type: 'success', // 'warning', 'success', 'info', 'warning'
            title: '&#10003; Success',
            text: 'Request withdrawn'
          })
          
          bus.$emit('status', {_id: this.request._id, status: 'widthdraw'})
        }
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