import React, { Component } from 'react';
import Company from './Company';
import LoadingLogo from '../_components/common/loadingLogo';
import { connect } from 'react-redux';
import { companyApi } from '../_helpers/companyApi';

class ShowCompany extends Component {
    state={
        companyId: null,
        isCompanyLoaded: false
    }

    componentDidMount(){
        this.fetchCompany();
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

    //get company by user id
    fetchCompany = async() => {
        const response = await companyApi.getByUserId(this.props.currentUser.id);
        this.setState({companyId: response.company.id, isCompanyLoaded: true});
    }
}
const mapStateToProps = (state) =>({
    currentUser: state.currentUser
})  

export default connect(mapStateToProps, {})(ShowCompany);