import style from './style';
import {h, Component} from 'preact';
import {CartList} from './cartList';
import {CartDetail} from './cartDetail';


export default class Cart extends Component {
	render() {
		return (
			<div class={style.cart}>
				{this.props.cartList.map((cartItem) => {
					return (
						<ul class='list'>
							<CartList {...cartItem}/>
						</ul>
					);
				})}
				<CartDetail {...this.props}/>
			</div>
		);
	}
}
