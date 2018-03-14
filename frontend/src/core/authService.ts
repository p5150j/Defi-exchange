import * as localStorageService from './localStorageService';
import {UPORT_CLIENT_ID, UPORT_KEY} from './globals';
import {Connect, SimpleSigner} from 'uport-connect'

export const login = (): Promise<any> => {
	const uport = new Connect('Patrick\'s new app', {
		clientId: UPORT_CLIENT_ID,
		signer: SimpleSigner(UPORT_KEY)
	});
	return uport.requestCredentials({
		requested: ['name', 'avatar'],
		notifcations: true
	}).then((credentials: any) => {
		console.log('credentials', credentials);
		return localStorageService.setItem('user', JSON.stringify(credentials));
	});
};
export const getUser = () => {
	const item = localStorageService.getItem('user');
	if (item) {
		return JSON.parse(item);
	}
};
