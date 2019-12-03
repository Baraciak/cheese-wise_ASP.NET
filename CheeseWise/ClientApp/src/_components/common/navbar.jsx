import React from 'react';
import {Link} from 'react-router-dom';
import { authenticationService } from '../../_services/authService';
import { Dropdown } from '../layout/Dropdown';

const Navbar = (props) => {
    const currentUser = authenticationService.getCurrentUser();
    return ( 
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <nav className="navbar navbar-dark bg-dark">
                                <Link className="navbar-brand" to="/">CheeseWise</Link>
                            </nav>
                        </li>
                    </ul>
                    {currentUser === null ? 
                        <React.Fragment>
                            <nav className="navbar navbar-dark bg-dark">
                                <Link className="navbar-brand" to="/account/register"><small>Register</small></Link>
                            </nav>
                            <nav className="navbar navbar-dark bg-dark">
                                <Link className="navbar-brand" to="/account/login"><small>Log in</small></Link>
                            </nav>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            {/* <nav className="navbar navbar-dark bg-dark"> */}
                                <Dropdown onLogout={props.onLogout} currentUser={currentUser}/>
                            {/* </nav> */}
                            
                            {/* <nav className="navbar navbar-dark bg-dark">
                                <Link onClick={props.onLogout} className="navbar-brand" to="/"><small>Logout</small></Link>
                            </nav> */}
                        </React.Fragment>
                    }

                </div>
            </nav>
        </React.Fragment>
     );
}
 
export default Navbar;