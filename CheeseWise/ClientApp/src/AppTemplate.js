import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import {Route, Switch} from 'react-router';
import { connect } from 'react-redux';

import AccountOverview from './Views/AccountOverview';
import ListCompanies from './Views/ListCompanies';
import Register from './Views/Register';
import Company from './Views/Company';
import Login from './Views/Login';
import Main from './Views/Main';
import App from './App';

import {Layout} from './_components/layout/Layout';
import {ProtectedRoute} from "./_components/protectedRoute"
import {authenticationService} from "./_services/authService"

import history from './_helpers/history';
import './static/css/appTemplate.css';
import CreateCompany from './Views/CreateCompany';

class AppTemplate extends Component {
    //runs at page refresh
  	componentWillMount() {
		if(sessionStorage.token !== undefined){
			authenticationService.loginByToken();
		}
  	}

  	handleLogout() {
		authenticationService.logout();
	}
	
  	render() {         
    	return (         
      		<Router history={history}>
        		<Layout onLogout={this.handleLogout}>

          			<Switch>
						<App>
							<Route exact path={"/"} component={Main}/>

							<Route path={"/category/:categoryId"} exact 
								render={props => <ListCompanies categoryId={props.match.params.categoryId} />}/>
								
							<Route path={"/company/:companyId"} exact 
								render={props => <Company companyId={props.match.params.companyId}/>}/>

							{this.props.hasCompany
							?<ProtectedRoute  path="/action/show-company" exact component={AccountOverview} />
							:<ProtectedRoute  path="/action/create-company" exact component={CreateCompany} />
							}

							<Route path={"/account/register"} exact component={Register} />

							<Route path={"/account/login"} exact component={Login}/>
						</App>
         			</Switch>

       			</Layout>
      		</Router>
    	);
  	}
}

const mapStateToProps = state => ({
	currentUser: state.currentUser,
	hasCompany: state.hasCompany
});
 
export default connect(mapStateToProps, {})(AppTemplate);