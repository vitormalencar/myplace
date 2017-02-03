import { h, Component } from 'preact';
import style from './style';
import ProductCard from './productCard';
import ProductList from './productList';
import Firebase from '../../firebaseConfig';
import Loading from 'react-loading';

export default class Products extends Component {
	constructor(props) {
		super(props);
		this.props.loading = true;
		this.state = {
			productList: []
		};
	}

	componentDidMount() {
		const rootRef = Firebase.ref().child('/products');
		rootRef.on('value', snap => {
			let obj = snap.val();
			this.props.loading = false;
			let arr = Object.keys(obj).map((k) => {
				obj[k].id = k;
				return obj[k];
			});
			this.setState({ productList: arr });
		});
	}

	render() {
		if (this.props.loading) {
			return (
				<div class='center-loading'>
					<Loading type='bubbles' color='#f54c4e'/>
				</div>
			);
		}
		return (<ProductList products={this.state.productList}/>);
	}
}
