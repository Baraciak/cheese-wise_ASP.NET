import React, { Component } from 'react';
// import { Route } from 'react-router';
import { Layout } from './components/Layout';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Main from './Views/Main';
import ListCompanies from './Views/ListCompanies';
import Company from './Views/Company';

import './static/css/appTemplate.css';
import Register from './Views/Register';
import Login from './Views/Login';


class AppTemplate extends Component {
    state = {  }
    render() { 
        return ( 
          <Layout>
            <Switch>
                <Route path={"/"} exact component={Main} />
                <Route path={"/category/:categoryId"} exact
                    render={props => <ListCompanies categoryId={props.match.params.categoryId} />}
                />
                <Route path={"/company/:companyId"} exact 
                        render={props => <Company companyId={props.match.params.companyId} />}
                />
                <Route path={"/account/register"} exact component={Register} />
                <Route path={"/account/login"} exact component={Login} />
            </Switch>
          </Layout>
        );
    }
}
 
export default AppTemplate;
