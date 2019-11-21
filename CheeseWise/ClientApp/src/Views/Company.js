import React, { Component } from 'react';
import '../static/css/company.css';
import CompanyInfo from '../components/vievCompany/companyInfo';
import TextBox from '../components/vievCompany/textBox';
import LoadingLogo from '../components/common/loadingLogo';
import ServicesTable from '../components/vievCompany/servicesTable';

class Company extends Component {
    state = { 
        company:{},
        services:[],
        isCompanyLoaded: false,
        isServicesLoaded: false
    }

    render() { 
        // console.log(this.state.company);
        // console.log(this.state.services);
        const isStateLoaded = this.state.isCompanyLoaded && this.state.isServicesLoaded; 
        return ( 
                <React.Fragment>
                    {isStateLoaded
                    ?
                    <React.Fragment>
                        <CompanyInfo company={this.state.company}/>
                        <TextBox description={this.state.company.description}/>   
                        <br />
                        <ServicesTable services={this.state.services}/>
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
}
 
export default Company;