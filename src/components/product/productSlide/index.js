import style from './style';
import {h, Component} from 'preact';
import {Link} from 'preact-router';
import Swiper from 'react-id-swiper';

export default class ProductSlide extends Component {
	render({images}) {
		// Configure Slide
		const params = {
			pagination: '.swiper-pagination',
			paginationClickable: true
		};
		return (
			<Swiper {...params}>
				{images.map((imgUrl) => {
					return (
						<div>
							<img class={style.image_container} src={imgUrl}/>
						</div>
					);
				})}
			</Swiper>
		);
	}
}
