import React from 'react';

const TextBox = ({onSaveDescription, description, editMode}) => {
    return ( 
        
        <div className="form-group">
            <label htmlFor="comment">Description</label>
            {editMode
            ?
            <form onSubmit={onSaveDescription}>
                <textarea name="description" className="form-control text-justify" 
                        rows="5" id="description" defaultValue={description} />
                <button type="submit" className="btn btn-success"><big>Save</big></button>
            </form>
            :
            <div id="description" className="text-justify container">
                {description}
            </div>
            }
        </div>

     );
}
 
export default TextBox;