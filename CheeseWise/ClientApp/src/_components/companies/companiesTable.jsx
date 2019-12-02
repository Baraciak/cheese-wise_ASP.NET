import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class CompaniesTable extends Component {
    state = {  }

    render() { 
        return ( 
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.companies.map(company =>
                    
                        <tr key={company.id}>
                                <th scope="row">{company.id}</th>
                                <td>
                                    <Link to={"/company/" + company.id}>
                                        {company.name}
                                    </Link>
                                </td>
                                <td>{company.rating}</td>
                                <td>{company.location}</td>
                        </tr>
                    )}
                </tbody>
            </table>
         );
    }
}
 
export default CompaniesTable;