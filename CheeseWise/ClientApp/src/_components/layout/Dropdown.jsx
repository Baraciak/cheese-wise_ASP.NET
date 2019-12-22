import React from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { authService } from '../../_services/authService';

import '../../static/css/dropdown_user_menu.css';

const Dropdown = ({currentUser, hasCompany}) => {
    return (
        <div className="dropdown btn-group dropleft" id="user-dropdown-menu">
                <button className="dropdown-toggle" data-toggle="dropdown" id="dropdownMenuButton" 
                aria-haspopup="true" aria-expanded="false">| | |</button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div className="col">
                        <span className="navbar-brand"><small> Hello {currentUser.name}</small></span>
                    </div>

                    <div className="col">
                        <hr/>
                    </div>

                    {hasCompany
                    ?
                    <div className="col">
                        <Link className="link navbar-brand" to="/action/show-company">
                            <small>Show my company</small>
                        </Link>
                    </div>
                    :
                    <div className="col">
                        <Link className="link navbar-brand" to="/action/create-company">
                            <small>Create company</small>
                        </Link>
                    </div>
                    }

                    <div className="col">
                        <Link className="link navbar-brand " onClick={authService.logout} to="/">
                            <small>Logout</small>
                        </Link>
                    </div>
                </div>
            </div>
    )
}
const mapStateToProps = (state) =>({
    currentUser: state.currentUser,
    hasCompany: state.hasCompany
})

export default connect(mapStateToProps, {})(Dropdown);




