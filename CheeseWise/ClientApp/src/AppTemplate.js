import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import {Route, Switch} from 'react-router';
import { connect } from 'react-redux';

import EditCompany from './Views/EditCompany';
import ShowCompany from './Views/ShowCompany';
import ListCompanies from './Views/ListCompanies';
import Register from './Views/Register';
import Company from './Views/Company';
import Login from './Views/Login';
import Main from './Views/Main';

import {Layout} from './_components/layout/Layout';
import {ProtectedRoute} from "./_components/protectedRoute"
import {authService} from "./_services/authService"

import history from './_helpers/history';
import './static/css/appTemplate.css';
import CreateCompany from './Views/CreateCompany';

class AppTemplate extends Component {
    //runs at page refresh
  	componentWillMount() {
		if(sessionStorage.token !== undefined){
			authService.loginByToken();
		}
  	}
	
  	render() {         
    	return (         
      		<Router history={history}>
        		<Layout>
          			<Switch>
						<Route exact path={"/"} component={Main}/>

						<Route path={"/category/:categoryId"} exact 
							render={props => <ListCompanies categoryId={props.match.params.categoryId} />}/>
							
						<Route path={"/company/:companyId"} exact 
							render={props => <Company companyId={props.match.params.companyId}/>}/>

						{this.props.hasCompany
						?	
						<React.Fragment>
							<ProtectedRoute  path="/action/show-company" exact component={ShowCompany} />
							<ProtectedRoute  path="/action/edit-company/:id" exact component={EditCompany} />
						</React.Fragment>
						:
						<ProtectedRoute  path="/action/create-company" exact component={CreateCompany} />
						}

						<Route path={"/account/register"} exact component={Register} />
						<Route path={"/account/login"} exact component={Login}/>
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