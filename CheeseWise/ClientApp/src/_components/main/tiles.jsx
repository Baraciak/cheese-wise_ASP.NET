import React, {Component} from 'react';

import LoadingLogo from '../common/loadingLogo';
import TileRow from './tileRow';

class Tiles extends Component{

    state = {
        prepared: false,
        preparedCategories: []
    }
    componentWillMount(){
        this.prepareComlumns();
    }

    render(){
        return ( 
            <div id="tiles-container">
                {this.state.prepared
                ?      
                this.state.preparedCategories.map((categoryList, index) => 
                    <TileRow key={index} categories={categoryList} />
                )
                :
                <LoadingLogo/>
                }      
            </div>             
        );
    }

    prepareComlumns = () => {
        let result= [];
        let resultHelper = [];
        let categories = this.props.categories;

        const categoryHelperLastSize = categories % 4;
        let counter = 0;
        for(let category of categories){

            if(resultHelper.length === 4){
                result.push(resultHelper);
                resultHelper = [];
            }else if(resultHelper === categoryHelperLastSize){
                result.push(resultHelper);
            }
            resultHelper.push(category);
        }

    const prepared = true;
    console.log(result);
    this.setState({prepared, preparedCategories: result});
    }  
}
export default Tiles;