import {h, Component} from 'preact';
import style from './style';
import Firebase from '../../../firebaseConfig';
import Loading from 'react-loading';
import ProductCard from '../productCard';
import ProductSlide from '../productSlide';
import {ProductActions} from '../productActions';

export default class ProductShow extends Component {
	constructor(props) {
		super(props);
		this.props.loading = true;
		this.state = {
			product: {
				images: [],
				seller_info:{
					avatar:''
				}
			}
		};
	}

	componentDidMount() {
		const rootRef = Firebase.ref().child(`/products/${this.props.id}`);
		rootRef.on('value', snap => {
			let obj = snap.val();
			this.setState({product: obj});
		});
	}
	render() {
		const {product} = this.state;
		return (
			<div>
				<ProductSlide images={this.state.product.images}/>
				<div class={style.product_show}>
					<div class={style.section_container}>
						<span class={style.price_tag__value}>R$ {product.cost}</span>
					</div>
					<div class={style.section_container}>
						<h1 class={style.product_info__title}>{product.title}</h1>
						<p>{product.description}</p>
					</div>
					<div class={[style.section_container, style.container__seller_info].join(' ')}>
						<div class={style.seller_info}>
							<a class={style.seller_info__link}>
								<div class={style.seller_info__avatar}>
									<img class={style.seller_info__avatar__img} src={product.seller_info.avatar}/>
								</div>
								<div class={style.seller_info__store}>
									<h2 class={style.seller_info__store__name}>{product.seller_info.store_name}</h2>
									<span class={style.seller_info__store__city}>{product.seller_info.store_city}</span>
								</div>
							</a>
						</div>
					</div>
				</div>
				<ProductActions addProductToCart={this.props.addProductToCart} product={product}/>
			</div>
		);
	}
}
