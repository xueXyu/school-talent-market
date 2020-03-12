import {storage} from "./storage";
import store from "./index";

export default {
    checkLocalStorage() {
        const local = storage.getLocalStorage;
        if (local !== null && local !== null && typeof local !== "undefined") {
            // LocalStorage写入vuex store.state
            if (local.isLogin === true || local.isLogin === false) {
                store.commit("updateIsLogin", local.isLogin);
            }

            if (local.userRole === 'user' || local.userRole === 'company') {
                store.commit("updateUserRole", local.userRole);
            }

            if (local.userInfo !== '' && local.userInfo !== null) {
                store.commit("updateUserInfo", local.userInfo);
            }
        }
    }
}

