import {h, Component} from 'preact';
import style from './style';
import MdThumbUp from 'react-icons/lib/md/thumb-up';
export default class ProductCard extends Component {
	render({product}) {
		return (
			<div class={style.Product_Card}>
				<div class={style.Product_Card__placeholder}>
					<img class={style.Product_Card__placeholder__image} alt="Product Image" src={product.cover_img}/>
				</div>
				<div class={style.Product_Card__body}>
					<span class={style.Product_Card__title}>{product.title}</span>
					<span class={style.Product_Card__price}>R$ {product.cost}</span>
					<div class={style.Product_Card__actions}>
						<div class={style.Product_Card__actions__column}>
							<a href="#" class={style.Product_Card__user}>
								<img class={style.Avatar} alt="" src={product.seller_info.avatar}/>
							</a>
						</div>
						<div class={style.Product_Card__actions__column}>
								<div class={style.Icon_thumbs}>
									<MdThumbUp/>  22
								</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
