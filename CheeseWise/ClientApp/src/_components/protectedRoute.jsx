import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {authenticationService} from '../_services/authService';
import store from '../_redux/store';

export const ProtectedRoute = ({component: Component, ...rest }) => (

    <Route {...rest} render={props => {
        if (authenticationService.getCurrentUser() === null) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={"/account/login"} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)