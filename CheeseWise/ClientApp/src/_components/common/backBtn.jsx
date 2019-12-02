import React from 'react';

const BackBtn = () => {
    return ( 
        <div className="back-btn container-fluid">
            <button onClick={() => window.history.back()}>
                <i className="fas fa-chevron-circle-left"></i>
            </button> 
        </div>);
}
 
export default BackBtn;