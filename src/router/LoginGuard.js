import store from '../components/Store.js'
import api from '../util/api.js'

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
    // 2. if API return login required, then redirect to login
    // 3. if call succeed, then set user, and proceed to next()
  
}