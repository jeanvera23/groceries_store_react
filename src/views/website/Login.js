import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";

//Components
import FrontHeader from './Header';
import FrontFooter from './Footer';
import Cart from './Cart';

import UIkit from 'uikit';
import MDUIkit from 'md-uikit';
import settings from '../../settings.js';
import UserActions from '../../providers/user/user.actions';

const Home = () => {
  const [userCredentials, setUserCredentials] = useState({ email: "", password: "" });
  const [isLogged, setIsLogged] = useState(false);
  let history = useHistory();
  const user = UserActions();
  const { email, password } = userCredentials;
  const onClickLogin = async event => {

    /* Validaciones */
    let flag = true;
    if (email === "") {
      flag = false;
    }
    if (password === "") {
      flag = false;
    }
    if (flag) {
      const data = {
        "email": userCredentials.email,
        "password": userCredentials.password
      };
      //console.log(data);
      const button = event.target;
      button.innerHTML = 'Cargando...';
      button.disabled = true;
      fetch(`${settings.connectionString}/api/user_login.php`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
        .then(response => {
          console.log(response.status);
          if (response.status >= 400 && response.status < 500) {
            UIkit.notification('Usuario y/o contraseña incorrectos.');
          }
          if (response.status >= 500 && response.status < 600) {
            UIkit.notification('Error. Please try later.');
          }
          button.innerHTML = 'Ingresar';
          button.disabled = false;
          return response.json();
        })
        .then(data => {
          user.setCurrentUser({
            'userId': data.user.userId,
            'firstName': data.user.firstName,
            'lastName': data.user.lastName,
            'email': data.user.email,
            'token': data.token
          })
          history.push('../');

        }).catch(data => {
          UIkit.notification('Error. Please try later.');
          button.innerHTML = 'Login';
          button.disabled = false;
        })
    } else {
      UIkit.notification('Please fill blank spaces');
    }

  }
  useEffect(() => {
    MDUIkit.components();
  }, [])
  const handleChange = event => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value })
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClickLogin(event)
    }
  }
  return (
    <div>
      <div className='uk-padding' data-uk-grid>
        <div className="uk-width-1-5@s" />
        <div className="uk-width-3-5@s">
          <div data-uk-height-viewport="expand: true">
            <div className='uk-card uk-card-body md-bg-white'>
              <div data-uk-grid className="uk-grid-small">
                <div className="uk-width-1-1">
                  <h3 className='uk-text-left'>Ingreso</h3>
                </div>

                <div className="uk-width-1-1@m">
                  <div className="md-input-wrapper uk-margin-small">
                    <label>Email:</label>
                    <input name="email" type="text" className="md-input" onChange={handleChange} required value={email} />
                    <span className="md-input-bar"></span>
                  </div>
                </div>
                <div className="uk-width-1-1@m">
                  <div className="md-input-wrapper uk-margin-small">
                    <label>Contraseña:</label>
                    <input name="password" type="password" onKeyPress={handleKeyPress} className="md-input" onChange={handleChange} required value={password} />
                    <span className="md-input-bar"></span>
                  </div>
                </div>

              </div>
              <div className="uk-margin-medium-top">
                <button onClick={onClickLogin} className="md-btn md-color-white md-btn-primary md-btn-block md-btn-large">Ingresar</button>
                <p>Eres nuevo en Bodeguita Movil <Link to='./registro'>Registrate aquí</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home;
