import Vue from 'vue';
import Vuex from 'vuex';

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
            return state.userRole = payload;
        },
        updateUserInfo: (state, payload) => {
            return state.userInfo = payload;
        },
        clearState: (state) => {
            state.isLogin = false;
            state.userRole = '';
            state.userInfo = null;
        }
    }
}

// const store = new Vuex.store(options);
// export default store;
export default new Vuex.Store(options);
