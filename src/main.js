// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import Notifications from 'vue-notification'
import {default as Vuedals, Component as Vuedal, Bus as VuedalsBus} from 'vuedals';



Vue.config.productionTip = false

const veeValidateConfig = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fields', 
  delay: 0, 
  locale: 'en', 
  dictionary: null, 
  strict: true, 
  classes: true, 
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'uk-form-success', // model is valid
    invalid: 'uk-form-danger', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input|blur',
  inject: true,
  validity: false,
  aria: true
};

Vue.use(Notifications)
Vue.use(Vuedals)
Vue.use(VeeValidate, veeValidateConfig)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
