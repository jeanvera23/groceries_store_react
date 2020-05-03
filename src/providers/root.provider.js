import ServiceProvider from "./service/service.provider";
import UserProvider from "./user/user.provider";
import CartProvider from "./cart/cart.provider";
import React from 'react';

const Provider = ({ children }) => {
    return (

        <UserProvider>
            <ServiceProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </ServiceProvider>
        </UserProvider>
    );
}
export default Provider;