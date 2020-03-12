import storage2 from 'store2';

const localStorageName = 'school-talent-market';
// 缓存数据的key
export const storage = {
    set setLocalStorage(val) {
        return storage2.set(localStorageName, val);
    },
    get getLocalStorage() {
        return storage2.get(localStorageName);
    },
    removeLocalStorage() {
        return storage2.remove(localStorageName);
    }
}
