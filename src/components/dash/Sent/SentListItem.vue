<template>
  <tr class="sent-list-item" @click="toSentInvoiceDetail">
   
    <td class="inv-num">
      {{invoice.number}} 
    </td>
    <td>{{invoice.toCompany && invoice.toCompany.name}}</td>
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
    name: 'SentListItem',
    components: {},
    props: ['invoice'],
    data() {
      return {}
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
      toSentInvoiceDetail() {
        console.log('toSentDetail...')
        this.$router.push({name: 'Dash.Sent.Detail', params: { id: this.invoice._id }})
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../scss/reusable.scss';
  .sent-list-item {
    
    .inv-num {
      position: relative;
      .view-invoice {

        display: none;
        position: absolute;
        // top: 2px;
      }
    }

    &:hover {
      cursor: pointer;
    }


  }
</style>