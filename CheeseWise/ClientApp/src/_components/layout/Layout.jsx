import React, { Component } from 'react';
import BackBtn from '../common/backBtn';
import Footer from '../common/footer';
import Navbar from '../common/navbar';

export class Layout extends Component {
  static displayName = Layout.name;
  
  componentDidMount(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  render () {
    return (
      <React.Fragment>
        <Navbar/>
          <div id="site-wrapper">
            <div id="content-wrapper" className="container">
              <BackBtn />

              {this.props.children}

            </div>
          </div>
        <Footer />
      </React.Fragment>
    );
  }
}
