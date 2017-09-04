import store from '../components/store.js'
import { api } from '../util/api'

export default beforeEachRouteCheckLogin

function beforeEachRouteCheckLogin(to, from, next) {
  if (store.user) {
    next()
    return
  }

  if (to.name === 'Login' || to.name === 'Register') {
    next()
    return
  }

  // 1. call api to get user 
  api.user.getDetail()
    .then((result)=>{
      console.log('login guard, user detail', result)
      if (result.code === 2000) {
        store.user = result.data.user
        next()
      } else {
        // redirect ...
        next({name: 'Login'})
        // next()
      }
    })
    .catch(err=> {
      console.log(err)
      if (err.status === 403) {
        next({name: 'Login'})
      }
    })
    // 2. if API return login required, then redirect to login
    // 3. if call succeed, then set user, and proceed to next()
  
}