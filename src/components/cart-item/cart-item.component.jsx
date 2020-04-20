import './cart-item.styles.scss';

import React from 'react';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
	<div className="cart-item">
		<img src={imageUrl} alt="item" />
		<div className="item-details">
			<span className="name">{name}</span>
			<span className="price">
				{price}*{quantity}
			</span>
		</div>
	</div>
);

export default CartItem;
