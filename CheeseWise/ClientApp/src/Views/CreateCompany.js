import React, { Component } from 'react'
import { connect } from 'react-redux';
import Company from './Company';

class CreateCompany extends Component{
    state = {
        company:
        {
            name: "Add company name",
            category: {name: "Add Category"},
            website: "Add company website link",
            location: "Add company location",
            email: "cleaning1@gmail.com",
            description: "Add description",
            phone: "Add company phone number",
            rating: 0.0,
            services: [],
            owner: this.props.currentUser
        }
    }
    render(){
        return(
            <Company createMode={true} company={this.state.company}/>
        );
    }
}

const mapStateToProps = (state) =>({
    currentUser: state.currentUser
});

export default connect(mapStateToProps, {})(CreateCompany);
