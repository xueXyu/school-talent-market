import Vue from 'vue';
import Vuex from 'vuex';
import {storage} from './storage';

Vue.use(Vuex);

// vuex的配置项
const options = {
    // state(固定)是用来存放数据
    state: {
        isLogin: false,
        userRole: '', // user 用户， company 公司
        userInfo: null,
    },
    // 用来获取state里面的东西
    getters: {
        // getUserInfo: state => state.getUserInfo
        getUserInfo: (state) => {
            return state.userInfo;
        },
        getUserRole: (state) => {
            return state.userRole;
        },
        getIsLogin: (state) => {
            return state.isLogin;
        },
    },
    // mutation用来修改state里的属性值
    mutations: {
        // 改变登陆状态
        updateIsLogin(state, payload) {
            state.isLogin = payload;
        },
        updateUserRole: (state, payload) => {
            state.userRole = payload;
        },
        updateUserInfo: (state, payload) => {
            state.userInfo = payload;
        }
    },
    actions: {
        updateIsLogin({commit, state}, data) {
            commit('updateIsLogin', data);
            var local = storage.getLocalStorage || {};
            local.isLogin = data;
            storage.setLocalStorage = local;
        },
        updateUserRole({commit, state}, data) {
            commit('updateUserRole', data);
            var local = storage.getLocalStorage || {};
            local.userRole = data;
            storage.setLocalStorage = local;
        },
        updateUserInfo({commit, state}, data) {
            commit('updateUserInfo', data);
            var local = storage.getLocalStorage || {};
            local.userInfo = data;
            storage.setLocalStorage = local;
        },
    }
};

// const store = new Vuex.store(options);
// export default store;
export default new Vuex.Store(options);
