import store from '../components/store.js'
import {api} from '../util/api'

export default companyCreated

function companyCreated(to, from, next) {

  if(store.company) {
    next()
    return
  }

  if (to.name === 'Login' || to.name === 'Register') {
    next()
    return
  }

  api.company.getMyCompany()
    .then(result => {
      if (result.code === 2000 && result.data.company !== null) {
        console.log('company created guard', result)
        store.company = result.data.company
        next()
      } else {
        next({name: 'Setting.MyCompany'})
      }
    })
}