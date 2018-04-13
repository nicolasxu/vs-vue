import base from './_base.js'
import request from '../request.js'

import store from '../../components/store.js'
const graphqlEndpoint = base.graphqlEndpoint
const baseUrl = base.baseUrl



export {
  send, getList, getById, voidById
}

function send(invoice) {

  let query = `
    mutation myMutation ($input: InvoiceInput) {
      createInvoice (input: $input) {
        _id
        fromCompany {
          companyId
          name
          userId
          userName
        }
        toCompany {
          companyId
          name
        }
        templateId
        invoiceNumber
        total
        invoiceDate
        dueDate
        term {
          day
          desc
        }
        renderedInvoice
        status
        viewed
        viewId
        paymentStatus
        transactionId
        paidDate

        err_code
        err_msg 

      }
    }
  `

  let variables = {
    input: invoice
  }

  let payload = {
    query: query,
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)
}

function getList(type = 'sent', offset = 0, limit = 50) {
  let query = `
    query myQuery ($type: String, $offset: Int, $limit: Int) {
      invoices(offset: $offset, limit: $limit, type: $type) {
        docs {
          _id
          toCompany {
            companyId
            name
          }
          templateId
          viewId
          number
          total
          invoiceDate
          dueDate
          
          status
          viewed
          paymentStatus
          transactionId
          paidDate          
        }
        total
        limit
        offset
        err_code
        err_msg        
      }
    }
  `
  let variables = {
    type: type,
    offset: offset,
    limit: limit
  }

  let payload = {
    query: query,
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)
}

function getById(type = 'sent', id) {
  let query = `
    query myQuery ($type: String, $id: String) {
      invoice (id: $id, type: $type) {
        _id
        fromCompany {
          companyId
          name
          userId
          userName
        }
        toCompany {
         companyId
          name      
        }
        templateId
        viewId
        number
        total
        invoiceDate
        dueDate
        renderedInvoice
        status
        viewed
        paymentStatus
        transactionId
        paidDate
        err_code
        err_msg        
      }
    }
  `
  let variables = {
    type: type,
    id: id
  }

  let payload = {
    query: query,
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)
}

function voidById(id) {
  let query = `
    mutation myMutation ($id: String) {
      voidInvoice(id: $id) {
        _id
        fromCompany {
          companyId
          name
          userId
          userName
        }
        toCompany {
         companyId
          name      
        }
        templateId
        viewId
        number
        total
        invoiceDate
        dueDate
        renderedInvoice
        status
        viewed
        paymentStatus
        transactionId
        paidDate
        err_code
        err_msg     
      }
    }
  `
  let variables = {
    id: id
  }

  let payload = {
    query: query,
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)
}