import React, { Component } from 'react';
// import { Container } from 'reactstrap';
import BackBtn from './common/backBtn';
import Footer from './common/footer';
import UpBtn from './common/upBtn';
import Navbar from './common/navbar';
import { Router } from 'react-router-dom';
import history from '../history';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    
    return (
        <Router history={history}>
          <React.Fragment>
            <Navbar onLogout={this.props.onLogout} user={this.props.user}/>
              <div id="site-wrapper">
                <BackBtn />
                <div className="container">

                  {this.props.children}

                </div>
                <UpBtn />
              </div>
            <Footer />
          </React.Fragment>
        </Router>

    );
  }

  componentDidMount(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
