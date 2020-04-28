export const addItemToCart = (cartItems, cartItemToAdd) => {
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToAdd.id);

	if (existingCartItem) {
		return cartItems.map(
			(cartItem) =>
				cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
		);
	}

	// * Default value of quantity is set to 1 here
	return [ ...cartItems, { ...cartItemToAdd, quantity: 1 } ];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

  // * Do not remove the item if only 1 left
	if (existingCartItem.quantity === 1) {
    return cartItems;
	}

	return cartItems.map(
		(cartItem) =>
			cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
	);
};
