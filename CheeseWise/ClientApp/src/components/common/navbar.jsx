import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = (props) => {
    return ( 
        <React.Fragment>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <nav className="navbar navbar-dark bg-dark">
                                <Link className="navbar-brand" to="/">CheeseWise</Link>
                            </nav>
                        </li>
                    </ul>
                    <nav className="navbar navbar-dark bg-dark">
                        <Link className="navbar-brand" to="/account/register"><small>Register</small></Link>
                    </nav>
                    <nav className="navbar navbar-dark bg-dark">
                        <Link className="navbar-brand" to="/account/login"><small>Log in</small></Link>
                    </nav>
                </div>
            </nav>
            {/* <ul class="navbar-nav mr-auto">
                <li class="nav-item">

                </li>
                <li class="nav-item">
                    
                        
                    </a>
                </li>
            </ul> */}
        </React.Fragment>
     );
}
 
export default Navbar;