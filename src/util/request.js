// this is request js

// module.exports = {
//   get: getFn,
//   post: postFn,
//   put: putFn,
//   delete: deleteFn
// }

export default {
  get: getFn,
  post: postFn,
  put: putFn,
  delete: deleteFn  
}

// TODO: http://www.html5rocks.com/en/tutorials/cors/

function postFn(url, payload) {
  return $.ajax({
    method: 'POST',
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
    xhrFields: {
      withCredentials: true
    },
    url: urlWithQueryString
  });
}

function putFn(url, payload) {
  return $.ajax({
    method: 'PUT',
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
    url: url,
    xhrFields: {
      withCredentials: true
    },
    data: payload
  });
}

