import {h, Component} from 'preact';
import style from './style';
import {OrderList, PayableList} from './orderList';
export default class profile extends Component {
	render(props) {
		return (
			<div class={style.profile}>
				<span class="Data-Title">acompanhamento do pedido</span>
				<span class="Data-Title">detalhes da compra</span>
				<ul class="Data-List">
					{this.props.profileTrasactions.map((item) => {
						return (<OrderList item={item}/>);
					})}
					<span class="Data-Title">detalhes da divisão do pagamento:</span>
					{this.props.profilepayables.map((item) => {
						return (<PayableList payablesItem={item}/>);
					})}
				</ul>
			</div>
		);
	}
}
