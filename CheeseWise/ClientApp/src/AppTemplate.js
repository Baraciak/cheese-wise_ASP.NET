import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import {Route, Switch} from 'react-router';

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
  	constructor(props) {
		super(props);

		this.state = {
			currentUser: null
		};
	}

  	componentDidMount() {
		//runs at page refresh
		authenticationService.loginByToken();
		authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  	}

  	handleLogout() {
		authenticationService.logout();
		history.push('/login');
  	}

  	render() {         
    	return (         
      		<Router history={history}>

        		<Layout onLogout={this.handleLogout} currentUser={this.state.currentUser}>
          			<Switch>
							<App>
								<Route exact path={"/"} component={Main}/>

								<Route path={"/category/:categoryId"} exact 
									render={props => <ListCompanies categoryId={props.match.params.categoryId} />}/>
									
								<Route path={"/company/:companyId"} exact 
									render={props => <Company companyId={props.match.params.companyId}/>}/>

								<Route path={"/account/register"} exact component={Register} />

								<Route path={"/account/login"} exact component={Login}/>

								<ProtectedRoute exact path="/account/overview" component={AccountOverview} />
							</App>
         			 </Switch>
       			</Layout>
      		</Router>
    	);
  	}
}
 
export default AppTemplate;
