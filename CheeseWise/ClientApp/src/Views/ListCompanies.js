import React, { Component } from 'react';
import CompaniesTable from '../_components/companies/companiesTable';

const sortTypes = {
	ascR: {
        name: 'asc',
		fn: (a, b) => {
            if(a.rating < b.rating) { return -1; }
            if(a.rating > b.rating) { return 1; }
            return 0;
        }
	},
	descR: {
        name: 'desc',
		fn: (a, b) => {
            if(a.rating < b.rating) { return -1; }
            if(a.rating > b.rating) { return 1; }
            return 0;
        }
    },
    default: {
        name: 'default',
        fn: (a, b) => 0
    },
    ascN: {
        name: 'asc',
		fn: (a, b) => {
            if(a.name.toUpperCase() < b.name.toUpperCase()) { return -1; }
            if(a.name.toUpperCase() > b.name.toUpperCase()) { return 1; }
            return 0;
        }
	},
	descN: {
        name: 'desc',
		fn: (a, b) => {
            if(a.name.toUpperCase() < b.name.toUpperCase()) { return -1; }
            if(a.name.toUpperCase() > b.name.toUpperCase()) { return 1; }
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

		if (currentSort === 'descR') nextSort = 'ascR';
		else if (currentSort === 'ascR') nextSort = 'default';
		else if (currentSort === 'default') nextSort = 'descR';

		this.setState({
			currentSort: nextSort
		});
    }

    sortByName = () =>{
        const { currentSort } = this.state;
		let nextSort;

		if (currentSort === 'descN') nextSort = 'ascN';
		else if (currentSort === 'ascN') nextSort = 'default';
		else if (currentSort === 'default') nextSort = 'descN';

		this.setState({
			currentSort: nextSort
		});
    }


    render() {
        return ( 
            <React.Fragment>
                <br/>
                <CompaniesTable currentSort={this.state.currentSort} sortTypes={sortTypes} sortRating={this.sortByRating} sortName={this.sortByRating} companies={this.state.companies}/>
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