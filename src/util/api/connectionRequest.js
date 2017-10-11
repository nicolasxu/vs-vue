
import base from './_base.js'
import request from '../request.js'

import store from '../../components/store.js'

const graphqlEndpoint = base.graphqlEndpoint
const baseUrl = base.baseUrl

export {
  create, approve, reject, deleteRequest, getReceived, getSent
}


function create(toEmail, toIs) {
  let query = `
    mutation myMutation ($toEmail: String, $toIs: String) {
      createRequest(toEmail: $toEmail, toIs: $toIs) {
        _id
        from_company_id
        from_company_name
        from_user_name
        to_company_id
        to_company_name
        status
        created
        updated
      }
    }
  `
  let variables = {
    toEmail: toEmail,
    toIs: toIs
  }

  let payload = {
    query: query,
    variables: JSON.stringify(variables)
  }

  return request.post(graphqlEndpoint, payload)
}

function approve(requestId) {
  let query = `
    mutation myMutation ($requestId: String) {
      approveRequest(requestId: $requestId) {
        _id
        from_company_id
        from_company_name
        from_user_name
        to_company_id
        to_company_name
        status
        created
        updated        
      }
    }
  `
  let variables = {
    requestId: requestId
  }

  let payload = {
    query: query,
    variables: JSON.stringify(variables)
  }

  return request.post(graphqlEndpoint, payload)
}

function reject(requestId) {
  let query = `
    mutation myMutation($requestId: String) {
      rejectRequest(requestId: $requestId) {
        _id
        from_company_id
        from_company_name
        from_user_name
        to_company_id
        to_company_name
        status
        created
        updated         
      }
    }
  `
  let variables = {
    requestId: requestId
  }

  let payload = {
    query: query,
    variables: JSON.stringify(variables)
  }

  return request.post(graphqlEndpoint, payload)
}

function deleteRequest(requestId) {
  let query = `
    mutation myMutation($requestId: String) {
      deleteRequest(requestId: $requestId) {
        _id
      }
    }
  `
  let variables = {
    requestId: requestId
  }

  let payload = {
    query: query,
    variables: JSON.stringify(variables)
  }

  return request.post(graphqlEndpoint, payload)
}

function getReceived(offset = 0, limit = 50) {
  let query = `
    query myQuery ($offset: Int, $limit: Int ) {
      receivedRequests(offset: $offset, limit: $limit) {
        docs {
          _id
          from_company_id
          from_company_name
          from_user_name
          to_company_id
          to_company_name
          status
          created
          updated
        }
        total
        limit
        offset
      }
    }
  `
  let variables = {
    offset: offset,
    limit: limit
  }

  let payload = {
    query: query,
    variables: JSON.stringify(variables)
  }

  return request.post(graphqlEndpoint, payload)
}

function getSent(offset = 0, limit = 50) {
  let query = `
    query myQuery ($offset: Int, $limit: Int ) {
      sentRequests(offset: $offset, limit: $limit) {
        docs {
          _id
          from_company_id
          from_company_name
          from_user_name
          to_company_id
          to_company_name
          status
          created
          updated
        }
        total
        limit
        offset
      }
    }
  `
  let variables = {
    offset: offset,
    limit: limit
  }

  let payload = {
    query: query,
    variables: JSON.stringify(variables)
  }

  return request.post(graphqlEndpoint, payload)
}


