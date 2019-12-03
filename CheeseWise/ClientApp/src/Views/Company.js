import React, { Component } from 'react';
import '../static/css/company.css';
import CompanyInfo from '../_components/vievCompany/companyInfo';
import TextBox from '../_components/vievCompany/textBox';
import LoadingLogo from '../_components/common/loadingLogo';
import ServicesTable from '../_components/vievCompany/servicesTable';
import {authenticationService} from '../_services/authService'
import history from "../_helpers/history";
 
export default class Company extends Component {
    state = { 
        company:{},
        services:[],
        isCompanyLoaded: false,
        isServicesLoaded: false,
        editMode: false
    }

    handleEdit = () =>{
        this.setState({editMode: true});
        
    }

    handleSave = () =>{
        this.setState({editMode: false});
        //fetch save data
    }

    render() { 
        const isStateLoaded = this.state.isCompanyLoaded && this.state.isServicesLoaded; 

        return ( 
                <React.Fragment>
                    {isStateLoaded
                    ?
                    <React.Fragment>
                        <CompanyInfo editMode={this.state.editMode} company={this.state.company}/>
                        <TextBox description={this.state.company.description}/>   
                        <br />
                        <ServicesTable services={this.state.services}/>
                        {/* if curr user is owner of this company render edit/save btns*/}
                        {history.location.pathname === "/account/overview"
                        ?
                            !this.state.editMode
                            ?
                            <button className="btn btn-primary" onClick={this.handleEdit}>Edit</button>
                            :
                            <button className="btn btn-primary" onClick={this.handleSave}>Save</button>
                        :
                        //if user is not an owner dont render edit/save btns
                        <React.Fragment/> 
                        }
                    </React.Fragment>
                    :
                    <LoadingLogo />}
                </React.Fragment>

         );
    }

    componentDidMount = () =>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.fetchCompany(this.props.companyId);
        this.fetchServices(this.props.companyId);
    }

    fetchCompany = companyId =>{
        fetch(`https://localhost:44356/api/Companies/${companyId}`, 
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        })
        .then(res => res.json())
        .then(resJson => this.setState(
            {
                company: resJson, 
                isCompanyLoaded: true
            }))
        .catch(err => console.log(err));
    }

    fetchServices = companyId => {
        fetch(`https://localhost:44356/api/Services/Company/${companyId}`, 
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        })
        .then(res => res.json())
        .then(resJson => this.setState(
            {
                services: resJson,
                isServicesLoaded: true
            }))
        .catch(err => console.log(err));
    }
};