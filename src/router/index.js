import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ResetPassword from '@/components/ResetPassword'
import CreateMyCompany from '@/components/CreateMyCompany'

import Navigation from '@/components/dash/Navigation'
import WorkingArea from '@/components/dash/WorkingArea'

import loginGuard from './LoginGuard.js'
import companyCreatedGuard from './CompanyCreatedGuard.js'

import Received from '../components/dash/Received'
import Sent from '../components/dash/Sent'

import Create from '../components/dash/Create'
import Client from '../components/dash/client/Client.vue'
import NewClient from '../components/dash/client/NewClient.vue'
import ClientDetail from '../components/dash/client/ClientDetail.vue'
import ConnectClient from '../components/dash/client/ConnectClient.vue'

import Vendor from '../components/dash/Vendor'
import Setting from '../components/dash/setting/Setting'
import Account from '../components/dash/setting/Account'
import MyCompany from '../components/dash/setting/MyCompany'
import Plan from '../components/dash/setting/Plan'
import RolePrivilege from '../components/dash/setting/RolePrivilege'

import Requests from '../components/dash/requests/Requests.vue'

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
          path: 'createMyCompany',
          name: 'Dash.CreateMyCompany',
          component: CreateMyCompany
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
        }, {
          path: 'client/new',
          name: 'Dash.Client.New',
          component: NewClient,
          beforeEach: companyCreatedGuard
        }, {
          path: 'client/connect',
          name: 'Dash.Client.Connect',
          component: ConnectClient,
          beforeEach: companyCreatedGuard
        },
        {
          path: 'client/:id',
          name: 'Dash.Client.Detail',
          component: ClientDetail,
          beforeEach: companyCreatedGuard
        },
        {
          path: 'vendor',
          name: 'Dash.Vendor',
          component: Vendor,
          beforeEnter: companyCreatedGuard
        },
        {
          path: 'setting/:category',
          name: 'Dash.Setting',
          component: Setting,
          beforeEnter: companyCreatedGuard
        },
        {
          path: 'requests',
          name: 'Dash.Requests',
          component: Requests,
          beforeEnter: companyCreatedGuard
        }
      ]
    }
  ]
})

theRouter.beforeEach(loginGuard)


export default theRouter
