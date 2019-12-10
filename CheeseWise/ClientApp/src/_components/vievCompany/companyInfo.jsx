import React, {Component, useState} from 'react';
 
export default class CompanyInfo extends Component{
    constructor(props){
        super(props);
    }

    state = {
        categories: [],
        isStateLoaded: false,
        isSaved: false
    }

    componentDidMount(){
        this.setCategoriesApi();
    }

    triggerNotSaved = () =>{
        this.setState({isSaved: false});
    }

    //
    save = (event) =>{
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

                        <label htmlFor="name" className="col-sm-2 col-form-label">Name:</label>
                        <div className="col-sm-10">
                            <input onChange={this.triggerNotSaved} type="text" readOnly={!editMode} className="form-control-plaintext" id="name" name="name" placeholder={company.name}/>
                        </div>

                        <label htmlFor="category" className="col-sm-2 col-form-label">Category: </label>
                        {editMode && isStateLoaded
                        ?
                        <select onChange={this.triggerNotSaved} name="categoryId" className="col-sm-10">
                            {categories.map(category => 
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )}
                        </select>
                        :
                        <div className="col-sm-10">
                            <input onChange={this.triggerNotSaved} type="text" readOnly={!editMode} className="form-control-plaintext" id="category" name="category" placeholder={company.category.name} />        
                        </div>
                        }

                        <label htmlFor="location" className="col-sm-2 col-form-label">Location:</label>
                        <div className="col-sm-10">
                            <input onChange={this.triggerNotSaved} type="text" readOnly={!editMode} className="form-control-plaintext" id="location" name="location" placeholder={company.location} />
                        </div>

                        <label htmlFor="phone" className="col-sm-2 col-form-label">Phone: </label>
                        <div className="col-sm-10">
                            <input onChange={this.triggerNotSaved} type="text" readOnly={!editMode} className="form-control-plaintext" id="phone" name="phone" placeholder={company.phone} />
                        </div>

                        <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                        <div className="col-sm-10">
                            <input onChange={this.triggerNotSaved} type="text" readOnly={!editMode} className="form-control-plaintext" id="email" name="email" placeholder={company.email} />
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