import {storage} from '../store/storage';

export default {
    // 退出登录
    loginOut: function (that) {
        that.store.commit("updateIsLogin", false);
        that.store.commit("updateUserRole", '');
        that.store.commit("updateUserInfo", null);
        that.destroySession();
        storage.removeLocalStorage();
    },

    // 手机号验证
    isvalidPhone: (str) => {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(str))) {
            return false;
        } else {
            return true;
        }
    },

    getHost: () => {
        return 'http://localhost:3000/api/v1';
    },

    // 默认图片
    getDefaultImg: function () {
        return '/uploads/defaul-head.jpg'
    }


}
