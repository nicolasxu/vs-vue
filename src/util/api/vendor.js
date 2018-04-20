
import base from './_base.js'
import request from '../request.js'

import store from '../../components/store.js'

const graphqlEndpoint = base.graphqlEndpoint
const baseUrl = base.baseUrl


export {
  getList, getDetail, sever
}

function getList( offset = 0, limit = 50) {
  let query = `
    query myQuery ($offset: Int, $limit: Int) {
      vendors(offset: $offset, limit: $limit) {
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
        err_code
        err_msg
      }
    }
  `
  let variables = {
    offset: offset,
    limit: limit
  }

  let payload = {
    query: query,
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)
}

function getDetail(vendorId) {

  let query = `
    query myQuery ($id: String) {
      vendor(id: $id) {
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
        err_code
        err_msg
      }
    }
  `
  let variables = {
    id: vendorId
  }

  let payload = {
    query: query,
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)

}

function sever(vendorId) {

  let query = `
    mutation myMutation($id: String) {
      severVendorRelationship(id: $id) {
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
        vendors
        createdAt
        updatedAt
        err_code
        err_msg
      }
    }
  `
  let variables = {
    id: vendorId
  }

  let payload = {
    query: query,
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)
}