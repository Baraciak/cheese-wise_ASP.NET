import React from 'react';

const Tile = (props) => {
    return (
        <div className="card mt-5">
            <img className="card-img-top" src={props.category.imageSource} alt={props.category.name} />
                <p className="card-text">
                    {props.category.name.toUpperCase()}
                </p>
        </div>
      );
}
 
export default Tile;