import React from 'react';
import Tile from './tile';

const TileRow = ({categories}) => {
    return (
        <div className="row">
            {categories.map((category, index) =>
                <div key={index} className="col-sm">
                    <Tile category={category}/>
                </div>
            )}
        </div>
      );
}
 
export default TileRow;