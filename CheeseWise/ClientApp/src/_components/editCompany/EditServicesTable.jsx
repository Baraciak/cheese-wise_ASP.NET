import React from 'react';


const EditServicesTable = ({onRemoveService, onAddService, services}) => {
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
                {services.map((service, index) =>
                    <tr key={index}>
                        <th scope="row">
                            <button type="button" onClick={() => onRemoveService(service.id)} className="btn btn-danger">
                                <big>-</big>
                            </button>
                        </th>
                        <td>
                            {service.name}
                        </td>
                        <td>{service.description}</td>
                        <td>{service.price + ' / ' +service.priceCategory}</td>
                    </tr>
                )}
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
            </tbody>
        </table>
    </form>
    );
}
 
export default EditServicesTable;