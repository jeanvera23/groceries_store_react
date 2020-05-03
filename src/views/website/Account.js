import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import MDUIKit from 'md-uikit';
import UIkit from 'uikit';

//Components
import FrontHeader from './Header';
import FrontFooter from './Footer';
import Cart from './Cart';
import AccountOrders from './AccountOrders';
import AccountLists from './AccountLists';
import AccountPassword from './AccountPassword';
import AccountOrderDetails from './AccountOrderDetails';

// Actions
import UserActions from '../../providers/user/user.actions';

import settings from '../../settings.js';

const Account = ({ props }) => {

  const user = UserActions();
  const history = useHistory();

  if (user.currentUser == null) {
    history.push("/");
  }
  console.log("render");
  return (
    <div>
      <div className="uk-grid-match" data-uk-grid data-uk-height-viewport="expand:true">
        <div className="uk-width-1-5@m ">
          <div className="uk-card uk-card-body md-bg-white">
            {user.currentUser &&
              <h5 className="uk-text-center">{user.currentUser.firstName + " " + user.currentUser.lastName}</h5>
            }
            <ul class="uk-list">
              <li><Link to="/account/orders">Mis Ordenes</Link></li>
              {/* <li><Link to="/account/lists">Mis Listas</Link></li> */}
              <li><Link to="/account/change_password">Cambiar contraseña</Link></li>
            </ul>
            <Link to='/' class="md-btn md-btn-outlined md-btn-primary">Volver a la tienda</Link>

          </div>
        </div>
        <div className="uk-width-4-5@m">
          <div className="uk-padding-small">
            {/* Custom Routes */}
            <Route path='/account/change_password/' component={AccountPassword} />
            <Route path='/account/orderdetails/:refNumber' component={AccountOrderDetails} />
            <Route path='/account/lists/' component={AccountLists} />
            <Route path='/account/orders/' component={AccountOrders} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Account;