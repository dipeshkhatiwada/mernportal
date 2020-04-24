import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Rutes for private and admin
import PrivateRoute from './auth/helper/PrivateRoutes';
// import AdminRoute from './auth/helper/AdminRoutes';

// Component Import
import Signin from './user/Signin';
import Dashboard from './user/Dashboard';
import AddCategory from './category/AddCategory';

const Routes= ()=> {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Signin} />
                <Route path="/signin" exact component={Signin} />
                
                <PrivateRoute path="/admin/dashboard" exact component={Dashboard}  />
                <PrivateRoute path="/admin/category/create" exact component={AddCategory}  />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes