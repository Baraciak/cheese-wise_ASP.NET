import React from 'react';
import Tile from './tile';

const TileRow = (props) => {
    return (
        <div className="row">
            {props.categories.map((category, index) =>
                <div key={index} className="col-sm">
                    <Tile category={category}/>
                </div>
            )}
        </div>
      );
}
 
export default TileRow;