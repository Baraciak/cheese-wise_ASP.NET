import React from 'react';

const ServicesTable = ({services, editMode}) => {
    console.log(services, "LIST TABLE SEVICES")
    return ( 
        <table className="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Service Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
            </tr>
        </thead>
        <tbody>
            {services.length > 0 
            ? 
            services.map(service =>
            
                <tr key={service.id}>

                        {editMode
                        ?
                        <th scope="row">
                            <button className="btn btn-danger"><big>-</big></button>
                        </th>
                        :
                        <th scope="row">{service.id}</th>
                        }

                        <td>
                            {service.name}
                        </td>
                        <td>{service.description}</td>
                        <td>{service.price + ' / ' +service.priceCategory}</td>
                </tr>)
                :
                <tr>
                    <td>This company doesn't offer any services yet.</td>
                </tr>
            }
            {editMode
            ? 
            <React.Fragment>
                <tr className="form-group">
                    <th scope="row">
                        <button className="btn btn-success"><big>+</big></button>
                    </th>
                    <td>
                        <input className="form-control form-control-md" type="text" placeholder="Service name"/>
                    </td>
                    <td>
                        <input className="form-control form-control-md" type="text" placeholder="Service description"/>
                    </td>
                    <td>
                        <input id="price-input" className="form-control form-control-md" type="text" placeholder="Price"/>
                        /
                        <select>
                            <option value="Day">Day</option>
                            <option value="Hour">Hour</option>
                            <option value="Month">Month</option>
                            <option value="Week">Week</option>
                            <option value="Job">Job</option>
                        </select>
                    </td>
                </tr>

            </React.Fragment>
            :
            <React.Fragment/>
            }
        </tbody>
    </table>
     );
}
 
export default ServicesTable;