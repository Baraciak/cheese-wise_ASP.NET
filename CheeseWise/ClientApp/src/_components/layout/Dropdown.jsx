import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import '../../static/css/dropdown_user_menu.css';
import { authenticationService } from '../../_services/authService';


export class Dropdown extends Component {

    render(){
        return(
            <div className="dropdown btn-group dropleft" id="user-dropdown-menu">
                <button className="dropdown-toggle btn btn-outline-warning" data-toggle="dropdown" id="dropdownMenuButton" 
                aria-haspopup="true" aria-expanded="false">|||</button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div className="row row-cols-1 container">
                        <div className="col">
                            <span className="navbar-brand"><small> Hello {this.props.currentUser.name}</small></span>
                        </div>

                        <div className="col">
                            <hr/>
                        </div>

                        {authenticationService.hasCompany()
                        ?
                        <div className="col">
                            <Link className="link navbar-brand" to="/account/overview">
                                <small>Show my company</small>
                            </Link>
                        </div>
                        :
                        <div className="col">
                            <Link className="link navbar-brand" to="/account/overview">
                                <small>Create company</small>
                            </Link>
                        </div>
                        }

                        <div className="col">
                            <Link className="link navbar-brand " onClick={this.props.onLogout} to="/">
                                <small>Logout</small>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
