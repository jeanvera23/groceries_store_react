import React, { createContext, useEffect, useReducer } from 'react';

import cartReducer, { INITIAL_STATE } from "./cart.reducer";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE, (INITIAL_STATE) => {
        const localData = sessionStorage.getItem("CartProvider");
        return localData ? JSON.parse(localData) : INITIAL_STATE
    });
    useEffect(() => {
        sessionStorage.setItem('CartProvider', JSON.stringify(state));
    }, [state])

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;