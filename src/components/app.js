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
		checkoutForm: {},
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
		getPayables(1267952);

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
		const state = Object.assign(this.state.checkoutForm, {[name]: value});
		this.setState({checkoutForm: state});
	}

	handleSubmit = (evt) => {
		evt.preventDefault();
		startTransaction(this.state.checkoutForm, this.state.totalValue).then(response => {
			const updatedprofileTrasactions = addTrasaction(this.state.profileTrasactions, response.data);
			this.setState({cartList: [], profileTrasactions: updatedprofileTrasactions});
			this.showSnackBar(`Compra de realizada com sucesso veja mais detalhes no seu perfil`);
		}).catch(errors => {
			const errorMessage = errors.response.data.errors.map(error => error.message);
			alert(errorMessage.toString());
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

		const {snackbar, snackBarText, cartList, showBackButton, totalValue} = this.state;

		return (
			<div id="app">
				<SnackBar actionText="OK" show={snackbar} snackBarText={snackBarText}/>
				<Header productCount={cartList.length} showBackButton={showBackButton}/>
				<Router onChange={this.handleRoute}>
					<Products path="/"/>
					<Profile path="/profile" profileTrasactions={this.state.profileTrasactions} transactionsCount={'nada'}/>
					<Cart path="/cart" cartList={cartList} updateCheckoutValue={this.updateCheckoutValue}/>
					<ProductShow path="/product/:id" addProductToCart={this.addProductToCart}/>
					<Checkout path='/checkout' handleInputChange={this.handleInputChange} handleSubmit={submitHandler} checkoutData={totalValue}/>
				</Router>
			</div>
		);
	}
}
