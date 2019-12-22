import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {authService} from '../_services/authService';

export const ProtectedRoute = ({component: Component, ...rest }) => (

    <Route {...rest} render={props => {
        if (authService.getCurrentUser() === null) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={"/account/login"} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)