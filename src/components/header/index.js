import {h, Component} from 'preact';
import {Link} from 'preact-router';
import style from './style';
import FaShoppingBag from 'react-icons/lib/fa/shopping-bag';
import MdArrowBack from 'react-icons/lib/md/arrow-back';

export default class Header extends Component {
	render(props) {
		return (
			<div class={style.header}>
			<div class="navigation-bar navigation-bar--material">
				<div class="navigation-bar__left navigation-bar--material__left">
					<span class="toolbar-button toolbar-button--material">
						{props.showBackButton && <Link href="/">
							<div class={style.Back_Icon}><MdArrowBack/></div>
						</Link>}
					</span>
				</div>
				<div class="navigation-bar__center navigation-bar--material__center">
					<Link href='/'>MY-PLACE</Link>
				</div>
				<div class="navigation-bar__right navigation-bar--material__right">

					<span class="toolbar-button toolbar-button--material">
						{props.productCount > 0 && <span class={style.Notification_Label}>{props.productCount}</span>}
						<Link href="/cart">
							<div class={style.Bag_Icon}><FaShoppingBag/></div>
						</Link>
					</span>
					<span class="toolbar-button toolbar-button--material">
						<i class="zmdi zmdi-more-vert"></i>
					</span>
				</div>
			</div>
			</div>
		);
	}
}
