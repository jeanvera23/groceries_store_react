export const addItem = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.productId === cartItemToAdd.productId
    );

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.productId === cartItemToAdd.productId
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : { ...cartItem }
        );
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItem = (cartItems, cartItemToRemoveId) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.productId === cartItemToRemoveId
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.productId !== cartItemToRemoveId);
    }

    return cartItems.map(cartItem =>
        cartItem.productId === cartItemToRemoveId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : { ...cartItem }
    );
};
export const getCartTotal = (cartItems) => {
    let total = 0;
    for (let index = 0; index < cartItems.length; index++) {
        const cartItem = cartItems[index];
        total = total + (cartItem.price * cartItem.quantity);
    }
    return total;
};