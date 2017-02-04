import Axios from 'axios';

const API_KEY = 'ak_test_KW6UxdUqXx3nPHKYXQiCH1InzBtklx';

export const getPayables = (id) => {
	return Axios.get(`https://api.pagar.me/1/transactions/${id}/payables`, {params: {api_key: API_KEY}})
}

export const startTransaction = (obj, amount) => {
	console.log(obj);
	const postObject = {
		api_key: API_KEY,
		amount:amount*100,
		card_id: 'card_ciyh8yg0b00988x6e44x4ox36',
		customer: {
			name: obj.name,
			email: obj.email,
			document_number: '03691571336',
			address: {
				zipcode: obj.zipcode,
				neighborhood: obj.neighborhood,
				street: obj.street,
				street_number: obj.streetNumber
			},
			phone: {
				number: obj.phone,
				ddi: obj.ddi,
				ddd: obj.ddd
			}
		},
		split_rules: [
			{
				recipient_id: 're_ciyh9m0qh00998x6eo3gyzv8q',
				charge_processing_fee: true,
				liable: true,
				percentage: "15"
			}, {
				recipient_id: 're_ciyh9n7ln008pj16d86v7g0l0',
				charge_processing_fee: true,
				liable: false,
				percentage: "25"
			}, {
				recipient_id: 're_ciyhakzbn008xj16d2diocrx6',
				charge_processing_fee: true,
				liable: false,
				percentage: "60"
			}
		]
	};
	return Axios.post('https://api.pagar.me/1/transactions', postObject);
};
