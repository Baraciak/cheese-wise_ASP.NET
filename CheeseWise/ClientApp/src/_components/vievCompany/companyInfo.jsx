import React, {Component} from 'react';
 
export default class CompanyInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            isStateLoaded: false,
            isSaved: false,
            selectTagValue: this.props.company.category.name
        }
    }

    componentDidMount(){
        this.setCategoriesApi();
    }

    triggerNotSaved = () =>{
        this.setState({isSaved: false});
    }

    handleSelectChange = (event) =>{
        event.preventDefault();
        this.triggerNotSaved();
        this.setState({selectTagValue: event.target.value});
    }

    save = (event) =>{
        event.preventDefault();
        this.setState({isSaved: true});
        this.props.onSaveCompanyInfo(event);
    }

    render(){
        const {company, editMode} = this.props;
        const {categories, isStateLoaded} = this.state;

        return ( 
            <React.Fragment>
                <form onSubmit={this.save} id="company-info" className="container form-group">
                    <img className="m-2" src="https://png.pngtree.com/element_pic/00/16/07/11578393f240f05.jpg" alt="You're company logo here!"/>
                    <div id="info" className="form-group row m-2 ">   

                        
                        <div className="col-sm-10">
                            <input onChange={this.triggerNotSaved} type="text" readOnly={!editMode} className="form-control-plaintext" name="name" defaultValue={company.name} />
                        </div>

                        {/* <label htmlFor="category" className="col-sm-2 col-form-label"><small>Category</small></label> */}
                        {editMode && isStateLoaded
                        ?
                        <select value={this.state.selectTagValue} onChange={this.handleSelectChange} id="category" name="category" className="col-sm-10">
                            {categories.map((category, index) => 
                                <option key={index} value={category.id}>{category.name}</option>
                            )}
                        </select>
                        :
                        <div className="col-sm-10">
                            <input onChange={this.triggerNotSaved} type="text" readOnly={!editMode} className="form-control-plaintext" name="category" defaultValue={company.category.name} />        
                        </div>
                        }

                        <div className="col-sm-10">
                            <input onChange={this.triggerNotSaved} type="text" readOnly={!editMode} className="form-control-plaintext" name="location" defaultValue={company.location} />
                        </div>

                        <div className="col-sm-10">
                            <input onChange={this.triggerNotSaved} type="text" readOnly={!editMode} className="form-control-plaintext" name="phone" defaultValue={company.phone} />
                        </div>

                        <div className="col-sm-10">
                            <input onChange={this.triggerNotSaved} type="email" readOnly={!editMode} className="form-control-plaintext" name="email" defaultValue={company.email} />
                        </div>
                    </div>
                    {editMode
                    ?  
                    <div className="container">
                        {this.state.isSaved
                        ?<small className="text-secondary">Changes saved.</small>
                        :<button type="submit" className="btn btn-danger">
                            <big>Save</big>
                        </button>
                        }
                    </div>
                    :<React.Fragment/>
                    }
                </form>
            </React.Fragment>
        );
    }

    //gets all categories for editMode
    setCategoriesApi = () => {
        fetch("https://localhost:44356/api/Categories", {
        'mode': 'cors'})
        .then(res => res.json())
        .then(resJson => {
            this.setState({categories: resJson, isStateLoaded: true})
        })
        .catch(err => console.log(err));
    }
};