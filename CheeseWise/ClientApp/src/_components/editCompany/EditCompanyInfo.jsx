import React, {Component} from 'react';
import LoadingLogo from '../common/loadingLogo';
 
export default class EditCompanyInfo extends Component{
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
        const {company} = this.props;
        const {categories, isStateLoaded} = this.state;

        return ( 
            <form onSubmit={this.save} id="company-info" className="container form-group">
                <div id="info" className="form-group row m-2 ">   

                    <div className="form-group row m-2">
                        <label htmlFor="name" className="col-sm-2 col-form-label"><small>Name</small></label>
                        <input id="name" onChange={this.triggerNotSaved} type="text" className="col-sm-10 form-control-plaintext" name="name" placeholder={company.name} />
                    </div>

                    <div className="form-group row m-2">
                        <label htmlFor="website" className="col-sm-2 col-form-label"><small>Website</small></label>
                        <input onChange={this.triggerNotSaved} type="text" className="col-sm-10 form-control-plaintext" id="website" name="website" placeholder={company.website} />
                    </div>

                    <div className="form-group row m-2">
                        <label htmlFor="category" className="col-sm-2 col-form-label"><small>Category</small></label>
                        {isStateLoaded
                        ?
                            <select value={this.state.selectTagValue} onChange={this.handleSelectChange} id="category" name="category" className="col-sm-10">
                                {categories.map((category, index) => 
                                    <option key={index} value={category.id}>{category.name}</option>
                                )}
                            </select>
                        :
                            <LoadingLogo />
                        }
                    </div>


                    <div className="form-group row m-2">
                        <label htmlFor="category" className="col-sm-2 col-form-label"><small>Location</small></label>
                        <input onChange={this.triggerNotSaved} type="text" className="col-sm-10 form-control-plaintext" name="location" placeholder={company.location} />
                    </div>

                    <div className="form-group row m-2">
                        <label htmlFor="category" className="col-sm-2 col-form-label"><small>Phone</small></label>
                        <input onChange={this.triggerNotSaved} type="text" className="col-sm-10 form-control-plaintext" name="phone" placeholder={company.phone} />
                    </div>

                    <div className="form-group row m-2">
                        <label htmlFor="category" className="col-sm-2 col-form-label"><small>Email</small></label>
                        <input onChange={this.triggerNotSaved} type="email" className="col-sm-10 form-control-plaintext" name="email" placeholder={company.email} />
                    </div>

                </div>
                <div className="container">
                    {this.state.isSaved
                    ?<small className="text-secondary">Changes saved.</small>
                    :<button type="submit" className="btn btn-danger">
                        <big>Save</big>
                    </button>
                    }
                </div>
            </form>
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