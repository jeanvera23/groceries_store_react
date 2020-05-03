import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router';

import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit/dist/js/uikit.js';
import MDUIkit from 'md-uikit';
import Logo from "../../assets/img/main_logo.png";
import BGLogin from "../../assets/img/bg_login.jpg";

import UserActions from '../../providers/user/user.actions';
import settings from '../../settings.js';

const LoginPage = () => {
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
                "username": "wong216",
                "password": "@ChinaPrueba2020"
            };
            /* const data = {
                "username": "wilcox195",
                "password": "@{Cb84lUR6ofMC}"
            }; */
            console.log(data);
            const button = event.target;
            button.innerHTML = 'Loading...';
            button.disabled = true;
            let flagResponse = false;
            fetch(`${settings.connectionString}/auth/login`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
                .then(response => {
                    console.log(response.status);
                    if (response.status >= 400 && response.status < 500) {
                        UIkit.notification('Username and/or password incorrect.');
                        flagResponse = true;
                    }
                    if (response.status >= 500 && response.status < 600) {
                        UIkit.notification('Error. Please try later.');
                        flagResponse = true;
                    }
                    console.log('test');
                    button.innerHTML = 'Login';
                    button.disabled = false;
                    return response.json();
                })
                .then(data => {
                    if (flagResponse) {
                        console.log(data);
                    }
                    if (data.userMaster) {
                        let Rol = 1;
                        if (data.userMaster.clienID != '0') {
                            Rol = 2;
                        }
                        user.setCurrentUser({
                            'Id': data.userMaster.userID,
                            'Name': data.userMaster.fullName,
                            'rol': Rol,
                            'token': data.token.access_token
                        })
                        setIsLogged(true);
                        //history.push('./admin');
                    }
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
    if (isLogged) {
        return <Redirect push to="/admin" />;
    }
    return (
        <div data-uk-height-viewport className="uk-padding" style={{ backgroundImage: `url(${BGLogin})` }} data-uk-grid>
            <div className="uk-width-1-3@s"></div>
            <div className="uk-width-1-3@s">
                <div className="md-card">
                    <div className="md-card-content">
                        <img className="uk-align-center" src={Logo} width="80%" alt='' />
                        <div className="md-input-wrapper uk-width-1-1 uk-margin-small">
                            <label>User:</label>
                            <input name="email" type="text" className="md-input" onChange={handleChange} required value={email} />
                            <span className="md-input-bar"></span>
                        </div>
                        <div className="md-input-wrapper uk-width-1-1 uk-margin-small">
                            <label>Password:</label>
                            <input name="password" type="password" className="md-input" onKeyPress={handleKeyPress} onChange={handleChange} required value={password} />
                            <span className="md-input-bar"></span>
                        </div>
                        <div className="uk-margin-medium-top">
                            <button onClick={onClickLogin} className="md-btn md-color-white md-btn-primary md-btn-block md-btn-large">LOGIN</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;