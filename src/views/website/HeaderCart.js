import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';

// Images
import logo from '../../assets/img/main_logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import CartActions from '../../providers/cart/cart.actions'
import UIkit from 'uikit';

const HeaderCart = () => {
  const cart = CartActions();
  let history = useHistory();
  const toggleCart = () => {
    console.log(document.querySelector("#cart_container"));
    UIkit.notification("welcome");
    UIkit.offcanvas("#cart_container").show();
  }
  function renderTotal() {
    console.log(cart.cartItems);
    let total = 0;
    for (let index = 0; index < cart.cartItems.length; index++) {
      const element = cart.cartItems[index];
      var suma = (parseFloat(element.price) * element.quantity);
      total += suma;
    }
    return (
      <p className="uk-margin-remove uk-text-left"><strong>S/. {total.toFixed(2)}</strong></p>
    )
  }
  return (
    <div>
      <div  >
        <nav className="uk-navbar-container uk-navbar md-bg-amber-800" uk-navbar="mode: click">
          <div className="uk-navbar-left">
            <button onClick={() => history.goBack()} className="md-btn md-btn-primary md-btn-outlined uk-margin-left md-color-white"><i className='material-icons md-color-white'>keyboard_arrow_left</i> Continuar comprando</button>
          </div>
          <div class="uk-navbar-center uk-visible@s">

            <a className="uk-margin-top" href="#"><img src={logo} width="180px" /></a>
          </div>
        </nav>
      </div>

    </div >
  )
}
export default HeaderCart;