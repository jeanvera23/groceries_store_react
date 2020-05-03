import React, { useContext, useEffect } from 'react';
/* import UIkit from 'uikit'; */
import { HashRouter, NavLink, Route } from "react-router-dom";
import MDUIkit from 'md-uikit';
import Logo from "../../assets/img/main_logo.png";

import 'md-uikit/dist/css/md-uikit.css';
import Routes from './routes.js';

import UserActions from '../../providers/user/user.actions';

const SideBar = () => {
  const user = UserActions();
  useEffect(() => {
    MDUIkit.drawer();
  })
  return (
    <HashRouter>
      <aside id="md-drawer" uk-offcanvas="overlay: true">
        <div className="uk-offcanvas-bar">
          <div className="md-drawer_header"  >
            <img src={Logo} />
            {/* <div className="uk-padding-small uk-grid-small uk-flex-middle uk-grid" uk-grid="">
                <div className="uk-width-auto uk-first-column">
                  <img className="uk-border-circle" width="40" height="40" src="https://getuikit.com/docs/images/avatar.jpg" />
                </div>
                <div className="uk-width-expand">
                  <h3 className="md-drawer_header_title md-color-white uk-margin-remove-bottom">Email</h3>
                  <p className="md-drawer_header_subtitle uk-margin-remove md-color-white">email@email.com</p>
                </div>
              </div> */}
          </div>
          <div className="md-drawer_content" >
            <ul uk-nav="multiple: true">
              {Routes.map((route, key) => (
                route.rol == user.currentUser.rol && (
                  <Route
                    key={key}
                    path={route.path}
                    children={({ match }) => (
                      <li className={route.path ? (match && "uk-active") : (route.submenu && 'uk-parent')}>
                        <NavLink to={route.path}>
                          <span className="menu_icon"><i className="material-icons">{route.icon}</i></span>
                          <span className="menu_title">{route.name}</span>
                        </NavLink>
                        {route.submenu &&
                          <ul className="uk-nav-sub">
                            {route.submenu.map((inner_route, key) =>
                              <Route
                                path={inner_route.path}
                                children={({ match }) => (
                                  <li className={match ? "uk-active" : ""}>
                                    <NavLink to={inner_route.path}>{inner_route.name}</NavLink>
                                  </li>
                                )}
                              />
                            )}
                          </ul>
                        }
                      </li>
                    )}
                  />)
              )
              )}
            </ul>
          </div>
        </div>
      </aside>
    </HashRouter>
  )
}

export default SideBar;