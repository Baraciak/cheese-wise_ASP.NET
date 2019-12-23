import React, { Component } from 'react';
import CompaniesTable from '../_components/companies/companiesTable';
import { companyApi } from '../_helpers/companyApi';

const sortTypes = {
	ascR: {
		fn: (a, b) => {
            if(a.rating < b.rating) { return -1; }
            if(a.rating > b.rating) { return 1; }
            return 0;
        }
	},
	descR: {
		fn: (a, b) => {
            if(a.rating > b.rating) { return -1; }
            if(a.rating < b.rating) { return 1; }
            return 0;
        }
    },
    default: {
        fn: (a, b) => 0
    },
    ascN: {
		fn: (a, b) => {
            if(a.name.toUpperCase() < b.name.toUpperCase()) { return -1; }
            if(a.name.toUpperCase() > b.name.toUpperCase()) { return 1; }
            return 0;
        }
	},
	descN: {
		fn: (a, b) => {
            if(a.name.toUpperCase() > b.name.toUpperCase()) { return -1; }
            if(a.name.toUpperCase() < b.name.toUpperCase()) { return 1; }
            return 0;
        }
    }
};

class ListCompanies extends Component {
    state = { 
        companies: [],
        currentSort: 'default'
    }

    sortByRating = () =>{
        const { currentSort } = this.state;
		let nextSort;

		if (['ascN','descN', 'descR','default'].includes(currentSort)) nextSort = 'ascR';
        else if (currentSort === 'ascR') nextSort = 'descR';

		this.setState({currentSort: nextSort});
    }

    sortByName = () =>{
        const { currentSort } = this.state;
        let nextSort;
        
		if (['ascN', 'ascR', 'descR','default'].includes(currentSort)) nextSort = 'descN';
		else if (currentSort === 'descN') nextSort = 'ascN';

		this.setState({currentSort: nextSort});
    }

    render() {
        return ( 
            <React.Fragment>
                <CompaniesTable currentSort={this.state.currentSort} sortTypes={sortTypes} sortRating={this.sortByRating} sortName={this.sortByName} companies={this.state.companies}/>
            </React.Fragment>
        );
    }

    componentDidMount = () =>{
        this.fetchCompanies(this.props.categoryId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    fetchCompanies = async(categoryId) => {
        const companies = await companyApi.getByCategoryId(categoryId);       
        this.setState({companies: companies});
    }

}
 
export default ListCompanies;