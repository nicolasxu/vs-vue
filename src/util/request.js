// this is request js

import store from '../../src/components/store.js'
let token = store.token

export default {
  get: getFn,
  post: postFn,
  put: putFn,
  delete: deleteFn  
}

// TODO: http://www.html5rocks.com/en/tutorials/cors/

function postFn(url, payload) {
  let token = store.token
  console.log('token', token)
  return $.ajax({
    method: 'POST',
    headers: {
      'x-access-token': token
    },
    url: url,
    xhrFields: {
      withCredentials: true
    },
    data: payload
  });
}

function getFn(urlWithQueryString) {
  return $.ajax({
    method: 'GET',
    headers: {
      'x-access-token': token
    },    
    xhrFields: {
      withCredentials: true
    },
    url: urlWithQueryString
  });
}

function putFn(url, payload) {
  return $.ajax({
    method: 'PUT',
    headers: {
      'x-access-token': token
    },    
    url: url,
    xhrFields: {
      withCredentials: true
    },
    data: payload
  });
}

function deleteFn(url, payload) {
  return $.ajax({
    method: 'DELETE',
    headers: {
      'x-access-token': token
    },    
    url: url,
    xhrFields: {
      withCredentials: true
    },
    data: payload
  });
}

