<template>
  <tr class="received-list-item" @click="toReceivedInvoiceDetail">
    <td class="inv-num">
      11 {{invoice.number}} 
    </td>
    <td>{{invoice.fromCompany && invoice.fromCompany.name}}</td>
    <td>{{invoiceDateStr}}</td>
    <td>{{dueDateStr}}</td>
    <td>{{invoice.status}}</td>
    <td>{{invoice.total}}</td>
    <td>{{invoice.paymentStatus}}</td>    
  </tr>

</template>

<script>
  import parseDate from '../../../util/parseDate.js'
  export default {
    name: 'ReceivedListItem',
    components: {},
    props: ['invoice'],
    data() {
      return {

      }
    },
    computed: {
      invoiceDateStr() {
        return parseDate(this.invoice.invoiceDate)
      },
      dueDateStr() {
        return parseDate(this.invoice.dueDate)
      }
    },
    methods: {
      toReceivedInvoiceDetail() {
        this.$router.push({name: 'Dash.Received.Detail', params: { id: this.invoice._id }})
      }
    }

  }
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .received-list-item {
    &:hover {
      cursor: pointer;
    }    
  }

</style>