import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = (props) => {
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
                    {props.user == null ? 
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
                            <nav className="navbar navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/account/overview"><small>Logged as {props.user.name}</small></Link>
                            </nav>
                            <nav className="navbar navbar-dark bg-dark">
                                <Link onClick={props.onLogout} className="navbar-brand" to="/account/register"><small>Logout</small></Link>
                            </nav>
                        </React.Fragment>
                    }

                </div>
            </nav>
        </React.Fragment>
     );
}
 
export default Navbar;