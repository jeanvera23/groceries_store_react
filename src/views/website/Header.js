import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

// Images
import logo from '../../assets/img/main_logo.png';

import CartActions from '../../providers/cart/cart.actions'
import UserActions from '../../providers/user/user.actions'
import UIkit from 'uikit';

const FrontHeader = () => {

  const [searchValue, setSearchValue] = useState("");

  const cart = CartActions();
  const user = UserActions();

  const history = useHistory();
  const toggleCart = () => {
    console.log(document.querySelector("#cart_container"));
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
  const handleChange = event => {
    const { value, name } = event.target;
    setSearchValue(value);
  }
  const searchModal = event => {
    event.preventDefault();
    console.log("searchModal");
    UIkit.modal("#modal_search").hide();
    history.push("/results/" + searchValue);
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      UIkit.modal("#modal_search").hide();
      setSearchValue("");
      history.push("/results/" + searchValue);
    }
  }
  return (
    <div>
      <div uk-sticky="animation: uk-animation-slide-top;" >
        <nav className="uk-navbar-container uk-navbar md-bg-amber-800" uk-navbar="mode: click">
          <div className="uk-navbar-left">
            <a className="uk-navbar-item uk-logo" href="#"><img src={logo} width="160px" /></a>
          </div>
          <div className="uk-navbar-center">
            <div className="uk-visible@m">
              <div className="md-input-wrapper md-input-no-label md-input-wrapper-with-trailing-icon md-input-dense md-input-wrapper-shaped md-input-wrapper-outlined">
                {searchValue != "" &&
                  <span onClick={() => history.push("/results/" + searchValue)} className="md-input-icon touch-cursor"><i className="material-icons ">search</i></span>
                }
                <input onKeyPress={handleKeyPress} type="text" placeholder="Busca productos" className="md-input" onChange={handleChange} value={searchValue} />
              </div>
            </div>
          </div>
          <div className="uk-navbar-right">
            <a data-uk-toggle="target: #modal_search"><i className='material-icons md-color-white md-icon uk-hidden@m uk-margin-right'>search</i></a>
            {user.currentUser ?
              <>
                <Link to='/account/orders'><i className='material-icons md-color-white md-icon uk-hidden@m uk-margin-right'>person</i></Link>
                <Link to='/account/orders' className="md-btn md-btn-primary md-btn-outlined md-color-white uk-margin-right uk-visible@m"> <i className='material-icons md-color-white'>person</i> Mi cuenta</Link>
              </>
              :
              <>
                <Link to='/login'><i className='material-icons md-color-white md-icon uk-hidden@m uk-margin-right'>person</i></Link>
                <Link to='/login' className="md-btn md-btn-outlined md-btn-primary md-color-white md-btn-wave-light uk-margin-right uk-visible@m">Login / Registro </Link>
              </>
            }
            <a className="cart-message-icon">
              <i onClick={toggleCart} className='material-icons md-color-white md-icon uk-hidden@m uk-margin-right'>shopping_cart</i>
              {cart.cartItems.length > 0 &&
                <span className="uk-badge uk-badge-material">{cart.cartItems.length}</span>
              }
            </a>
            <div className='md-bg-white cart-container uk-margin-right uk-visible@m'>
              <div className="cart-icon">

                <i onClick={toggleCart} className='material-icons md-icon'>shopping_cart</i>
              </div>
              <div className='cart-header'>
                <label >Tu pedido:</label>
                {renderTotal()}
              </div>
              <div className="cart-button">
                {cart.cartItems.length ?
                  <Link to='/checkout' className="md-btn md-btn-primary">Continuar</Link>
                  :
                  <a className="md-btn disabled">Continuar</a>
                }
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div id="modal_search" data-uk-modal>
        <div className="uk-modal-dialog uk-margin-auto-vertical">
          <button className="uk-modal-close-default" type="button" data-uk-close></button>
          <div className="uk-modal-header">
            <h2 className="uk-modal-title">Buscar:</h2>
          </div>
          <div className="uk-modal-body">
            <div className="md-bg-white uk-hidden@m" data-uk-sticky="offset: 64">
              <div className="md-input-wrapper md-input-no-label md-input-wrapper-with-trailing-icon md-input-dense md-input-wrapper-shaped md-input-wrapper-outlined">
                {searchValue != "" &&
                  <span onClick={searchModal} className="md-input-icon touch-cursor"><i className="material-icons ">search</i></span>
                }
                <input onKeyPress={handleKeyPress} type="text" placeholder="Busca productos" className="md-input" onChange={handleChange} value={searchValue} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
export default FrontHeader;