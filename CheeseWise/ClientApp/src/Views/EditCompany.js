import React, { Component} from 'react';
import '../static/css/company.css';
import EditCompanyInfo from '../_components/editCompany/EditCompanyInfo';
import EditTextBox from '../_components/editCompany/EditTextBox';
import EditServicesTable from '../_components/editCompany/EditServicesTable';
import LoadingLogo from '../_components/common/loadingLogo';
import history from "../_helpers/history";
import { connect } from 'react-redux';
import { userActions } from '../_redux/user/duck';
import store from '../_redux/store'
import { handleResponse } from '../_helpers/handleResponse';
import {Button} from 'reactstrap';

 
class EditCompany extends Component {
    constructor(props){
        super(props);
        //if user is creating new company
        if(this.props.createMode){
            this.state = {
                company: this.props.company,
                isCompanyLoaded: true
            }
        }else{
            this.state = { 
                showModal: false,
                company:{},
                isCompanyLoaded: false
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
                                        onRemoveService={this.handleRemoveService} 
                                        services={this.state.company.services}/>
                        <Button onClick={this.handleSave}>Save</Button>
                    </React.Fragment>
                :
                    <LoadingLogo />
                }
            </React.Fragment>
        );
    }
   
    handleSave = () => {
        //saveCompany() uses postCompany/putCompany
        this.saveCompany();
        //push after saving
    }

    saveCompany = () => {
        //if create mode post new company
        if(this.props.createMode){
            this.postCompany();
        }else{
            //else update company
            this.putCompany();
        }
        setTimeout(() => {
            history.push('/action/show-company')
        }, 400);
    }

    handleSaveCompanyInfo = (saveCompanyEvent) =>{
        const data = new FormData(saveCompanyEvent.target);
        console.log(this.state.company);

        let company = this.state.company;
        company.name = data.get("name");
        company.phone = data.get("phone");
        company.email = data.get("email");
        company.location = data.get("location");
        company.website = data.get("website");
        company.owner = {id: parseInt(this.props.currentUser.id)};
        company.category = {id: parseInt(data.get("category"))};

        //co jest zle kwa
        // company.name = data.get("name").length === 0 ? data.get("name") : company.name;
        // company.phone = data.get("phone").length === 0 ? data.get("phone") : company.phone;
        // company.email = data.get("email").length === 0 ? data.get("email") : company.email;
        // company.location = data.get("location").length === 0 ? data.get("location") : company.location;
        // company.website = data.get("website").length === 0 ? data.get("website") : company.website;
        this.setState({company});
        console.log(company, 'compInfo');
    }

    handleSaveDescription = (event) =>{
        const data = new FormData(event.target);
        const desc = data.get("description");
        let company = this.state.company;
        company.description = desc;
        this.setState({company});
        // console.log(company, 'desc');
    }

    handleAddService = (event) =>{
        event.preventDefault();

        const data = new FormData(event.target);
        const service = {
            'name': data.get("name"),
            'description': data.get("description"),
            'price': parseInt(data.get("price")),
            'priceCategory': data.get("priceCategory")
        };
        const company = this.state.company;
        company.services = [...this.state.company.services, service];
        this.setState({company});

        console.log(this.state.company);
    }

    handleRemoveService = (id) =>{
        //should return 
        this.deleteService(id);
        let services = this.state.company.services;
        services = services.filter(service => service.id !== id);
        this.setState({services});
    }

    putCompany = () => {
        const company = this.state.company;
        return fetch(`https://localhost:44356/api/companies/${company.id}`, 
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ sessionStorage.token
            },
            body: JSON.stringify(company)
        })
        .then(res => handleResponse(res))
        .then(resJsonCompany => {
            console.log(resJsonCompany, 'put');
            this.setState({company: resJsonCompany});
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
        .then(res => res.json())
        .then(resJsonCompany => {
            console.log(resJsonCompany, 'post');
            //here reJson has new company id
            // this.setState({company: resJsonCompany});
            store.dispatch(userActions.addCompanyBool(true));
        })
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
};
const mapStateToProps = (state) => ({
    currentUser: state.currentUser
});

export default connect(mapStateToProps, {})(EditCompany)