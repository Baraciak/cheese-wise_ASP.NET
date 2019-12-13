import React, { Component } from 'react';
import Company from './Company';
import LoadingLogo from '../_components/common/loadingLogo';
import { connect } from 'react-redux';

class AccountOverview extends Component {
    state={
        companyId: null,
        isCompanyLoaded: false
    }

    componentDidMount(){
        this.fetchCompany();
    }

    render() {
        // console.log(this.props.currentUser);
        
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

    //get company by user id
    fetchCompany = () => {
        fetch(`https://localhost:44356/api/Companies/User/${this.props.currentUser.id}`, 
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
const mapStateToProps = (state) =>({
    currentUser: state.currentUser
})  

export default connect(mapStateToProps, {})(AccountOverview);