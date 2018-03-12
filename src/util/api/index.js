let user = require('./user.js')
let company = require('./company.js')
let client = require('./client.js')
let request = require('./connectionRequest.js')
let product = require('./product.js')
let template = require('./template.js')

let api = {
  user, company, client, request, product, template
}

export default api
