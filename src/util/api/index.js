let user = require('./user.js')
let company = require('./company.js')
let client = require('./client.js')
let request = require('./connectionRequest.js')
let product = require('./product.js')
let template = require('./template.js')
const vendor = require('./vendor.js')

let api = {
  user, company, client, request, product, template, vendor
}

export default api
