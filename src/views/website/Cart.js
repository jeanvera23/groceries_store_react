import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import UIKit from 'uikit';
import MDUIKit from 'md-uikit';

//Components 
import CartItem from '../../components/cart-item';

// Context Actions
import CartActions from '../../providers/cart/cart.actions'

import settings from '../../settings.js';


const Cart = () => {
  useEffect(() => {
    MDUIKit.components();
    console.log("Init Cart");
  }, [])
  const cart = CartActions();
  function renderTotal() {
    //console.log(cart.cartItems);
    let total = 0;
    for (let index = 0; index < cart.cartItems.length; index++) {
      const element = cart.cartItems[index];
      var suma = (parseFloat(element.price) * element.quantity);
      total += suma;
    }
    return (
      <>
        <small className="md-color-blue-grey-900">Total:</small>
        <h5 className="md-color-blue-grey-900 uk-margin-remove">S/. {total.toFixed(2)}</h5>
      </>
    )
  }
  const deleteAll = (event) => {
    event.preventDefault();
    cart.setList([]);
  }
  return (
    <div id="cart_container" data-uk-offcanvas="flip: true; overlay: true">
      <div class="uk-offcanvas-bar md-bg-white uk-padding-small">
        <button class="uk-offcanvas-close" type="button" data-uk-close></button>
        <h4 className="md-color-grey-900 uk-text-center">
          <i className='material-icons md-color-grey-900'>shopping_cart</i> Carrito de compras</h4>
        <div className="uk-grid-small uk-margin-bottom uk-text-center" data-uk-grid>
          {cart.cartItems.length ? (
            <>
              {cart.cartItems.map(item => (
                <CartItem item={item} />
              ))}
              <div className="uk-width-1-1 uk-text-center">
                <a onClick={deleteAll} class="md-btn md-btn-outlined md-btn-primary md-btn-wave-light uk-margin-right">Eliminar todo <i className="material-icons">delete</i></a>
              </div>
            </>
          ) : (
              <div className="uk-padding uk-text-center">
                <h5 className='md-color-grey-900'>El carrito de compras esta vacio.</h5>
              </div>
            )
          }
          {/* <div className="uk-width-1-1">
            <a class="md-btn md-btn-outlined md-btn-primary md-btn-wave-light uk-margin-right">Guardar como lista <i className="material-icons">add</i></a>
          </div> */}

          <div>&nbsp;</div>

          <div className="cart-footer">
            <div className="checkout">
              <div className="uk-grid-small" data-uk-grid>
                <div className='uk-width-1-2 uk-text-left'>
                  {renderTotal()}
                </div>
                <div className='uk-width-1-2 uk-text-right'>
                  {cart.cartItems.length ?
                    <Link to='/checkout' class="md-btn md-btn-primary">Continuar</Link>
                    :
                    <Link class="md-btn disabled">Continuar</Link>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Cart;