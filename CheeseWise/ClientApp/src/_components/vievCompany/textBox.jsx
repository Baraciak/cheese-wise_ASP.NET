import React from 'react';

const TextBox = ({description, editMode}) => {
    return ( 
        <div className="form-group">
            <label htmlFor="comment">Description</label>
            {editMode
            ?
            <textarea className="form-control text-justify" 
            rows="5" id="description" defaultValue={description} />
            :
            <div id="description" className="text-justify container">
                {description}
            </div>
            }
        </div>
     );
}
 
export default TextBox;