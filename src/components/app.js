import {h, Component} from 'preact';
import {Router} from 'preact-router';
import Firebase from '../firebaseConfig';
import {addToCart} from '../lib/cartHelper';
import {addTrasaction} from '../lib/profileHelper';
import {startTransaction, getPayables} from '../lib/checkoutService';

import Cart from './cart';
import Header from './header';
import Profile from './profile';
import Products from './product';
import Checkout from './checkout';
import SnackBar from './snackBar';
import ProductShow from './product/productShow';

export default class App extends Component {

	state = {
		productList: [],
		cartList: [],
		checkoutForm: {
			name: '',
			email: '',
			cpf: '',
			zipcode: '',
			neighborhood: '',
			street: '',
			streetNumber: '',
			phone: '',
			ddi: '',
			ddd: ''
		},
		profileTrasactions: [],
		profilepayables: [],
		showBackButton: false,
		snackbar: false,
		snackBarText: ''
	}

	handleRoute = (e) => {
		const showBackButton = e.url !== '/'
			? true
			: false;
		this.setState({showBackButton});
		this.currentUrl = e.url;
	};

	addProductToCart = (newProduct) => {
		const updatedCartList = addToCart(this.state.cartList, newProduct);
		this.setState({cartList: updatedCartList});
		this.showSnackBar('Produto Adicionado com sucesso');
	}

	updateCheckoutValue = (totalValue) => {
		this.setState({totalValue});
	}

	handleInputChange = (evt) => {
		const name = evt.target.name;
		const value = evt.target.value;
		const state = Object.assign(this.state.checkoutForm,{[name]: value});
		this.setState({checkoutForm: state});
	}

	handleSubmit = (evt) => {
		evt.preventDefault();
		startTransaction(this.state.checkoutForm, this.state.totalValue).then(response => {
			this.setState({checkoutForm: {}});
			const updatedprofileTrasactions = addTrasaction(this.state.profileTrasactions, response.data);
			this.handlePayables(response.data.tid);
			this.setState({cartList: [], profileTrasactions: updatedprofileTrasactions});
			this.showSnackBar(`Compra de realizada com sucesso veja mais detalhes no seu perfil`);
		}).catch(errors => {
			const errorMessage = errors.response.data.errors.map(error => error.message);
			alert(errorMessage.toString());
		});
	}

	handlePayables = (id) => {
		getPayables(id).then(response => {
			const updatedprofilepayables = addTrasaction(this.state.profilepayables, response.data);
			this.setState({profilepayables: updatedprofilepayables});
		}).catch(errors => {
			console.log(errors);
		});
	}

	showSnackBar = (text) => {
		this.setState({snackbar: true, snackBarText: text});
		setTimeout(() => this.setState({snackbar: false}), 2500);
	}

	handleEmptySubmit = (evt) => {
		evt.preventDefault();
		this.showSnackBar('Preencha todos os campos do formulário');
	}

	render() {
		const submitHandler = this.state.cartList.length > 0
			? this.handleSubmit
			: this.handleEmptySubmit;
		const {
			snackbar,
			snackBarText,
			cartList,
			showBackButton,
			totalValue,
			checkoutForm,
			profileTrasactions
		} = this.state;

		return (
			<div id="app">
				<SnackBar actionText="OK" show={snackbar} snackBarText={snackBarText}/>
				<Header productCount={cartList.length} showBackButton={showBackButton} transactionsCount={profileTrasactions.length}/>
				<Router onChange={this.handleRoute}>
					<Products path="/"/>
					<Profile path="/profile" profileTrasactions={this.state.profileTrasactions} profilepayables={this.state.profilepayables}/>
					<Cart path="/cart" cartList={cartList} updateCheckoutValue={this.updateCheckoutValue}/>
					<ProductShow path="/product/:id" addProductToCart={this.addProductToCart}/>
					<Checkout path='/checkout' handleInputChange={this.handleInputChange} handleSubmit={submitHandler} checkoutData={totalValue} checkoutForm={checkoutForm}/>
				</Router>
			</div>
		);
	}
}
