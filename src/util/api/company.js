
import base from './_base.js'
import request from '../request.js'

import store from '../../components/store.js'

const graphqlEndpoint = base.graphqlEndpoint
const baseUrl = base.baseUrl

export {
  getDetail, create, update, findLiveByEmail
}

function getDetail() {
  // get my company info without clients or vendors.
  // Clients and vendors have their own API
  let query = `
    query myQuery {
      myCompany {
        _id
        name
        creator
        isActive
        invoiceEmails
        members {
          _id
          email
          role
          active
          updatedAt
          firstName
          lastName
        }
        templates
        addressLine1
        addressLine2
        city
        state
        zip
        country
        creatorCompanyId
        createdAt
        updatedAt
        err_code
        err_msg
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

function create(myCompany) {

  let query = `
    mutation myMutation ($myCompany: CompanyInput) {
      createMyCompany(input: $myCompany) {
        _id
        name
      }
    }
  `
  let variables = {myCompany: myCompany}

  let payload = {
    query: query,
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)

}


function update() {

}

function findLiveByEmail(email) {
  // find live company by email
  // return null or company

  let query = `

    query myQuery ($email: String) {
      getCompanyByEmail(email: $email ) {
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
    }


  `

  let variables = {
    email: email
  }

  let payload = {
    query : query,
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)
  
}



