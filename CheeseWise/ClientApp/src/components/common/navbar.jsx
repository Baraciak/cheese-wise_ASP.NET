import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = (props) => {
    return ( 
        <nav className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">CheeseWise</Link>
        </nav>
     );
}
 
export default Navbar;