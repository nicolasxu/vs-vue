import store from '../components/store.js'
import api from '../util/api'

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
  console.log('my company guard called...')
  api.company.getDetail()
    .then(result => {
      if (result.err_code === 4002) {
        // token is invalid
        next({name: 'Login'})
      }
      if (result.data.myCompany._id) {
        store.company = result.data.myCompany
        next()
      } else {
        console.log('myCompany doesn\'t exist' )
        console.log('result', result)
        next({name: 'Dash.CreateMyCompany'})
      }
    })
    .catch((err)=> {
      console.error('CompanyCreatedGuard api call error...')
      console.error(err)
    })
}