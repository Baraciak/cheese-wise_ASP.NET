import React, { Component } from 'react';
import Company from './Company';
import LoadingLogo from '../_components/common/loadingLogo';
import { authenticationService } from '../_services/authService';

class AccountOverview extends Component {
    state={
        companyId: null,
        isCompanyLoaded: false
    }

    componentDidMount(){
        this.fetchCompany(authenticationService.getCurrentUser().id);
    }

    render() {
        return ( 
            <React.Fragment>
                {this.state.isCompanyLoaded
                ?
                <Company companyId={this.state.companyId}/>
                :
                <LoadingLogo/>
                }
                
            </React.Fragment>
        );
    }

    fetchCompany = (userId) => {
        fetch(`https://localhost:44356/api/Companies/User/${userId}`, 
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        })
        .then(res => res.json())
        .then(resJson => this.setState(
            {
                companyId: resJson.company.id,
                isCompanyLoaded: true
            }))
        .catch(err => console.log(err));
    }
}
 
export default AccountOverview;