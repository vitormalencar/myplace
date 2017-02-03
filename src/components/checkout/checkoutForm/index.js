import {h, Component} from 'preact';
import style from './style';
import {handleSubmit} from '../../../lib/checkoutHelper';
import {Actionbutton} from '../../actionbutton';
export const CheckoutForm = (props) => {
	return (
		<div>
			<h3 style='text-align:center'>Preencha o formulário abaixo para realizar a compra</h3>
			<form onSubmit={props.handleSubmit}>
				<input class="text-input--material" type="text" placeholder='name' name='name' onChange={props.handleInputChange}/>
				<br/><br/>
				<input class="text-input--material" type="email" placeholder='email' name='email' onChange={props.handleInputChange}/>
				<br/><br/>
				<input class="text-input--material" type="number" placeholder='cpf' name='cpf' onChange={props.handleInputChange}/>
				<br/><br/>
				<input class="text-input--material" type="number" placeholder='zipcode' name='zipcode' onChange={props.handleInputChange}/>
				<br/><br/>
				<input class="text-input--material" type="text" placeholder='neighborhood' name='neighborhood' onChange={props.handleInputChange}/>
				<br/><br/>
				<input class="text-input--material" type="text" placeholder='street' name='street' onChange={props.handleInputChange}/>
				<br/><br/>
				<input class="text-input--material" type="number" placeholder='streetNumber' name='streetNumber' onChange={props.handleInputChange}/>
				<br/><br/>
				<input class="text-input--material" type="number" placeholder='phone' name='phone' onChange={props.handleInputChange}/>
				<br/><br/>
				<input class="text-input--material" type="number" placeholder='ddi' name='ddi' onChange={props.handleInputChange}/>
				<br/><br/>
				<input class="text-input--material" type="number" placeholder='ddd' name='ddd' onChange={props.handleInputChange}/>
				<br/><br/>
				<Actionbutton actionhandler={props.handleSubmit} label='Realizar Pagamento'/>
			</form>
		</div>
	);
};
