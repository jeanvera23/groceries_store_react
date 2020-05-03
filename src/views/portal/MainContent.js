import React, { Component } from 'react';
import { Route } from "react-router-dom";
/* import UIkit from 'uikit'; */

import 'uikit/dist/css/uikit.min.css';
import Routes from './routes.js';
/* Custom Routes */
/* import ApplicationFormBase from "./ApplicationForm/ApplicationFormBase.js"; */

const MainContent = () => {
  return (
    <main id="admin-main">
      <div className='uk-container uk-text-left'>
        {/* Menu Routes */}
        {Routes.map((route, key) =>
          <div key={key}>
            <Route path={route.path} component={route.component} />
            {route.submenu &&
              route.submenu.map((inner_route, key) =>
                <Route path={inner_route.path} component={inner_route.component} />
              )
            }
          </div>
        )}
        {/* Custom Routes */}
        {/* <Route path='/admin/application/' component={ApplicationFormBase} /> */}
      </div>
    </main>
  )
}

export default MainContent;