import style from './style';
import {Link} from 'preact-router';
import {h, Component} from 'preact';
import {partial} from '../../../lib/utils';
import {Actionbutton} from '../../actionbutton';
import {calcSubTotal, generateFreteValue} from '../../../lib/cartHelper';

export const CartDetail = (props) => {
	const subtotal = calcSubTotal(props.cartList);
	const frete = subtotal > 0
		? generateFreteValue()
		: 0;
	const total = subtotal + frete;
	const updateCheckoutValue = partial(props.updateCheckoutValue, total);

	return (
		<div class={style.details}>
			<p>SUB-TOTAL:
				<span class={style.right_info}>$ {subtotal}</span>
			</p>
			<p>FRETE:<span class={style.right_info}>$ {frete}</span></p>
			<p class={style.amount}>TOTAL: <span class={style.right_info}>$ {total}</span></p>
			<Link href='/checkout'>
				<Actionbutton actionhandler={updateCheckoutValue} label='Realizar checkout'/>
			</Link>
		</div>
	);
};
