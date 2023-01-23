import * as idb from 'idb-keyval';

// Адаптер IDB для pinia-plugin-persistedstate-2
export const storage = {
  getItem: async function (key: string) {
    return idb.get(key);
  },
  setItem: async function (key: string, val: any) {
    await idb.set(key, val);
  },
  removeItem: async function (key: string) {
    await idb.del(key);
  },
};
