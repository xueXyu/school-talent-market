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
}
