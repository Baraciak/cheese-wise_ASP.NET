import React, {Component} from 'react';

class EditTextBox extends Component{
    state = {
        isSaved: false
    }

    save = (event) =>{
        event.preventDefault();
        this.setState({isSaved: true});
        this.props.onSaveDescription(event);
    }

    triggerNotSaved = () =>{
        this.setState({isSaved: false});
    }

    render(){
        const {description} = this.props;
        return ( 
            <div className="form-group">
                <form onSubmit={this.save}>
                    <textarea onChange={this.triggerNotSaved} name="description" className="form-control text-justify" 
                            rows="5" id="description" defaultValue={description} />
                    <div className="container">
                        {this.state.isSaved
                        ?<small className="text-secondary">Changes saved.</small>
                        :<button type="submit" className="btn btn-danger">
                            <big>Save</big>
                        </button>
                        }
                    </div>       
                </form>
            </div>
        );
    }
}
 
export default EditTextBox;