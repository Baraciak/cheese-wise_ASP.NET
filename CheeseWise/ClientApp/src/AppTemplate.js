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

import {Layout} from './_components/Layout';
import {ProtectedRoute} from "./_components/protectedRoute"
import {authenticationService} from "./_services/authService"

import history from './_helpers/history';
import './static/css/appTemplate.css';

class AppTemplate extends Component {
    //runs at page refresh
  	componentDidMount() {
		authenticationService.loginByToken();
  	}

  	handleLogout() {
		authenticationService.logout();
		
	}
	
  	render() {         
    	return (         
      		<Router history={history}>

        		<Layout onLogout={this.handleLogout} currentUser={this.props.currentUser}>
          			<Switch>
							<App>
								<Route exact path={"/"} component={Main}/>

								<Route path={"/category/:categoryId"} exact 
									render={props => <ListCompanies categoryId={props.match.params.categoryId} />}/>
									
								<Route path={"/company/:companyId"} exact 
									render={props => <Company companyId={props.match.params.companyId}/>}/>

								<Route path={"/account/register"} exact component={Register} />

								<Route path={"/account/login"} exact component={Login}/>

								<ProtectedRoute  path="/account/overview" exact component={AccountOverview} />
							</App>
         			 </Switch>
       			</Layout>
      		</Router>
    	);
  	}
}

const mapStateToProps = state => ({
	currentUser: state.currentUser
});
 
export default connect(mapStateToProps, {})(AppTemplate);