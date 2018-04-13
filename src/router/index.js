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

import Received from '../components/dash/Received/Received.vue'
import Sent from '../components/dash/Sent/Sent.vue'
import SentInvoiceDetail from '../components/dash/Sent/SentInvoiceDetail.vue'
import ReceivedInvoiceDetail from '../components/dash/Received/ReceivedInvoiceDetail.vue'

import Create from '../components/dash/CreateInvoice/Create.vue'
import PreviewInvoice from '../components/dash/CreateInvoice/PreviewInvoice.vue'

import Client from '../components/dash/Client/Client.vue'
import NewClient from '../components/dash/Client/NewClient.vue'
import ClientDetail from '../components/dash/Client/ClientDetail.vue'
import ConnectClient from '../components/dash/Client/ConnectClient.vue'

import Vendor from '../components/dash/Vendor/vendor.vue'
import VendorDetail from '../components/dash/Vendor/VendorDetail.vue'



import Setting from '../components/dash/Setting/Setting'
import Account from '../components/dash/Setting/Account'
import MyCompany from '../components/dash/Setting/MyCompany'
import Plan from '../components/dash/Setting/Plan'
import RolePrivilege from '../components/dash/Setting/RolePrivilege'

import Requests from '../components/dash/Requests/Requests.vue'

import MaintainTemplate from '../components/maintain-template/maintain-template.vue'

import Product from '../components/dash/Product/Product.vue'
import NewProduct from '../components/dash/Product/NewProduct.vue'
import ProductDetail from '../components/dash/Product/ProductDetail.vue'

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
      component: ResetPassword,

    }, {
      path: '/createInvoice',
      name: 'CreateInvoice',
      component: Create,
      beforeEach: companyCreatedGuard
    }, {
      path:'/createInvoice/preview',
      name: 'CreateInvoice.Preview',
      component: PreviewInvoice,
      beforeEach: companyCreatedGuard
    }, {
      path: '/maintain-template',
      name: 'MaintainTemplate',
      component: MaintainTemplate

    }, {
      path:'/sent/invoice/:id',
      name:'Dash.Sent.Detail',
      component: SentInvoiceDetail,
      beforeEach: companyCreatedGuard
    }, {
      path:'/received/invoice/:id',
      name:'Dash.Received.Detail',
      component: ReceivedInvoiceDetail,
      beforeEach: companyCreatedGuard      
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
        }, 
        {
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
        }, {
          path: 'vendor/:id',
          name: 'Dash.Vendor.Detail',
          component: VendorDetail,
          beforeEnter: companyCreatedGuard
        }, {
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
        }, {
          path: 'product',
          name: 'Dash.Product',
          component: Product,
          beforeEnter: companyCreatedGuard
        }, {
          path: 'product/new',
          name: 'Dash.Product.New',
          component: NewProduct,
          beforeEnter: companyCreatedGuard
        }, {
          path: 'product/detail/:id',
          name: 'Dash.Product.Detail',
          component: ProductDetail,
          beforeEnter: companyCreatedGuard
        }
      ]
    }
  ]
})

theRouter.beforeEach(loginGuard)


export default theRouter
