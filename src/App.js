import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import NotFound from './views/not-found';
import AdminPanel from './views/portal/AdminPanel';
import LoginPage from './views/portal/LoginPage';
import Login from './views/website/Login';
import Checkout from './views/website/Checkout';

import MainContainer from './views/website/MainContainer';

import './App.css';

import UserActions from './providers/user/user.actions';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faIdCard, faCode, faToolbox, faEnvelope, faTachometerAlt, faMobileAlt, faBrain, faAtom, faDownload, faEye, faPencilRuler, faCogs, faChevronRight, faTag, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';//,faDownload,faLinkedIn
library.add(faIdCard, faCode, faToolbox, faEnvelope, faTachometerAlt, faMobileAlt, faBrain, faAtom, fab, faDownload, faEye, faPencilRuler, faCogs, faChevronRight, faTag, faUser, faShoppingCart);

function App() {
  const user = UserActions();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/checkout' render={() =>
            user.currentUser ? (
              <Checkout />
            ) : (
                <Redirect to='/login' />
              )
          } />
          <Route path='/checkout' component={Checkout} />
          <Route path='/' component={MainContainer} />
          <Route path='/admin' render={() =>
            user.currentUser ? (
              <AdminPanel />
            ) : (
                <Redirect to='/' />
              )
          } />
          <Route path='/adm' render={() =>
            user.currentUser ? (
              <Redirect to='/admin' />
            ) : (
                <LoginPage />
              )
          } />



          {/*<Route path='/servicios' component={Servicios} />
          <Route path='/propiedades/:type/:district/:page' component={Propiedades} />
          <Route path='/propiedades' component={Propiedades} />
          <Route path='/detalle_propiedad/:propiedadId' component={DetallePropiedad} /> */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
