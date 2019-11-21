import React from 'react';
import Tile from './tile';
import {Link} from 'react-router-dom';

const Tiles = (props) => {
    return ( 
    <div className="card-group" id="tiles-container">
            <div className="row">
                {props.categories.map(category => 
                    <Link key={category.id} to={"/category/" + category.id}>
                        <div className="col-sm-3">
                            <Tile category={category}/>
                        </div>
                    </Link>)}
            </div>
    </div> );
}
 
export default Tiles;