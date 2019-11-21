import React, { Component } from 'react'
import 'jquery';

class UpBtn extends Component {
    state = {
        pageYOffset: false
    }

    constructor() {
        super();
        window.onscroll = function() {this.checkOffset()}.bind(this);
    }

    render() {
        return ( 
            <div className="up-btn">
                {this.state.pageYOffset
                ?
                <a  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <i className="fas fa-chevron-circle-up"></i>
                </a>
                :
                null
            }

            </div>);
    }

    checkOffset = () => {
        if( window.pageYOffset > 300){
            this.setState({pageYOffset: true})
        }else{
            this.setState({pageYOffset: false})
        }
    }

}
 
export default UpBtn;