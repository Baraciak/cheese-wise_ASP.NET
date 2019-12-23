import React, { Component} from 'react';
import { connect } from 'react-redux';

import EditServicesTable from '../_components/editCompany/EditServicesTable';
import EditCompanyInfo from '../_components/editCompany/EditCompanyInfo';
import EditTextBox from '../_components/editCompany/EditTextBox';
import LoadingLogo from '../_components/common/loadingLogo';

import { userActions } from '../_redux/user/duck';
import store from '../_redux/store'

import {Button} from 'reactstrap';
import { companyApi } from '../_helpers/companyApi';
import { serviceApi } from '../_helpers/serviceApi';
import history from "../_helpers/history";

import '../static/css/company.css';
import { authService } from '../_services/authService';

class EditCompany extends Component {
    constructor(props){
        super(props);

        this.state = {
            //if createMode set company object from props
            company: this.props.createMode ? this.props.company : {},
            isCompanyLoaded: this.props.createMode ? true : false,
            deleteServiceIds: []
        }
    }

    componentDidMount = () =>{
        if(!this.props.createMode)
            this.fetchCompany(this.props.match.params.id);
    }

    render() { 
        const {isCompanyLoaded, company} = this.state;
        return ( 
            <React.Fragment>
                {isCompanyLoaded
                ?
                    <React.Fragment>
                        <EditCompanyInfo onSaveCompanyInfo={this.handleSaveCompanyInfo} 
                                        company={company}/>
                        <EditTextBox onSaveDescription={this.handleSaveDescription}
                                    description={company.description}/>
                        <br />
                        <EditServicesTable onAddService={this.handleAddService}
                                        onRemoveService={this.handleRemoveService} 
                                        services={this.state.company.services}/>
                        <Button onClick={this.saveCompany}>Save</Button>
                    </React.Fragment>
                :
                    <LoadingLogo />
                }
            </React.Fragment>
        );
    }
//editing helpers
    saveCompany = async() => {
        //if create mode post new company
        //else update company
        if(this.props.createMode) await this.handleCreateCompany();
        else await this.handleUpdateCompany();
        history.push('/action/show-company')
    }

    handleSaveCompanyInfo = (saveCompanyEvent) =>{
        const data = new FormData(saveCompanyEvent.target);

        let company = this.state.company;
        company.name = data.get("name").length !== 0 ? data.get("name") : company.name;
        company.phone = data.get("phone").length !== 0 ? data.get("phone") : company.phone;
        company.email = data.get("email").length !== 0 ? data.get("email") : company.email;
        company.location = data.get("location").length !== 0 ? data.get("location") : company.location;
        company.website = data.get("website").length !== 0 ? data.get("website") : company.website;
        // TODO category
        company.category = {id: parseInt(data.get("category"))};

        company.owner = {id: parseInt(this.props.currentUser.id)};
        this.setState({company});
    }

    handleSaveDescription = (event) =>{
        const data = new FormData(event.target);
        const desc = data.get("description");
        let company = this.state.company;
        company.description = desc;
        this.setState({company});
    }

    handleAddService = (event) =>{
        event.preventDefault();
        const tempId = this.state.company.services.length + 1;
        const data = new FormData(event.target);
        const service = {
            'tempId': true,
            'id': tempId,
            'name': data.get("name"),
            'description': data.get("description"),
            'price': parseInt(data.get("price")),
            'priceCategory': data.get("priceCategory")
        };
        const company = this.state.company;
        company.services = [...this.state.company.services, service];
        this.setState({company});
    }
    
    handleRemoveService = async (id) => {
        let company = {...this.state.company};
        let services = [...company.services].filter(service => service.id !== id);
        company.services = services;

        //if service is temporary(not in databse/ just saved in state)
        //do not add it to deleServiceIds table
        const serviceToDel = this.getServiceById(id) 
        if(serviceToDel.tempId !== true){
            this.setState({deleteServiceIds: [...this.state.deleteServiceIds, id]});
        }
        
        this.setState({company});
    }
    
//handlers
    handleUpdateCompany = async () => {
        let company = this.state.company;
        company.services = this.servicesIdToNull(company)

        this.deleteServices();
        this.updateCompany(company)
    }

    handleCreateCompany = async () => {
        let company = this.state.company;
        company.services = this.servicesIdToNull(company);
        this.createCompany(company);
    }

//api calls
    updateCompany = async(company) => {
        await companyApi.update(company);
        //no need to update state bcs after this call 
        //site redirects to showCompany component
    }

    createCompany = async (company) => {
        await companyApi.create(company);
        authService.refreshToken();
        store.dispatch(userActions.addCompanyBool(true));
    }
    
    fetchCompany = async (id) =>{
        const response = await companyApi.getById(id);
        this.setState({company: response, isCompanyLoaded: true})
    }

    deleteServices = async() => {
        //call remove on each service that was removed by user
        this.state.deleteServiceIds.forEach(id => serviceApi.remove(id));
    }

//helpers
    getServiceById = (id) =>{
        return [...this.state.company.services].filter(service => service.id === id)[0];
    }

    servicesIdToNull(company){
        //if temporary service(was just created) => set id = null for saving in db
        return company.services.map(service => {
            if( service.tempId === true ) service.id = null;
            return service;
        });
    }
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
});

export default connect(mapStateToProps, {})(EditCompany)