import {h, Component} from 'preact';
import style from './style';
import {Link} from 'preact-router';
import {partial} from '../../../lib/utils';



export const ProductActions = (props) => {
	const handleAddProductToCart = partial(props.addProductToCart, props.product);
	return (
		<div class={style.action_buttons}>
			<div class={style.action_buttons__container}>
				<div class={style.action_buttons__row}>
						<button class={[style.Button, style.Button__primary].join(' ')} onClick={handleAddProductToCart}> Adicionar a sacola!</button>
				</div>
			</div>
		</div>
	);
};
