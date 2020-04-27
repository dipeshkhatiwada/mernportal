import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Rutes for private and admin
import PrivateRoute from './auth/helper/PrivateRoutes';
// import AdminRoute from './auth/helper/AdminRoutes';

// Component Import
import Signin from './user/Signin';
import Dashboard from './user/Dashboard';
import AddCategory from './category/AddCategory';
import ManageCategory from './category/ManageCategory';
import UpdateCategory from './category/UpdateCategory';
import AddPost from './post/AddPost';
const Routes= ()=> {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Signin} />
                <Route path="/signin" exact component={Signin} />
                
                <PrivateRoute path="/admin/dashboard" exact component={Dashboard}  />

                <PrivateRoute path="/admin/category/create" exact component={AddCategory}  />
                <PrivateRoute path="/admin/category/index" exact component={ManageCategory}  />
                <PrivateRoute path="/admin/category/update-:categoryId" exact component={UpdateCategory}  />

                <PrivateRoute path="/admin/post/create" exact component={AddPost}  />

            </Switch>
        </BrowserRouter>
    );
}

export default Routes