import React from 'react';
import UpBtn from './upBtn';

const Footer = () => {
    return ( 
        <footer id="sticky-footer" className="py-4 bg-dark text-white-50">
            <UpBtn />
            <div className="container text-center">
                <small>Copyright &copy; www.github.com/AleksanderNowicki</small>
                <br />
                <span>
                    <small>Icons made by: http://www.prepbootstrap.com/bootstrap-theme/color-flat-design</small>
                </span>
            </div>
            
        </footer>
     );
}
 
export default Footer;