import React, { Component } from 'react'

class CreateCompany extends Component{
    render(){
        return(
            <div>
                <form>
                    <div class="form-group">
                        <label for="formGroupExampleInput">Example label</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder"/>
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">Another label</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder"/>
                    </div>
                </form>
            </div>
        );
    }
//             this.Name = name;
// this.Email= email;
// this.Phone = phone;
// this.Description = description;
// this.Rating = rating;
// this.Location = location;
// this.Owner = owner;
// this.Category = category;

}