import React, { Component } from 'react';
// import { Container } from 'reactstrap';
import BackBtn from './common/backBtn';
import Footer from './common/footer';
import UpBtn from './common/upBtn';
import Navbar from './common/navbar';

export class Layout extends Component {
  static displayName = Layout.name;
  
  render () {

    return (
      <React.Fragment>
        <Navbar onLogout={this.props.onLogout} currentUser={this.props.currentUser}/>
          <div id="site-wrapper">
            <BackBtn />
            <div className="container">

              {this.props.children}

            </div>
            <UpBtn />
          </div>
        <Footer />
      </React.Fragment>
    );
  }

  componentDidMount(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
