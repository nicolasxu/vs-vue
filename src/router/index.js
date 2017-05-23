import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ResetPassword from '@/components/ResetPassword'
import Navigation from '@/components/dash/Navigation'
import WorkingArea from '@/components/dash/WorkingArea'
import loginGuard from './LoginGuard.js'
// import myCompanyExistGuard from './MyCompanyExistGuard.js'

import Received from '../components/dash/Received'
import Sent from '../components/dash/Sent'
import Create from '../components/dash/Create'
import Setting from '../components/dash/setting/Setting'
import Account from '../components/dash/setting/Account'
import MyCompany from '../components/dash/setting/MyCompany'
import Plan from '../components/dash/setting/Plan'
import RolePrivilege from '../components/dash/setting/RolePrivilege'

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
      
      components: {
        nav: Navigation,
        workingArea: WorkingArea
      },
      children: [
        {
          path: '',
          name:'Dash.received',
          component: Received
        }, {
          path: 'received',
          component: Received
        }, {
          path: 'sent',
          component: Sent
        }, {
          path: 'create', 
          component: Create
        },
        {
          path: 'setting',
          component: Setting,
          children: [
            {
              path: 'account',
              component: Account
            }, {
              path: 'mycompany',
              component: MyCompany
            }, {
              path: 'plan',
              component: Plan
            }, {
              path: 'RolePrivilege',
              component: RolePrivilege
            }
          ]
        }
      ]
    }
  ]
})

theRouter.beforeEach(loginGuard)


export default theRouter
