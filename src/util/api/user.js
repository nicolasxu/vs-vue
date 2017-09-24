
import base from './_base.js'
import request from '../request.js'

import store from '../../components/store.js'

let token = store.token
const graphqlEndpoint = base.graphqlEndpoint
const baseUrl = base.baseUrl

export {
  register, createToken, getDetail
}

function getDetail () {
  let query = `
    query myQuery {
      user {
        _id
        email
        firstName
        lastName
        active
        role
        updatedAt

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

function register() {

}

function createToken(user) {
  const url = baseUrl + '/user/token'

  return request.post(url, user)

}

