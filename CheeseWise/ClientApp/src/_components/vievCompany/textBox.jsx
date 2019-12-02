import React from 'react';

const TextBox = ({description}) => {
    return ( 
        <div id="description" className="text-justify container">
            {description}
        </div>
     );
}
 
export default TextBox;