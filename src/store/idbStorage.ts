import * as idb from 'idb-keyval';

const storage = {
	getItem: async function (key: string) {
		return idb.get(key);
	},
	setItem: async function (key: string, val: any) {
		await idb.set(key, val);
	},
};

// Адаптер IDB для pinia-plugin-persistedstate-2
export const IDBStorage = (key: string) => ({
	get: async (value: any) => (await storage.getItem(key)) || value,
	set: async (value: any) => storage.setItem(key, value),
});
