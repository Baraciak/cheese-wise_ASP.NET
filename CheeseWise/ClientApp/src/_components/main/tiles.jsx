import React, {useState ,useEffect} from 'react';
import LoadingLogo from '../common/loadingLogo';
import TileRow from './tileRow';

export const prepareComlumns = (categories) => {
    if (categories.length <= 4) return [categories];

    const rowSize = 4;
    const lastRowSize = categories % rowSize;

    let result= [];
    let row = [];
    for(let category of categories){
        if(row.length === rowSize){
            result.push(row);
            row = [];
        //push last row
        }else if(row === lastRowSize){
            result.push(row);
        }
        row.push(category);
    }
    return result;
}

const Tiles = ({categories}) => {
    const [prepared, setPrepared] = useState(false);
    const [preparedCategories, setPreparedCategories] = useState(categories);

    useEffect(() =>{
        const result = prepareComlumns(categories);
        setPreparedCategories(result)
        setPrepared(true);

    }, [categories]);

    return (
        <div id="tiles-container">
            {prepared
                ?preparedCategories.map((categoryList, index) => <TileRow key={index} categories={categoryList} />)
                :<LoadingLogo/>
            }      
        </div>  
    )
}
export default Tiles;