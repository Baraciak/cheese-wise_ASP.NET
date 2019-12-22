import React from 'react';

const SearchBar = ({onSearch}) =>{
    return ( 
        <div id="search-bar" className="container">
            <form className="form-inline my-2 my-lg-0">
                <input id="input" onChange={() => onSearch(document.querySelector("input").value)} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            </form>
        </div>
    );
}
 
export default SearchBar;