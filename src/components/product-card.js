import React, { useState } from 'react';

import UIkit from 'uikit';

import settings from '../settings.js';

import CartActions from '../providers/cart/cart.actions'
const ProductCard = ({ item }) => {
    //console.log(item);
    const cart = CartActions();
    const selectedItem = cart.cartItems.find(obj => obj.productId == item.productId)
    function renderPrice(item) {

        //console.log(item.price);
        var total = parseFloat(item.price).toFixed(2).toString();
        var cents = total.substring(total.length - 2);
        //console.log(total);
        var units = total.substring(0, total.length - 3);
        return (
            <div className='price md-color-blue-grey-900'>
                <span className="currency">S/</span>
                <span className='unit'>{units}</span>
                <span className='cents'>.{cents}</span>
            </div>
        )
    }
    return (
        <div className='uk-card uk-card-body md-bg-white uk-text-center'>
            <img src={`${settings.connectionString}/files/products/${item.image}`} alt="" />
            <h5>{item.name}</h5>
            {renderPrice(item)}
            {selectedItem && selectedItem.quantity > 0 ? (
                <div className='md-bg-grey-200 card-button '>
                    <span><button onClick={() => cart.removeItem(item.productId)} class="md-btn md-btn-primary md-btn-wave-light card-button-left">-</button></span>
                    <span className='card-button-center'>{selectedItem.quantity}</span>
                    <span><button onClick={() => cart.addItem(item)} class="md-btn md-btn-primary md-btn-wave-light card-button-right">+</button></span>
                </div>
            ) : (
                    <a onClick={() => {UIkit.notification(item.name+" fue agregado."); cart.addItem(item)}} class="md-btn md-btn-primary md-btn-wave-light"><i className='material-icons'>shopping_cart</i> Agregar</a>
                )}

        </div>
    )
}
export default ProductCard;