import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ResetPassword from '@/components/ResetPassword'
import Navigation from '@/components/dash/Navigation'
import WorkingArea from '@/components/dash/WorkingArea'

import loginGuard from './LoginGuard.js'
import companyCreatedGuard from './CompanyCreatedGuard.js'

import Received from '../components/dash/Received'
import Sent from '../components/dash/Sent'
import Create from '../components/dash/Create'
import Client from '../components/dash/Client'
import Vendor from '../components/dash/Vendor'
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
          
          component: Received
        }, {
          path: 'received',
          name:'Dash.Received',
          component: Received
        }, {
          path: 'sent',
          name: 'Dash.Sent',
          component: Sent
        }, {
          path: 'create', 
          name: 'Dash.Create',
          component: Create,
          beforeEnter: companyCreatedGuard
        },{
          path: 'client',
          name: 'Dash.Client',
          component: Client,
          beforeEnter: companyCreatedGuard
        },{
          path: 'vendor',
          name: 'Dash.Vendor',
          component: Vendor,
          beforeEnter: companyCreatedGuard
        },
        {
          path: 'setting',
          component: Setting,
          children: [
            {
              path: '',
              component: Account
            },
            {
              path: 'account',
              name: 'Setting.Account',
              component: Account
            }, {
              path: 'mycompany',
              name: 'Setting.MyCompany',
              component: MyCompany
            }, {
              path: 'plan',
              name: 'Setting.Plan',
              component: Plan
            }, {
              path: 'RolePrivilege',
              name: 'Setting.RolePrivilege',
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
