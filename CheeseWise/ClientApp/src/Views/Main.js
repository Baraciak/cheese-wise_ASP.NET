import React, { Component } from 'react';

import Tiles from '../_components/main/tiles';
import SearchBar from '../_components/main/searchBar'
import LoadingLogo from '../_components/common/loadingLogo';

import '../static/css/main.css';
class App extends Component {
    state = { 
        categories: []
     }

     //TODO make it more advanced
     //it just check if category name contains letters
    handleSearch = (word) =>{
      if(word.length > 0){
        let categories = [...this.state.categories];
        const newArr = categories.filter(category => category.name.toLowerCase().includes(word.toLowerCase()));                  
        this.setState({categories: newArr});
      }else{
        this.setCategoriesApi();
      }
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

  componentDidMount = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setCategoriesApi();
  }

    setCategoriesApi = () => {
        fetch("https://localhost:44356/api/Categories", {
        'mode': 'cors'})
        .then(res => res.json())
        .then(resJson => this.setState({categories: resJson}))
        .catch(err => console.log(err));
    }
}
 
export default App;