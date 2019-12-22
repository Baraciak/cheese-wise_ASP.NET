import React, { Component } from 'react';

import Tiles from '../_components/main/tiles';
import SearchBar from '../_components/main/searchBar'
import LoadingLogo from '../_components/common/loadingLogo';
import {categoryApi} from '../_helpers/categoryApi'

import '../static/css/main.css';
class App extends Component {
    state = { 
		categories: [],
		allCategories: []
     }

     componentDidMount = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.setCategoriesApi();
    }

    render() { 
        return ( 
          	<React.Fragment>
            	<h2>Choose a category to list available services:</h2>
            	<br />
            	<SearchBar onSearch={this.handleSearch}/>
            	<br/>
              	<div className="container">
					{this.state.categories.length > 0 
					?
					<Tiles categories={this.state.categories}/>
					:
					<LoadingLogo />}
            	</div>
          	</React.Fragment>
      	);
  	}
    //TODO make it more advanced
     //it just check if category name contains word
	handleSearch = (word) =>{
    	if(word.length > 0){
			const newArr = [...this.state.categories].filter(category => category.name.toLowerCase().includes(word.toLowerCase()));              
			this.setState({categories: newArr});
		}else{
			this.setState({categories: this.state.allCategories})
		}
    }	

 	setCategoriesApi = async() => {
      	const response = await categoryApi.getAll();
      	this.setState({categories: response, allCategories: response});
    }
}
 
export default App;