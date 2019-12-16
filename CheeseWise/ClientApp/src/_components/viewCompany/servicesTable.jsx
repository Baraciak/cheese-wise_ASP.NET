import React from 'react';


const ServicesTable = ({onAddService, services}) => {
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
                services.map((service, index) =>
                    <tr key={index}>
                            <th scope="row">{index + 1}</th>
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
            </tbody>
        </table>
    );
}
 
export default ServicesTable;