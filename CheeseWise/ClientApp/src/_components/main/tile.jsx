import React from 'react';
import {Link} from 'react-router-dom';

const Tile = (props) => {
    return (
        <Link to={"/category/" + props.category.id} style={{textDecoration: 'none'}}>
            <img className="card card-img-top" src={"data:image/png;base64," + props.category.imageSource} alt={props.category.name} />
                <p className="card-text">
                    {props.category.name.toUpperCase()}
                </p>
        </Link>
      );
}
 
export default Tile;