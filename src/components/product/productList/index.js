import {h, Component} from 'preact';
import style from './style';
import {Link} from 'preact-router';
import ProductCard from '../productCard';
import {Flex, Box, Grid} from 'reflexbox';


export default class ProductList extends Component {
	render({products}) {
		return (
			<section role="main" class={style.Product_List}>
				{products.map((item) => {
					return (
						<Grid col={6} md={3} p={3} sm={4} px={1}>
							<Link href={`/product/${item.id}`}>
								<ProductCard product={item}/>
							</Link>
						</Grid>
					);
				})}
			</section>
		);
	}
}
