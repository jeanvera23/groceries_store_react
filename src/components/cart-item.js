import React, { useState } from 'react';

import settings from '../settings.js';

import CartActions from '../providers/cart/cart.actions'
const ProductCard = ({ item }) => {
    //console.log(item);
    const cart = CartActions();
    function renderPrice(item) {

        var total = (parseFloat(item.price) * item.quantity).toFixed(2).toString();
        var cents = total.substring(total.length - 2);
        var units = total.substring(0, total.length - 3);
        return (
            <div className='price md-color-blue-grey-900'>
                <span className="currency">S/</span>
                <span className='unit'>{units}</span>
                <span className='cents'>.{cents}</span>
            </div>
        )
    }
    const removeItem = (itemtoRemove) => {
         const newItems = cart.cartItems.filter(item => item.productId !== itemtoRemove.productId);
         cart.setList(newItems);
    }
    
    return (
        <div className='uk-width-1-1'>
            <div className='uk-card uk-card-body'>
                <div className="uk-grid-small" data-uk-grid>
                    <i onClick={() => removeItem(item)} className="material-icons md-icon md-icon-close">close</i>
                    <div className='uk-width-1-4'>
                    <img src={`${settings.connectionString}/files/products/${item.image}`} alt="" />
                    </div>
                    <div className='uk-width-3-4'>
                        <h6 className=" uk-text-left md-color-blue-grey-900 uk-margin-top">{item.name}</h6>
                    </div>
                </div>
                <div className="uk-grid-small" data-uk-grid>
                    <div className='uk-width-1-2'>
                        {item && item.quantity > 0 ? (
                            <div className='md-bg-grey-200 card-button'>
                                <span><button onClick={() => cart.removeItem(item.productId)} class="md-btn md-btn-primary md-btn-wave-light card-button-left">-</button></span>
                                <span className='card-button-center md-color-blue-grey-900'>{item.quantity}</span>
                                <span><button onClick={() => cart.addItem(item)} class="md-btn md-btn-primary md-btn-wave-light card-button-right">+</button></span>
                            </div>
                        ) : (
                                <a onClick={() => cart.addItem(item)} class="md-btn md-btn-primary md-btn-wave-light"><i className='material-icons'>shopping_cart</i> Agregar</a>
                            )}
                    </div>
                    <div className='uk-width-1-2'>
                        {renderPrice(item)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductCard;