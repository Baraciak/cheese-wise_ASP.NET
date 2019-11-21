import React from 'react';

const BackBtn = () => {
    return ( 
        <div className="back-btn container-fluid">
            <a onClick={() => window.history.back()}>
                <i className="fas fa-chevron-circle-left"></i>
            </a> 
        </div>);
}
 
export default BackBtn;