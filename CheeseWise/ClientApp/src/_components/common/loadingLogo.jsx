import React from 'react';

const LoadingLogo = () => {
    return ( 
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-grow text-info spinner-grow-sm m-2" role="status"></div>
                <div className="spinner-grow text-info spinner-grow-sm m-2" role="status"></div>
                <div className="spinner-grow text-info spinner-grow-sm m-2" role="status"></div>
            </div>
        );
}
 
export default LoadingLogo;