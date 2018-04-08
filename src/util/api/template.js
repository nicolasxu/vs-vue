
import base from './_base.js'
import request from '../request.js'

import store from '../../components/store.js'

const graphqlEndpoint = base.graphqlEndpoint
const baseUrl = base.baseUrl


export {
  getTemplates, getTemplateById, updateTemplate, deleteTemplate, createTemplate
}

function createTemplate(template) {
  let query = `
    mutation myMutation ($input: TemplateInput) {
      createTemplate(input: $input) {
        _id
        name
        html
        css
        js
        active
        isDefault
        err_code
        err_msg
      }
    }
  `
  let variables = {
    input: template
  }
  let payload = {
    query: query,
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)
}

function getTemplates() {
  let query = `
    query myQuery {
      templates {
        docs {
          _id
          name
          html
          css
          js
          active
          isDefault      
        }
        total
        offset
        limit        
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

function getTemplateById(id) {
  console.log('id in api,' , id)
  let query = `
    query myQuery ($id: String) {
      template(id: $id) {
        _id
        name
        html
        css
        js
        active
        isDefault
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
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)

}

function updateTemplate(id, template) {

  let query = `
    mutation myMutation ($id: String, $input: TemplateInput) {
      updateTemplate (id: $id, input: $input) {
        _id
        name
        html
        css
        js
        active
        isDefault
        err_code
        err_msg
      }
      
    }

  `
  let variables = {
    id: id,
    input: template
  }
  let payload = {
    query: query,
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)
}

function deleteTemplate(id) {
  let query = `
    mutation myMutation($id: String) {
      deleteTemplate (id: $id) {

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
    variables: variables
  }

  return request.post(graphqlEndpoint, payload)
}