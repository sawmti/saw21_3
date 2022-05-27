import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { EntidadList } from './List';
import { EntidadAdd } from './Add';
import { EntidadEdit } from './Edit';

function Entidad({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={EntidadList} />
            <Route path={`${path}/add`} component={EntidadAdd} />
            <Route path={`${path}/edit/:id`} component={EntidadEdit} />
        </Switch>
    );
}

export { Entidad };