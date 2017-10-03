
import base from './_base.js'
import request from '../request.js'

import store from '../../components/store.js'

const graphqlEndpoint = base.graphqlEndpoint
const baseUrl = base.baseUrl

export {
  create, connect, update, deleteExisting
}

function create(newClient) {
  let query = `
    mutation myMutation ($input: CompanyInput) {
      createMyClient(input: $input) {
        _id
        name
      }
    }

  `

  let variables = {
    input: newClient
  }

  let payload = {
    query: query,
    variables: JSON.stringify(variables)
  }
  return request.post(graphqlEndpoint, payload)
}

function update(id, newClient) {
  let query = `
    mutation myMutation($id: String, $input: CompanyInput) {
      updateMyClient(id: $id, input: $input) {
        _id
        name
        public
        creator
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
    variables: JSON.stringify(variables)
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
    variables: JSON.stringify(variables)
  }

  return request.post(graphqlEndpoint, payload)
}

function getList() {
  let query = `
    query myQuery {
      clients {
        docs
        total
        offset
        limit
      }
    }
  `
  let variables = {}

  let payload = {
    query: query,
    variables: JSON.stringify(variables)
  }

  return request.post(graphqlEndpoint, payload)
}

function connect(id) {
  let query = `

  `

  let variables = {}

  let payload = {
    query: query,
    variables: JSON.stringify(variables)
  }
  return request.post(graphqlEndpoint, payload)
}
