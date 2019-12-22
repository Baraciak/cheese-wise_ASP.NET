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

 
class EditCompany extends Component {
    constructor(props){
        super(props);
        //if user is creating new company
        if(this.props.createMode){
            this.state = {
                company: this.props.company,
                isCompanyLoaded: true,
                deleteServiceIds: []
            }
        }else{
            this.state = { 
                showModal: false,
                company:{},
                isCompanyLoaded: false, 
                deleteServiceIds: []
            }
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
                                        onRemoveService={this.removeService} 
                                        services={this.state.company.services}/>
                        <Button onClick={this.saveCompany}>Save</Button>
                    </React.Fragment>
                :
                    <LoadingLogo />
                }
            </React.Fragment>
        );
    }

    saveCompany = async() => {
        //if create mode post new company
        if(this.props.createMode){
           await this.createCompany();
        }else{
        //else update company
            await this.updateCompany();
        }
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
    
    removeService = async (id) => {
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

    updateCompany = async () => {
        this.deleteServices();

        const company = this.state.company;
        //if temporary service => set id = null for saving in db
        company.services.map(service => {
            if( service.tempId === true ) service.id = null;
            return service;
        });

        const response = await companyApi.update(company);
        this.setState({company: response});
    }

    createCompany = async () => {
        await companyApi.create(this.state.company);
        store.dispatch(userActions.addCompanyBool(true));
    }
    
    fetchCompany = async (id) =>{
        const response = await companyApi.getById(id);
        this.setState({company: response, isCompanyLoaded: true})
    }

    deleteServices = async() => {
        this.state.deleteServiceIds.forEach(id => serviceApi.remove(id));
    }

    getServiceById = (id) =>{
        return [...this.state.company.services].filter(service => service.id === id)[0];
    }
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
});

export default connect(mapStateToProps, {})(EditCompany)