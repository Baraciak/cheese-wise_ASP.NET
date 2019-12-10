import React, { Component} from 'react';
import '../static/css/company.css';
import CompanyInfo from '../_components/vievCompany/companyInfo';
import TextBox from '../_components/vievCompany/textBox';
import LoadingLogo from '../_components/common/loadingLogo';
import ServicesTable from '../_components/vievCompany/servicesTable';
import history from "../_helpers/history";
import { connect } from 'react-redux';
import { userActions } from '../_redux/user/duck';
import store from '../_redux/store'
import DeleteModal from '../_components/common/DeleteModal';
import { handleResponse } from '../_helpers/handleResponse';

 
class Company extends Component {
    constructor(props){
        super(props);
        //if user is creating new company
        if(this.props.createMode){
            this.state = {
                showModal: false,
                company: this.props.company,
                services:[],
                isCompanyLoaded: true,
                isServicesLoaded: true,
                editMode: true,
            }
        }else{
            this.state = { 
                showModal: false,
                company:{},
                services:[],
                isCompanyLoaded: false,
                isServicesLoaded: false,
                editMode: false
            }
        }
    }

    componentDidMount = () =>{
        if(!this.props.createMode){
            this.fetchCompany(this.props.companyId);
            this.fetchServices(this.props.companyId);
        }
    }

    handleEdit = () =>{
        this.setState({editMode: true});
    }

    handleSave = () => {
        this.setState({editMode: false});
        //fetch save data
        this.saveCompany();
        this.postServices();
    }

    saveCompany =() => {
        if(this.props.createMode){
            this.postCompany();
            //push to show-company - exit create mode
            setTimeout(() => {
                history.push('/action/show-company')
            }, 200);
          
        }else{
            this.putCompany();
        }
    }

    handleDelete = () => {
        this.toggleModal();
        this.deleteCompany();
    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    }

    render() { 
        const {isCompanyLoaded, isServicesLoaded, company, editMode} = this.state;
        const isStateLoaded = isCompanyLoaded && isServicesLoaded;

        return ( 
            <React.Fragment>
                {isStateLoaded
                ?
                <React.Fragment>
                    <CompanyInfo onSaveCompanyInfo={this.handleSaveCompanyInfo} 
                                    editMode={editMode} 
                                    company={company}/>

                    <TextBox onSaveDescription={this.handleSaveDescription}
                            editMode={editMode}
                            description={company.description}/>
                    <br />
                    <ServicesTable onAddService={this.handleAddService}
                                    onRemoveService={this.handleRemoveService} 
                                    editMode={editMode} 
                                    services={this.state.services}/>
                    {/* if curr user is owner of this company render edit/save btns*/}
                    {/* iff currentUser comes to this paths we knows that he is an owner of this company */}
                    {["/action/create-company", "/action/show-company"].includes(history.location.pathname) 
                    ?
                        editMode //if in edit mode just render save btn
                        ?<button className="btn btn-primary" onClick={this.handleSave}>Save</button>
                        :<div> {/* else render edit and delete btns */}
                            <button className="btn btn-primary" onClick={this.handleEdit}>Edit</button>
                            <button className="btn btn-danger ml-2" onClick={this.toggleModal}>Delete</button>
                        </div>
                    :
                    //if user is not an owner dont render edit/save btns
                    <React.Fragment/> 
                    }
                </React.Fragment>
                :
                <LoadingLogo />}

                <DeleteModal message="Are yous sure you want to delete your Company?"
                                showModal={this.state.showModal}
                                toggle={this.toggleModal}
                                onDelete={this.handleDelete}/>
            </React.Fragment>
        );
    }

    handleSaveCompanyInfo = (saveCompanyEvent) =>{
        saveCompanyEvent.preventDefault();

        const data = new FormData(saveCompanyEvent.target);
        const company = {
            name: data.get("name"),
            location: data.get("location"),
            phone: data.get("phone"),
            email: data.get("email"),
            category: {id: parseInt(data.get("categoryId"))},
            owner: {id: parseInt(this.props.currentUser.id)},
            description: this.state.company.description
        };
        this.setState({company});
        console.log(company);
    }

    handleSaveDescription = (event) =>{
        event.preventDefault();
        const data = new FormData(event.target);
        const desc = data.get("description");
        let company = this.state.company;
        company.description = desc;
        this.setState({company});
    }

    handleAddService = (addServiceEvent) =>{
        addServiceEvent.preventDefault();

        const data = new FormData(addServiceEvent.target);
        const service = {
            name: data.get("name"),
            description: data.get("description"),
            price: data.get("price"),
            priceCategory: data.get("priceCategory"),
            company: this.state.company
        };
        this.setState({services: [...this.state.services, service]})
    }

    handleRemoveService = (name) =>{
        // fix here, deleted all services with same name,
        //problem? cant creat unique id to delete by id
        let services = this.state.services;
        services = services.filter(service => service.name !== name);
        this.setState({services});
        // console.log(name);
        // let services = this.state.services;
        // const serviceToDelete = services.find(service => service === service);
        // const indexOfServiceToDelete = services.indexOf(serviceToDelete);
        // console.log(indexOfServiceToDelete, 'index');
        // for(let service of services){
        //     if (service.name === name){
        //         services[indexOfServiceToDelete] = null;
        //     }
        //     break;
        // }
        // console.log(services);
        // this.setState({services})
    }

    deleteCompany = () => {
        return fetch(`https://localhost:44356/api/companies/${this.props.companyId}`, 
        {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ sessionStorage.token
            }
        })
        .then(res => handleResponse(res))
        .then(resJson => {
            store.dispatch(userActions.addCompanyBool(false));
            history.push('/');
        })
        .catch(error => console.log(error))
    }

    putCompany = () => {
        return fetch(`https://localhost:44356/api/companies/${this.props.companyId}`, 
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ sessionStorage.token
            },
            body: JSON.stringify({company: this.state.company, id: this.props.companyId})
        })
        .then(res => handleResponse(res))
        .then(resJsonCompany => {
            console.log(resJsonCompany);
            this.setState({company: resJsonCompany})
            store.dispatch(userActions.addCompanyBool(true));
        })
        .catch(error => console.log(error))
    }

    postCompany = () => {
        return fetch("https://localhost:44356/api/companies", 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ sessionStorage.token
            },
            body: JSON.stringify(this.state.company)
        })
        .then(res => handleResponse(res))
        .then(resJsonCompany => {
            this.setState({company: resJsonCompany})
            store.dispatch(userActions.addCompanyBool(true));
        })
        .catch(error => console.log(error))
    }

    postServices = () => {
        const companyId = this.state.company.id;
        let services = [...this.state.services];
        services.forEach(service => service.company.id = companyId);

        console.log(services, ',y');
        return fetch("https://localhost:44356/api/services", 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ sessionStorage.token
            },
            body: JSON.stringify({services})
        })
        .then(res => handleResponse(res))
        .then(resJson => console.log(resJson))
        .catch(error => console.log(error))
    }
    

    fetchCompany = companyId =>{
        fetch(`https://localhost:44356/api/Companies/${companyId}`, 
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        })
        .then(res => handleResponse(res))
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
        .then(res => handleResponse(res))
        .then(resJson => this.setState(
            {
                services: resJson,
                isServicesLoaded: true
            }))
        .catch(err => console.log(err));
    }
};
const mapStateToProps = (state) => ({
    currentUser: state.currentUser
});

export default connect(mapStateToProps, {})(Company)