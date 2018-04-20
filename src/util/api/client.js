
import base from './_base.js'
import request from '../request.js'

import store from '../../components/store.js'

const graphqlEndpoint = base.graphqlEndpoint
const baseUrl = base.baseUrl

export {
  create, connect, update, 
  deleteExisting, getList, 
  getDetail, searchMock,
  search, deletePrivateClient, disconnect
}

function create(newClient) {
  let query = `
    mutation myMutation ($input: CompanyInput) {
      createMyClient(input: $input) {
        _id
        name

        creator
        isActive
        invoiceEmails
        invoicePersonName
        members {
          _id
        }
        clients
        vendors 
        templates 

        addressLine1
        addressLine2
        city
        state
        zip
        country
        tel
        website
        serviceDesc
        
        createdAt
        updatedAt
        
        creatorCompanyId

        err_code
        err_msg



      }
    }

  `

  let variables = {
    input: newClient
  }

  let payload = {
    query: query,
    variables: variables
  }
  return request.post(graphqlEndpoint, payload)
}

function update(id, newClient) {
  let query = `
    mutation myMutation($id: String, $input: CompanyInput) {
      updateMyClient(id: $id, input: $input) {
        _id
        name
        creatorCompanyId
        invoiceEmails
        addressLine1
        addressLine2
        city
        state
        zip
        country
        tel
      }
    }
  `
  let variables = {
    id: id,
    input: newClient
  }

  let payload = {
    query: query,
    variables: variables
  }
  return request.post(graphqlEndpoint, payload)
}

function deleteExisting(id) {
  let query = `
    mutation myMutation ($id: String) {
      deleteMyClient(id: $id) {
        _id
        count
        message
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

function getList(limit = 50, offset = 0) {
  let query = `
    query myQuery {
      clients {
        docs {
          _id
          name
          creatorCompanyId
          isActive
          addressLine1
          addressLine2
          city
          state
          zip
          country
          tel
          createdAt
          updatedAt          
        }
        total
        offset
        limit
      }
    }
  `
  let variables = {}

  let payload = {
    query: query,
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)
}

function connect(id) {
  let query = `

  `

  let variables = {}

  let payload = {
    query: query,
    variables: variables
  }
  return request.post(graphqlEndpoint, payload)
}

function getDetail(id) {

  let query = `
    query myQuery($id: String) {
      clientDetail(id: $id) {
        _id
        name
        creatorCompanyId
        
        isActive
        invoiceEmails
        
        addressLine1
        addressLine2
        city
        state
        zip
        country
        tel        
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

function searchMock(query ) {
  let allClients =[
    { 
      _id: '1',
      name: 'Jewel Electronics', 
      addressLine1: '1342 Atha Drive', 
      addressLine2: '', 
      city: 'SENTINEL BUTTE', 
      state: 'ND', 
      zip: '58654', 
      invoiceEmails: ['abc@abc.com'], 
      invoicePersonName: 'Boss 1' },
    { 
      _id: '2',
      name: 'Spherecords', 
      addressLine1: '2840 Maxwell Street', 
      addressLine2: '', 
      city: 'Danielson', 
      state: 'CT', 
      zip: '06239', 
      invoiceEmails: ['abc2@abc2.com'], 
      invoicePersonName: 'Boss 1' },
    { 
      _id: '3',
      name: 'Nymphdream', 
      addressLine1: '893 Cheshire Road', 
      addressLine2: '', 
      city: 'BARNESVILLE', 
      state: 'OH', 
      zip: '43713', 
      invoiceEmails: ['abc3@abc3.com'], 
      invoicePersonName: 'Boss 3' }
  ]
  let foundClients = []
  let promise = new Promise((resolve, reject)=> {
    setTimeout(()=> {
      if (query) {
        let lowerQuery = query.toLowerCase()

        foundClients = allClients.filter((c) => {
          let totalStr = c.name.toLowerCase() + ' ' + c.language.toLowerCase()
          if (totalStr.indexOf(lowerQuery) > -1) {
            return true
          } else {
            return false
          }
         })

      } else {

        foundClients = allClients

      }

      resolve(foundClients)

    }, 500)
  })

  return promise
}

function search(queryStr = '') {
  let query = `

    query myQuery ($query: String ) {
      clientsSearch (query: $query) {
        docs {
          _id
          name
          creator
          isActive
          invoicePersonName
          addressLine1
          addressLine2
          city
          state
          zip
          country
          tel
          website
          serviceDesc
          createdAt
          updatedAt
          creatorCompanyId
          err_code
          err_msg
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
    query: queryStr
  }

  let payload = {
    query: query,
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)
}

function deletePrivateClient(clientId) {
  if (!clientId) {
    return
  }
  let query = `
    mutation myMutation ($id: String) {
      deleteMyClient (id: $id) {

        _id
        count
        message
        err_code
        err_msg

      }
    }
  `
  let variables = {
    id: clientId
  }

  let payload = {
    query: query,
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)
}

function disconnect(clientId) {
  if (!clientId) {
    return
  }
  let query = `
  
    mutation myMutation($id: String) {
      severClientRelationship (id: $id) {

        _id
        name

        creator
        isActive
        invoiceEmails
        invoicePersonName
        members {
          _id
        }
        clients
        vendors 
        templates 

        addressLine1
        addressLine2
        city
        state
        zip
        country
        tel
        website
        serviceDesc
        
        createdAt
        updatedAt
        
        creatorCompanyId

        err_code
        err_msg
      }
    }

  `
  let variables = {
    id: clientId
  }

  let payload = {
    query: query,
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)

}









