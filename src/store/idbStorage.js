import * as idb from "idb-keyval";

const storage = {
	getItem: async function (key) {
		return idb.get(key);
	},
	setItem: async function (key, val) {
		await idb.set(key, val);
	},
};

// Адаптер IDB для pinia-plugin-persistedstate-2
export const IDBStorage = (key) => ({
	get: async (value) => (await storage.getItem(key)) || value,
	set: async (value) => storage.setItem(key, value),
});
