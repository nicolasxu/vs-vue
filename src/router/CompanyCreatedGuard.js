import store from '../components/Store.js'
import api from '../util/api.js'

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
      if (result.code === 2000) {
        console.log('company created guard', result)
        store.company = result.data.company
        next()
      } else {
        next({name: 'Setting.MyCompany'})
      }
      
    })

}