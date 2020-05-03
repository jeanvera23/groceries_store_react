import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Link, Switch } from "react-router-dom";

//Components
import FrontHeader from './Header';
import FrontFooter from './Footer';
import Cart from './Cart';

import UIkit from 'uikit';
import settings from '../../settings.js';


import Login from './Login';
import Signup from './Signup';
import Products from './Products';
import Account from './Account';
import SearchResult from './SearchResult';
import Checkout from './Checkout';
import Home from './Home';

import UserActions from '../../providers/user/user.actions';
const MainContainer = () => {

    const user = UserActions();
    return (
        <div>
            <FrontHeader />
            <Cart />
            <Route exact path='/' component={Home} />
            
            <Route path='/productos/:categoryId' component={Products} />
            <Route path='/registro' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/account' component={Account} />
            <Route path='/results/:value' component={SearchResult} />
            <FrontFooter />
        </div >
    )
}
export default MainContainer;