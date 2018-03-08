
import base from './_base.js'
import request from '../request.js'

import store from '../../components/store.js'

let token = store.token
const graphqlEndpoint = base.graphqlEndpoint
const baseUrl = base.baseUrl

export {
  searchMock
}

function searchMock(query) {
  let allProducts = [
    {description: 'product A', unitPrice: 12, code: 'AX01'},
    {description: 'web development service large', unitPrice: 12, code: 'AX02'},
    {description: 'web development service small', unitPrice: 12, code: 'AX03'},
    {description: 'testing', unitPrice: 12, code: 'AX04'},
    {description: 'deployment A', unitPrice: 12, code: 'AX05'},
    {description: 'project management hour', unitPrice: 12, code: 'AX06'},
    {description: 'artist creation A', unitPrice: 12, code: 'AX07'}
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
    }, 2000)
  })

  return promise
}