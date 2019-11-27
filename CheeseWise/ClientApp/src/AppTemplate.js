import React, { Component } from 'react';
import { Layout } from './components/Layout';
import {Route, Switch} from 'react-router-dom';

import Main from './Views/Main';
import ListCompanies from './Views/ListCompanies';
import Company from './Views/Company';
import Register from './Views/Register';
import Login from './Views/Login';

import './static/css/appTemplate.css';



class AppTemplate extends Component {
    state = { 
      user: null
    }
    
    render() { 
        return ( 
          <Layout onLogout={this.handleLogout} user={this.state.user}>
            <Switch>
                <Route path={"/"} exact 
                    render={props => <Main tokenAuth={this.handleTokenAuthentication} />}
                />
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

    handleTokenAuthentication = () =>{
      const authData = {Token: sessionStorage.token}

      fetch("https://localhost:44356/api/auth/validate-token", 
      {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(authData)
      })
      .then(res => res.json())
      .then(resJson => this.setState({user: resJson}) )
      .catch(error => console.log(error));
    }

    handleLogout = () =>{
        this.setState({user: null});
        sessionStorage.removeItem('token');
    }
}
 
export default AppTemplate;
