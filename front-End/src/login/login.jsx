import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login.css';
import 'regenerator-runtime/runtime'
import { loginService, alertService } from '@/_services';
import { Nav, Alert } from '@/_components';


async function loginUser(credentials) {
    return loginService.login(credentials);
    //.catch(alertService.error);

}

export default function Login({ setUsuario }) {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {

        e.preventDefault();
        const usuario = await loginUser({
            userName,
            password
        });
        setUsuario(usuario);
    }

    return (
        <div>
            <Alert />
            <div className="login-wrapper">
                <img src="https://moodle.mti.cl/pluginfile.php/1/theme_moove/logo/1643237324/combined_logos_mti_2_transparent.png" alt="MTI Logo" style={{paddingBottom:'40px'}} ></img>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Usuario</label>
                            <input className="form-control" type="text" onChange={e => setUserName(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Password</label>
                            <input className="form-control" type="password" onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <center>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </center>
                    </div>
                </form>
            </div >
        </div>
    )
}

Login.propTypes = {
    setUsuario: PropTypes.func.isRequired
};