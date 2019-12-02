import types from './types';


const add = item => ({ type: types.ADD_USER, item });  
const reset = () => ({ type: types.RESET_USER });  

export default{
    add,
    reset
}