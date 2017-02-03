import {h, Component} from 'preact';
import style from './style';
import {CheckoutForm} from './checkoutForm';

export default class Checkout extends Component {
	render() {
		return (
      <div>
        <CheckoutForm  {...this.props}/>
      </div>
		);
	}
}
