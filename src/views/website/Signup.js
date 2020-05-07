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
  const { email, password, firstname, lastname, dob, phone } = userCredentials;
  const onClickSignUp = async event => {

    /* Validaciones */
    let flag = true;
    if (email === "") {
      flag = false;
    }
    if (password === "") {
      flag = false;
    }
    if (flag) {
      const button = event.target;
      button.innerHTML = 'Loading...';
      button.disabled = true;
      const data = {
        firstName: userCredentials.firstname,
        lastName: userCredentials.lastname,
        email: userCredentials.email,
        password: userCredentials.password,
        dob: userCredentials.dob,
        phone: userCredentials.phone
      }
      console.log(data);
      fetch(`${settings.connectionString}/api/user_signup.php`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
        .then(response => {
          console.log(response.status);
          if (response.status >= 400 && response.status < 500) {
            UIkit.notification('Username and/or password incorrect.');
          }
          if (response.status >= 500 && response.status < 600) {
            UIkit.notification('Error. Please try later.');
          }
          console.log('test');
          button.innerHTML = 'Registrarse';
          button.disabled = false;
          return response.json();
        })
        .then(data => {
          /* alert("Registro completo. Revise su correo para ingresar"); */
          alert("Registro completo. Puede acceder");
          history.push('./login');
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
  console.log(userCredentials);
  return (
    <div>
      <div className='uk-padding' data-uk-grid>
        <div className="uk-width-1-5@s" />
        <div className="uk-width-3-5@s">
          <div className='uk-card uk-card-body md-bg-white'>
            <div data-uk-grid className="uk-grid-small">
              <div className="uk-width-1-1">
                <h3 className='uk-text-left'>Registro</h3>
              </div>
              <div className="uk-width-1-2@m">
                <div className="md-input-wrapper uk-margin-small">
                  <label>Nombre:</label>
                  <input name="firstname" type="text" className="md-input" onChange={handleChange} required value={firstname} />
                  <span className="md-input-bar"></span>
                </div>
              </div>
              <div className="uk-width-1-2@m">
                <div className="md-input-wrapper uk-margin-small">
                  <label>Apellidos:</label>
                  <input name="lastname" type="text" className="md-input" onChange={handleChange} required value={lastname} />
                  <span className="md-input-bar"></span>
                </div>
              </div>
              <div className="uk-width-1-2@m">
                <div className="md-input-wrapper uk-margin-small">
                  <label>Email:</label>
                  <input name="email" type="text" className="md-input" onChange={handleChange} required value={email} />
                  <span className="md-input-bar"></span>
                </div>
              </div>
              <div className="uk-width-1-2@m">
                <div className="md-input-wrapper uk-margin-small">
                  <label>Contraseña:</label>
                  <input name="password" type="password" className="md-input" onChange={handleChange} required value={password} />
                  <span className="md-input-bar"></span>
                </div>
              </div>
              <div className="uk-width-1-2@m">
                <div className="md-input-wrapper md-input-filled uk-margin-small">
                  <label>Fecha de Cumpleaños:</label>
                  <input name="dob" type="date" className="md-input" onChange={handleChange} required value={dob} />
                  <span className="md-input-bar"></span>
                </div>
              </div>
              <div className="uk-width-1-2@m">
                <div className="md-input-wrapper uk-margin-small">
                  <label>Teléfono de Contacto:</label>
                  <input name="phone" type="text" className="md-input" onChange={handleChange} required value={phone} />
                  <span className="md-input-bar"></span>
                </div>
              </div>
            </div>
            <div className="uk-margin-medium-top">
              <button onClick={onClickSignUp} className="md-btn md-color-white md-btn-primary md-btn-block md-btn-large">Registrarme</button>
              {/* <button onClick={signInWithGoogle} className="md-btn md-color-white md-btn-primary md-btn-block md-btn-large">SIGN IN WITH GOOGLE</button> */}


              <p>Ya tienes una cuenta? <Link to={'./login'}>Ingresa aquí</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home;