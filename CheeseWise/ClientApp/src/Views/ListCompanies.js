import React, { Component } from 'react';
import CompaniesTable from '../components/companies/companiesTable';

class ListCompanies extends Component {
    state = { 
        companies: []
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <CompaniesTable companies={this.state.companies}/>
            </React.Fragment>
        );
    }

    componentDidMount = () =>{
        // console.log(this.props.categoryId);
        this.setCompaniesApi(this.props.categoryId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setCompaniesApi = (categoryId) => {
        fetch(`https://localhost:44356/api/Companies/Category/${categoryId}`, 
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        })
        .then(res => res.json())
        .then(resJson => this.setState({companies: resJson}))
        .catch(err => console.log(err));
    }

}
 
export default ListCompanies;