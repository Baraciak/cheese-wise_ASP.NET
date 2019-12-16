import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class CompaniesTable extends Component {
    state = {  }

    render() { 
        const {currentSort, companies, sortTypes} = this.props;
        return ( 
            <React.Fragment>
                <small>Sort by: </small>
                <button className="ml-1 sort-btn" onClick={this.props.sortName}>Name</button>
                <button className="ml-1 sort-btn" onClick={this.props.sortRating}>Rating</button>
                <table className="table text-light">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Company Name</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...companies].sort(sortTypes[currentSort].fn).map((company, index) =>
                        
                            <tr key={company.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <Link to={"/company/" + company.id} style={{color: 'whiteSmoke'}}>
                                            {company.name}
                                        </Link>
                                    </td>
                                    <td>{company.rating}</td>
                                    <td>{company.location}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </React.Fragment>
         );
    }
}
 
export default CompaniesTable;