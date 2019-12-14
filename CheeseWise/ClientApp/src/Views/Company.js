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
                isCompanyLoaded: true,
                editMode: true,
            }
        }else{
            this.state = { 
                showModal: false,
                company:{},
                isCompanyLoaded: false,
                editMode: false
            }
        }
    }

    componentDidMount = () =>{
        if(!this.props.createMode){
            this.fetchCompany(this.props.companyId);
        }
    }

    handleEdit = () =>{
        this.setState({editMode: true});
    }

    handleSave = () => {
        this.setState({editMode: false});
        //saveCompany() uses postCompany/putCompany
        this.saveCompany();
    }

    handleDelete = () => {
        this.toggleModal();
        this.deleteCompany();
    }

    render() { 
        const {isCompanyLoaded, company, editMode} = this.state;

        return ( 
            <React.Fragment>
                {isCompanyLoaded
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
                                    services={this.state.company.services}/>
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

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    }

    saveCompany = () => {
        if(this.props.createMode){
            this.postCompany();
            //history.push to show-company -> exit create mode
            setTimeout(() => {
                history.push('/action/show-company')
            }, 400);
        }else{
            this.putCompany();
        }
    }

    handleSaveCompanyInfo = (saveCompanyEvent) =>{
        const data = new FormData(saveCompanyEvent.target);
        const company = this.state.company;
        company.name = data.get("name");
        company.phone = data.get("phone");
        company.email = data.get("email");
        company.owner = {id: parseInt(this.props.currentUser.id)};
        company.category = {id: parseInt(data.get("category"))};
        company.location = data.get("location");
        company.website = data.get("website");
        this.setState({company});
        // console.log(company, 'compInfo');
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
        const company = this.state.company;
        console.log(company);

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

export default connect(mapStateToProps, {})(Company)