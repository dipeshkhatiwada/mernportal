import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import Home from "./core/Home"
import Signin from './user/Signin';
// import AdminRoute from './auth/helper/AdminRoutes';
// import PrivateRoute from './auth/helper/PrivateRutes';

const Routes= ()=> {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Signin} />
                <Route path="/signin" exact component={Signin} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes