import React, {Component} from 'react';
import LoadingLogo from '../common/loadingLogo';
import { Button, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import { categoryApi } from '../../_helpers/categoryApi';
 
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
        this.fetchCategories();
    }

    //gets all categories for editMode
    fetchCategories = async() => {
        const response = await categoryApi.getAll()
        this.setState({categories: response, isStateLoaded: true})
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
            <Form inline onSubmit={this.save} id="company-info" className="container form-group">
                <FormGroup id="info" className="form-group row m-2 ">   

                <Row form>
                    <FormGroup className="row m-2">
                        <Col sm={2}>
                            <Label htmlFor="name" className="col-form-label"><small>Name</small></Label>
                        </Col>
                        <Col sm={10}>
                            <Input id="name" onChange={this.triggerNotSaved} type="text" className="inp form-control-plaintext" name="name" placeholder={company.name} />
                        </Col>
                    </FormGroup>
                </Row>
                <Row form>
                    <FormGroup className="row m-2">
                        <Col sm={2}>
                            <Label htmlFor="website" className="col-form-label"><small>Website</small></Label>
                        </Col>
                        <Col sm={10}>
                            <Input onChange={this.triggerNotSaved} type="text" className="inp form-control-plaintext" id="website" name="website" placeholder={company.website} />
                        </Col>
                    </FormGroup>
                </Row>

                <Row form>
                    <FormGroup className="row m-2">
                    <Col sm={2}>
                        <Label htmlFor="category" className="col-form-label"><small>Category</small></Label>
                    </Col>

                        {isStateLoaded
                        ?
                            <Col sm={10}>
                                <select value={this.state.selectTagValue} 
                                        onChange={this.handleSelectChange}
                                        id="category" 
                                        name="category">
                                    {categories.map((category, index) => 
                                        <option key={index} value={category.id}>{category.name}</option>
                                    )}
                                </select>
                            </Col>
                        :
                            <LoadingLogo />
                        }
                    </FormGroup>
                </Row>

                <Row form>
                    <FormGroup className="form-group row m-2">
                        <Col sm={2}>
                            <Label htmlFor="category" className="col-form-label"><small>Location</small></Label>
                        </Col>
                        <Col sm={10}>
                            <Input onChange={this.triggerNotSaved} type="text" className="inp form-control-plaintext" name="location" placeholder={company.location} />
                        </Col>
                    </FormGroup>
                </Row>
                <Row form>
                    <FormGroup className="form-group row m-2">
                        <Col sm={2}>
                            <Label htmlFor="phone" className="col-form-label"><small>Phone</small></Label>
                        </Col>
                        <Col sm={10}>
                            <Input onChange={this.triggerNotSaved} 
                                    type="text" 
                                    className="inp form-control-plaintext" 
                                    id="phone"
                                    name="phone" 
                                    placeholder={company.phone} />
                        </Col>
                    </FormGroup>
                </Row>
                <Row form>        
                    <FormGroup className="form-group row m-2">
                        <Col sm={2}>
                            <Label htmlFor="category" className="col-form-label"><small>Email</small></Label>
                        </Col>
                        <Col sm={10}>
                            <Input onChange={this.triggerNotSaved} 
                                    type="email" 
                                    name="email" 
                                    className="inp form-control-plaintext" 
                                    placeholder={company.email} />
                        </Col>
                    </FormGroup>
                </Row>
                </FormGroup>
                <div className="container">
                    {this.state.isSaved
                    ?<small className="text-secondary">Changes saved.</small>
                    :<Button type="submit">
                        <big>Save</big>
                    </Button>
                    }
                </div>
            </Form>
        );
    }
};