import {h, Component} from 'preact';
import style from './style';
import {OrderList} from './orderList';

export default class profile extends Component {
	render(props) {
		return (
			<div class={style.profile}>
				<span class="Data-Title">acompanhamento do pedido</span>
				<span class="Data-Title">detalhes da compra</span>
				<ul class="Data-List">
					{this.props.profileTrasactions.map((item) => {
						return (
								<OrderList item={item}/>
						);
					})}
				</ul>
			</div>
		);
	}
}
