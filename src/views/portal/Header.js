import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

/* import 'uikit/dist/css/uikit.min.css';
import 'md-uikit/dist/css/md-uikit.css';
import UIkit from 'uikit/dist/js/uikit.js';
 */

import UserActions from '../../providers/user/user.actions';

const Header = () => {
  const user = UserActions();
  const onClickLogout = async event => {
    user.resetUser();
    /* const { resetUser, resetApplicants, resetCart } = this.props;
    resetApplicants();
    resetCart(); */
  }
  return (
    <div uk-sticky="show-on-up: true; animation: uk-animation-slide-top;" >
      <header id='admin-header'>
        <nav className="uk-navbar-container md-top-app-bar-dense" uk-navbar="mode: click">
          <div className="uk-navbar-left">
            <a href="#" id="md-drawer-toggle" className="uk-navbar-toggle" ><i className="material-icons md-icon md-color-white">menu</i></a>
            <span className="uk-navbar-item md-top-app-bar__title md-color-white"></span>
          </div>
          <div className="uk-navbar-right ">
            <ul className="uk-navbar-nav nav-overlay">
              <li><a href="#" uk-toggle="target: .nav-overlay; animation: uk-animation-fade"><i className="material-icons md-icon md-color-white">search</i></a></li>
              {user.currentUser &&
                <li>
                  <a className="uk-navbar-item" href="#/"><i className="material-icons md-icon md-color-white">person</i></a>
                  <div uk-dropdown="mode: click; pos: bottom-right">
                    <ul className="uk-nav uk-navbar-dropdown-nav" >
                      {/* <li><Link to="/login"><i className="material-icons">power_settings_new</i>Cerrar Sesion</Link></li> */}
                      <li><a href="#" onClick={onClickLogout}><i className="material-icons">power_settings_new</i>Log out</a></li>
                    </ul>
                  </div>
                </li>
              }
            </ul>
            <div className="nav-overlay uk-navbar-left uk-flex-1" hidden>

              <div className="uk-navbar-item uk-width-expand">
                <form className="uk-search uk-search-navbar uk-width-1-1">
                  <input className="uk-search-input" type="search" placeholder="Search..." autoFocus />
                </form>
              </div>
              <a className="uk-navbar-toggle" data-uk-close uk-toggle="target: .nav-overlay; animation: uk-animation-fade" href="#"></a>
            </div>
          </div>
        </nav>
      </header>
    </div >
  )
}

/* const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  resetUser: item => dispatch(resetUser(item)),
  resetApplicants: item => dispatch(resetApplicants(item)),
  resetCart: item => dispatch(resetCart(item))
}); */
export default Header;