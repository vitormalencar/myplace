import {h, Component} from 'preact';
import {formatReal} from '../../../lib/profileHelper';
export const OrderList = ({item}) => {
	const amount  = formatReal(item.amount);
	return (
		<ul class="Data-List">
			<li class="Data-List__item">
				<div class="Data-List__label">Status</div>
				<div class="Data-List__value">{item.status}</div>
			</li>
			<li class="Data-List__item">
				<div class="Data-List__label">ID</div>
				<div class="Data-List__value">{item.id}</div>
			</li>
			<li class="Data-List__item">
				<div class="Data-List__label">Valor</div>
				<div class="Data-List__value">{amount}</div>
			</li>
			<li class="Data-List__item">
				<div class="Data-List__label">Cartão</div>
				<div class="Data-List__value">{item.card_brand}</div>
			</li>
			<hr/>
		</ul>
	);
};
