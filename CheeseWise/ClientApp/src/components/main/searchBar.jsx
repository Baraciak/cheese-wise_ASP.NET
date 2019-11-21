import React ,{ Component}from 'react';

class SearchBar extends Component {
    state = { 

    }

    render() { 
        return ( 
            <div id="search-bar" className="container">
                <form className="form-inline my-2 my-lg-0">
                    <input id="input" onChange={() => this.onSearch()} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                </form>
            </div>
         );
    }

    //this handle bcs of fucking error 
    onSearch = () =>{
        console.log(document.querySelector("input").value);
        this.props.onSearch(document.querySelector("input").value) 
    }

}
 
export default SearchBar;