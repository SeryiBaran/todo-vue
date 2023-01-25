import * as idb from 'idb-keyval';

// Адаптер IDB для pinia-plugin-persistedstate-2
export const storage = {
  getItem: idb.get,
  setItem: idb.set,
  removeItem: idb.del,
};
