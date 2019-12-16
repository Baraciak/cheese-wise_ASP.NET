import React, {Component} from 'react';
 
export default class CompanyInfo extends Component{

    render(){
        const {company} = this.props;

        return ( 
            <div id="company-info">
                <div className="col-sm-10">
                    <h1 id="name">{company.name}</h1>
                </div>

                <div id="info" className="form-group row m-2 ">   
                    <div className="col-sm-10">
                        <p>{company.website}</p>
                    </div>

                    <div className="col-sm-10">
                        <p>{company.category.name}</p>        
                    </div>

                    <div className="col-sm-10">
                        <p>{company.location}</p>
                    </div>

                    <div className="col-sm-10">
                        <p>{company.phone}</p>
                    </div>

                    <div className="col-sm-10">
                        <p>{company.email}</p>
                    </div>
                </div>
            </div>
        );
    }
};