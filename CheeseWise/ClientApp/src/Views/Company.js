import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { Button} from 'reactstrap';
import { companyApi } from '../_helpers/companyApi';
import history from "../_helpers/history";

import CompanyInfo from '../_components/viewCompany/companyInfo';
import TextBox from '../_components/viewCompany/textBox';
import LoadingLogo from '../_components/common/loadingLogo';
import ServicesTable from '../_components/viewCompany/servicesTable';
import DeleteModal from '../_components/common/DeleteModal';

import { userActions } from '../_redux/user/duck';
import store from '../_redux/store'



import '../static/css/company.css';
 
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
        const {isCompanyLoaded, company, showModal} = this.state;

        return ( 
            <React.Fragment>
                {isCompanyLoaded
                ?
                <React.Fragment>
                    <CompanyInfo company={company}/>
                    <TextBox description={company.description}/>
                    <br />
                    <ServicesTable services={company.services}/>
                    {/* if curr user is owner of this company render edit/save btns*/}
                    {/* iff currentUser comes to this paths we knows that he is an owner of this company */}
                    {["/action/create-company", "/action/show-company"].includes(history.location.pathname) 
                    ?
                    <div>
                        <Button className="btn btn-primary" onClick={this.handleEdit}>
                            <Link to={`/action/edit-company/${company.id}`} 
                                  style={{textDecoration: 'none', color: 'whitesmoke'}}
                                  >Edit
                            </Link>
                        </Button>
                        <Button className="ml-2" onClick={this.toggleModal}>Delete</Button>
                    </div>
                    :
                    //if user is not an owner dont render edit/save btns
                    <React.Fragment/> 
                    }
                </React.Fragment>
                :
                <LoadingLogo />}

                <DeleteModal message="Are yous sure you want to delete your Company?"
                                showModal={showModal}
                                toggle={this.toggleModal}
                                onDelete={this.handleDelete}/>
            </React.Fragment>
        );
    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    }

    deleteCompany = async() => {
        companyApi.remove(this.props.companyId)
        store.dispatch(userActions.addCompanyBool(false));
        history.push('/');
    }
    
    fetchCompany = async (id) =>{
        const response = await companyApi.getById(id);
        this.setState({company: response, isCompanyLoaded: true})
    }
};
const mapStateToProps = (state) => ({
    currentUser: state.currentUser
});

export default connect(mapStateToProps, {})(Company)