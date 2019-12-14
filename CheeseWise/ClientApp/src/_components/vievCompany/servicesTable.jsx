import React from 'react';


const ServicesTable = ({onRemoveService, onAddService, services, editMode}) => {
    console.log(services);
    return ( 
        <form onSubmit={onAddService}>
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
                services.map((service, index) =>
                
                    <tr key={index}>

                            {editMode
                            ?
                                <th scope="row">
                                    <button type="button" onClick={() => onRemoveService(service.id)} className="btn btn-danger"><big>-</big></button>
                                </th>
                                :
                                <th scope="row">{index + 1}</th>
                            }

                            <td>
                                {service.name}
                            </td>
                            <td>{service.description}</td>
                            <td>{service.price + ' / ' +service.priceCategory}</td>
                    </tr>)
                    :
                    editMode 
                    ?
                    <React.Fragment/>
                    :
                    <tr>
                        <td>This company doesn't offer any services yet.</td>
                    </tr>
                }
                {editMode
                ? 
                    <tr className="form-group">
                        <th scope="row">
                            <button type="submit" className="btn btn-success"><big>+</big></button>
                        </th>
                        <td>
                            <input name="name" className="form-control form-control-md" type="text" placeholder="Service name"/>
                        </td>
                        <td>
                            <input name="description" className="form-control form-control-md" type="text" placeholder="Service description"/>
                        </td>
                        <td>
                            <input name="price"id="price-input" className="form-control form-control-md" type="text" placeholder="Price"/>
                            /
                            <select name="priceCategory">
                                <option value="Day">Day</option>
                                <option value="Hour">Hour</option>
                                <option value="Month">Month</option>
                                <option value="Week">Week</option>
                                <option value="Job">Job</option>
                            </select>
                        </td>
                    </tr>
                
                :
                <React.Fragment/>
                }
            </tbody>
        </table>
    </form>
    );
}
 
export default ServicesTable;