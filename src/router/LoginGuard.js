import store from '../components/store.js'
import api from '../util/api'

export default beforeEachRouteCheckLogin

async function beforeEachRouteCheckLogin(to, from, next) {
  if (store.token) {
    next()
    return
  }

  if (to.name === 'Login' || to.name === 'Register' || to.name === 'ResetPassword' || to.name === 'VerifyEmail') {
    next()
    return
  }

  // 1. call api to get user 
  let userRes 
  try {
    userRes = await api.user.getDetail()
    console.log('userRes', userRes)
    if (userRes.err_code === 4002 || userRes.err_code === 4003) {
      next({name: 'Login'})
      return
    }
  } catch (e) {
    console.error('e', e)
    next({name: 'Login'})
    return
  }

  if (!userRes.err_code && userRes._id) {
    store.user = userRes.data.user
    next()
    return
  }

  console.error('Unknow Login guard error')

  // 2. if API return login required, then redirect to login
  // 3. if call succeed, then set user, and proceed to next()
  
}