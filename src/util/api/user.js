
import base from './_base.js'
import request from '../request.js'

import store from '../../components/store.js'

let token = store.token
const graphqlEndpoint = base.graphqlEndpoint
const baseUrl = base.baseUrl

export {
  register, createToken, getDetail, verifyEmail,
  sendResetPwdLink, resetPwd
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

function register(user) {
  const url = baseUrl + '/user'
  return request.post(url, user)
}

function createToken(user) {
  const url = baseUrl + '/user/token'
  console.log('user', user)
  return request.post(url, user)
}

function verifyEmail(hash, email) {
  const url = baseUrl + '/user/verifyemail'
  return request.post(url, {hash: hash, email: email})
}

function sendResetPwdLink(email) {
  const url = baseUrl + '/user/resetpwdlink'
  return request.post(url, {email: email})
}

function resetPwd(email, hash, pwd) {
  const url = baseUrl + '/user/resetpwd'
  return request.post(url, {email: email, hash: hash, pwd: pwd})
}

