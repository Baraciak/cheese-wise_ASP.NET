import React, { Component } from 'react'
import { connect } from 'react-redux';
import Company from './Company';

class CreateCompany extends Component{
    state = {
        company:
        {
            category: {name: "Add Category"},
            description: "Add description",
            email: "cleaning1@gmail.com",
            id: null,
            location: "Add company location",
            name: "Add company name",
            owner: this.props.currentUser,
            phone: "Add company phone number",
            rating: 0.0
        }
    }
    render(){
        return(
            <React.Fragment>
                <Company createMode={true} company={this.state.company}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) =>({
    currentUser: state.currentUser,
    hasCompany: state.hasCompany
});

export default connect(mapStateToProps, {})(CreateCompany);
