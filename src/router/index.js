import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ResetPassword from '@/components/ResetPassword'
import Navigation from '@/components/dash/Navigation'
import WorkingArea from '@/components/dash/WorkingArea'
import beforeEachRoute from './globalGuard.js'

Vue.use(Router)

 
let theRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },{
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/Register',
      name: 'Register',
      component: Register
    }, {
      path: '/resetPassword',
      name: 'ResetPassword',
      component: ResetPassword
    }, {
      path: '/dash',
      name: 'Dash',
      components: {
        nav: Navigation,
        workingArea: WorkingArea
      }
    }
  ]
})

theRouter.beforeEach(beforeEachRoute)

export default theRouter
