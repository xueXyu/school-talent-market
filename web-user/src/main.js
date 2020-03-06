// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// element ui引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import store from "./store";
import http from './api/http';
import api from './api/api';

import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.store = store;
Vue.prototype.axios = axios;
Vue.prototype.http = http;
Vue.prototype.api = api;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
});
