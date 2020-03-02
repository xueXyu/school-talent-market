// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// element ui引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

// // <!-- Vendors JS -->
// import modernizr from 'assets/js/vendor/modernizr-3.6.0.min.js';
// import jquery from 'assets/js/vendor/jquery-3.4.1.min.js';
// import bootstrap from 'assets/js/vendor/bootstrap.bundle.min.js';
//
// // <!-- Plugins JS -->
// import slick from 'assets/js/plugins/slick.min.js';
// import waypoints from 'assets/js/plugins/jquery.waypoints.min.js';
// import counterup from 'assets/js/plugins/jquery.counterup.min.js';
// import parallax from 'assets/js/plugins/jquery.parallax.js';
// import ajaxchimp from 'assets/js/plugins/jquery.ajaxchimp.min.js';
// import rangeSlider from 'assets/js/plugins/ion.rangeSlider.min.js';
// import scrollUp from 'assets/js/plugins/jquery.scrollUp.min.js';
//
// // <!-- Main Activation JS -->
// import main from 'assets/js/main.js'

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

// Vue.prototype.modernizr = modernizr;
// Vue.prototype.jquery = jquery;
// Vue.prototype.bootstrap = bootstrap;
// Vue.prototype.slick = slick;
// Vue.prototype.waypoints = waypoints;
// Vue.prototype.counterup = counterup;
// Vue.prototype.parallax = parallax;
// Vue.prototype.ajaxchimp = ajaxchimp;
// Vue.prototype.rangeSlider = rangeSlider;
// Vue.prototype.scrollUp = scrollUp;
// Vue.prototype.main = main;


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
