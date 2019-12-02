import React, { Component } from 'react';
import Company from './Company';
import { connect } from 'react-redux';
import LoadingLogo from '../_components/common/loadingLogo';

class AccountOverview extends Component {
    state={
        companyId: null,
        isCompanyLoaded: false
    }
    componentDidMount(){
        this.fetchCompany(this.props.userId);
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

    async fetchCompany(userId){
        return fetch(`https://localhost:44356/api/Companies/User/${userId}`, 
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        })
        .then(res => res.json())
        .then(resJson => this.setState(
            {
                companyId: resJson.id,
                isCompanyLoaded: true
            }))
        .catch(err => console.log(err));
    }

};
const mapStateToProps = state => ({
	userId: state.currentUser.id
});
 
export default connect(mapStateToProps, {}) (AccountOverview);