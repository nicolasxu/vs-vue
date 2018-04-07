// this is request js

import store from '../../src/components/store.js'

window.store = store

export default {
  get: getFn,
  post: postFn,
  put: putFn,
  delete: deleteFn  
}

// TODO: http://www.html5rocks.com/en/tutorials/cors/

function postFn(url, payload) {
  let token = store.token
  console.log('token', token, 'url: ', url)
  return $.ajax({
    url: url,
    method: 'POST',
    headers: {
      'x-access-token': token
    },
    
    xhrFields: {
      withCredentials: true
    },
    data: payload
  });
}

function getFn(urlWithQueryString) {
  let token = store.token
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
  let token = store.token
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
  let token = store.token  
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

