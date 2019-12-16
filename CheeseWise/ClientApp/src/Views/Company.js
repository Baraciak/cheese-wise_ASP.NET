import React, { Component} from 'react';
import '../static/css/company.css';
import CompanyInfo from '../_components/viewCompany/companyInfo';
import TextBox from '../_components/viewCompany/textBox';
import LoadingLogo from '../_components/common/loadingLogo';
import ServicesTable from '../_components/viewCompany/servicesTable';
import history from "../_helpers/history";
import { connect } from 'react-redux';
import { userActions } from '../_redux/user/duck';
import store from '../_redux/store'
import DeleteModal from '../_components/common/DeleteModal';
import { handleResponse } from '../_helpers/handleResponse';
import {Link} from 'react-router-dom';
import { Button} from 'reactstrap';
 
class Company extends Component {
    constructor(props){
        super(props);
        //if user is creating new company
        if(this.props.createMode){
            this.state = {
                showModal: false,
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
        if(!this.props.createMode){
            this.fetchCompany(this.props.companyId);
        }
    }

    handleDelete = () => {
        this.toggleModal();
        this.deleteCompany();
    }

    render() { 
        const {isCompanyLoaded, company} = this.state;

        return ( 
            <React.Fragment>
                {isCompanyLoaded
                ?
                <React.Fragment>
                    <CompanyInfo company={company}/>
                    <TextBox description={company.description}/>
                    <br />
                    <ServicesTable services={this.state.company.services}/>
                    {/* if curr user is owner of this company render edit/save btns*/}
                    {/* iff currentUser comes to this paths we knows that he is an owner of this company */}
                    {["/action/create-company", "/action/show-company"].includes(history.location.pathname) 
                    ?
                    <div>
                        <Button className="btn btn-primary" onClick={this.handleEdit}>
                            <Link to={`/action/edit-company/${this.state.company.id}`} style={{textDecoration: 'none', color: 'whitesmoke'}}>Edit</Link>
                        </Button>
                        <Button className="btn btn-danger ml-2" onClick={this.toggleModal}>Delete</Button>
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