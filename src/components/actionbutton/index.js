import {h, Component} from 'preact';
import style from './style';

export const Actionbutton = (props) => {
	const {actionhandler,label} = props;
	return (
		<div class={style.action_buttons}>
			<div class={style.action_buttons__container}>
				<div class={style.action_buttons__row}>
						<button class={[style.Button, style.Button__primary].join(' ')} onClick={actionhandler}> {label}</button>
				</div>
			</div>
		</div>
	);
};
