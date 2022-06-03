import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Navi, Alert } from '@/_components';
import { Home } from '@/home';
import { Users } from '@/users';
import { Entidad } from '@/entidad';
import useToken from './useToken';
import Login from '../login/login';

function App() {

    const { usuario, setUsuario } = useToken();

    if (!usuario) {
        return <Login setUsuario={setUsuario} />
    }

    const { pathname } = useLocation();

    return (
        <div className="app-container bg-light">
            <Navi />
            <Alert />
            <div className="container pt-4 pb-4">
                <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                    <Route exact path="/" component={Home} />
                    <Route path="/users" component={Users} />
                    <Route path="/entidad" component={Entidad} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        </div>
    );
}

export { App };