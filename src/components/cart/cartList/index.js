import {h, Component} from 'preact';
import style from './style';
import MdDelete from 'react-icons/lib/md/delete';
export const CartList = (props) => {
	return (
		<li class="list__item list__item--material">
			<div class="list__item__left list__item--material__left">
				<img class="list__item__thumbnail list__item--material__thumbnail" src={props.cover_img}/>
			</div>
			<div class="list__item__center list__item--material__center">
				<div class="list__item__title list__item--material__title">{props.name}</div>
			</div>
		</li>
	);
};
