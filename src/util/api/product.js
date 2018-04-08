
import base from './_base.js'
import request from '../request.js'

import store from '../../components/store.js'

let token = store.token
const graphqlEndpoint = base.graphqlEndpoint
const baseUrl = base.baseUrl

export {
  searchMock, getProducts, getProductById, 
  updateProduct, deleteProduct,
  createProduct
}

function searchMock(query) {
  let allProducts = [
    {description: 'product A', unitPrice: 5, code: 'AX01'},
    {description: 'web development service large', unitPrice: 6, code: 'AX02'},
    {description: 'web development service small', unitPrice: 7, code: 'AX03'},
    {description: 'testing', unitPrice: 8, code: 'AX04'},
    {description: 'deployment A', unitPrice: 9, code: 'AX05'},
    {description: 'project management hour', unitPrice: 10, code: 'AX06'},
    {description: 'artist creation A', unitPrice: 11, code: 'AX07'}
  ]

  let foundProducts = []

  let promise = new Promise((resolve, reject)=> {

    setTimeout(()=> {
      if (query) {
        let lowerQuery = query
        foundProducts = allProducts.filter((p)=> {
          let totalStr = p.description + ' ' + p.code + ' ' + p.unitPrice
      
          if (totalStr.indexOf(lowerQuery) > -1) {
            return true
          } else {
            return false
          }
        })
      
        resolve (foundProducts)
      } else {
        resolve (allProducts)
      }
    }, 300)
  })

  return promise
}

function createProduct(product) {
  let query = `
    mutation myMutation ($input: ProductInput) {
      createProduct(input: $input) {
        _id
        description
        price
        shortCode
        created
        updated
      }
    }
  `
  let variables = {
    input: product
  }

  let payload = {
    query: query,
    variables: JSON.stringify(variables)
  }

  return request.post(graphqlEndpoint, payload)
}

function getProducts(offset = 0, limit = 50) {
  let query = `
    query myQuery ($offset: Int, $limit: Int) {
      products(offset: $offset, limit: $limit) {
        docs {
          _id
          description
          price
          shortCode
          created
          updated
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
    variables: JSON.stringify(variables)
  }

  return request.post(graphqlEndpoint, payload )
}

function getProductById(id) {
  let query = `
    query myQuery ($id: String) {
      product(id: $id) {
        _id
        description
        price
        shortCode
        created
        updated
        err_code
        err_msg
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

function updateProduct(id, product) {
  let query = `

    mutation myMutation ($id: String, $input: ProductInput) {
      updateProduct(id: $id, input: $input) {
        _id
        description
        price
        shortCode
        created
        updated
        err_code
        err_msg
      }
    }

  `
  let variables = {
    id: id,
    input: product
  }
  let payload = {
    query: query,
    variables: JSON.stringify(variables)
  }
  return request.post(graphqlEndpoint, payload)
}

function deleteProduct(id) {

  let query = `
    mutation myMutation ($id: String) {
      deleteProduct(id: $id) {
        _id
        count
        message
        err_code
        err_msg
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
