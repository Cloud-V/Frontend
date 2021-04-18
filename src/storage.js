import ms from 'ms';

const ExpirySuffix = '_expiry';
const AccessSuffix = '_last_access';
const CreateSuffix = '_created';

const AppPrefix = 'cloudv_'

class StorageManager {
	get(key) {
		key = AppPrefix + key;
		const now = new Date().getTime();
		const expiryTime = localStorage.getItem(key + '_expiry');
		if (expiryTime && now > parseInt(expiryTime, 10)) {
			this.remove(key);
			return null;
		}
		localStorage.setItem(key + AccessSuffix, now.toString());
		return localStorage.getItem(key);
	}
	remove(key) {
		key = AppPrefix + key;
		localStorage.removeItem(key)
		localStorage.removeItem(key + ExpirySuffix);
		localStorage.removeItem(key + AccessSuffix);
		localStorage.removeItem(key + CreateSuffix);
	}
	set(key, value, expiry) {
		key = AppPrefix + key;
		const now = new Date().getTime();
		localStorage.setItem(key, value);
		localStorage.setItem(key + CreateSuffix, now.toString());
		localStorage.setItem(key + AccessSuffix, now.toString());
		if (expiry) {
			console.log("Expiry is " + expiry.toString() + '');
			localStorage.setItem(key + ExpirySuffix, now + ms(expiry.toString()) + '');
		} else {
			localStorage.removeItem(key + ExpirySuffix);
		}
	}
	clear() {
		localStorage.clear();
	}
}


export default new StorageManager();