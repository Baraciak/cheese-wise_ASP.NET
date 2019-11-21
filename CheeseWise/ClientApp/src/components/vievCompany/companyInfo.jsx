import React from 'react';
 
const CompanyInfo = ({company}) => {
    return ( 
            <div id="company-info" className="container form-group">
                <img className="m-2" src="https://png.pngtree.com/element_pic/00/16/07/11578393f240f05.jpg" alt="You're company logo here!"/>
                <div id="info" className="form-group row m-2 ">   

                    <label htmlFor="name" className="col-sm-2 col-form-label">Name:</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="name" value={company.name}/>
                    </div>

                    <label htmlFor="category" className="col-sm-2 col-form-label">Category: </label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="category" value={company.category.name} />
                        
                    </div>

                    <label htmlFor="location" className="col-sm-2 col-form-label">Location:</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="location" value={company.location} />
                    </div>

                    <label htmlFor="phone" className="col-sm-2 col-form-label">Phone: </label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="phone" value={company.phone} />
                    </div>

                    <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="email" value={company.email} />
                    </div>
            
                </div>
            </div> );
}
 
export default CompanyInfo;