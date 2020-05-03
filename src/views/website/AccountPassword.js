import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import { useParams } from "react-router";
import MDUIKit from 'md-uikit';
import UIkit from 'uikit';


// Actions
import UserActions from '../../providers/user/user.actions';

import settings from '../../settings.js';

const AccountPassword = ({ props }) => {
  const user = UserActions();

  return (
    <div>
      <h3 className="uk-text-left">Cambiar Contraseña</h3>
      <div className="uk-grid-small uk-grid-match" data-uk-grid>
        <div className='uk-width-1-1'>
          <div class="uk-card uk-card-default uk-card-body">
            asd
                </div>
        </div>
      </div>
    </div>
  )
}
export default AccountPassword;